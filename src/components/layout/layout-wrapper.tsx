"use client"

import { usePathname } from "next/navigation"
import { MainNav } from "@/components/nav/main-nav"
import { Footer } from "@/components/footer/footer"
import { ChatButton } from "@/components/chat/chat-button"
import { FloatingParticles } from "@/components/3d/floating-particles"

// Pages that should NOT have header/footer/chatbot
const noLayoutPaths = ["/admin", "/login", "/auth"]

// Pages that should NOT have 3D background (for performance)
const no3DPaths = ["/admin"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if current path should have layout
  const shouldHideLayout = noLayoutPaths.some(path => pathname?.startsWith(path))
  const shouldHide3D = no3DPaths.some(path => pathname?.startsWith(path))

  if (shouldHideLayout) {
    return <>{children}</>
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Global 3D Background */}
      {!shouldHide3D && <FloatingParticles />}

      <MainNav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatButton />
    </div>
  )
}
