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
    title: 'Workshop Facilitations',
    description:
      'Facilitated a client workshop to identify current/desired experiences for end users (students, faculty) and current data sources.',
    image: '/projects/aiquiz/quiz-step1.png',
  },
  {
    number: 2,
    title: 'The Data',
    description:
      'Partnered with engineers to explore the types of data we had access to to train AI models. This helped narrow our project scope to meet expectations and timelines.',
    image: '/projects/aiquiz/quiz-step2.png',
  },
  {
    number: 3,
    title: 'The Experience',
    description:
      'Mentored a summer intern to lead desgining the user flow and sketches of interactions we would show through wireframes. She led the conversation to present the flow to the client for feedback and approval.',
    image: '/projects/aiquiz/quiz-step3.png',
  },
  {
    number: 4,
    title: 'The Design',
    description:
      'Transformed sketches to wireframes on Figma, and coordinating with a front-end developer to bring our designs to life.',
    image: '/projects/aiquiz/quiz-step4.png',
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
                <div className="flex-shrink-0">
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
              <p className="font-handwritten text-accent/70 text-base md:text-lg mb-4">web design / proof of technology</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto mb-4">
                Quiz Question Generator
              </h2>
              <p className="text-base mb-10 md:text-lg text-foreground/70 max-w-2xl mx-auto">
                An AI-generated quiz platform that automates question generation to reduce workload for medical faculty.
              </p>
            </motion.div>
          }
        >
          <div className="w-full h-full bg-gradient-to-br from-secondary/50 to-background rounded-2xl flex items-center justify-center">
            <div className="w-full h-full relative rounded-xl overflow-hidden flex items-center justify-center bg-foreground/5 p-4 md:p-8">
              <Image
                src="/projects/aiquiz/quizcover.png"
                alt="AI quiz platform"
                fill
                className="object-cover object-top rounded-lg"
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
                The time faculty members spend on creating, grading, and revising course material and exams is high. To create weekly quizzes on top a significant amount of work, but they still want to support the students' learning.
              </p>
              <p className="text-foreground/80 leading-relaxed">

              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">The Solution</h3>
              <p className="text-foreground/80 leading-relaxed">
                The final design utilized AI to generate questions for student recall and understanding of classroom concepts. The model takes in course material, generates questions, and faculty can easily approve or edit. The final design was non-committal, intended to help demonstrate a proof of technology.
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
                title: 'Workshop Facilitation',
                items: ['Led client workshop', 'As-is and To-be scenarios', 'Understanding existing data'],
              },
              {
                title: 'Design & Prototyping',
                items: ['Wireframing', 'Figma Make for Iterations', 'Style Guide Creation'],
              },
              {
                title: 'Design Mentor',
                items: ['Mentored a summer intern throughout the process, working to create designs together and present it to the client.'],
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Quiz Platform</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              The solution was a dynamic, clickable prototype with an AI model implemented to help with question generation.
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/80">
              <li>Faculty can upload course material and learning objectives to base the generated questions off of</li>
              <li>Faculty can easily accept or reject questions to create a quiz</li>
              <li>Students now have the opportunity to quiz themselves on course material</li>
              <li>Students get immediate feedback on quiz performance</li>
            </ul>
            <p className="mt-3 text-foreground/80">
              This solution follows department goals of a flipped classroom, where medical students gain initial exposure to new material outside of class and use class time for higher-order activities.
            </p>
          </motion.div>

          {/* Faculty Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Faculty Experience
            </h3>
            <div className="w-full rounded-lg overflow-hidden border border-border bg-secondary/30">
              <div className="relative w-full aspect-video">
                <iframe
                  title="Faculty experience Figma prototype"
                  src="https://embed.figma.com/proto/vb3acof1lOEZIj7bLqx0P0/AI-Quiz?node-id=1-1174&viewport=349%2C429%2C0.09&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A1174&page-id=0%3A1&embed-host=share"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-16"
          >
            {[
              {
                title: 'Easily Manage Questions',
                description: 'When creating a quiz, faculty can provide example questions to guide the generation. They can also easily approve, deny, or edit generated questions.',
              },
              {
                title: 'See Class Insights',
                description: 'Faculty can view the insights tab, seeing areas of strength and needed improvement based on quiz results.',
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

          {/* Student Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Student Experience
            </h3>
            <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/projects/aiquiz/student.png"
                alt="Student quiz screen"
                fill
                className="object-cover object-top"
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
                title: 'Flipped Classroom',
                description: 'Students can test their knowledge outside of class and spend class time reviewing concepts they need assistance in.',
              },
              {
                title: 'Course Insights',
                description: 'Students can see what concepts or categories they are strong in, and what areas they should work to improve on after taking the quiz.',
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
