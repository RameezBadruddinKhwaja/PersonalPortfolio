"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [filtered, setFiltered] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (!error && data) {
        setFeedbacks(data)
        setFiltered(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(feedbacks)
    } else {
      const s = search.toLowerCase()
      setFiltered(feedbacks.filter(fb =>
        fb.name.toLowerCase().includes(s) ||
        fb.email.toLowerCase().includes(s) ||
        fb.country?.toLowerCase().includes(s) ||
        fb.message.toLowerCase().includes(s)
      ))
    }
  }, [search, feedbacks])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return

    const { error } = await supabase.from('feedbacks').delete().eq('id', id)
    if (!error) {
      setFeedbacks(prev => prev.filter(fb => fb.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feedback</h1>
        <p className="text-muted-foreground mt-1">
          Manage feedback submissions from visitors
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search feedback..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm">
        <span className="text-muted-foreground">
          Total: <span className="font-medium text-foreground">{feedbacks.length}</span>
        </span>
        {search && (
          <span className="text-muted-foreground">
            Showing: <span className="font-medium text-foreground">{filtered.length}</span>
          </span>
        )}
      </div>

      {/* Feedback List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-lg border p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/3 mb-4" />
              <div className="h-3 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">
            {search ? 'No matching feedback found.' : 'No feedback submissions yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((fb) => (
            <div key={fb.id} className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-lg">{fb.name}</p>
                    {fb.country && <Badge variant="secondary">{fb.country}</Badge>}
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground mb-3">
                    <p>{fb.email}</p>
                    {fb.profession && <p>{fb.profession}</p>}
                    {fb.linkedin && (
                      <a
                        href={fb.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    )}
                  </div>

                  <p className="mt-3 text-foreground leading-relaxed">{fb.message}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(fb.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(fb.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
