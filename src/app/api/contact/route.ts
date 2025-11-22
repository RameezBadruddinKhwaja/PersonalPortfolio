import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { checkRateLimit, getRateLimitKey, rateLimitConfigs, rateLimitResponse } from "@/lib/rate-limit"

// Initialize Resend only if API key is available
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }
  return new Resend(apiKey)
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - 3 requests per 15 minutes (same as feedback)
    const rateLimitKey = getRateLimitKey(req, "contact")
    const rateLimit = checkRateLimit(rateLimitKey, rateLimitConfigs.feedback)

    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit.reset)
    }

    const data = await req.json()
    const parsed = contactSchema.parse(data)

    // Get Resend client
    const resend = getResendClient()

    // Send email via Resend
    const emailData = await resend.emails.send({
      from: "Portfolio Contact <noreply@rameez.me>", // Will be updated after domain verification
      to: process.env.ADMIN_EMAIL || "rameezbader@gmail.com",
      replyTo: parsed.email,
      subject: parsed.subject || `New Contact from ${parsed.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${parsed.name}</p>
        <p><strong>Email:</strong> ${parsed.email}</p>
        <p><strong>Subject:</strong> ${parsed.subject || "No subject"}</p>
        <hr />
        <h3>Message:</h3>
        <p>${parsed.message.replace(/\n/g, "<br />")}</p>
        <hr />
        <p><em>Sent from rameez.me portfolio website</em></p>
      `,
    })

    if (emailData.error) {
      console.error("Resend error:", emailData.error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    // Return with rate limit headers
    return NextResponse.json(
      { success: true, messageId: emailData.data?.id },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": new Date(rateLimit.reset).toISOString(),
        },
      }
    )
  } catch (err) {
    console.error("Contact API error:", err)

    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
