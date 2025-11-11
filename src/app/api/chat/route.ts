import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Try to call local RameezBot FastAPI if available
    try {
      const res = await fetch(process.env.RAMEEZBOT_URL || 'http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      if (res.ok) {
        const data = await res.json()
        return NextResponse.json({ reply: data.reply })
      }
    } catch (err) {
      console.warn('RameezBot local not available', err)
    }

    // Fallback reply
    return NextResponse.json({ reply: `RameezBot (fallback): I heard: ${message}` })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
