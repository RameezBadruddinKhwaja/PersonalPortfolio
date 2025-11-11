"use client"

import { useState } from 'react'

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input) return
    setMessages((m) => [...m, { from: 'user', text: input }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { from: 'bot', text: data.reply }])
    } catch (err) {
      setMessages((m) => [...m, { from: 'bot', text: 'Error connecting to bot' }])
    }
    setLoading(false)
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-[320px] rounded-lg border bg-white p-4 shadow-lg dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">RameezBot</h3>
        <button onClick={onClose} aria-label="Close chat">✕</button>
      </div>

      <div className="mt-3 h-48 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'user' ? 'text-right' : ''}>
            <div className={m.from === 'user' ? 'inline-block rounded bg-blue-600 text-white px-3 py-1' : 'inline-block rounded bg-gray-100 px-3 py-1 dark:bg-slate-800'}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-md border px-3 py-2" />
        <button onClick={send} className="rounded-md bg-blue-600 px-3 py-2 text-white" disabled={loading}>{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  )
}