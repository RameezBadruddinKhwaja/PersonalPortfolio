import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabase } from "@/lib/supabase/client"
import { getSession } from "@/lib/auth/jwt"

const cmsSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  category: z.string().optional(),
  type: z.enum(["text", "markdown", "json", "image_url"]).optional().default("text"),
})

/**
 * GET all CMS content or by category
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    let query = supabase.from("cms_content").select("*")

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching CMS content:", error)
      return NextResponse.json(
        { error: "Failed to fetch CMS content" },
        { status: 500 }
      )
    }

    return NextResponse.json({ content: data || [] })
  } catch (error) {
    console.error("CMS GET error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * POST create or update CMS content (admin only)
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
    const parsed = cmsSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { key, value, category, type } = parsed.data

    // Upsert (insert or update if exists)
    const { data, error } = await supabase
      .from("cms_content")
      .upsert(
        {
          key,
          value,
          category: category || null,
          type: type || "text",
        },
        { onConflict: "key" }
      )
      .select()
      .single()

    if (error) {
      console.error("Error upserting CMS content:", error)
      return NextResponse.json(
        { error: "Failed to save CMS content" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, content: data })
  } catch (error) {
    console.error("CMS POST error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * DELETE CMS content (admin only)
 */
export async function DELETE(req: NextRequest) {
  try {
    // Check admin authentication
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const key = searchParams.get("key")

    if (!key) {
      return NextResponse.json(
        { error: "Key parameter required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("cms_content")
      .delete()
      .eq("key", key)

    if (error) {
      console.error("Error deleting CMS content:", error)
      return NextResponse.json(
        { error: "Failed to delete CMS content" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("CMS DELETE error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
