'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { ContainerScroll } from '@/components/container-scroll'
import { ImageCarousel } from '@/components/image-carousel'
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
      'To understand where users were feeling frustrated, I conducted the following research:',
    ],
    bullets: [
      'Analyzed past testing reviews from users via Dovetail',
      'Sent surveys to beta users',
      'Attempted the calibration myself as a new user',
    ],
    image: '/projects/Hudl/hudl-process-step1.png',
  },
  {
    number: 2,
    title: 'Pin Design',
    description: [
      'From this research, I found that most users struggled with the color, shape, and usability with the existing pin.',
    ],
    bullets: [
      'The white color of the pin got lost on a bright screen',
      'The pin shape led users confused on if the circle or the point needed to be in the corner',
      'Users would drag the pin with their thumb, covering the entire pin.',
    ],
    image: '/projects/Hudl/hudl-process-step1.png',
  },
  {
    number: 3,
    title: 'Ideation',
    description: [
      'After sketching and consulting with engineers and designers, we explored two approaches — calibrating with two pins at once vs. one-at-a-time — and built clickable Figma prototypes for both. In addition to building these prototypes, I tested various floating navigation and visual aids optimized for thumb use, iterating with the design team to land on a final structure.',
    ],
    image: '/projects/Hudl/hudl-process-step3.png',
  },
  {
    number: 4,
    title: 'A/B User Testing',
    description: [
      'The testing focused on two scenarios: one where the user plotted two pins on a time (half the field at once), and the other scenario where the user plots one point at a time. I led the testing interviews for 10 beta users.',
    ],
    image: '/projects/Hudl/hudl-process-step4.png',
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
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${activeStep >= idx
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
          showCard={false}
          titleComponent={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="font-handwritten text-accent/70 text-base md:text-lg mb-4 pt-4">mobile design</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto mb-4">
                A New Calibration Experience
              </h2>
              <p className="text-base mb-30 md:text-lg text-foreground/70 max-w-2xl mx-auto">
                Turned a frustrating multi-step calibration process into a guided, user-tested experience that gets cameras set up right the first time.
              </p>
            </motion.div>
          }
        >
          <div className="flex items-end justify-center gap-4 md:gap-8 lg:gap-12 h-full py-4 md:py-8">
            {[
              { src: '/projects/Hudl/aim-camera.png', alt: 'Calibration instructions' },
              { src: '/projects/Hudl/pin1.png', alt: 'Calibration flow - Screen 2' },
              { src: '/projects/Hudl/calibrated.png', alt: 'Calibration flow - Screen 3' },
            ].map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.33, 1, 0.36, 1] }}
                whileHover={{ y: -16, transition: { duration: 0.3 } }}
                style={{ marginTop: [0, -16, 0][i] }}
              >
                <div className="relative mx-auto w-48 sm:w-56 md:w-64 lg:w-72 rounded-3xl border-8 md:border-10 border-foreground/20 bg-foreground/5 overflow-hidden shadow-2xl">
                  <div className="relative w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={500}
                      height={900}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            ))}
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
                Hudl's Focus Flex Camera relies on machine learning to identify field endpoints and orient recording automatically. When ML calibration falls short, users are handed a manual calibration flow as a fallback — a process that currently leaves users confused and frustrated.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">The Solution</h3>
              <p className="text-foreground/80 leading-relaxed">
                Reimagined the calibration process with a one-pin-at-a-time validation process. The final design, tested by beta users, was a high-fidelity prototype that was implemented into the app.
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
                title: 'Discovery & Research',
                items: ['User interviews', 'Survey Creation', 'Consolidating research to insights'],
              },
              {
                title: 'Design & Prototyping',
                items: ['Pin Redesign', 'High-fidelity prototypes', 'Interactive flows'],
              },
              {
                title: 'Testing & Validation',
                items: ['A/B user testing', 'Physical hardware testing'],
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="font-handwritten text-accent/80 text-lg mb-2">outcomes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Final Prototypes</h2>
            <p className="text-foreground/80 leading-relaxed">
              The final design was a guided, one-pin-at-a-time calibration flow. This design was implemented into the app — you can view it{' '}
              <Link
                href="https://support.hudl.com/s/article/calibrate-focus-flex?language=en_US&topic=Set_Up_Focus_Flex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                here
              </Link>
              .
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ImageCarousel
              images={[
                { src: '/projects/Hudl/tripod.png', alt: 'Tripod instructions' },
                { src: '/projects/Hudl/aim-camera.png', alt: 'Camera calibration instructions' },
                { src: '/projects/Hudl/start-calibration.png', alt: 'Start calibration ' },
                { src: '/projects/Hudl/pin1.png', alt: 'Placing pin 1' },
                { src: '/projects/Hudl/pin2.png', alt: 'Placing pin 2' },
                { src: '/projects/Hudl/pin3.png', alt: 'Placing pin 3' },
                { src: '/projects/Hudl/pin4.png', alt: 'Placing pin 4' },
                { src: '/projects/Hudl/load.png', alt: 'Calibration loading' },
                { src: '/projects/Hudl/calibrated.png', alt: 'Calibration is a success!' },
              ]}
            />
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
                title: 'Giving Coaches More Confidence',
                description: 'Coaches can see exactly where each pin lands and trust that calibration will succeed.',
              },
              {
                title: 'Saving Time Searching for Corners',
                description: 'No more zooming and searching — each corner is pre-framed so users can place pins quickly and confidently.',
              },
              {
                title: 'Easy-to-Use Pin',
                description: 'The new pin design is easy to understand and see on a mobile screen.',
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

      {/* Testimonials */}
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full p-10 rounded-lg bg-secondary border border-border text-center"
          >
            <p className="text-xl md:text-2xl font-bold text-accent mb-6">
              &ldquo;It&apos;s a lot easier. I love this new calibration… It&apos;s been easy and quick and a lot more simplified than the previous one…
              <br /><br />
              The fact that you know where you&apos;re plotting it — you&apos;re not guessing which pin goes where. You know exactly where you need to find it.&rdquo;
            </p>
            <p className="text-xs text-muted-foreground">Adam Hunter, Boys Academy Director at Century United</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main >
  )
}
