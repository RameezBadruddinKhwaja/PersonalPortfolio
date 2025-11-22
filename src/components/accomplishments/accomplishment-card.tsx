"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { WatermarkOverlay } from './watermark-overlay'
import { Accomplishment } from '@/lib/data/accomplishments'
import { ExternalLink, Eye, ShieldCheck, Calendar, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface AccomplishmentCardProps {
  accomplishment: Accomplishment
}

export function AccomplishmentCard({ accomplishment }: AccomplishmentCardProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-')
    const date = new Date(parseInt(year), month ? parseInt(month) - 1 : 0)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
          <CardContent className="p-0">
            {/* Image Thumbnail */}
            <div
              className="relative aspect-[4/3] bg-muted overflow-hidden cursor-pointer"
              onClick={() => setIsViewerOpen(true)}
              onContextMenu={handleContextMenu}
            >
              <Image
                src={accomplishment.imageUrl}
                alt={accomplishment.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                draggable={false}
                onContextMenu={handleContextMenu}
              />
              {/* Watermark on thumbnail */}
              <WatermarkOverlay opacity={0.1} />

              {/* View overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-primary text-primary-foreground rounded-full p-3">
                    <Eye className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="capitalize">
                  {accomplishment.category}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">
                  {accomplishment.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {accomplishment.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>{accomplishment.issuer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{formatDate(accomplishment.date)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setIsViewerOpen(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                {accomplishment.credentialUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={accomplishment.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Full Image Viewer Modal */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {accomplishment.title}
              <Badge variant="secondary" className="capitalize ml-auto">
                {accomplishment.category}
              </Badge>
            </DialogTitle>
            <DialogDescription>{accomplishment.description}</DialogDescription>
          </DialogHeader>

          {/* Full Image with Watermark */}
          <div
            className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden"
            onContextMenu={handleContextMenu}
          >
            <Image
              src={accomplishment.imageUrl}
              alt={accomplishment.title}
              fill
              className="object-contain"
              draggable={false}
              onContextMenu={handleContextMenu}
              quality={85}
            />
            {/* Prominent watermark in viewer */}
            <WatermarkOverlay opacity={0.2} />
          </div>

          {/* Details */}
          <div className="space-y-3 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Issued By</p>
                  <p className="text-muted-foreground">{accomplishment.issuer}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">{formatDate(accomplishment.date)}</p>
                </div>
              </div>

              {accomplishment.credentialId && (
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Credential ID</p>
                    <p className="text-muted-foreground font-mono text-xs">
                      {accomplishment.credentialId}
                    </p>
                  </div>
                </div>
              )}

              {accomplishment.credentialUrl && (
                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Verify Online</p>
                    <a
                      href={accomplishment.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs"
                    >
                      View Credential
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Request Original Button */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                Need the original document for verification? Contact me directly.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="/feedback">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Request Original Document
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
