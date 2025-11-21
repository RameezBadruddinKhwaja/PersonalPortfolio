"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { projects, categories, ProjectCategory } from "@/lib/data/projects"
import { Button } from "@/components/ui/button"

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory)

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
          A curated selection of projects demonstrating full-stack development, AI integrations, and cybersecurity tools.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.value)}
            className="transition-all"
          >
            {cat.label}
            {cat.value !== "all" && (
              <span className="ml-2 text-xs opacity-70">
                ({projects.filter(p => p.category === cat.value).length})
              </span>
            )}
          </Button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground py-12"
        >
          No projects in this category yet. Check back soon!
        </motion.p>
      )}
    </section>
  )
}
