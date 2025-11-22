/**
 * Smart routing for chatbot queries
 * Layer 1: Greetings/Small talk → Direct Gemini
 * Layer 2: Portfolio questions → Website data
 * Layer 3: Complex questions → RAG
 */

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Greeting patterns
const GREETING_PATTERNS = [
  /^(hi|hello|hey|greetings|salam|assalam)/i,
  /^(good morning|good afternoon|good evening)/i,
  /^(how are you|what's up|whats up|sup)/i,
  /^(thanks|thank you|thx)/i,
  /^(bye|goodbye|see you|later)/i,
]

// Small talk patterns
const SMALL_TALK_PATTERNS = [
  /^(who are you|what is your name|your name)/i,
  /^(how do you work|what can you do)/i,
  /^(tell me a joke|make me laugh)/i,
  /^(how's the weather|what time is it)/i,
]

/**
 * Check if message is a greeting or small talk
 */
export function isGreetingOrSmallTalk(message: string): boolean {
  const trimmed = message.trim()

  // Check greeting patterns
  for (const pattern of GREETING_PATTERNS) {
    if (pattern.test(trimmed)) return true
  }

  // Check small talk patterns
  for (const pattern of SMALL_TALK_PATTERNS) {
    if (pattern.test(trimmed)) return true
  }

  // Short messages (< 15 chars) are likely greetings
  if (trimmed.length < 15 && !trimmed.includes("?")) {
    return true
  }

  return false
}

/**
 * Handle greetings and small talk with Gemini
 */
export async function handleGreeting(message: string): Promise<string> {
  try {
    const prompt = `You are RameezBot, a friendly AI assistant for Rameez Bader Khwaja's portfolio.

User message: "${message}"

Respond in a friendly, casual way. Keep it short (1-2 sentences). You can:
- Greet them warmly
- Introduce yourself as RameezBot
- Offer to help with questions about Rameez's skills, projects, or background
- Keep it professional but friendly

Your response:`

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Greeting handler error:", error)
    return "Hi! I'm RameezBot 👋 I'm here to help you learn about Rameez's skills, projects, and experience. What would you like to know?"
  }
}

/**
 * Extract portfolio data from website structure
 */
export function extractWebsiteData(): Record<string, any> {
  return {
    about: {
      name: "Rameez Bader Khwaja",
      title: "Full-Stack Developer & AI Enthusiast",
      location: "Karachi, Pakistan",
      bio: "Passionate about building modern web applications with Next.js, TypeScript, and AI integration. Currently part of Governor Sindh IT Initiative (Panaverse Program).",
    },

    education: [
      {
        degree: "ADP in Computer Information Systems",
        institution: "Hamdard University",
        focus: ["Programming", "Software Development", "Data Management", "Computer Systems Architecture"],
      },
      {
        program: "Governor Sindh IT Initiative (Panaverse Program)",
        learning: ["TypeScript", "Next.js", "Python", "Node.js", "Agentic AI"],
      },
    ],

    skills: {
      frontend: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express.js", "Prisma", "PostgreSQL", "REST APIs"],
      aiDevOps: ["Python", "OpenAI SDK", "Gemini API", "FastAPI", "Agentic AI"],
      tools: ["Git", "GitHub", "Vercel", "Supabase", "Passport.js", "ShadCN UI"],
    },

    projects: [
      {
        name: "AuthApp Sage",
        description: "Modern authentication system with OAuth integration",
        tech: ["Next.js", "TypeScript", "Supabase", "OAuth"],
      },
      {
        name: "RameezBot",
        description: "AI-powered chatbot with RAG (Retrieval Augmented Generation)",
        tech: ["Gemini API", "Vector Embeddings", "Next.js"],
      },
      {
        name: "Full-Stack Applications",
        description: "Enterprise-level apps with complete CRUD operations",
        tech: ["Next.js", "Express", "Prisma", "PostgreSQL"],
      },
    ],

    interests: [
      "Building interactive UIs",
      "Exploring Agentic AI with OpenAI and Gemini APIs",
      "Working with Express.js and databases",
      "Cloud deployments",
      "Cybersecurity",
      "Learning new frameworks",
    ],

    contact: {
      email: "rameezbaderkhwaja@gmail.com",
      github: "github.com/RameezBadruddinKhwaja",
      linkedin: "linkedin.com/in/rameezbaderkhwaja",
    },
  }
}

/**
 * Search website data for relevant information
 */
export function searchWebsiteData(query: string): string | null {
  const data = extractWebsiteData()
  const lowerQuery = query.toLowerCase()

  // Skills query
  if (lowerQuery.includes("skill") || lowerQuery.includes("technology") || lowerQuery.includes("tech stack")) {
    const allSkills = [
      ...data.skills.frontend,
      ...data.skills.backend,
      ...data.skills.aiDevOps,
      ...data.skills.tools,
    ]
    return `Rameez's technical skills include:\n\n` +
      `**Frontend:** ${data.skills.frontend.join(", ")}\n` +
      `**Backend:** ${data.skills.backend.join(", ")}\n` +
      `**AI & DevOps:** ${data.skills.aiDevOps.join(", ")}\n` +
      `**Tools:** ${data.skills.tools.join(", ")}`
  }

  // Projects query
  if (lowerQuery.includes("project") || lowerQuery.includes("built") || lowerQuery.includes("work")) {
    return `Rameez's notable projects:\n\n` +
      data.projects.map((p, i) =>
        `${i + 1}. **${p.name}**: ${p.description}\n   Tech: ${p.tech.join(", ")}`
      ).join("\n\n")
  }

  // Education query
  if (lowerQuery.includes("education") || lowerQuery.includes("study") || lowerQuery.includes("degree")) {
    return `Rameez's education:\n\n` +
      `• ${data.education[0].degree} from ${data.education[0].institution}\n` +
      `  Focus: ${data.education[0].focus.join(", ")}\n\n` +
      `• ${data.education[1].program}\n` +
      `  Learning: ${data.education[1].learning.join(", ")}`
  }

  // About query
  if (lowerQuery.includes("about") || lowerQuery.includes("who is") || lowerQuery.includes("tell me about")) {
    return `${data.about.name} is a ${data.about.title} based in ${data.about.location}.\n\n${data.about.bio}`
  }

  // Contact query
  if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("reach")) {
    return `You can reach Rameez at:\n\n` +
      `📧 Email: ${data.contact.email}\n` +
      `💼 LinkedIn: ${data.contact.linkedin}\n` +
      `🐙 GitHub: ${data.contact.github}`
  }

  // Interests/hobbies query
  if (lowerQuery.includes("hobby") || lowerQuery.includes("hobbies") || lowerQuery.includes("interest") || lowerQuery.includes("like to do")) {
    return `Rameez enjoys:\n• ${data.interests.join("\n• ")}`
  }

  return null
}

/**
 * Generate response using website data + Gemini
 */
export async function generateWebsiteDataResponse(query: string, websiteData: string): Promise<string> {
  try {
    const prompt = `You are RameezBot, helping users learn about Rameez Bader Khwaja.

Here's relevant information from the website:
${websiteData}

User question: "${query}"

Instructions:
- Answer based on the website data above
- Be concise (2-3 sentences)
- Be friendly and professional
- If the data doesn't fully answer the question, say so

Your response:`

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Website data response error:", error)
    return websiteData // Return raw data as fallback
  }
}
