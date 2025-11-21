"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  MessageSquare,
  FolderKanban,
  User,
  Home,
  LogOut,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Feedback', href: '/admin/feedback', icon: MessageSquare },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'About', href: '/admin/about', icon: User },
  { name: 'Home', href: '/admin/home', icon: Home },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col">
        <div className="p-6 border-b">
          <Link href="/admin" className="font-bold text-xl">
            <span className="text-foreground">Rameez</span>
            <span className="text-primary">.admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const isActive = item.href === '/admin'
              ? pathname === '/admin'
              : pathname?.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="font-bold text-lg">
            <span className="text-foreground">Rameez</span>
            <span className="text-primary">.admin</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const isActive = item.href === '/admin'
              ? pathname === '/admin'
              : pathname?.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-3 w-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pt-0 pt-28">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
