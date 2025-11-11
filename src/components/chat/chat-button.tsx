"use client"

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ChatWindow = dynamic(() => import('./chat-window'), { ssr: false })

export function ChatButton() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
        aria-label="Open chat"
      >
        🤖
      </button>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  )
}