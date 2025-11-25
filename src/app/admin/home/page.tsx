"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Plus, X } from 'lucide-react'

const initialHomeData = {
  hero: {
    greeting: "Hi, I'm Rameez Bader Khwaja —",
    title: "Full-Stack & AI Developer",
    description: "I design and build intelligent, modern, and responsive web experiences using Next.js, TypeScript, and AI-driven technologies.",
    tagline: "Turning ideas into interactive digital reality",
    ctaPrimary: "View My Work",
    ctaSecondary: "Let's Talk"
  },
  social: {
    github: "https://github.com/RameezBadruddinKhwaja",
    linkedin: "https://linkedin.com/in/rameezbaderkhwaja",
    email: "rameezbaderkhwaja@gmail.com"
  }
}

export default function HomePage() {
  const [data, setData] = useState(initialHomeData)

  const updateHero = (field: string, value: string) => {
    setData({
      ...data,
      hero: { ...data.hero, [field]: value }
    })
  }

  const updateSocial = (field: string, value: string) => {
    setData({
      ...data,
      social: { ...data.social, [field]: value }
    })
  }

  const handleSave = async () => {
    const { toast } = await import('sonner')
    toast.loading('Saving home page...', { id: 'save-home' })

    try {
      const response = await fetch('/api/cms/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save')
      }

      toast.success('Home page saved successfully!', { id: 'save-home' })
    } catch (error: any) {
      console.error('Save error:', error)
      toast.error(error.message || 'Failed to save home page', { id: 'save-home' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Home Page</h1>
          <p className="text-muted-foreground mt-1">
            Edit your hero section and home page content
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>The main headline area of your home page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Greeting Line</label>
            <Input
              value={data.hero.greeting}
              onChange={(e) => updateHero('greeting', e.target.value)}
              placeholder="Hi, I'm..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title / Role</label>
            <Input
              value={data.hero.title}
              onChange={(e) => updateHero('title', e.target.value)}
              placeholder="Full-Stack Developer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={data.hero.description}
              onChange={(e) => updateHero('description', e.target.value)}
              rows={3}
              placeholder="A brief description of what you do..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tagline</label>
            <Input
              value={data.hero.tagline}
              onChange={(e) => updateHero('tagline', e.target.value)}
              placeholder="Your catchy tagline..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary CTA Text</label>
              <Input
                value={data.hero.ctaPrimary}
                onChange={(e) => updateHero('ctaPrimary', e.target.value)}
                placeholder="View My Work"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Secondary CTA Text</label>
              <Input
                value={data.hero.ctaSecondary}
                onChange={(e) => updateHero('ctaSecondary', e.target.value)}
                placeholder="Contact Me"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Your social media and contact links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub URL</label>
            <Input
              value={data.social.github}
              onChange={(e) => updateSocial('github', e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn URL</label>
            <Input
              value={data.social.linkedin}
              onChange={(e) => updateSocial('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              value={data.social.email}
              onChange={(e) => updateSocial('email', e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your hero section will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted rounded-lg text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {data.hero.greeting}
              <br />
              <span className="text-primary">{data.hero.title}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {data.hero.description}
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="sm">{data.hero.ctaPrimary}</Button>
              <Button size="sm" variant="outline">{data.hero.ctaSecondary}</Button>
            </div>
            <p className="text-sm text-muted-foreground">{data.hero.tagline}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
