"use client"

import { useState } from 'react'
import { projects as initialProjects, categories, ProjectCategory, Project } from '@/lib/data/projects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Pencil, Trash2, ExternalLink, Github, Save, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState<Project[]>(initialProjects)
  const [editing, setEditing] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>({})

  const startEdit = (project: Project) => {
    setEditing(project.id)
    setFormData({ ...project })
    setIsAdding(false)
  }

  const startAdd = () => {
    setIsAdding(true)
    setEditing(null)
    setFormData({
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      tech: [],
      category: 'web',
      live: '',
      repo: ''
    })
  }

  const cancelEdit = () => {
    setEditing(null)
    setIsAdding(false)
    setFormData({})
  }

  const saveProject = () => {
    if (!formData.title || !formData.description) {
      alert('Title and description are required')
      return
    }

    const project: Project = {
      id: formData.id || `project-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      tech: formData.tech || [],
      category: (formData.category as ProjectCategory) || 'web',
      live: formData.live,
      repo: formData.repo
    }

    if (isAdding) {
      setProjectList([...projectList, project])
    } else if (editing) {
      setProjectList(projectList.map(p => p.id === editing ? project : p))
    }

    cancelEdit()
    // Note: In production, this would save to a database/API
    alert('Project saved! Note: Changes are temporary in this demo. Implement API to persist.')
  }

  const deleteProject = (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    setProjectList(projectList.filter(p => p.id !== id))
  }

  const updateTech = (value: string) => {
    setFormData({
      ...formData,
      tech: value.split(',').map(t => t.trim()).filter(Boolean)
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        {!isAdding && !editing && (
          <Button onClick={startAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editing) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? 'Add New Project' : 'Edit Project'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category || 'web'}
                  onValueChange={(value) => setFormData({ ...formData, category: value as ProjectCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.value !== 'all').map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Technologies (comma-separated)</label>
              <Input
                value={formData.tech?.join(', ') || ''}
                onChange={(e) => updateTech(e.target.value)}
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Live URL</label>
                <Input
                  value={formData.live || ''}
                  onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  value={formData.repo || ''}
                  onChange={(e) => setFormData({ ...formData, repo: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={saveProject}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={cancelEdit}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid gap-4">
        {projectList.map((project) => (
          <Card key={project.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-3">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <Github className="h-3 w-3" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(project)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProject(project.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
