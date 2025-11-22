/**
 * Script to initialize knowledge base
 * Run this once to populate the database
 */

import { initializeKnowledgeBase, addKnowledge } from '@/lib/rag/knowledge-base'

async function main() {
  console.log('🚀 Initializing knowledge base...')

  try {
    // Initialize with default knowledge
    await initializeKnowledgeBase()

    // Add custom knowledge (optional)
    await addKnowledge(
      "Rameez is also learning about cloud computing and DevOps practices.",
      "skills"
    )

    await addKnowledge(
      "Rameez believes in continuous learning and staying updated with latest tech trends.",
      "about"
    )

    console.log('✅ Knowledge base initialized successfully!')
    console.log('You can now use the chatbot with full context about Rameez.')

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// Run the script
main()

/**
 * To run this script:
 * 1. Make sure Supabase is configured (.env.local)
 * 2. Make sure Gemini API key is set
 * 3. Run: npx tsx scripts/init-knowledge-base.ts
 */
