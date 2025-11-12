import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabase } from "@/lib/supabase/client"
import { getSession } from "@/lib/auth/jwt"

const projectUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  tech: z.array(z.string()).optional(),
  live: z.string().url().optional().or(z.literal("")),
  repo: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().optional(),
  displayOrder: z.number().optional(),
})

/**
 * PATCH update project (admin only)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const parsed = projectUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.errors },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (parsed.data.title) updateData.title = parsed.data.title
    if (parsed.data.description) updateData.description = parsed.data.description
    if (parsed.data.tech) updateData.tech = parsed.data.tech
    if (parsed.data.live !== undefined) updateData.live = parsed.data.live || null
    if (parsed.data.repo !== undefined) updateData.repo = parsed.data.repo || null
    if (parsed.data.imageUrl !== undefined) updateData.image_url = parsed.data.imageUrl || null
    if (parsed.data.featured !== undefined) updateData.featured = parsed.data.featured
    if (parsed.data.displayOrder !== undefined) updateData.display_order = parsed.data.displayOrder

    const { data, error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating project:", error)
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, project: data })
  } catch (error) {
    console.error("Project PATCH error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * DELETE project (admin only)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", params.id)

    if (error) {
      console.error("Error deleting project:", error)
      return NextResponse.json(
        { error: "Failed to delete project" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Project DELETE error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
