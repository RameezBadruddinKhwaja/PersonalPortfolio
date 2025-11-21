"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Plus, X } from 'lucide-react'

const initialAboutData = {
  title: "About Me",
  intro: "I'm Rameez Bader Khwaja, a Full-Stack Developer and AI enthusiast from Karachi, Pakistan.",
  paragraphs: [
    "I've completed my ADP in Computer Information Systems from Hamdard University, specializing in Programming, Software Development, Data Management, and Computer Systems Architecture.",
    "Currently, I'm part of the Governor Sindh IT Initiative (Panaverse Program), where I've been learning and building real-world projects in TypeScript, Next.js, Python, Node.js, and Agentic AI.",
    "I love creating projects that combine aesthetic UI design with powerful backends. My goal is to become an AI-first Full Stack Engineer capable of developing intelligent, scalable, and interactive applications.",
    "I'm also a cybersecurity learner and aspiring SOC Analyst. My focus areas include network security, incident response, log analysis, SIEM tools, threat detection, and understanding vulnerabilities."
  ],
  quote: "Technology isn't just about solving problems — it's about crafting experiences that feel alive.",
  hobbies: [
    "Building interactive UIs with Next.js + Tailwind",
    "Exploring Agentic AI (OpenAI & Gemini APIs)",
    "Working with Express.js, Prisma & PostgreSQL",
    "Cloud deployments (Vercel, Render, etc.)",
    "Cybersecurity: SIEM tools, threat hunting, incident response",
    "Penetration testing & vulnerability assessment",
    "Learning new frameworks and architectural patterns"
  ]
}

export default function AboutPage() {
  const [data, setData] = useState(initialAboutData)
  const [newHobby, setNewHobby] = useState('')

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...data.paragraphs]
    newParagraphs[index] = value
    setData({ ...data, paragraphs: newParagraphs })
  }

  const addParagraph = () => {
    setData({ ...data, paragraphs: [...data.paragraphs, ''] })
  }

  const removeParagraph = (index: number) => {
    setData({ ...data, paragraphs: data.paragraphs.filter((_, i) => i !== index) })
  }

  const addHobby = () => {
    if (!newHobby.trim()) return
    setData({ ...data, hobbies: [...data.hobbies, newHobby.trim()] })
    setNewHobby('')
  }

  const removeHobby = (index: number) => {
    setData({ ...data, hobbies: data.hobbies.filter((_, i) => i !== index) })
  }

  const handleSave = () => {
    // In production, this would save to API/database
    console.log('Saving about data:', data)
    alert('About section saved! Note: Changes are temporary in this demo. Implement API to persist.')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">About Section</h1>
          <p className="text-muted-foreground mt-1">
            Edit your about page content
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your introduction and main details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Page Title</label>
            <Input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Introduction</label>
            <Textarea
              value={data.intro}
              onChange={(e) => setData({ ...data, intro: e.target.value })}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Bio Paragraphs */}
      <Card>
        <CardHeader>
          <CardTitle>Bio Paragraphs</CardTitle>
          <CardDescription>Your detailed biography sections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.paragraphs.map((para, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={para}
                onChange={(e) => updateParagraph(index, e.target.value)}
                rows={3}
                className="flex-1"
                placeholder={`Paragraph ${index + 1}`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeParagraph(index)}
                className="shrink-0 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addParagraph}>
            <Plus className="h-4 w-4 mr-2" />
            Add Paragraph
          </Button>
        </CardContent>
      </Card>

      {/* Quote */}
      <Card>
        <CardHeader>
          <CardTitle>Quote</CardTitle>
          <CardDescription>A memorable quote or motto</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.quote}
            onChange={(e) => setData({ ...data, quote: e.target.value })}
            rows={2}
            placeholder="Your inspirational quote..."
          />
        </CardContent>
      </Card>

      {/* Hobbies */}
      <Card>
        <CardHeader>
          <CardTitle>Hobbies & Interests</CardTitle>
          <CardDescription>What you enjoy doing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              placeholder="Add a new hobby or interest..."
              onKeyDown={(e) => e.key === 'Enter' && addHobby()}
            />
            <Button onClick={addHobby}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {data.hobbies.map((hobby, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <span className="flex-1 text-sm">{hobby}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHobby(index)}
                  className="h-6 w-6 text-destructive hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
