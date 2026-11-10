'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'Medical AI Quiz Generator',
    description:
      'AI quiz generator that helps medical faculty quiz students on core concepts. Took design from discovery to a working build that anchored a grant application for a school-wide rollout.',
    tags: ['Sketches to Prototypes', 'Human-in-the-loop AI', 'Design Systems'],
    image: '/projects/aiquiz/quizcover.png',
    note: '0 → 1 design',
    slug: 'ai-quiz-generator',
  },
  {
    title: 'BuildMySkincare',
    description:
      'Designed and coded a web app that analyzes product compatability in a skincare routine, built on its own accessible design system.',
    tags: ['Design tokens', 'Cursor + React/Next.js', 'Personalization'],
    image: '/projects/Skincare/skincover.png',
    note: 'self-initiated design and development',
    slug: 'skin-analysis',
  },
  {
    title: 'Hudl Calibration Redesign',
    description:
      'Redesigned a guided mobile flow that replaced an existing manual fallback for ML camera calibration, now live in the Hudl app.',
    tags: ['UI Redesign', 'A/B Testing', 'Live in App',],
    image: '/projects/Hudl/hudlcover.png',
    note: 'shipped to production',
    slug: 'hudl-calibration',
  },  
  // {
  //   title: 'Design to Code Migration',
  //   description:
  //     'A design-to-code workflow built on Figma MCP and IBM Bob (an agentic AI IDE) that lets designers and developers read, edit and generate code straight from Figma, covering everything from React prototypes to Angular builds.',
  //   tags: ['Workflow Planning', 'IDE AI Assistant', 'Figma to Code'],
  //   image: '/projects/design-to-code/codecover.png',
  //   note: 'AI IDE workflow',
  //   slug: 'design-to-code-migration',
  // },
  // {
  //   title: 'Disaster Recovery Assistant',
  //   description:
  //     'AI assistant designed to aid disaster recovery efforts for state residents via mobile SOS texting.',
  //   tags: ['Competitive Analysis', 'User Research', 'Wireframes' ],
  //   image: '/projects/drassistance/drcover2.png',
  //   note: 'proof of concept',
  //   slug: 'dr-assistant',
  // },
  // Additional projects can be added here
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((node, i) => {
              setTimeout(() => node.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="px-6 md:px-12 py-28 max-w-6xl mx-auto">
      {/* Section header */}
      <div className="fade-up flex items-end justify-between mb-14">
        <div>
          <p id="selected-work" className="font-handwritten text-accent/80 text-lg mb-1">selected work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            Projects
          </h2>
        </div>
        <p className="hidden md:block text-sm text-muted-foreground max-w-xs text-right leading-relaxed">
          Projects that reflect how I think, design, and solve.
        </p>
      </div>

      {/* Project rows */}
      <div className="divide-y divide-border">
        {projects.map((project, i) => (
          <Link
            key={project.title}
            href={`/projects/${project.slug}`}
            className="fade-up group block py-10 first:pt-0 last:pb-0 motion-reduce:transition-none"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">

              {/* ── Text side ── */}
              <div className="flex flex-col gap-4 md:order-1">
                {/* Note */}
                <div className="flex items-center gap-3">
                  <span className="font-handwritten text-xs text-accent/60">{project.note}</span>
                </div>

                {/* Title with arrow reveal */}
                <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight text-balance flex items-center gap-2">
                  {project.title}
                  <span
                    aria-hidden="true"
                    className="inline-block translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-200 text-accent motion-reduce:transition-none"
                  >
                    →
                  </span>
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-foreground/70 max-w-md">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Image side ── */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl md:order-2 bg-secondary/40">
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
