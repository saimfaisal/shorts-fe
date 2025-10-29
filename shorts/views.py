from __future__ import annotations

import os
import shutil
import subprocess
import tempfile
import uuid
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ShortVideo
from .serializers import ShortGenerationRequestSerializer, ShortVideoSerializer


class ShortGenerateView(APIView):
    """Handle creation of short videos from YouTube sources."""

    def post(self, request, *args, **kwargs):
        request_serializer = ShortGenerationRequestSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)
        payload = request_serializer.validated_data

        short = ShortVideo.objects.create(
            youtube_url=payload["youtube_url"],
            duration=payload["duration"],
            start_time=payload.get("start_time", 0),
            status=ShortVideo.STATUS_PROCESSING,
        )

        try:
            process_short_video(short)
        except Exception as exc:  # noqa: BLE001 - we want to surface a clean API error
            short.status = ShortVideo.STATUS_FAILED
            short.error_message = str(exc)
            short.save(update_fields=["status", "error_message", "updated_at"])
            response_status = status.HTTP_500_INTERNAL_SERVER_ERROR
        else:
            response_status = status.HTTP_201_CREATED

        response_serializer = ShortVideoSerializer(short, context={"request": request})
        return Response(response_serializer.data, status=response_status)


class ShortDetailView(APIView):
    """Fetch metadata for a previously generated short video."""

    def get(self, request, pk: int, *args, **kwargs):
        short = get_object_or_404(ShortVideo, pk=pk)
        serializer = ShortVideoSerializer(short, context={"request": request})
        return Response(serializer.data)


def process_short_video(short: ShortVideo) -> None:
    """Download the source video, trim it, and store the resulting short."""
    try:
        from yt_dlp import YoutubeDL
    except ImportError as exc:  # pragma: no cover - defensive in case deps missing
        raise RuntimeError(
            "yt-dlp is required but not installed. Add it to your environment."
        ) from exc

    if not shutil.which("ffmpeg"):
        raise RuntimeError("ffmpeg binary not found. Please install ffmpeg.")

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        ydl_opts = {
            "outtmpl": str(temp_path / "%(id)s.%(ext)s"),
            "format": "mp4/bestaudio/best",
        }

        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(short.youtube_url, download=True)
            downloaded_path = Path(ydl.prepare_filename(info))

        source_duration = info.get("duration")
        if source_duration is not None:
            requested_end = short.start_time + short.duration
            if requested_end > int(source_duration):
                raise ValueError(
                    "Requested start time and duration exceed the source video length."
                )

        trimmed_filename = f"{uuid.uuid4().hex}.mp4"
        trimmed_path = temp_path / trimmed_filename

        ffmpeg_command = [
            "ffmpeg",
            "-y",
            "-ss",
            str(short.start_time),
            "-i",
            str(downloaded_path),
            "-t",
            str(short.duration),
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-c:a",
            "aac",
            "-movflags",
            "+faststart",
            str(trimmed_path),
        ]

        result = subprocess.run(
            ffmpeg_command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False,
        )

        if result.returncode != 0:
            raise RuntimeError(f"ffmpeg failed: {result.stderr}")

        media_root = Path(settings.MEDIA_ROOT)
        media_root.mkdir(parents=True, exist_ok=True)

        with trimmed_path.open("rb") as trimmed_file:
            short.file.save(trimmed_filename, File(trimmed_file), save=False)

        short.status = ShortVideo.STATUS_COMPLETED
        short.error_message = ""
        short.save(update_fields=["file", "status", "error_message", "updated_at"])

