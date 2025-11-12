"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'

interface Feedback {
  id: string
  name: string
  email: string
  profession?: string
  country?: string
  linkedin?: string
  message: string
  created_at: string
}

export default function AdminPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('feedbacks').select('*').order('created_at', { ascending: false }).limit(50)
      if (error) {
        console.error(error)
      } else {
        setFeedbacks(data || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Manage feedback submissions and view analytics
        </p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Feedback</h3>
            <p className="text-3xl font-bold mt-2">{feedbacks.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">This Week</h3>
            <p className="text-3xl font-bold mt-2">
              {feedbacks.filter(fb => {
                const date = new Date(fb.created_at)
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return date > weekAgo
              }).length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Countries</h3>
            <p className="text-3xl font-bold mt-2">
              {new Set(feedbacks.map(fb => fb.country).filter(Boolean)).size}
            </p>
          </div>
        </div>

        <section className='mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Recent Feedback</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-lg border p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/3 mb-4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">No feedback submissions yet.</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {feedbacks.map((fb) => (
                <div key={fb.id} className='rounded-lg border bg-card p-6 hover:shadow-md transition-shadow'>
                  <div className='flex flex-col md:flex-row md:justify-between gap-4'>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className='font-semibold text-lg'>{fb.name}</p>
                        {fb.country && (
                          <Badge variant="secondary">{fb.country}</Badge>
                        )}
                      </div>

                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <p>📧 {fb.email}</p>
                        {fb.profession && <p>💼 {fb.profession}</p>}
                        {fb.linkedin && (
                          <p>
                            🔗 <a
                              href={fb.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              LinkedIn Profile
                            </a>
                          </p>
                        )}
                      </div>

                      <p className='mt-3 text-foreground leading-relaxed'>{fb.message}</p>
                    </div>

                    <div className='text-sm text-muted-foreground whitespace-nowrap'>
                      {new Date(fb.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}