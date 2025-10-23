# YouTube Shorts Generator API

Backend service built with Django and Django REST Framework that converts YouTube videos into short clips via `yt-dlp` and `ffmpeg`.

## Features
- `POST /api/shorts/generate/` to request a short clip.
- `GET /api/shorts/<id>/` to fetch metadata for a processed short.
- Stores results in SQLite with downloadable media exposed under `/media/`.
- CORS enabled for development usage with browser-based clients.

## Requirements
- Python 3.10+
- `ffmpeg` binary available on the system path.
- Network access to YouTube.

## Setup
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
```

## Running locally
```bash
python manage.py runserver
```

Media files are saved under `media/shorts/` and exposed via `http://127.0.0.1:8000/media/shorts/<filename>`.

## API Examples

### Generate a short
```bash
curl -X POST http://127.0.0.1:8000/api/shorts/generate/ \
  -H "Content-Type: application/json" \
  -d '{
    "youtube_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "duration": 30,
    "start_time": 10
  }'
```

### Fetch short details
```bash
curl http://127.0.0.1:8000/api/shorts/1/
```

Both endpoints return JSON containing metadata such as processing status, duration, and (when ready) the downloadable file URL.

