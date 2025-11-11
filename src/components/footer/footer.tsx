import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link
              href="https://github.com/RameezBader"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Rameez Bader Khwaja
            </Link>
            . Using Next.js 14, TypeScript & Tailwind.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="https://github.com/RameezBader"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/rameezbaderkhwaja"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:rameezbaderkhwaja@gmail.com">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}