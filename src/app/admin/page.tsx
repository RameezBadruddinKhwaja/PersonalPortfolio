"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Users, Globe, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  totalFeedback: number
  weeklyFeedback: number
  uniqueCountries: number
  recentFeedback: { name: string; country?: string; created_at: string }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalFeedback: 0,
    weeklyFeedback: 0,
    uniqueCountries: 0,
    recentFeedback: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (!error && data) {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)

        setStats({
          totalFeedback: data.length,
          weeklyFeedback: data.filter(fb => new Date(fb.created_at) > weekAgo).length,
          uniqueCountries: new Set(data.map(fb => fb.country).filter(Boolean)).size,
          recentFeedback: data.slice(0, 5)
        })
      }
      setLoading(false)
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.totalFeedback}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.weeklyFeedback}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.uniqueCountries}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest submissions from visitors</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : stats.recentFeedback.length === 0 ? (
              <p className="text-muted-foreground text-sm">No feedback yet</p>
            ) : (
              <div className="space-y-2">
                {stats.recentFeedback.map((fb, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{fb.name}</p>
                      <p className="text-xs text-muted-foreground">{fb.country || 'Unknown'}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(fb.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <Link
              href="/admin/feedback"
              className="text-sm text-primary hover:underline mt-4 inline-block"
            >
              View all feedback →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your portfolio content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/projects"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <p className="font-medium text-sm">Manage Projects</p>
              <p className="text-xs text-muted-foreground">Add, edit, or remove projects</p>
            </Link>
            <Link
              href="/admin/about"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <p className="font-medium text-sm">Edit About Section</p>
              <p className="text-xs text-muted-foreground">Update your bio and skills</p>
            </Link>
            <Link
              href="/admin/home"
              className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <p className="font-medium text-sm">Edit Home Page</p>
              <p className="text-xs text-muted-foreground">Update hero section and tagline</p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
