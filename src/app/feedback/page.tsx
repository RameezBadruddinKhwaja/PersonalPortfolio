"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  profession: z.string().optional(),
  country: z.string().optional(),
  linkedin: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function FeedbackPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    profession: "",
    country: "",
    linkedin: "",
    message: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      formSchema.parse(form)
    } catch (err) {
      if (err instanceof z.ZodError) {
        const messages = err.issues.map((issue) => issue.message)
        setError(messages.join(", "))
        return
      }
      setError("Invalid input")
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground mb-2 max-w-2xl">
          I'd love to know what you think about my work.
        </p>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Whether you're a developer, recruiter, or fellow learner — your thoughts and
          suggestions help me improve and grow. Fill out the form below with your name,
          profession, and feedback.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Rameez Bader Khwaja"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="profession" className="block text-sm font-medium mb-2">
              Occupation / Organization
            </label>
            <input
              id="profession"
              type="text"
              value={form.profession}
              onChange={(e) => setForm({ ...form, profession: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Software Developer at XYZ Corp"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              Country
            </label>
            <input
              id="country"
              type="text"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Pakistan"
            />
          </div>
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
            LinkedIn / Website (optional)
          </label>
          <input
            id="linkedin"
            type="url"
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[150px]"
            rows={6}
            placeholder="Share your thoughts, feedback, or collaboration ideas..."
            required
          />
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/30 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div>
          <Button type="submit" disabled={loading} size="lg" className="min-w-[150px]">
            {loading ? "Sending..." : "Send Feedback"}
          </Button>
        </div>
      </motion.form>
    </div>
  )
}
