"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  profession: z.string().optional(),
  message: z.string().min(10),
})

export default function FeedbackPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", profession: "", message: "" })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      formSchema.parse(form)
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Collect readable messages
        const messages = err.issues.map((issue) => issue.message)
        setError(messages.join(', '))
        return
      }
      setError('Invalid input')
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to submit")
        setLoading(false)
        return
      }

      // success
      setLoading(false)
      router.push("/thank-you")
    } catch (err) {
      setError("Network error")
      setLoading(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-4">Feedback</h1>
      <p className="text-muted-foreground mb-6">
        I'd love to hear from you. Please leave your message and I'll get back to you.
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Occupation / Company</label>
          <input
            value={form.profession}
            onChange={(e) => setForm({ ...form, profession: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            rows={6}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Feedback"}
          </button>
        </div>
      </form>
    </div>
  )
}