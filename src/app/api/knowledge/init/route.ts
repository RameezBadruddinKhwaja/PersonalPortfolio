import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/jwt"
import { initializeKnowledgeBase } from "@/lib/rag/knowledge-base"

/**
 * Initialize knowledge base with portfolio information
 * Protected route - admin only
 */
export async function POST() {
  try {
    // Check admin authentication
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    // Initialize knowledge base
    await initializeKnowledgeBase()

    return NextResponse.json({
      success: true,
      message: "Knowledge base initialized successfully",
    })
  } catch (error) {
    console.error("Knowledge base init error:", error)
    return NextResponse.json(
      { error: "Failed to initialize knowledge base" },
      { status: 500 }
    )
  }
}
