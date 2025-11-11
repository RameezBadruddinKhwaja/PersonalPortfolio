"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function AdminPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([])
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <section className='mb-8'>
        <h2 className='text-lg font-semibold mb-2'>Recent Feedback</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='space-y-4'>
            {feedbacks.map((fb) => (
              <div key={fb.id} className='rounded-md border p-4'>
                <div className='flex justify-between'>
                  <div>
                    <p className='font-medium'>{fb.name} — <span className='text-sm text-muted-foreground'>{fb.profession}</span></p>
                    <p className='text-sm text-muted-foreground'>{fb.email}</p>
                  </div>
                  <div className='text-sm text-muted-foreground'>{new Date(fb.created_at).toLocaleString()}</div>
                </div>
                <p className='mt-2'>{fb.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}