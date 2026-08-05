'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { ContainerScroll } from '@/components/container-scroll'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowUp, ArrowLeft } from 'lucide-react'

// ──────────────────────────────────────────────────────────────────────────────
// PROCESS STEPPER
// ──────────────────────────────────────────────────────────────────────────────

interface ProcessStep {
  number: number
  title: string
  description: string[]
  image: string
  bullets?: string[]
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'User Research',
    description: [
      'Interviewed users affected by recent natural disasters',
    ],
    image: '/projects/drassistance/drcover.png',
  },
  {
    number: 2,
    title: 'Ideation & Competitive Analysis',
    description: [
      'Ideated on potential solutions and conducted competitive analysis on relief efforts an design choices',
    ],
    image: '/projects/drassistance/drcover.png',
  },
  {
    number: 3,
    title: 'Style Guide & Wireframes',
    description: [
      'Creating a style guide to fit the client and beginning initial wireframes',
    ],
    image: '/projects/drassistance/drcover.png',
  },
  {
    number: 4,
    title: 'Telling the Story',
    description: [
      'Created a persona. to assist in the final walkthrough to the client.',
    ],
    image: '/projects/drassistance/drcover.png',
  },
]

function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: containerRef })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const stepIndex = Math.min(Math.floor(latest * 4), 3)
      setActiveStep(stepIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div ref={containerRef} className="relative py-20 md:py-32">
      {/* Vertical progress line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-border md:-translate-x-1/2">
        <motion.div
          className="w-full bg-accent"
          style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
        />
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-20 md:space-y-32">
        {processSteps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: false, margin: '-100px' }}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
          >
            {/* Step marker & content */}
            <div className={`md:col-span-1 ${idx % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
              <div className="flex gap-4 md:flex-col">
                <div className="shrink-0 -ml-6 md:ml-0">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      activeStep >= idx
                        ? 'bg-accent text-primary-foreground shadow-lg scale-110'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step.number}
                  </div>
                </div>

                <div className="flex-1 md:mt-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <div className="space-y-3">
                    {step.description.map((line, i) => (
                      <p key={i} className="text-sm leading-relaxed text-foreground/80">
                        {line}
                      </p>
                    ))}
                  </div>
                  {step.bullets && (
                    <ul className="mt-3 space-y-1">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                          <span className="text-accent flex-shrink-0 leading-none -translate-y-px">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className={`md:col-span-1 ${idx % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
              <div className="relative w-full h-64 md:h-80 ml-12 md:ml-0">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────────────────────────────────────────

export default function DrAssistantPage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const overviewRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (overviewRef.current) {
        const overviewBottom = overviewRef.current.getBoundingClientRect().bottom + window.scrollY
        setShowBackToTop(latest > overviewBottom)
      }
    })
    return () => unsubscribe()
  }, [scrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-background relative">
      {/* Back to Home Button */}
      <Link
        href="/#projects"
        className="absolute top-20 left-6 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-foreground/60 hover:text-foreground hover:bg-secondary/50 transition-all duration-300 opacity-70 hover:opacity-100"
        title="Back to home"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to projects</span>
      </Link>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-accent text-primary-foreground flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      {/* Hero Showcase */}
      <section className="relative w-full">
        <Navbar />
        <ContainerScroll
          showCard={false}
          titleComponent={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="font-handwritten text-accent/70 text-base md:text-lg mb-4 pt-4">AI-assisted clinical tool</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto mb-4">
                Dr. Assistant
              </h2>
              <p className="text-base mb-30 md:text-lg text-foreground/70 max-w-2xl mx-auto">
                An AI-powered documentation tool designed to reduce administrative burden for physicians and give time back to patient care.
              </p>
            </motion.div>
          }
        >
          <div className="flex items-center justify-center h-full py-4 md:py-8">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-border"
            >
              <Image
                src="/projects/drassistance/drcover.png"
                alt="Dr. Assistant interface"
                width={1200}
                height={750}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </ContainerScroll>
      </section>

      {/* Context & Problem */}
      <section ref={overviewRef} className="px-6 md:px-12 py-16 md:py-24 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="font-handwritten text-accent/80 text-lg mb-2">context</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Project Overview</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <h3 className="font-semibold text-foreground mb-3">The Challenge</h3>
              <p className="text-foreground/80 leading-relaxed">
                Physicians spend an estimated 2 hours on documentation for every 1 hour of patient care. Existing tools are rigid and create cognitive overhead rather than reducing it.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">The Solution</h3>
              <p className="text-foreground/80 leading-relaxed">
                A contextual AI assistant embedded into the clinical workflow — surfacing smart templates, generating draft notes, and adapting to each physician's documentation style.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* My Role */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="font-handwritten text-accent/80 text-lg mb-2">my role</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What I Owned</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Research & Discovery',
                items: ['Physician interviews', 'Workflow observation', 'Pain point synthesis'],
              },
              {
                title: 'Design & Prototyping',
                items: ['Interaction design', 'High-fidelity Figma prototypes', 'AI interface patterns'],
              },
              {
                title: 'Testing & Iteration',
                items: ['Moderated usability testing', 'Stakeholder reviews', 'Iterative refinement'],
              },
            ].map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-background border border-border"
              >
                <h3 className="font-semibold text-foreground mb-4">{role.title}</h3>
                <ul className="space-y-2">
                  {role.items.map((item) => (
                    <li key={item} className="text-sm text-foreground/80 flex items-center gap-2">
                      <span className="text-accent flex-shrink-0 leading-none -translate-y-px">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-border">
        <div className="max-w-5xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-handwritten text-accent/80 text-lg mb-2">methodology</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Process</h2>
          </motion.div>
        </div>

        <ProcessSection />
      </section>

      <Footer />
    </main>
  )
}
