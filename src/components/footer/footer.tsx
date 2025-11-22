import Link from "next/link"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container py-8 md:py-12 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand & Tagline */}
          <div className="space-y-3">
            <Link href="/" className="font-bold text-xl inline-block">
              <span className="text-foreground">Rameez</span>
              <span className="text-primary">.dev</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building intelligent, modern, and responsive web experiences using Next.js,
              TypeScript, and AI-driven technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:rameezbaderkhwaja@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  rameezbaderkhwaja@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Karachi, Pakistan</span>
              </div>

              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/RameezBadruddinKhwaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/rameezbaderkhwaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Rameez Bader Khwaja. All rights reserved.
            </p>
            <p className="text-xs">
              Built with Next.js, TypeScript, Tailwind CSS & ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
