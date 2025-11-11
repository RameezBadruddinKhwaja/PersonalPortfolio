"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <h1 className="text-9xl font-bold text-blue-600/20">404</h1>
          <p className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-foreground">
            Page Not Found
          </p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-lg text-muted-foreground">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm text-muted-foreground">
            It might have been moved or deleted. Let's get you back on track!
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              View Projects
            </Link>
          </Button>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-8 border-t"
        >
          <p className="text-xs text-muted-foreground mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/about"
              className="text-sm text-blue-600 hover:underline"
            >
              About
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/projects"
              className="text-sm text-blue-600 hover:underline"
            >
              Projects
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/feedback"
              className="text-sm text-blue-600 hover:underline"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
