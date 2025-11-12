import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateRAGResponse, getOrCreateSession } from "@/lib/ai/chatbot"
import { checkRateLimit, getRateLimitKey, rateLimitConfigs, rateLimitResponse } from "@/lib/rate-limit"

const chatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000),
  sessionId: z.string().optional(),
  useRAG: z.boolean().optional().default(true), // Use RAG by default
})

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - 20 requests per minute
    const rateLimitKey = getRateLimitKey(req, "chatbot")
    const rateLimit = checkRateLimit(rateLimitKey, rateLimitConfigs.chatbot)

    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit.reset)
    }

    const data = await req.json()
    const parsed = chatSchema.parse(data)

    // Try RAG-enhanced chatbot first
    if (parsed.useRAG) {
      try {
        // Get or create session
        const userIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
        const userAgent = req.headers.get("user-agent") || "unknown"
        const activeSessionId = await getOrCreateSession(parsed.sessionId, userIp, userAgent)

        // Generate RAG-enhanced response
        const ragResponse = await generateRAGResponse(parsed.message, activeSessionId)

        return NextResponse.json(
          {
            reply: ragResponse.reply,
            sessionId: activeSessionId,
            contextUsed: ragResponse.context && ragResponse.context.length > 0,
            method: "rag",
          },
          {
            status: 200,
            headers: {
              "X-RateLimit-Limit": String(rateLimit.limit),
              "X-RateLimit-Remaining": String(rateLimit.remaining),
              "X-RateLimit-Reset": new Date(rateLimit.reset).toISOString(),
            },
          }
        )
      } catch (ragError) {
        console.error("RAG error, falling back to Python bot:", ragError)
        // Fall through to Python bot fallback
      }
    }

    // Fallback to Python FastAPI backend
    const botUrl = process.env.NEXT_PUBLIC_AI_BOT_URL || "http://localhost:8000"

    try {
      const response = await fetch(`${botUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: parsed.message }),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      if (!response.ok) {
        throw new Error("Python bot request failed")
      }

      const botData = await response.json()

      return NextResponse.json(
        {
          reply: botData.reply,
          method: "python-bot",
        },
        {
          status: 200,
          headers: {
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": new Date(rateLimit.reset).toISOString(),
          },
        }
      )
    } catch (pythonError) {
      console.error("Python bot also failed:", pythonError)
      // Return generic fallback
      return NextResponse.json(
        {
          reply: "Hello! I'm RameezBot. I'm currently experiencing technical difficulties, but I'm here to help! You can reach Rameez directly at rameezbaderkhwaja@gmail.com or connect on LinkedIn.",
          method: "fallback",
        },
        { status: 200 }
      )
    }
  } catch (err) {
    console.error("Chat API error:", err)

    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 })
    }

    // Fallback response when AI bot is unavailable
    return NextResponse.json(
      {
        reply: "Hello! I'm RameezBot. I'm currently offline, but Rameez will get back to you soon. Feel free to leave a message in the feedback form!"
      },
      { status: 200 }
    )
  }
}
