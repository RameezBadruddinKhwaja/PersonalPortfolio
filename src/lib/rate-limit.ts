import { NextRequest } from "next/server"

// Simple in-memory rate limiter
// For production with multiple instances, use Upstash Redis

interface RateLimitEntry {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  interval: number // in milliseconds
  maxRequests: number
}

export const rateLimitConfigs = {
  feedback: { interval: 15 * 60 * 1000, maxRequests: 3 }, // 3 per 15 min
  chatbot: { interval: 60 * 1000, maxRequests: 20 }, // 20 per minute
  login: { interval: 10 * 60 * 1000, maxRequests: 5 }, // 5 per 10 min
  api: { interval: 60 * 1000, maxRequests: 60 }, // 60 per minute
}

export function getRateLimitKey(request: NextRequest, identifier: string): string {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous"
  return `${ip}:${identifier}`
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now()
  const entry = store.get(key)

  // No entry or expired
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.interval
    store.set(key, { count: 1, resetTime })

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: resetTime,
    }
  }

  // Entry exists and not expired
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: entry.resetTime,
    }
  }

  // Increment count
  entry.count++
  store.set(key, entry)

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    reset: entry.resetTime,
  }
}

// Helper function to create rate limit response
export function rateLimitResponse(reset: number) {
  const retryAfter = Math.ceil((reset - Date.now()) / 1000)

  return new Response(
    JSON.stringify({
      error: "Too many requests",
      message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
        "X-RateLimit-Reset": new Date(reset).toISOString(),
      },
    }
  )
}

// Optional: Upstash Redis rate limiter (if configured)
export async function checkRateLimitRedis(key: string, config: RateLimitConfig) {
  // Check if Upstash is configured
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!upstashUrl || !upstashToken) {
    // Fall back to in-memory
    return checkRateLimit(key, config)
  }

  try {
    // Use Upstash Redis REST API
    const response = await fetch(`${upstashUrl}/incr/${key}`, {
      headers: {
        Authorization: `Bearer ${upstashToken}`,
      },
    })

    const data = await response.json()
    const count = data.result

    if (count === 1) {
      // Set expiration
      await fetch(`${upstashUrl}/expire/${key}/${Math.ceil(config.interval / 1000)}`, {
        headers: {
          Authorization: `Bearer ${upstashToken}`,
        },
      })
    }

    const remaining = Math.max(0, config.maxRequests - count)
    const reset = Date.now() + config.interval

    return {
      success: count <= config.maxRequests,
      limit: config.maxRequests,
      remaining,
      reset,
    }
  } catch (error) {
    console.error("Redis rate limit error:", error)
    // Fall back to in-memory
    return checkRateLimit(key, config)
  }
}
