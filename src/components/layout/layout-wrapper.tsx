"use client"

import { usePathname } from "next/navigation"
import { MainNav } from "@/components/nav/main-nav"
import { Footer } from "@/components/footer/footer"
import { ChatButton } from "@/components/chat/chat-button"

// Pages that should NOT have header/footer/chatbot
const noLayoutPaths = ["/admin/login"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if current path should have layout
  const shouldHideLayout = noLayoutPaths.some(path => pathname?.startsWith(path))

  if (shouldHideLayout) {
    return <>{children}</>
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatButton />
    </div>
  )
}
