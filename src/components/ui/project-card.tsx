"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

export function ProjectCard({ project }: { project: any }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group rounded-lg border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-600/50 flex flex-col h-full"
    >
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <Badge key={t}>
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 pt-4 border-t">
        {project.live && project.live !== "#" && (
          <Button asChild size="sm" className="flex-1">
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        )}
        {project.repo && project.repo !== "#" && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </Button>
        )}
      </div>
    </motion.article>
  )
}
