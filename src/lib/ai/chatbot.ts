import { GoogleGenerativeAI } from "@google/generative-ai"
import { retrieveContext, searchChatHistory } from "@/lib/rag/knowledge-base"
import { generateEmbedding, stringifyEmbedding } from "@/lib/ai/embeddings"
import { supabase } from "@/lib/supabase/client"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export interface ChatResponse {
  reply: string
  context?: string[]
  sessionId?: string
}

/**
 * Generate AI response using RAG
 */
export async function generateRAGResponse(
  userMessage: string,
  sessionId?: string
): Promise<ChatResponse> {
  try {
    // Step 1: Retrieve relevant context from knowledge base
    const contexts = await retrieveContext(userMessage, 3, 0.7)

    // Step 2: Search similar past conversations
    const similarChats = await searchChatHistory(userMessage, 2)

    // Step 3: Build context string
    const contextStr = contexts.map((ctx) => ctx.content).join("\n\n")
    const chatHistoryStr = similarChats
      .map((chat) => `User: ${chat.userMessage}\nBot: ${chat.botReply}`)
      .join("\n\n")

    // Step 4: Create enhanced prompt with context
    const prompt = `You are RameezBot, an AI assistant for Rameez Bader Khwaja's portfolio website.

Context from knowledge base:
${contextStr || "No specific context found."}

${chatHistoryStr ? `Similar past conversations:\n${chatHistoryStr}\n` : ""}

User question: ${userMessage}

Instructions:
- Answer based on the context provided above
- Be friendly, professional, and helpful
- If you don't know something from the context, say so honestly
- Keep responses concise (2-3 paragraphs max)
- Use the information from past conversations if relevant
- Maintain Rameez's voice and personality

Your response:`

    // Step 5: Generate response using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = result.response
    const reply = response.text()

    // Step 6: Generate embedding for this conversation
    const embedding = await generateEmbedding(userMessage)

    // Step 7: Store in database
    if (sessionId) {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        user_message: userMessage,
        bot_reply: reply,
        embedding: stringifyEmbedding(embedding),
        context_used: contextStr || null,
      })
    }

    return {
      reply,
      context: contexts.map((ctx) => ctx.content),
      sessionId,
    }
  } catch (error) {
    console.error("Error generating RAG response:", error)

    // Fallback response
    return {
      reply: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment or contact Rameez directly at rameezbaderkhwaja@gmail.com.",
      context: [],
      sessionId,
    }
  }
}

/**
 * Create or get chat session
 */
export async function getOrCreateSession(
  sessionId?: string,
  userIp?: string,
  userAgent?: string
): Promise<string> {
  if (sessionId) {
    // Check if session exists
    const { data } = await supabase
      .from("chat_sessions")
      .select("session_id")
      .eq("session_id", sessionId)
      .single()

    if (data) {
      return sessionId
    }
  }

  // Create new session
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

  await supabase.from("chat_sessions").insert({
    session_id: newSessionId,
    user_ip: userIp || null,
    user_agent: userAgent || null,
  })

  return newSessionId
}

/**
 * End a chat session
 */
export async function endSession(sessionId: string): Promise<void> {
  await supabase
    .from("chat_sessions")
    .update({ ended_at: new Date().toISOString() })
    .eq("session_id", sessionId)
}

/**
 * Get session chat history
 */
export async function getSessionHistory(sessionId: string) {
  const { data } = await supabase
    .from("chat_messages")
    .select("user_message, bot_reply, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })

  return data || []
}
