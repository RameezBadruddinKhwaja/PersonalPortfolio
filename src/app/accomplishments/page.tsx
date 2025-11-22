"use client"

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AccomplishmentCard } from '@/components/accomplishments/accomplishment-card'
import { accomplishments, accomplishmentCategories, AccomplishmentCategory } from '@/lib/data/accomplishments'
import { Button } from '@/components/ui/button'
import { Award, GraduationCap, Medal, Shield, FileCheck } from 'lucide-react'

const categoryIcons = {
  certificate: FileCheck,
  academic: GraduationCap,
  degree: GraduationCap,
  award: Medal,
  license: Shield,
}

export default function AccomplishmentsPage() {
  const [activeCategory, setActiveCategory] = useState<AccomplishmentCategory | 'all'>('all')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const filteredAccomplishments = activeCategory === 'all'
    ? accomplishments
    : accomplishments.filter(a => a.category === activeCategory)

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Award className="h-10 w-10 text-primary" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Accomplishments
          </h1>
        </div>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
          A showcase of my certifications, academic achievements, degrees, and professional awards
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
      >
        {accomplishmentCategories.map((cat) => {
          const Icon = cat.value !== 'all' ? categoryIcons[cat.value] : Award
          const count = cat.value === 'all'
            ? accomplishments.length
            : accomplishments.filter(a => a.category === cat.value).length

          return (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.value)}
              className="transition-all"
            >
              <Icon className="h-4 w-4 mr-2" />
              {cat.label}
              <span className="ml-2 text-xs opacity-70">({count})</span>
            </Button>
          )
        })}
      </motion.div>

      {/* Accomplishments Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        layout
      >
        {filteredAccomplishments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              No accomplishments in this category yet.
            </p>
          </motion.div>
        ) : (
          filteredAccomplishments.map((accomplishment, index) => (
            <motion.div
              key={accomplishment.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <AccomplishmentCard accomplishment={accomplishment} />
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Info Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 p-6 bg-muted/50 rounded-lg text-center max-w-2xl mx-auto"
      >
        <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
        <h3 className="font-semibold mb-2">Document Verification</h3>
        <p className="text-sm text-muted-foreground">
          All displayed documents are watermarked for protection. If you need to verify the
          authenticity of any certificate or request the original document, please{' '}
          <a href="/feedback" className="text-primary hover:underline font-medium">
            contact me
          </a>
          .
        </p>
      </motion.div>
    </div>
  )
}
