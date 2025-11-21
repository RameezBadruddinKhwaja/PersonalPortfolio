"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, Globe } from "lucide-react"
import { Project } from "@/lib/data/projects"

const categoryColors: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  ai: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  cybersecurity: "bg-red-500/10 text-red-500 border-red-500/20",
}

const categoryLabels: Record<string, string> = {
  web: "Web Dev",
  ai: "AI/ML",
  cybersecurity: "Security",
}

export function ProjectCard({ project }: { project: Project }) {
  const hasLiveLink = project.live && project.live.trim() !== ""
  const hasRepoLink = project.repo && project.repo.trim() !== ""

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group rounded-lg border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/50 flex flex-col h-full"
    >
      <div className="flex-1 space-y-4">
        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${categoryColors[project.category] || "bg-muted"}`}>
            {categoryLabels[project.category] || project.category}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((t: string) => (
            <Badge key={t} variant="secondary" className="text-xs">
          {project.tech.map((t: string) => (
            <Badge key={t}>
              {t}
            </Badge>
          ))}
          {project.tech.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{project.tech.length - 5}
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 pt-4 border-t">
        {hasLiveLink && (
          <Button asChild size="sm" className="flex-1">
            <Link
              href={project.live!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Live Site
            </Link>
          </Button>
        )}
        {hasRepoLink && (
          <Button asChild variant={hasLiveLink ? "outline" : "default"} size="sm" className="flex-1">
            <Link
              href={project.repo!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </Button>
        )}
        {!hasLiveLink && !hasRepoLink && (
          <span className="text-sm text-muted-foreground italic">
            Coming soon...
          </span>
        )}
      </div>
    </motion.article>
  )
}
