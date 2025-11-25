import { Metadata } from "next"
import { ProjectsSection } from "@/components/sections/projects"

export const metadata: Metadata = {
  title: "Projects - Rameez Bader Khwaja",
  description: "A showcase of my projects built with Next.js, TypeScript, Prisma, and AI integrations.",
  openGraph: {
    title: "Projects | Rameez Bader Khwaja",
    description: "View my portfolio of web development, AI integration, and full-stack projects",
    images: ['/api/og?title=My%20Projects&subtitle=Full%20Stack%20%26%20AI%20Development'],
  },
}

export default function ProjectsPage() {
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <ProjectsSection />
    </div>
  )
}