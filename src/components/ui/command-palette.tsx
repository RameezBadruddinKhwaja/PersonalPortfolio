'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Search, Home, User, Folder, Mail, Award } from 'lucide-react'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const navigate = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
        <Command className="rounded-lg border shadow-2xl bg-background">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input 
              placeholder="Type a command or search..." 
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            
            <Command.Group heading="Pages" className="text-xs font-medium text-muted-foreground px-2 py-1.5">
              <Command.Item 
                onSelect={() => navigate('/')}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => navigate('/about')}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>About</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => navigate('/projects')}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
              >
                <Folder className="h-4 w-4" />
                <span>Projects</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => navigate('/accomplishments')}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
              >
                <Award className="h-4 w-4" />
                <span>Accomplishments</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => navigate('/feedback')}
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                <span>Feedback</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
      <div 
        className="fixed inset-0 -z-10"
        onClick={() => setOpen(false)}
      />
    </div>
  )
}
