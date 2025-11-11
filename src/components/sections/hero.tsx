import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto text-center pt-20 lg:pt-32"
    >
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Hi, I'm Rameez Bader Khwaja —
        <br />
        <span className="text-blue-600">
          Full-Stack & AI Developer
        </span>
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        I design and build intelligent, modern, and responsive web experiences using 
        Next.js, TypeScript, and AI-driven technologies.
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link href="/projects">
          <Button size="lg" className="min-w-[150px]">
            View My Work
          </Button>
        </Link>
        <Link href="/feedback">
          <Button variant="outline" size="lg" className="min-w-[150px]">
            Let's Talk
          </Button>
        </Link>
      </motion.div>

      <motion.p 
        className="text-sm text-gray-500 dark:text-gray-400 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Turning ideas into interactive digital reality
      </motion.p>
    </motion.section>
  );
}