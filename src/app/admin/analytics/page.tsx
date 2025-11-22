"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { AnalyticsCard } from '@/components/admin/analytics-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Users, MessageSquare, Globe, TrendingUp, Activity } from 'lucide-react'

interface AnalyticsData {
  totalFeedback: number
  feedbackThisMonth: number
  feedbackLastMonth: number
  uniqueCountries: number
  topCountries: { country: string; count: number }[]
  recentActivity: { date: string; count: number }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalFeedback: 0,
    feedbackThisMonth: 0,
    feedbackLastMonth: 0,
    uniqueCountries: 0,
    topCountries: [],
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      const { data: feedbacks, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && feedbacks) {
        const now = new Date()
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

        const feedbackThisMonth = feedbacks.filter(
          fb => new Date(fb.created_at) >= thisMonth
        ).length

        const feedbackLastMonth = feedbacks.filter(
          fb => new Date(fb.created_at) >= lastMonth && new Date(fb.created_at) <= lastMonthEnd
        ).length

        // Count countries
        const countryCount: Record<string, number> = {}
        feedbacks.forEach(fb => {
          if (fb.country) {
            countryCount[fb.country] = (countryCount[fb.country] || 0) + 1
          }
        })

        const topCountries = Object.entries(countryCount)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)

        // Recent activity (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (6 - i))
          return date.toISOString().split('T')[0]
        })

        const recentActivity = last7Days.map(date => ({
          date,
          count: feedbacks.filter(fb =>
            fb.created_at.startsWith(date)
          ).length
        }))

        setData({
          totalFeedback: feedbacks.length,
          feedbackThisMonth,
          feedbackLastMonth,
          uniqueCountries: Object.keys(countryCount).length,
          topCountries,
          recentActivity
        })
      }
      setLoading(false)
    }

    loadAnalytics()
  }, [])

  const feedbackTrend = data.feedbackLastMonth > 0
    ? Math.round(((data.feedbackThisMonth - data.feedbackLastMonth) / data.feedbackLastMonth) * 100)
    : data.feedbackThisMonth > 0 ? 100 : 0

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Analytics</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Track your portfolio performance and visitor engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Feedback"
          value={loading ? '...' : data.totalFeedback}
          description="All-time submissions"
          icon={<MessageSquare className="h-4 w-4" />}
        />

        <AnalyticsCard
          title="This Month"
          value={loading ? '...' : data.feedbackThisMonth}
          description="Current month submissions"
          trend={{
            value: feedbackTrend,
            isPositive: feedbackTrend >= 0
          }}
          icon={<TrendingUp className="h-4 w-4" />}
        />

        <AnalyticsCard
          title="Countries"
          value={loading ? '...' : data.uniqueCountries}
          description="Unique visitor countries"
          icon={<Globe className="h-4 w-4" />}
        />

        <AnalyticsCard
          title="Engagement"
          value={loading ? '...' : `${data.totalFeedback > 0 ? ((data.feedbackThisMonth / 30).toFixed(1)) : '0'}/day`}
          description="Average daily submissions"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Visitors by geographic location</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : data.topCountries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No country data available yet
              </p>
            ) : (
              <div className="space-y-3">
                {data.topCountries.map((item, index) => (
                  <div key={item.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span className="font-medium">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${(item.count / data.totalFeedback) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-muted-foreground w-8 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Feedback submissions over last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-48 bg-muted rounded animate-pulse" />
            ) : (
              <div className="space-y-2">
                {data.recentActivity.map((day) => (
                  <div key={day.date} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <div className="flex items-center gap-3 flex-1 ml-4">
                      <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${day.count > 0 ? Math.max((day.count / Math.max(...data.recentActivity.map(d => d.count))) * 100, 10) : 0}%`
                          }}
                        />
                      </div>
                      <span className="font-semibold w-6 text-right">{day.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered suggestions to improve your portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <div className="h-2 w-2 rounded-full bg-primary mt-2" />
            <div>
              <p className="font-medium">Keep your content updated</p>
              <p className="text-sm text-muted-foreground mt-1">
                Regular updates to your projects and blog posts help maintain visitor engagement
              </p>
            </div>
          </div>

          {data.feedbackThisMonth === 0 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2" />
              <div>
                <p className="font-medium">Low feedback this month</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Consider promoting your portfolio on social media or reaching out to your network
                </p>
              </div>
            </div>
          )}

          {data.uniqueCountries > 5 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
              <div>
                <p className="font-medium">Great international reach!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your portfolio is attracting visitors from {data.uniqueCountries} different countries
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
