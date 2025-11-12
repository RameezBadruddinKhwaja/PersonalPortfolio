import Link from "next/link"
import { ThemeToggle } from "@/components/theme/theme-toggle"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Feedback", href: "/feedback" },
]

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Link href="/" className="font-semibold text-xl">
            Rameez<span className="text-blue-600">.dev</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}