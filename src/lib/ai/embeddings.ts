import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export interface Embedding {
  values: number[]
  text: string
}

/**
 * Generate embedding for a single text using Gemini
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "embedding-001" })

    const result = await model.embedContent(text)
    const embedding = result.embedding

    return embedding.values
  } catch (error) {
    console.error("Error generating embedding:", error)
    throw new Error("Failed to generate embedding")
  }
}

/**
 * Generate embeddings for multiple texts
 */
export async function generateEmbeddings(texts: string[]): Promise<Embedding[]> {
  const embeddings = await Promise.all(
    texts.map(async (text) => {
      const values = await generateEmbedding(text)
      return { values, text }
    })
  )

  return embeddings
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length")
  }

  let dotProduct = 0
  let magnitudeA = 0
  let magnitudeB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    magnitudeA += a[i] * a[i]
    magnitudeB += b[i] * b[i]
  }

  magnitudeA = Math.sqrt(magnitudeA)
  magnitudeB = Math.sqrt(magnitudeB)

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }

  return dotProduct / (magnitudeA * magnitudeB)
}

/**
 * Find most similar texts to a query embedding
 */
export function findMostSimilar(
  queryEmbedding: number[],
  candidates: { embedding: number[]; text: string; metadata?: any }[],
  topK: number = 3,
  threshold: number = 0.7
): Array<{ text: string; similarity: number; metadata?: any }> {
  const similarities = candidates.map((candidate) => ({
    text: candidate.text,
    similarity: cosineSimilarity(queryEmbedding, candidate.embedding),
    metadata: candidate.metadata,
  }))

  return similarities
    .filter((item) => item.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
}

/**
 * Parse embedding from JSON string (for database storage)
 */
export function parseEmbedding(embeddingStr: string): number[] {
  try {
    return JSON.parse(embeddingStr)
  } catch (error) {
    console.error("Error parsing embedding:", error)
    return []
  }
}

/**
 * Stringify embedding for JSON storage
 */
export function stringifyEmbedding(embedding: number[]): string {
  return JSON.stringify(embedding)
}
