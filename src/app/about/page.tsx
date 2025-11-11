import { Metadata } from "next"
import { AboutHero } from "@/components/sections/about-hero"
import { Skills } from "@/components/sections/skills"
import { Education } from "@/components/sections/education"

export const metadata: Metadata = {
  title: "About - Rameez Bader Khwaja",
  description: "Full Stack Developer and AI enthusiast from Karachi, Pakistan. Specializing in Next.js, TypeScript, and modern web development.",
}

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <AboutHero />
      <Skills />
      <Education />
    </div>
  )
}