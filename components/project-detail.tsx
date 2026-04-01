'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import React from 'react'

// ─── Journal texture helpers (structural only — no font overrides) ────────────

const ruledLinesBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='lines' x='0' y='0' width='100%25' height='32' patternUnits='userSpaceOnUse'%3E%3Cline x1='0' y1='31.5' x2='100%25' y2='31.5' stroke='%23c8b89a' stroke-width='0.5' stroke-opacity='0.38'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23lines)' width='100%25' height='100%25'/%3E%3C/svg%3E")`

const marginLineBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cline x1='72' y1='0' x2='72' y2='100%25' stroke='%23c9645f' stroke-width='1' stroke-opacity='0.25'/%3E%3C/svg%3E")`

const stickyColors = ['#f0d080', '#b8d9c0', '#f5c4b8', '#c5d6f0', '#e8c9f0']

// ─── Washi tape strip ─────────────────────────────────────────────────────────

function WashiTape({
  colorIndex = 0,
  rotation = -7,
  className = '',
}: {
  colorIndex?: number
  rotation?: number
  className?: string
}) {
  return (
    <div
      className={`absolute z-20 w-10 h-3 rounded-[2px] pointer-events-none ${className}`}
      style={{
        backgroundColor: stickyColors[colorIndex % stickyColors.length],
        opacity: 0.82,
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.13)',
      }}
    />
  )
}

// ─── Journal page section wrapper ─────────────────────────────────────────────

function JournalSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`relative bg-background ${className}`}>
      {/* Ruled lines */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: ruledLinesBg, backgroundSize: '100% 32px' }}
      />
      {/* Red margin line */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: marginLineBg }}
      />
      {/* Spine left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-4 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, rgba(200,184,154,0.35), transparent)' }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProcessStep {
  title: string
  description: string
}

export interface SolutionFeature {
  title: string
  description: string
}

export interface ProjectDetailProps {
  title: string
  subtitle?: string
  overview: string
  overviewDescription?: string
  processSteps: ProcessStep[]
  processDescription?: string
  solutionFeatures: SolutionFeature[]
  solutionDescription?: string
  solutionImage?: string
  tags?: string[]
  metrics?: { label: string; value: string }[]
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProjectDetail({
  title,
  subtitle,
  overview,
  overviewDescription,
  processSteps,
  processDescription,
  solutionFeatures,
  solutionDescription,
  solutionImage,
  tags,
  metrics,
}: ProjectDetailProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const nodes = el.querySelectorAll('.fade-up')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen bg-background">
      <style>{`
        .fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ── Hero / Title ─────────────────────────────────────────────────── */}
      <JournalSection className="px-6 md:px-12 py-16 md:py-28 border-b border-border">
        <div className="max-w-6xl mx-auto pl-10">
          <div className="fade-up mb-2">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground text-balance mb-2">
              {title}
            </h1>
            {/* Hand-drawn underline */}
            <svg viewBox="0 0 320 10" width="320" height="10" fill="none" className="mb-3">
              <path
                d="M2 6.5 C60 2.5, 130 9, 190 5 S270 2, 318 7"
                stroke="#c9645f"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
            {subtitle && (
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Tags as lightly tinted sticky notes */}
          {tags && tags.length > 0 && (
            <div className="fade-up flex flex-wrap gap-2 mt-6">
              {tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-sm"
                  style={{
                    backgroundColor: stickyColors[i % stickyColors.length] + 'aa',
                    color: 'var(--foreground)',
                    transform: `rotate(${[-1.2, 0.9, -0.6, 1.1, -0.5][i % 5]}deg)`,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </JournalSection>

      {/* ── Project Overview ──────────────────────────────────────────────── */}
      <JournalSection className="px-6 md:px-12 py-16 md:py-20 border-b border-border">
        <div className="max-w-6xl mx-auto pl-10">
          <div className="fade-up mb-8">
            <p className="font-handwritten text-accent/80 text-lg mb-2">overview</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Project Overview
            </h2>
          </div>

          <div className="fade-up grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-base leading-relaxed text-foreground/90 mb-4">
                {overview}
              </p>
              {overviewDescription && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {overviewDescription}
                </p>
              )}
            </div>

            {/* Metrics as sticky note cards */}
            {metrics && metrics.length > 0 && (
              <div className="space-y-4">
                {metrics.map((metric, i) => (
                  <div
                    key={metric.label}
                    className="p-4 rounded-sm"
                    style={{
                      backgroundColor: stickyColors[i % stickyColors.length] + 'bb',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.09)',
                      transform: `rotate(${[-1, 0.8, -0.6][i % 3]}deg)`,
                    }}
                  >
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      {metric.label}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-accent">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </JournalSection>

      {/* ── The Process ───────────────────────────────────────────────────── */}
      <JournalSection className="px-6 md:px-12 py-16 md:py-20 border-b border-border">
        <div className="max-w-6xl mx-auto pl-10">
          <div className="fade-up mb-8">
            <p className="font-handwritten text-accent/80 text-lg mb-2">methodology</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              The Process
            </h2>
          </div>

          {processDescription && (
            <div className="fade-up mb-8">
              <p className="text-base leading-relaxed text-foreground/90">
                {processDescription}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="fade-up relative p-5 rounded-sm"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  backgroundColor: 'rgba(255,255,255,0.35)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-handwritten text-sm text-muted-foreground opacity-60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </JournalSection>

      {/* ── The Solution ──────────────────────────────────────────────────── */}
      <JournalSection className="px-6 md:px-12 py-16 md:py-20 border-b border-border">
        <div className="max-w-6xl mx-auto pl-10">
          <div className="fade-up mb-8">
            <p className="font-handwritten text-accent/80 text-lg mb-2">outcome</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              The Solution
            </h2>
          </div>

          {solutionDescription && (
            <div className="fade-up mb-12">
              <p className="text-base leading-relaxed text-foreground/90 max-w-2xl">
                {solutionDescription}
              </p>
            </div>
          )}

          {/* Solution image — large taped-in polaroid */}
          {solutionImage && (
            <div className="fade-up mb-14 relative">
              <WashiTape colorIndex={0} rotation={-5} className="top-[-6px] left-8" />
              <WashiTape colorIndex={1} rotation={5} className="top-[-6px] right-8" />
              <WashiTape colorIndex={2} rotation={3} className="bottom-2 left-8" />
              <WashiTape colorIndex={3} rotation={-4} className="bottom-2 right-8" />
              <div
                className="overflow-hidden"
                style={{
                  border: '5px solid white',
                  borderRadius: '2px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.16)',
                  transform: 'rotate(-0.4deg)',
                }}
              >
                <div className="relative w-full h-96 md:h-[500px]">
                  <Image
                    src={solutionImage}
                    alt={`${title} solution`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
                {/* Polaroid caption strip */}
                <div className="py-2 px-4 text-center bg-white">
                  <p className="font-handwritten text-sm text-muted-foreground">
                    {title} — final design
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Solution features — left accent border per feature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className="fade-up pl-4"
                style={{
                  borderLeft: `3px solid ${stickyColors[i % stickyColors.length]}`,
                }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </JournalSection>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <JournalSection className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-6xl mx-auto pl-10 text-center">
          <div className="fade-up">
            <p className="font-handwritten text-accent/60 text-sm mb-1">— until next time</p>
            <p className="text-muted-foreground mb-6">
              Interested in discussing a project?
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 bg-background text-sm font-medium text-foreground hover:bg-foreground hover:text-primary-foreground transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md"
            >
              Get in Touch
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
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <div className="mt-4">
              <a
                href="/#projects"
                className="font-handwritten text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← back to all projects
              </a>
            </div>
          </div>
        </div>
      </JournalSection>

    </div>
  )
}