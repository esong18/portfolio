'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ContainerScroll } from '@/components/container-scroll'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowUp, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

// ──────────────────────────────────────────────────────────────────────────────
// IMAGE CAROUSEL
// ──────────────────────────────────────────────────────────────────────────────

function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const images = [
    { src: '/projects/Skincare/quiz.png', alt: 'Quiz questionnaire' },
    { src: '/projects/Skincare/quiz-results.png', alt: 'Questionnaire results' },
    { src: '/projects/Skincare/analysis-morning.png', alt: 'Routine Analysis- 1' },
    { src: '/projects/Skincare/analysis-night.png', alt: 'Routine Analysis- 2' },
    { src: '/projects/Skincare/community.png', alt: 'Community Routines' },
  ]

  useEffect(() => {
    if (expandedIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedIndex(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [expandedIndex])

  const showPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const showNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === activeIndex) return
    setActiveIndex(nextIndex)
  }

  return (
    <>
      <div className="w-full space-y-4">
        <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.35 }}
            className="absolute inset-0 w-full h-full group"
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
            {/* Expand Icon */}
            <button
              onClick={() => setExpandedIndex(activeIndex)}
              className="absolute z-10 bottom-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Expand image"
              title="Expand image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
        </div>

        {/* Carousel dots */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={showPrev}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            aria-label="Previous image"
            title="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-accent w-8' : 'bg-border hover:bg-muted-foreground'
                  }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={showNext}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            aria-label="Next image"
            title="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Image counter */}
        <div className="text-center text-xs text-muted-foreground">
          {activeIndex + 1} of {images.length}
        </div>
      </div>

      {/* Lightbox Modal */}
      {expandedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExpandedIndex(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setExpandedIndex(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              aria-label="Close expanded image"
              title="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6l-12 12M6 6l12 12" />
              </svg>
            </button>

            {/* Expanded Image */}
            <div className="relative w-full h-[70vh] max-h-[80vh] rounded-lg overflow-hidden bg-background border border-foreground/10">
              <Image
                src={images[expandedIndex].src}
                alt={images[expandedIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Image Counter in Modal */}
            <div className="text-center text-sm text-foreground/70 mt-4">
              {expandedIndex + 1} of {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

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
    title: 'Competitive Analysis',
    description:
      'I looked at existing skincare apps, websites, and how people often asked skincare questions. The idea for this project came from many hours on skincare subreddits.',
    image: '/projects/Skincare/skin-step1.png',
  },
  {
    number: 2,
    title: 'Ideation > Experience',
    description:
      'My research informed me of the gaps between different sites: no one had it all. From this, I drafted potentials flows for how a user would interact with the site, narrowing down to three main areas that were most commonly searched for.',
    bullets: [
      'Ingredient compatability',
      'Creating a personalized routine',
      'Routines from others with similar skin concerns.',
    ],
    image: '/projects/Skincare/skin-step2.png',
  },
  {
    number: 3,
    title: 'Wireframes',
    description:
      'I created a style guide to establish an identity for the site, and used that to draft initial wireframes. I worked with a software engineer to determine feasibility for different features — because good design doesn\'t need to be complicated.',
    image: '/projects/Skincare/skin-step3.png',
  },
  {
    number: 4,
    title: 'AI Prototyping',
    description:
      'With the wireframes I had polished, I utilzied Figma Make to help me iterate on my designs and fill in the blanks. It helped populate text, created a more structured look, and helped give inspiration for the next iteration.',
    image: '/projects/Skincare/skin-step4.png',
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
              <p className="font-handwritten text-accent/70 text-base md:text-lg mb-4 pt-4">web design</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto mb-4">
                Skincare, Simplified
              </h2>
              <p className="text-base mb-10 md:text-lg text-foreground/70 max-w-2xl mx-auto">
                Bringing routine building, ingredient analysis, and compatibility checking all in one place — so skincare finally makes sense.
              </p>
            </motion.div>
          }
        >
          <div className="w-full h-auto bg-gradient-to-br from-secondary/50 to-background rounded-2xl">
            <div className="w-full h-auto relative rounded-xl overflow-hidden bg-foreground/5">
              <Image
                src="/projects/Skincare/skinheader.png"
                alt="Skincare Analysis"
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg"
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
                Skincare should be simple — but between conflicting ingredients, misleading marketing, and paywalled apps, building a routine that actually works feels overwhelming. After going down my own skincare rabbit hole, I noticed a gap: no tool combined routine building, ingredient checking, and compatibility analysis in one place.
              </p>
              <p className="text-foreground/80 leading-relaxed">

              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">The Solution</h3>
              <p className="text-foreground/80 leading-relaxed">
                I prototyped a webapp to address these gaps.
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
                title: 'Discovery & Research',
                items: ['Competitive Analysis', 'User Flow'],
              },
              {
                title: 'Design & Prototyping',
                items: ['Wireframing', 'Figma Make for Iterations', 'Style Guide Creation'],
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Prototypes</h2>
            <p className="text-foreground/80 leading-relaxed">
              A simple website that achieves it all: craft a personalized routine, view community routines, and check the compatibility of ingredients in your current routine. This was a self guided project to grow my familiarity designing with AI and to create a passion project for my interests- the design is consistently being refined in my free time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ImageCarousel />
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
                title: 'Personalized Skincare Routine (Slide 1-2)',
                description: 'After a short quiz, the app curates a routine based on user concerns and climate—offering clear direction in an otherwise overwhelming product landscape..',
              },
              {
                title: 'Ingredient Compatability Analysis (Slide 3-4)',
                description: 'Because some ingredients enhance absorption while others conflict, the compatibility insights and shows users how their specific routine performs.',
              },
              {
                title: 'Community Routines (Slide 5)',
                description: 'Users tend to trust widely used products that directly address their concerns. I wanted a feature that showed community-backed options in a space separate from paid promotions.',
              },

            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="pl-4 border-l-3 border-accent"
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
