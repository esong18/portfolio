'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ContainerScroll } from '@/components/container-scroll'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowUp, ArrowLeft } from 'lucide-react'

// ──────────────────────────────────────────────────────────────────────────────
// PROCESS STEPPER WITH SCROLL INDICATOR (No Annotations)
// ──────────────────────────────────────────────────────────────────────────────

interface ProcessStep {
  number: number
  title: string
  description: string
  image: string
  bullets?: string[]
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Client Discovery',
    description:
      'Interviewed the client to understand their vision for an enterprise-wide widget library and the challenges of refactoring widgets manually.',
    image: '/projects/design-to-code/Dashboard.png',
  },
  {
    number: 2,
    title: 'Assessing the Architecture',
    description:
      'Reviewed the existing React component library against the new micro-UI architecture standards to define migration requirements.',
    image: '/projects/design-to-code/Architecture.png',
  },
  {
    number: 3,
    title: 'Defining the Steps',
    description:
      'Authored a lab guide detailing the full migration process — making it repeatable and executable by others.',
    image: '/projects/design-to-code/workflow.png',
  },
  {
    number: 4,
    title: 'Documentation',
    description:
      'Transformed sketches to wireframes on Figma, and coordinating with a front-end developer to bring our designs to life.',
    image: '/projects/design-to-code/guide-white.png',
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

      {/* Steps container */}
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
                {/* Circular step indicator */}
                <div className="flex-shrink-0 -ml-6 md:ml-0">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${activeStep >= idx
                      ? 'bg-accent text-primary-foreground shadow-lg scale-110'
                      : 'bg-secondary text-muted-foreground'
                      }`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Step content */}
                <div className="flex-1 md:mt-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/80 mb-0">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Image (right on desktop) */}
            <div className={`md:col-span-1 ${idx % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
              <div className="relative group">
              <div className="relative w-full h-64 md:h-80">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
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

export default function HudlCasePage() {
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

      {/* Prototype Showcase */}
      <section className="relative w-full">
        <Navbar />
        <ContainerScroll
          titleComponent={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="font-handwritten text-accent/70 text-base md:text-lg mb-4 pt-4">design engineering / proof of technology</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto mb-4">
                Widget Code Refactoring
              </h2>
              <p className="text-base mb-10 md:text-lg text-foreground/70 max-w-2xl mx-auto">
               An AI-powered guided workflow for refactoring widgets into a component library for a new micro-UI architecture.
              </p>
            </motion.div>
          }
        >
          <div className="w-full bg-gradient-to-br from-secondary/50 to-background rounded-2xl">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-foreground/5">
              <Image
                src="/projects/design-to-code/guide.png"
                alt="lab guide"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground"> Project Overview</h2>
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
              <p className="text-foreground/80 leading-relaxed mb-4">
                The client's current widget refactoring process is labor intensive yet needed for a micro-UI initiative.
              </p>
              <p className="text-foreground/80 leading-relaxed">

              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">The Solution</h3>
              <p className="text-foreground/80 leading-relaxed">
                Designed a repeatable framework for automating widget rebuilding, documented as a step-by-step guide.
              </p>
              {/* <div className="mt-6 flex flex-wrap gap-2">
                {['Product Design', 'Mobile UX', 'A/B Testing'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                    {tag}
                  </span>
                ))}
              </div> */}
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
                title: 'Technical Discovery',
                items: ['Figma Make designs and export capabilities'],
              },
              {
                title: 'Workflow Design (with Engineers)',
                items: ['Diagrammed the conversion flow', 'Designed step-by-step guide for the AI IDE to execute'],
              },
              {
                title: 'Documentation',
                items: ['Authored a lab guide for the migration process', 'Final playback back to client'],
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

      {/* Outcomes with Carousel */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-border">
        <div className="max-w-5xl mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="font-handwritten text-accent/80 text-lg mb-2">outcomes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Repeatable Refactoring Framework</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              The widget refactoring process is currently very manual, limiting scalability for a growing component library. This repeatable framework automates the process, accelerating conversion timelines while maintaining consistency and quality against enterprise architecture standards.
            </p>
            <p className="mt-3 text-foreground/80">
              By demonstrating how tools like IBM Bob can drive refactoring at speed, the team unlocked meaningful time and cost savings, giving the client a faster, more reliable path to modernization enterprise-wide.
            </p>
          </motion.div>

          {/* Student Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >

            <div className="relative w-full h-64 md:h-[500px] rounded-lg overflow-hidden bg-secondary/30">
              <Image
                src="/projects/design-to-code/main.png"
                alt="IBM Bob in action"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          >
            {[
              {
                title: 'Accelerated Widget to Micro-UI Conversion',
                description: 'Developers can now leverage production-ready architectural guidance to accelerate widget modernization across teams.',
              },
              {
                title: 'Independent Deployment and Adaptability to Widget Variations',
                description: 'Micro-UI components can be independently deployed andadjusted without disrupting upstream systems.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="pl-4 border-l-2 border-accent"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/80">{feature.description}</p>
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

      {/* Impact & Results
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="font-handwritten text-accent/80 text-lg mb-2">results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Testimonials</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { metric: '96.3%', label: 'Success Rate', sublabel: 'up from 60%' },
              { metric: '47%', label: 'Time Reduction', sublabel: 'avg calibration time' },
              { metric: '89%', label: 'User Satisfaction', sublabel: 'post-launch survey' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-secondary border border-border text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-1">{item.metric}</p>
                <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sublabel}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      <Footer />
    </main >
  )
}
