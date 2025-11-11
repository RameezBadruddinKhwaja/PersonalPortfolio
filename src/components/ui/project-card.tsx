import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function ProjectCard({ project }: { project: any }) {
  return (
    <article className="rounded-lg border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-2">
            {project.tech.map((t: string) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {project.live && (
          <Link href={project.live} className="text-sm font-medium text-blue-600">
            View Live
          </Link>
        )}
        {project.repo && (
          <Link href={project.repo} className="text-sm font-medium">
            View Repo
          </Link>
        )}
      </div>
    </article>
  )
}