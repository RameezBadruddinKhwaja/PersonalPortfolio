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
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<ProjectCategory>('all')

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

  const saveProject = async () => {
    if (!formData.title || !formData.description) {
      const { toast } = await import('sonner')
      toast.error('Title and description are required')
      return
    }

    const { toast } = await import('sonner')
    toast.loading('Saving project...', { id: 'save-project' })

    try {
      const response = await fetch('/api/projects', {
        method: isAdding ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: formData.id || undefined,
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save project')
      }

      const data = await response.json()
      const savedProject = data.project

      // Update local state
      if (isAdding) {
        setProjectList([...projectList, savedProject])
      } else if (editing) {
        setProjectList(projectList.map(p => p.id === editing ? savedProject : p))
      }

      toast.success('Project saved successfully!', { id: 'save-project' })
      cancelEdit()
    } catch (error: any) {
      console.error('Save error:', error)
      toast.error(error.message || 'Failed to save project', { id: 'save-project' })
    }
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

  // Filter and search projects
  const filteredProjects = projectList.filter(project => {
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = filterCategory === 'all' || project.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const exportProjects = () => {
    const dataStr = JSON.stringify(projectList, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `projects-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        {!isAdding && !editing && (
          <div className="flex gap-2">
            <Button onClick={exportProjects} variant="outline" size="sm">
              Export JSON
            </Button>
            <Button onClick={startAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        )}
      </div>

      {/* Search and Filter Bar */}
      {!isAdding && !editing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search projects by title, description, or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select
                  value={filterCategory}
                  onValueChange={(value) => setFilterCategory(value as ProjectCategory)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Showing {filteredProjects.length} of {projectList.length} projects
            </p>
          </CardContent>
        </Card>
      )}

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
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No projects found. Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        ) : filteredProjects.map((project) => (
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
