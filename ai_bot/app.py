from fastapi import FastAPI, Request
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post('/chat')
async def chat(req: ChatRequest):
    # Placeholder: replace with Gemini/OpenAI SDK integration
    user_message = req.message
    response = f"RameezBot (stub): I received your message: {user_message}"
    return {"reply": response}

@app.get('/')
async def root():
    return {"status": "RameezBot stub running"}
