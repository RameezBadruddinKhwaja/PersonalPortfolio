'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface ViewCounterProps {
  page: string
  showIcon?: boolean
}

export function ViewCounter({ page, showIcon = true }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const trackView = async () => {
      try {
        // Track the view
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page, type: 'view' }),
        })

        // Get view count
        const response = await fetch(`/api/analytics/views?page=${encodeURIComponent(page)}`)
        if (response.ok && mounted) {
          const data = await response.json()
          setViews(data.views || 0)
        }
      } catch (error) {
        console.error('Failed to track view:', error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    trackView()

    return () => {
      mounted = false
    }
  }, [page])

  if (loading || views === null) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {showIcon && <Eye className="h-4 w-4" />}
        <span className="h-4 w-16 bg-muted rounded animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {showIcon && <Eye className="h-4 w-4" />}
      <span>{views.toLocaleString()} views</span>
    </div>
  )
}
