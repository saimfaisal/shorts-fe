# ShortBeat

ShortBeat is a React/Vite frontend with a Django REST backend that trims YouTube videos into downloadable shorts.

## Prerequisites

- Node.js 18+
- Python 3.10+
- Either `ffmpeg` available on the system path **or** the backend dependency [`imageio-ffmpeg`](https://pypi.org/project/imageio-ffmpeg/) (installed automatically when you run `pip install -r backend/requirements.txt`) which bundles a portable binary.

## Backend Setup

```bash
cd backend
python3 -m pip install --user -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver  # serves the API on http://127.0.0.1:8000/
```

> Tip: add `export PATH="$HOME/.local/bin:$PATH"` to your shell config so the `pip` command installed in `~/.local/bin` is available.

Short generation runs asynchronously: the `POST /api/shorts/generate/` endpoint responds quickly with a record in `processing` state while work continues in the background. The frontend polls `/api/shorts/<id>/` until the short is `completed` (or `failed`).

## Frontend Setup

```bash
npm install
npm run dev        # launches Vite on http://127.0.0.1:5173/
```

During development the Vite dev server proxies `/api/*` requests to `http://127.0.0.1:8000`, so the frontend automatically talks to the Django API.

To customize API endpoints for other environments, create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=https://your-backend.example.com
VITE_GENERATE_SHORTS_PATH=/api/shorts/generate/
VITE_API_TIMEOUT_MS=120000
VITE_API_POLL_INTERVAL_MS=3000
VITE_API_POLL_TIMEOUT_MS=1800000
```

## Production Build

```bash
npm run build
```

Bundled assets are placed in `dist/`. Serve them with any static host that can forward `/api/shorts/*` requests to the Django backend.
