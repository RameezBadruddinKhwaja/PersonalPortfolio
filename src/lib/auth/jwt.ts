import { SignJWT, jwtVerify, type JWTPayload as JoseJWTPayload } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_EXPIRES_IN = "7d" // 7 days

// Convert secret to Uint8Array for jose
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET)

export interface JWTPayload extends JoseJWTPayload {
  userId: string
  email: string
  role: "admin" | "user"
}

export async function signToken(payload: Omit<JWTPayload, "iat" | "exp">): Promise<string> {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getSecretKey())

  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload as JWTPayload
  } catch (error) {
    console.error("JWT verification failed:", error)
    return null
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      return null
    }

    return verifyToken(token.value)
  } catch (error) {
    console.error("Get session failed:", error)
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

export function hashPassword(password: string): string {
  // For demo purposes - in production, use bcryptjs
  const bcrypt = require("bcryptjs")
  return bcrypt.hashSync(password, 10)
}

export function comparePassword(password: string, hash: string): boolean {
  const bcrypt = require("bcryptjs")
  return bcrypt.compareSync(password, hash)
}
