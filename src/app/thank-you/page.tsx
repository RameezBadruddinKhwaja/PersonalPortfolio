"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, Home, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-6">
            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-500" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold">Thank You!</h1>
          <p className="text-lg text-muted-foreground">
            Your message has been received successfully.
          </p>
          <p className="text-sm text-muted-foreground">
            I appreciate you taking the time to reach out. I'll review your message and
            get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              View Projects
            </Link>
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-8 border-t"
        >
          <p className="text-xs text-muted-foreground">
            Want to chat? Try{" "}
            <span className="font-semibold text-primary">RameezBot</span> at the
            bottom-left corner!
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
