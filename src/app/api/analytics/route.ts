import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabase } from "@/lib/supabase/client"
import { getSession } from "@/lib/auth/jwt"

const analyticsSchema = z.object({
  page: z.string(),
  referrer: z.string().optional(),
})

/**
 * POST track page visit
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = analyticsSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      )
    }

    const { page, referrer } = parsed.data

    // Get analytics data from headers
    const userAgent = req.headers.get("user-agent") || "unknown"
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"

    // Simple device detection
    let device = "desktop"
    if (userAgent.toLowerCase().includes("mobile")) {
      device = "mobile"
    } else if (userAgent.toLowerCase().includes("tablet")) {
      device = "tablet"
    }

    // Track the visit
    const { error } = await supabase.from("analytics").insert({
      page,
      referrer: referrer || null,
      user_agent: userAgent,
      ip_address: ipAddress,
      device,
    })

    if (error) {
      console.error("Error tracking analytics:", error)
      // Don't return error to client - tracking failure shouldn't break UX
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics POST error:", error)
    return NextResponse.json({ success: true }) // Always return success for tracking
  }
}

/**
 * GET analytics data (admin only)
 */
export async function GET(req: NextRequest) {
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
    const page = searchParams.get("page")
    const days = parseInt(searchParams.get("days") || "30")

    // Calculate date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    let query = supabase
      .from("analytics")
      .select("*")
      .gte("timestamp", startDate.toISOString())
      .order("timestamp", { ascending: false })

    if (page) {
      query = query.eq("page", page)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching analytics:", error)
      return NextResponse.json(
        { error: "Failed to fetch analytics" },
        { status: 500 }
      )
    }

    // Calculate stats
    const totalViews = data?.length || 0
    const uniquePages = new Set(data?.map((d) => d.page)).size
    const deviceBreakdown = data?.reduce((acc: any, d) => {
      acc[d.device] = (acc[d.device] || 0) + 1
      return acc
    }, {})

    return NextResponse.json({
      totalViews,
      uniquePages,
      deviceBreakdown,
      data: data || [],
    })
  } catch (error) {
    console.error("Analytics GET error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
