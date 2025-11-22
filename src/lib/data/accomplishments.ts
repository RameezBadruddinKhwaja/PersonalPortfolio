export type AccomplishmentCategory = 'certificate' | 'academic' | 'degree' | 'award' | 'license'

export interface Accomplishment {
  id: string
  title: string
  description: string
  category: AccomplishmentCategory
  issuer: string // Organization/Institution name
  date: string // YYYY-MM format
  imageUrl: string
  credentialId?: string
  credentialUrl?: string
  verificationEmail?: string
}

export const accomplishmentCategories = [
  { value: 'all' as const, label: 'All Accomplishments' },
  { value: 'certificate' as AccomplishmentCategory, label: 'Certificates' },
  { value: 'academic' as AccomplishmentCategory, label: 'Academic Results' },
  { value: 'degree' as AccomplishmentCategory, label: 'Degrees' },
  { value: 'award' as AccomplishmentCategory, label: 'Awards' },
  { value: 'license' as AccomplishmentCategory, label: 'Licenses' },
]

// Sample data - Replace with your actual accomplishments
export const accomplishments: Accomplishment[] = [
  {
    id: 'cert-1',
    title: 'Next.js & React - The Complete Guide',
    description: 'Comprehensive course covering Next.js 14, React 18, Server Components, and modern web development',
    category: 'certificate',
    issuer: 'Udemy',
    date: '2024-10',
    imageUrl: '/accomplishments/nextjs-cert.jpg',
    credentialId: 'UC-XXXXX',
    credentialUrl: 'https://udemy.com/certificate/UC-XXXXX',
  },
  {
    id: 'cert-2',
    title: 'TypeScript Advanced Patterns',
    description: 'Advanced TypeScript course covering generics, type inference, and design patterns',
    category: 'certificate',
    issuer: 'Frontend Masters',
    date: '2024-08',
    imageUrl: '/accomplishments/typescript-cert.jpg',
  },
  {
    id: 'academic-1',
    title: 'ADP Computer Information Systems',
    description: 'Associate Degree Program - First Division with Distinction',
    category: 'academic',
    issuer: 'Hamdard University',
    date: '2024-06',
    imageUrl: '/accomplishments/adp-result.jpg',
  },
  {
    id: 'degree-1',
    title: 'ADP in Computer Information Systems',
    description: 'Specialization in Programming, Software Development, Data Management, and Computer Systems Architecture',
    category: 'degree',
    issuer: 'Hamdard University',
    date: '2024-06',
    imageUrl: '/accomplishments/adp-degree.jpg',
  },
  {
    id: 'cert-3',
    title: 'Governor Sindh IT Initiative - Cloud Native',
    description: 'Panaverse Program - Quarter 1 & 2 Completion Certificate',
    category: 'certificate',
    issuer: 'Governor Sindh IT Initiative',
    date: '2024-05',
    imageUrl: '/accomplishments/giaic-cert.jpg',
  },
  {
    id: 'award-1',
    title: 'Best Project Award',
    description: 'Recognition for Outstanding Project Implementation',
    category: 'award',
    issuer: 'University Project Competition',
    date: '2024-04',
    imageUrl: '/accomplishments/best-project.jpg',
  },
]
