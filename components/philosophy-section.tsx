'use client'

import { useEffect, useRef } from 'react'

const principles = [
  {
    number: '01',
    title: 'Making complex processes simple.',
    body: 'Complex systems are inevitable. Confusion isn’t. I design so people can navigate with confidence, not hesitation.',
    marginNote: '← "Rule of thumb: if you think something is clever and sophisticated beware- it is probably self-indulgence." - Don Norman',
  },
  {
    number: '02',
    title: 'Starting with a strong foundation.',
    body: 'Design lasts when it’s built patiently: listening, exploring, refining, and testing thoughtfully, all rooted in real understanding.',
    marginNote: '← "The design process results in artifacts that ‘are what they are’ based on why they were desired in the first place." - Nelson & Stolterman',
  },
  {
    number: '03',
    title: 'Designing with intentionality.',
    body: 'I design with intention: supporting every design decision with research or insights is how I approach my work.',
    marginNote: '← "You’re not interested in what it takes to uncover most of the problems; you only care about what it takes to uncover as many problems as you can fix." - Steven Krug',
  },
]

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((node, i) => {
              setTimeout(() => node.classList.add('visible'), i * 120)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-6 md:px-12 py-28 max-w-6xl mx-auto"
    >
      {/* Header with side note */}
      <div className="fade-up flex items-end justify-between mb-14">
        {/* Left: section title */}
        <div>
          <p className="font-handwritten text-accent/80 text-lg mb-1">how I think</p>
          <h2 className="text-4xl md:text-5xl mb-10 font-bold tracking-tight text-foreground text-balance">
            Design Philosophy
          </h2>
        </div>

        {/* Right: side note */}
        <p className="hidden md:block mb-10 text-sm text-muted-foreground max-w-xs text-right leading-relaxed">
          How I approach design — balancing curiosity, clarity, and intentionality.
        </p>
      </div>

      {/* Journal-style principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {principles.map((p) => (
          <div key={p.number} className="fade-up flex flex-col gap-4">
            {/* Journal-style number with underline */}
            <div className="flex items-center gap-3">
              <span className="font-handwritten text-sm text-muted-foreground">{p.number}</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div>
              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground leading-snug mb-1 text-balance">
                {p.title}
              </h3>

              {/* Body */}
              <p className="text-sm text-foreground/90 leading-relaxed">{p.body}</p>

              {/* Line break */}
              <br />

              {/* Handwritten annotation and margin note as journal reflections */}
              <span className="font-handwritten text-sm text-accent italic block mb-3 leading-tight">
                {p.marginNote}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}