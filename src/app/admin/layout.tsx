import React from 'react'
import { MainNav } from '@/components/nav/main-nav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MainNav />
      <main className="container px-4 md:px-6 py-8">
        {children}
      </main>
    </div>
  )
}