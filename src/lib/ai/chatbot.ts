import OpenAI from "openai"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { retrieveContext, searchChatHistory } from "@/lib/rag/knowledge-base"
import { generateEmbedding, stringifyEmbedding } from "@/lib/ai/embeddings"
import { supabase } from "@/lib/supabase/client"
import {
  isGreetingOrSmallTalk,
  handleGreeting,
  searchWebsiteData,
  generateWebsiteDataResponse
} from "@/lib/ai/smart-router"

// OpenAI SDK client (can be configured for different providers)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || "",
  // Use OpenAI-compatible endpoint for Gemini if using Google
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
})

// Fallback to Google Generative AI if no OpenAI key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export interface ChatResponse {
  reply: string
  context?: string[]
  sessionId?: string
}

// Determine which provider to use
const useOpenAI = Boolean(process.env.OPENAI_API_KEY)

/**
 * Generate AI response using RAG with OpenAI SDK or Gemini
 */
export async function generateRAGResponse(
  userMessage: string,
  sessionId?: string
): Promise<ChatResponse> {
  try {
    // LAYER 1: Handle greetings and small talk (no RAG needed)
    if (isGreetingOrSmallTalk(userMessage)) {
      const reply = await handleGreeting(userMessage)
      return {
        reply,
        context: ["greeting"],
        sessionId,
      }
    }

    // LAYER 2: Search website data first (fast, no embeddings needed)
    const websiteData = searchWebsiteData(userMessage)
    if (websiteData) {
      const reply = await generateWebsiteDataResponse(userMessage, websiteData)

      // Store in database
      if (sessionId) {
        await supabase.from("chat_messages").insert({
          session_id: sessionId,
          user_message: userMessage,
          bot_reply: reply,
          embedding: null,
          context_used: "website_data",
        })
      }

      return {
        reply,
        context: ["website_data"],
        sessionId,
      }
    }

    // LAYER 3: Use full RAG for complex questions
    // Step 1: Retrieve relevant context from knowledge base
    const contexts = await retrieveContext(userMessage, 3, 0.7)

    // Step 2: Search similar past conversations
    const similarChats = await searchChatHistory(userMessage, 2)

    // Step 3: Build context string
    const contextStr = contexts.map((ctx) => ctx.content).join("\n\n")
    const chatHistoryStr = similarChats
      .map((chat) => `User: ${chat.userMessage}\nBot: ${chat.botReply}`)
      .join("\n\n")

    // Step 4: Create system prompt and messages
    const systemPrompt = `You are RameezBot, an AI assistant for Rameez Bader Khwaja's portfolio website.

Context from knowledge base:
${contextStr || "No specific context found."}

${chatHistoryStr ? `Similar past conversations:\n${chatHistoryStr}\n` : ""}

Instructions:
- Answer based on the context provided above
- Be friendly, professional, and helpful
- If you don't know something from the context, say so honestly
- Keep responses concise (2-3 paragraphs max)
- Use the information from past conversations if relevant
- Maintain Rameez's voice and personality`

    let reply: string

    // Step 5: Generate response using OpenAI SDK or Gemini
    if (useOpenAI) {
      // Use OpenAI SDK (works with OpenAI, Azure, or any OpenAI-compatible API)
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
      reply = completion.choices[0]?.message?.content || ""
    } else {
      // Fallback to Gemini
      const prompt = `${systemPrompt}\n\nUser question: ${userMessage}\n\nYour response:`
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const result = await model.generateContent(prompt)
      const response = result.response
      reply = response.text()
    }

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
