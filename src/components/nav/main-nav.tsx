"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { UserMenu } from "@/components/auth/user-menu"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Accomplishments", href: "/accomplishments" },
  { name: "Feedback", href: "/feedback" },
]

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="font-bold text-xl group">
            <span className="text-foreground">Rameez</span>
            <span className="text-primary group-hover:opacity-80 transition-opacity">.dev</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-primary relative ${
                isActive(item.href)
                  ? "text-primary font-semibold"
                  : "text-foreground/60"
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <div className="hidden md:block">
            <UserMenu />
          </div>
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t bg-background"
          >
            <nav className="container py-4 px-4 md:px-6 flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-4 rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-foreground/60 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 px-4 border-t">
                <UserMenu />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
