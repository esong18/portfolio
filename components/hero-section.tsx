'use client'

import { useEffect, useRef, useState } from 'react'
import { CursorTrail } from './cursor-trail'

const TYPEWRITER_WORDS = [
  'service design projects',
  'interaction design work',
  'user research initiatives',
  'business strategy development',
]

function TypewriterWord() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = TYPEWRITER_WORDS[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % TYPEWRITER_WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="inline-flex items-center gap-0.5 text-accent font-medium">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-up').forEach((node, i) => {
            setTimeout(() => node.classList.add('visible'), i * 120)
          })
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{ background: 'oklch(0.78 0.08 225 / 0.3)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
        style={{ background: 'oklch(0.88 0.05 200 / 0.3)' }}
      />

      {/* Canvas sits behind hero content */}
      <CursorTrail />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-3xl">
        {/* Sticker label */}
        <div
          className="fade-up relative inline-block cursor-pointer"
          aria-label="Welcome to my design space"
        >
          <div
            className="
        relative px-4 py-2 rounded-xl font-handwritten text-lg
        transition-transform duration-300 ease-out
        hover:scale-105 hover:rotate-2 hover:shadow-2xl
        hover:bg-oklch(0.9 0.06 230 / 0.35) hover:text-oklch(0.3 0.08 230)
        animate-wiggle
        "
            style={{
              background: 'oklch(0.88 0.06 230 / 0.22)',
              border: '1.5px solid oklch(0.72 0.08 225 / 0.35)',
              boxShadow: '2px 3px 10px oklch(0.62 0.1 230 / 0.14), inset 0 1px 0 oklch(1 0 0 / 0.4)',
              color: 'oklch(0.38 0.08 230)',
              letterSpacing: '0.01em',
            }}
          >
            welcome to my design space
          </div>
        </div>

        <h1 className="fade-up text-5xl md:text-7xl font-bold leading-tight tracking-tight text-balance text-foreground">
          Hi, I&apos;m Enya.
          <br />
          <span className="text-muted-foreground font-light">I design clarity</span>
          <br />
          <span className="text-muted-foreground font-light">in complexity.</span>
        </h1>

        <p className="fade-up text-lg text-muted-foreground leading-relaxed">
          Currently working on{' '}
          <TypewriterWord />
        </p>

        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="
    fade-up mt-4 group inline-flex items-center gap-2 px-6 py-3 rounded-full
    border border-foreground/20 bg-background text-sm font-medium text-foreground
    transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md
  "
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'oklch(0.88 0.06 230 / 0.22)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
        >
          View my work
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-y-0.5 transition-transform duration-200"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
