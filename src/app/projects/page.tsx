import { Metadata } from "next"
import { ProjectsSection } from "@/components/sections/projects"

export const metadata: Metadata = {
  title: "Projects - Rameez Bader Khwaja",
  description: "A showcase of my projects built with Next.js, TypeScript, Prisma, and AI integrations.",
}

export default function ProjectsPage() {
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <ProjectsSection />
    </div>
  )
}