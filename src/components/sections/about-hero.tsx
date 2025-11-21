"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { motion } from "framer-motion"

export function AboutHero() {
  const ref = useRef(null)
  const hobbiesRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const hobbiesInView = useInView(hobbiesRef, { once: true, margin: "-50px" })

  return (
    <section className="space-y-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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

        <p>
          I'm also a <span className="text-primary font-semibold">cybersecurity learner</span> and
          aspiring <span className="text-primary font-semibold">SOC Analyst</span>. My focus areas include
          network security, incident response, log analysis, SIEM tools, threat detection, and
          understanding vulnerabilities. I actively practice through hands-on labs, real-world
          attack scenarios, and defensive techniques. My goal is to provide secure systems,
          safe environments, and reliable digital protection.
        </p>

        <blockquote className="border-l-4 border-primary pl-4 italic mt-6">
          "Technology isn't just about solving problems — it's about crafting experiences that feel alive."
        </blockquote>

        <div className="mt-8" ref={hobbiesRef}>
          <motion.h3
            className="text-xl font-semibold mb-3 text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={hobbiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            Hobbies & Interests
          </motion.h3>
          <ul className="space-y-2">
            {[
              "Building interactive UIs with Next.js + Tailwind",
              "Exploring Agentic AI (OpenAI & Gemini APIs)",
              "Working with Express.js, Prisma & PostgreSQL",
              "Cloud deployments (Vercel, Render, etc.)",
              "Cybersecurity: SIEM tools, threat hunting, incident response",
              "Penetration testing & vulnerability assessment",
              "Learning new frameworks and architectural patterns",
            ].map((hobby, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={hobbiesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="text-primary mt-1">▸</span>
                <span>{hobby}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}