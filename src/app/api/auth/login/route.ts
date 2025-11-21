import { NextResponse } from "next/server"
import { signToken, setAuthCookie, comparePassword, hashPassword } from "@/lib/auth/jwt"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Demo admin credentials - In production, store in database with hashed passwords
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@rameez.dev"
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || hashPassword("admin123")

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    // Check credentials
    if (email !== ADMIN_EMAIL || !comparePassword(password, ADMIN_PASSWORD_HASH)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = signToken({
      userId: "admin-1",
      email: email,
      role: "admin",
    })

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        email: email,
        role: "admin",
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
