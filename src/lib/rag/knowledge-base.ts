import { supabase } from "@/lib/supabase/client"
import { generateEmbedding, findMostSimilar, parseEmbedding, stringifyEmbedding } from "@/lib/ai/embeddings"

export interface KnowledgeItem {
  id: string
  content: string
  embedding?: string
  category?: string
  metadata?: string
  created_at: Date
  updated_at: Date
}

export interface RetrievedContext {
  content: string
  similarity: number
  category?: string
}

/**
 * Initialize knowledge base with portfolio information
 */
export async function initializeKnowledgeBase() {
  const knowledgeItems = [
    {
      content: "Rameez Bader Khwaja is a Full-Stack Developer and AI enthusiast from Karachi, Pakistan. He specializes in Next.js, TypeScript, React, and AI-driven technologies.",
      category: "about",
    },
    {
      content: "Rameez has completed ADP in Computer Information Systems from Hamdard University, focusing on Programming, Software Development, Data Management, and Computer Systems Architecture.",
      category: "education",
    },
    {
      content: "Rameez is part of the Governor Sindh IT Initiative (Panaverse Program), learning TypeScript, Next.js, Python, Node.js, and Agentic AI.",
      category: "education",
    },
    {
      content: "Technical skills include: Next.js, TypeScript, React, Tailwind CSS, Framer Motion (frontend); Node.js, Express.js, Prisma, PostgreSQL, REST APIs (backend); Python, OpenAI SDK, Gemini API, FastAPI, Agentic AI (AI & DevOps); Git, GitHub, Vercel, Supabase, Passport.js, ShadCN UI (tools).",
      category: "skills",
    },
    {
      content: "Notable projects include AuthApp Sage (authentication system with OAuth), RameezBot (AI chatbot), and full-stack applications with Next.js, Express, Prisma, and PostgreSQL.",
      category: "projects",
    },
    {
      content: "Rameez's hobbies include building interactive UIs, exploring Agentic AI with OpenAI and Gemini APIs, working with Express.js and databases, cloud deployments, cybersecurity, and learning new frameworks.",
      category: "interests",
    },
    {
      content: "Contact information: Email is rameezbaderkhwaja@gmail.com, GitHub is github.com/RameezBader, LinkedIn is linkedin.com/in/rameezbaderkhwaja, located in Karachi, Pakistan.",
      category: "contact",
    },
    {
      content: "Rameez's goal is to become an AI-first Full Stack Engineer capable of developing intelligent, scalable, and interactive applications.",
      category: "goals",
    },
  ]

  for (const item of knowledgeItems) {
    // Generate embedding
    const embedding = await generateEmbedding(item.content)

    // Check if already exists
    const { data: existing } = await supabase
      .from("knowledge_base")
      .select("id")
      .eq("content", item.content)
      .single()

    if (!existing) {
      // Insert new knowledge
      await supabase.from("knowledge_base").insert({
        content: item.content,
        embedding: stringifyEmbedding(embedding),
        category: item.category,
      })
    }
  }

  console.log("Knowledge base initialized")
}

/**
 * Add new knowledge to the knowledge base
 */
export async function addKnowledge(
  content: string,
  category?: string,
  metadata?: Record<string, any>
): Promise<void> {
  const embedding = await generateEmbedding(content)

  await supabase.from("knowledge_base").insert({
    content,
    embedding: stringifyEmbedding(embedding),
    category,
    metadata: metadata ? JSON.stringify(metadata) : null,
  })
}

/**
 * Retrieve relevant context for a query using RAG
 */
export async function retrieveContext(
  query: string,
  topK: number = 3,
  threshold: number = 0.7
): Promise<RetrievedContext[]> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query)

    // Fetch all knowledge items from database
    const { data: knowledge, error } = await supabase
      .from("knowledge_base")
      .select("*")

    if (error || !knowledge) {
      console.error("Error fetching knowledge:", error)
      return []
    }

    // Parse embeddings and find similar items
    const candidates = knowledge
      .filter((item) => item.embedding)
      .map((item) => ({
        text: item.content,
        embedding: parseEmbedding(item.embedding!),
        metadata: {
          category: item.category,
          id: item.id,
        },
      }))

    const similar = findMostSimilar(queryEmbedding, candidates, topK, threshold)

    return similar.map((item) => ({
      content: item.text,
      similarity: item.similarity,
      category: item.metadata?.category,
    }))
  } catch (error) {
    console.error("Error retrieving context:", error)
    return []
  }
}

/**
 * Search chat history for similar conversations
 */
export async function searchChatHistory(
  query: string,
  topK: number = 3
): Promise<Array<{ userMessage: string; botReply: string; similarity: number }>> {
  try {
    const queryEmbedding = await generateEmbedding(query)

    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("user_message, bot_reply, embedding")
      .not("embedding", "is", null)
      .limit(100) // Limit to recent messages

    if (error || !messages) {
      return []
    }

    const candidates = messages.map((msg) => ({
      text: msg.user_message,
      embedding: parseEmbedding(msg.embedding!),
      metadata: {
        botReply: msg.bot_reply,
      },
    }))

    const similar = findMostSimilar(queryEmbedding, candidates, topK, 0.75)

    return similar.map((item) => ({
      userMessage: item.text,
      botReply: item.metadata?.botReply || "",
      similarity: item.similarity,
    }))
  } catch (error) {
    console.error("Error searching chat history:", error)
    return []
  }
}
