'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'Hudl Calibration Redesign',
    description:
      'Redesigned a streamlined experience when manually calibrating the Focus Flex Camera on the Hudl app.',
    tags: ['Product Design', 'Mobile', 'A/B Testing'],
    image: '/projects/Hudl/hudlcover.png',
    year: '2022',
    note: 'shipped to production',
    slug: 'hudl-calibration',
  },
  {
    title: 'BuildMySkincare',
    description:
      'Created a webpage that analyzes skincare routines, recommends personalized routines, and showcases community routines.',
    tags: ['Design Systems', 'Web', 'Figma Make'],
    image: '/projects/Skincare/skincover.png',
    year: '2025',
    note: 'intro to AI prototyping',
    slug: 'skin-analysis',
  },
  {
    title: 'AI Quiz Generator',
    description:
      'Assist faculty members with creating quiz questions through AI generation.',
    tags: ['Workshop Facilitation', 'Prototypes', 'Business Strategy'],
    image: '/projects/aiquiz/quizcover.png',
    year: '2025',
    note: 'proof of technology',
    slug: 'ai-quiz-generator',
  },
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
      <div className="fade-up flex items-end justify-between mb-14">
        <div>
          <p className="font-handwritten text-accent/80 text-lg mb-1">selected work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            Projects
          </h2>
        </div>
        <p className="hidden md:block text-sm text-muted-foreground max-w-xs text-right leading-relaxed">
          A curated set of work that reflects how I think, solve, and design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <Link
            key={project.title}
            href={`/projects/${project.slug}`}
            className="fade-up"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <article className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_oklch(0.62_0.1_230_/_0.10)] h-full">

              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Description overlay */}
                <div className="absolute inset-0 bg-foreground/80 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-primary-foreground text-sm leading-relaxed text-center">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                    <span className="font-handwritten text-xs text-accent/60 whitespace-nowrap">
                      {project.note}
                    </span>
                  </div>
                </div>
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
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
