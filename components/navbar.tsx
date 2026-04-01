'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { label: 'My Projects', href: '/#projects' },
  { label: 'About Me', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      )}
    >
      <Link
        href="/"
        className="text-sm font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-200"
      >
        Enya Song
      </Link>

      <nav aria-label="Primary navigation">
        <ul className="flex items-center gap-1">
          {links.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={cn(
                  'relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
                  pathname === '/about' && label === 'About Me'
                    ? 'bg-foreground text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}