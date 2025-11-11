import { NextResponse } from "next/server"
import { z } from "zod"
import { supabase } from "@/lib/supabase/client"

const feedbackSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  profession: z.string().optional(),
  country: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const parsed = feedbackSchema.parse(data)

    const { data: inserted, error } = await supabase
      .from("feedbacks")
      .insert({
        name: parsed.name,
        email: parsed.email,
        profession: parsed.profession || null,
        country: parsed.country || null,
        linkedin: parsed.linkedin || null,
        message: parsed.message,
      })
      .select()

    if (error) {
      console.error(error)
      return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 })
    }

    return NextResponse.json({ success: true, feedback: inserted }, { status: 201 })
  } catch (err) {
    console.error(err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
