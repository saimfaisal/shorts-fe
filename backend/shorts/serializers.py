from __future__ import annotations

from typing import Any

from rest_framework import serializers

from .models import ShortVideo


class ShortGenerationRequestSerializer(serializers.Serializer):
    youtube_url = serializers.URLField()
    duration = serializers.IntegerField(min_value=1)
    start_time = serializers.IntegerField(min_value=0, required=False, default=0)


class ShortVideoSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = ShortVideo
        fields = [
            "id",
            "youtube_url",
            "duration",
            "start_time",
            "status",
            "error_message",
            "file",
            "file_url",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "status",
            "error_message",
            "file",
            "file_url",
            "created_at",
            "updated_at",
        ]

    def get_file_url(self, obj: ShortVideo) -> str | None:
        if obj.file:
            request: Any = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return None

