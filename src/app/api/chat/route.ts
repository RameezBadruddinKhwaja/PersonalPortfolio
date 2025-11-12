import { NextResponse } from "next/server"
import { z } from "zod"

const chatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const parsed = chatSchema.parse(data)

    // Get AI bot URL from environment or use fallback
    const botUrl = process.env.NEXT_PUBLIC_AI_BOT_URL || "http://localhost:8000"

    // Call the Python FastAPI backend
    const response = await fetch(`${botUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: parsed.message }),
    })

    if (!response.ok) {
      console.error("AI bot request failed:", response.statusText)
      return NextResponse.json(
        {
          reply: "Sorry, I'm having trouble connecting right now. Please try again later!"
        },
        { status: 200 }
      )
    }

    const botData = await response.json()

    // Optionally: Store chat message in database for analytics
    // const { data: inserted, error } = await supabase
    //   .from("chat_messages")
    //   .insert({
    //     user_message: parsed.message,
    //     bot_reply: botData.reply,
    //   })

    return NextResponse.json({ reply: botData.reply }, { status: 200 })
  } catch (err) {
    console.error("Chat API error:", err)

    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
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
