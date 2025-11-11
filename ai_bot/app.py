from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from typing import Optional
import google.generativeai as genai

app = FastAPI()

# Allow CORS for local development and Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None
    print("Warning: GEMINI_API_KEY not set. Using fallback responses.")

# Rameez's information for the chatbot context
RAMEEZ_CONTEXT = """
You are RameezBot, a friendly AI assistant representing Rameez Bader Khwaja.

About Rameez:
- Full Name: Rameez Bader Khwaja
- Role: Full-Stack Developer and AI Enthusiast
- Location: Karachi, Pakistan
- Education: ADP in Computer Information Systems from Hamdard University
- Currently: Part of Governor Sindh IT Initiative (Panaverse Program)

Technical Skills:
- Frontend: Next.js, TypeScript, React, Tailwind CSS, ShadCN UI, Framer Motion
- Backend: Node.js, Express.js, Prisma, PostgreSQL, REST APIs
- AI & Tools: Python, OpenAI SDK, Gemini API, FastAPI, Agentic AI
- Platforms: Git, GitHub, Vercel, Supabase, Passport.js

Notable Projects:
1. AuthApp Sage - Full-stack authentication system with OAuth, Prisma, PostgreSQL
2. Color Guessing Game - Interactive RGB color matching game
3. Agentic AI Bot - Experimental AI agent with OpenAI SDK and Crew AI

Contact:
- Email: rameezbaderkhwaja@gmail.com
- LinkedIn: linkedin.com/in/rameezbaderkhwaja
- GitHub: github.com/RameezBader

Respond in a friendly, professional manner. Keep answers concise but informative.
If asked about Rameez, provide relevant information from above.
If asked about his projects, skills, or availability for opportunities, be enthusiastic and helpful.
"""

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

def get_fallback_response(user_message: str) -> str:
    """Provide intelligent fallback responses when Gemini API is unavailable"""
    message_lower = user_message.lower()

    if any(word in message_lower for word in ["hi", "hello", "hey", "assalam"]):
        return "Assalamualaikum! 👋 I'm RameezBot. I can tell you about Rameez Bader Khwaja, his projects, skills, and how to contact him. What would you like to know?"

    elif any(word in message_lower for word in ["who", "about", "rameez"]):
        return "Rameez Bader Khwaja is a Full-Stack Developer and AI Enthusiast from Karachi, Pakistan. He's completed his ADP in Computer Information Systems and is currently part of the Governor Sindh IT Initiative (Panaverse Program). He specializes in Next.js, TypeScript, Prisma, and AI integrations!"

    elif any(word in message_lower for word in ["project", "work", "portfolio"]):
        return "Rameez has built several impressive projects including:\n\n1. **AuthApp Sage** - Full-stack authentication with OAuth\n2. **Color Guessing Game** - Interactive RGB matching game\n3. **Agentic AI Bot** - Experimental AI agent\n\nVisit the Projects section to learn more!"

    elif any(word in message_lower for word in ["skill", "tech", "stack", "technology"]):
        return "Rameez is skilled in:\n\n**Frontend:** Next.js, TypeScript, React, Tailwind CSS\n**Backend:** Express.js, Prisma, PostgreSQL\n**AI:** Python, OpenAI SDK, Gemini API\n**Tools:** Git, Vercel, Supabase\n\nHe's passionate about building intelligent, scalable applications!"

    elif any(word in message_lower for word in ["contact", "email", "reach", "linkedin"]):
        return "You can reach Rameez at:\n\n📧 Email: rameezbaderkhwaja@gmail.com\n💼 LinkedIn: linkedin.com/in/rameezbaderkhwaja\n🐙 GitHub: github.com/RameezBader\n\nOr use the Feedback form on this website!"

    elif any(word in message_lower for word in ["hire", "job", "work", "opportunity", "recruit"]):
        return "Great! Rameez is open to opportunities. He's looking for roles in Full-Stack Development and AI Engineering. You can reach him via email at rameezbaderkhwaja@gmail.com or connect on LinkedIn. Feel free to leave a detailed message in the Feedback section!"

    else:
        return f"I received your message: '{user_message}'. I can help you learn about Rameez, his projects, skills, or how to contact him. What would you like to know?"

@app.post('/chat', response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        user_message = req.message.strip()

        if not user_message:
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # If Gemini API is available, use it
        if model:
            try:
                prompt = f"{RAMEEZ_CONTEXT}\n\nUser: {user_message}\n\nRameezBot:"
                response = model.generate_content(prompt)
                reply = response.text.strip()
                return ChatResponse(reply=reply)
            except Exception as e:
                print(f"Gemini API error: {e}")
                # Fall through to fallback

        # Use fallback response
        reply = get_fallback_response(user_message)
        return ChatResponse(reply=reply)

    except HTTPException:
        raise
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get('/')
async def root():
    return {
        "status": "RameezBot is running!",
        "gemini_enabled": GEMINI_API_KEY is not None,
        "message": "Send POST requests to /chat with JSON body: {'message': 'your message'}"
    }

@app.get('/health')
async def health():
    return {"status": "healthy", "gemini_api": "configured" if GEMINI_API_KEY else "not configured"}
