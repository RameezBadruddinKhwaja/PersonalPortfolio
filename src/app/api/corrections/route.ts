import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabase } from "@/lib/supabase/client"
import { getSession } from "@/lib/auth/jwt"

const correctionSchema = z.object({
  wrongResponse: z.string().min(1),
  correctResponse: z.string().min(1),
  userFeedback: z.string().optional(),
  context: z.string().optional(),
})

/**
 * Submit AI correction - admin only
 */
export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parsed = correctionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.errors },
        { status: 400 }
      )
    }

    const { wrongResponse, correctResponse, userFeedback, context } = parsed.data

    // Store correction in database
    const { data, error } = await supabase
      .from("ai_corrections")
      .insert({
        wrong_response: wrongResponse,
        correct_response: correctResponse,
        user_feedback: userFeedback || null,
        context: context || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Error storing correction:", error)
      return NextResponse.json(
        { error: "Failed to store correction" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      correction: data,
    })
  } catch (error) {
    console.error("Corrections API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Get all corrections - admin only
 */
export async function GET() {
  try {
    // Check admin authentication
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from("ai_corrections")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching corrections:", error)
      return NextResponse.json(
        { error: "Failed to fetch corrections" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      corrections: data || [],
    })
  } catch (error) {
    console.error("Corrections API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
