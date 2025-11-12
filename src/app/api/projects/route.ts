import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabase } from "@/lib/supabase/client"
import { getSession } from "@/lib/auth/jwt"

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()),
  live: z.string().url().optional().or(z.literal("")),
  repo: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional(),
})

/**
 * GET all projects
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      return NextResponse.json(
        { error: "Failed to fetch projects" },
        { status: 500 }
      )
    }

    return NextResponse.json({ projects: data || [] })
  } catch (error) {
    console.error("Projects GET error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * POST create new project (admin only)
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
    const parsed = projectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.errors },
        { status: 400 }
      )
    }

    const { title, description, tech, live, repo, imageUrl, featured, displayOrder } = parsed.data

    const { data, error } = await supabase
      .from("projects")
      .insert({
        title,
        description,
        tech,
        live: live || null,
        repo: repo || null,
        image_url: imageUrl || null,
        featured: featured || false,
        display_order: displayOrder || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return NextResponse.json(
        { error: "Failed to create project" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, project: data },
      { status: 201 }
    )
  } catch (error) {
    console.error("Projects POST error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
