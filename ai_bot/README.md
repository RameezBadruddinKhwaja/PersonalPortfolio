# RameezBot - AI Chatbot Backend

This is the FastAPI backend for RameezBot, powered by Google's Gemini API.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_actual_key_here
```

## Running Locally

```bash
uvicorn app:app --reload --port 8000
```

The bot will be available at `http://localhost:8000`

## Endpoints

- `GET /` - Bot status and info
- `GET /health` - Health check
- `POST /chat` - Chat with RameezBot
  ```json
  {
    "message": "Hello!"
  }
  ```

## Deployment

This can be deployed to:
- Render.com (Free tier)
- Railway.app
- Vercel (as a Python serverless function)
- Any platform supporting Python + FastAPI

## Features

- ✅ Gemini AI integration
- ✅ Intelligent fallback responses when API is unavailable
- ✅ CORS enabled for web integration
- ✅ Context-aware responses about Rameez
- ✅ Professional and friendly tone
