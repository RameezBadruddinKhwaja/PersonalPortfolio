"use client"

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const ChatWindow = dynamic(() => import('./chat-window'), { ssr: false })

export function ChatButton() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="text-2xl">🤖</span>
      </motion.button>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  )
}