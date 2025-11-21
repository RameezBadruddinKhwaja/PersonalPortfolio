import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container px-4 md:px-6 py-8">
      {children}
    </main>
  )
}