/**
 * Input sanitization utilities
 * Prevent XSS, SQL injection, and other security threats
 */

/**
 * Sanitize HTML string - remove all HTML tags
 */
export function sanitizeHTML(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

/**
 * Sanitize string for safe display
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== "string") {
    return ""
  }

  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>\"']/g, "") // Remove potentially dangerous characters
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._+-]/g, "")
}

/**
 * Sanitize URL - ensure it's a valid HTTP/HTTPS URL
 */
export function sanitizeURL(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString()
    }
    return null
  } catch {
    return null
  }
}

/**
 * Sanitize JSON string
 */
export function sanitizeJSON(input: string): string | null {
  try {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed)
  } catch {
    return null
  }
}

/**
 * Remove SQL injection patterns
 */
export function sanitizeSQL(input: string): string {
  return input.replace(/('|"|;|--|\*|\/\*|\*\/|xp_|sp_|DROP|DELETE|INSERT|UPDATE|SELECT|UNION)/gi, "")
}

/**
 * Validate and sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9+\-() ]/g, "")
}

/**
 * Comprehensive sanitization for user input
 */
export function sanitizeUserInput(input: string, options: {
  allowHTML?: boolean
  maxLength?: number
  type?: "text" | "email" | "url" | "phone"
} = {}): string {
  const {
    allowHTML = false,
    maxLength = 1000,
    type = "text",
  } = options

  if (typeof input !== "string") {
    return ""
  }

  let sanitized = input.trim()

  // Type-specific sanitization
  switch (type) {
    case "email":
      sanitized = sanitizeEmail(sanitized)
      break
    case "url":
      sanitized = sanitizeURL(sanitized) || ""
      break
    case "phone":
      sanitized = sanitizePhone(sanitized)
      break
    default:
      if (!allowHTML) {
        sanitized = sanitizeHTML(sanitized)
      }
  }

  // Apply length limit
  sanitized = sanitized.slice(0, maxLength)

  // Remove SQL injection patterns
  sanitized = sanitizeSQL(sanitized)

  return sanitized
}
