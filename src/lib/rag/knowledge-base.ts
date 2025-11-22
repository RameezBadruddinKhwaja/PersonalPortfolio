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
      content: "Rameez Bader Khwaja is a passionate Spec Driven Developer and AI enthusiast with specialization in CyberSecurity also from Karachi, Pakistan. He focuses on building scalable, intelligent, and visually interactive web applications combining modern frameworks with artificial intelligence.",
      category: "about",
    },
    {
      content: "Rameez has completed an Associate Degree in Computer Information Systems (ADP-CIS) from Hamdard University, majoring in Programming and Software Development, Data Management and Communication, and Computer Systems Architecture. And is currently enrolled in BS Lateral in Computer Science pursuing this degree from virtual university.",
      category: "education",
    },
    {
      content: "He is currently enrolled in the Governor Sindh IT Initiative, where he is studying TypeScript, Next.js, Node.js, Python, Agentic AI, Spec driven Development, prompt engineering and advanced full-stack concepts with real-world projects.",
      category: "programs",
    },
    {
      content: "His technical expertise includes: Frontend - Next.js, React, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion, Three.js. Backend - Node.js, Express.js, Prisma, PostgreSQL, REST APIs. AI & Automation - Python, OpenAI SDK, Gemini API, Agentic AI. Tools & Deployment - Git, GitHub, Vercel, Supabase, Passport.js, Cloudinary, Docker, CI/CD.",
      category: "skills",
    },
    {
      content: "Rameez has built multiple projects showcasing full-stack and AI integration: AuthApp Sage - A secure authentication system with Google/GitHub OAuth, Cloudinary uploads, Prisma ORM, and CSRF protection deployed on Vercel. RameezBot - An intelligent portfolio chatbot powered by Gemini API, capable of contextual replies and learning from feedback. Interactive Portfolio - A modern developer portfolio using Next.js, TypeScript, ShadCN, and Three.js with admin-controlled CMS and dynamic content. Color Guessing Game - A JavaScript-based color challenge game built with Tailwind CSS and RGB logic. Agentic AI Prototypes - Experiments with AI agents, RAG, and multi-model reasoning built during Panaverse training.",
      category: "projects",
    },
    {
      content: "Rameez enjoys developing interactive UIs, working on AI automation, and experimenting with intelligent systems that learn from user feedback. He is also interested in cybersecurity, cloud platforms, and scalable backend systems.",
      category: "interests",
    },
    {
      content: "His long-term goal is to become an AI-first Full Stack Engineer, combining strong backend logic with intelligent automation, data-driven design, and secure scalable infrastructure. He aims to build solutions that benefit people, align with ethical AI principles, and reflect excellence in both design and performance.",
      category: "goals",
    },
    {
      content: "Rameez believes in discipline, faith, and purpose-driven development. His motivation comes from contributing positively to society, creating technology that serves people, and using his skills in a way that aligns with his faith and values.",
      category: "values",
    },
    {
      content: "Rameez is calm, analytical, and mission-focused. He prefers simplicity in design, clarity in logic, and meaningful collaboration. He constantly learns, plans deeply before coding, and loves building systems that feel alive.",
      category: "personality",
    },
    {
      content: "Contact information: Email is rameezbader@gmail.com, GitHub is github.com/RameezBadruddinKhwaja, LinkedIn is linkedin.com/in/rameezbaderkhwaja at https://www.linkedin.com/in/rameez-badruddin-khwaja-7b2277256/, located in Karachi, Pakistan.",
      category: "contact",
    },
    {
      content: "Rameez has successfully built and deployed a full-stack authentication system with real-time dashboard analytics, developed intelligent agents using the Gemini API, and mastered modern web frameworks including Next.js and TypeScript. His portfolio projects demonstrate not only coding skill but also strong system design, security awareness, and modern UI/UX integration.",
      category: "achievements",
    },
    {
      content: "Rameez's portfolio website serves as a fusion of AI and modern full-stack engineering. It demonstrates his ability to design, architect, and deploy scalable systems with smooth UI/UX, secure backend logic, and adaptive AI capabilities — reflecting real professional-grade work rather than simple showcase sites.",
      category: "portfolio_summary",
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
