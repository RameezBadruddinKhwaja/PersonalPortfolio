import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { projects } from "@/lib/data/projects"

export function ProjectsSection() {
  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Projects
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          A curated selection of projects demonstrating full-stack development, AI integrations, and modern tooling.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </motion.div>
    </section>
  )
}