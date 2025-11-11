import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          About Me
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          I'm Rameez Bader Khwaja, a Full-Stack Developer and AI enthusiast from Karachi, Pakistan.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-muted-foreground space-y-4"
      >
        <p>
          I've completed my ADP in Computer Information Systems from Hamdard University,
          specializing in Programming, Software Development, Data Management, and Computer
          Systems Architecture.
        </p>

        <p>
          Currently, I'm part of the Governor Sindh IT Initiative (Panaverse Program),
          where I've been learning and building real-world projects in TypeScript,
          Next.js, Python, Node.js, and Agentic AI.
        </p>

        <p>
          I love creating projects that combine aesthetic UI design with powerful backends.
          My goal is to become an AI-first Full Stack Engineer capable of developing
          intelligent, scalable, and interactive applications.
        </p>

        <blockquote className="border-l-4 border-blue-600 pl-4 italic mt-6">
          "Technology isn't just about solving problems — it's about crafting experiences that feel alive."
        </blockquote>
      </motion.div>
    </section>
  )
}