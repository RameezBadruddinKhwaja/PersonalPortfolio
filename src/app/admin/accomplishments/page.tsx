"use client"

import { useState } from 'react'
import { accomplishments as initialAccomplishments, accomplishmentCategories, Accomplishment, AccomplishmentCategory } from '@/lib/data/accomplishments'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Save, X, Upload, Eye } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { WatermarkOverlay } from '@/components/accomplishments/watermark-overlay'

export default function AccomplishmentsAdminPage() {
  const [accomplishmentsList, setAccomplishmentsList] = useState<Accomplishment[]>(initialAccomplishments)
  const [editing, setEditing] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Accomplishment>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<AccomplishmentCategory | 'all'>('all')
  const [imagePreview, setImagePreview] = useState<string>('')

  const startEdit = (accomplishment: Accomplishment) => {
    setEditing(accomplishment.id)
    setFormData({ ...accomplishment })
    setImagePreview(accomplishment.imageUrl)
    setIsAdding(false)
  }

  const startAdd = () => {
    setIsAdding(true)
    setEditing(null)
    setFormData({
      id: `acc-${Date.now()}`,
      title: '',
      description: '',
      category: 'certificate',
      issuer: '',
      date: new Date().toISOString().slice(0, 7), // YYYY-MM
      imageUrl: '',
    })
    setImagePreview('')
  }

  const cancelEdit = () => {
    setEditing(null)
    setIsAdding(false)
    setFormData({})
    setImagePreview('')
  }

  const saveAccomplishment = () => {
    if (!formData.title || !formData.description || !formData.issuer || !formData.imageUrl) {
      alert('Title, description, issuer, and image are required')
      return
    }

    const accomplishment: Accomplishment = {
      id: formData.id || `acc-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: (formData.category as AccomplishmentCategory) || 'certificate',
      issuer: formData.issuer,
      date: formData.date || new Date().toISOString().slice(0, 7),
      imageUrl: formData.imageUrl,
      credentialId: formData.credentialId,
      credentialUrl: formData.credentialUrl,
      verificationEmail: formData.verificationEmail,
    }

    if (isAdding) {
      setAccomplishmentsList([...accomplishmentsList, accomplishment])
    } else if (editing) {
      setAccomplishmentsList(accomplishmentsList.map(a => a.id === editing ? accomplishment : a))
    }

    cancelEdit()
    alert('Accomplishment saved! Note: Changes are temporary in this demo. Implement API to persist.')
  }

  const deleteAccomplishment = (id: string) => {
    if (!confirm('Are you sure you want to delete this accomplishment?')) return
    setAccomplishmentsList(accomplishmentsList.filter(a => a.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setImagePreview(result)
      setFormData({ ...formData, imageUrl: result })
    }
    reader.readAsDataURL(file)
  }

  // Filter and search
  const filteredAccomplishments = accomplishmentsList.filter(acc => {
    const matchesSearch = searchQuery === '' ||
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.issuer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = filterCategory === 'all' || acc.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const exportAccomplishments = () => {
    const dataStr = JSON.stringify(accomplishmentsList, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `accomplishments-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Accomplishments</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage your certificates, degrees, and achievements
          </p>
        </div>
        {!isAdding && !editing && (
          <div className="flex gap-2">
            <Button onClick={exportAccomplishments} variant="outline" size="sm">
              Export JSON
            </Button>
            <Button onClick={startAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Accomplishment
            </Button>
          </div>
        )}
      </div>

      {/* Search and Filter */}
      {!isAdding && !editing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by title, description, or issuer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select
                  value={filterCategory}
                  onValueChange={(value) => setFilterCategory(value as AccomplishmentCategory | 'all')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accomplishmentCategories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Showing {filteredAccomplishments.length} of {accomplishmentsList.length} accomplishments
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Form */}
      {(isAdding || editing) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? 'Add New Accomplishment' : 'Edit Accomplishment'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Certificate/Degree title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select
                  value={formData.category || 'certificate'}
                  onValueChange={(value) => setFormData({ ...formData, category: value as AccomplishmentCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accomplishmentCategories.filter(c => c.value !== 'all').map(cat => (
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
                placeholder="Brief description of the accomplishment"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Issued By *</label>
                <Input
                  value={formData.issuer || ''}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="Organization/Institution"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date (YYYY-MM) *</label>
                <Input
                  type="month"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Credential ID (Optional)</label>
                <Input
                  value={formData.credentialId || ''}
                  onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                  placeholder="e.g., UC-XXXXX"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Credential URL (Optional)</label>
                <Input
                  value={formData.credentialUrl || ''}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Image/Document *</label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>

              {/* Image Preview with Watermark */}
              {imagePreview && (
                <div className="relative aspect-[4/3] max-w-md bg-muted rounded-lg overflow-hidden mt-4">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                  <WatermarkOverlay opacity={0.2} />
                  <div className="absolute top-2 right-2">
                    <Badge>Preview with Watermark</Badge>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={saveAccomplishment}>
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

      {/* Accomplishments List */}
      <div className="grid gap-4">
        {filteredAccomplishments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No accomplishments found.</p>
            </CardContent>
          </Card>
        ) : filteredAccomplishments.map((acc) => (
          <Card key={acc.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail */}
                <div className="relative w-full md:w-48 aspect-[4/3] bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={acc.imageUrl}
                    alt={acc.title}
                    fill
                    className="object-cover"
                  />
                  <WatermarkOverlay opacity={0.1} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{acc.title}</h3>
                        <Badge variant="secondary" className="capitalize">
                          {acc.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{acc.description}</p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => startEdit(acc)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAccomplishment(acc.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Issuer:</span>{' '}
                      <span className="font-medium">{acc.issuer}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>{' '}
                      <span className="font-medium">{acc.date}</span>
                    </div>
                    {acc.credentialId && (
                      <div>
                        <span className="text-muted-foreground">ID:</span>{' '}
                        <span className="font-mono text-xs">{acc.credentialId}</span>
                      </div>
                    )}
                    {acc.credentialUrl && (
                      <div>
                        <a
                          href={acc.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-xs flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View Credential
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
