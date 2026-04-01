'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MockupImage {
  src: string
  alt: string
}

interface ImageCarouselProps {
  images?: MockupImage[]
}

export function ImageCarousel({
  images = [
    { src: '/projects/beacon-app.jpg', alt: 'Calibration flow - Step 1' },
    { src: '/projects/flow-dashboard.jpg', alt: 'Calibration flow - Step 2' },
    { src: '/projects/atlas-system.jpg', alt: 'Calibration flow - Step 3' },
  ],
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsPerPage = 3
  const totalSlides = Math.ceil(images.length / itemsPerPage)

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const currentImages = images.slice(
    activeIndex * itemsPerPage,
    (activeIndex + 1) * itemsPerPage
  )

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return
    setActiveIndex(index)
  }

  const hoverVariants = {
    rest: { y: 0, boxShadow: '0 10px 30px oklch(0.62 0.1 230 / 0.1)' },
    hover: {
      y: -8,
      boxShadow: '0 20px 50px oklch(0.62 0.1 230 / 0.18)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }

  const cascadeVariants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 0.04,
        staggerChildren: 0.18,
      },
    },
  }

  const wireframeVariants = {
    hidden: { opacity: 0, scale: 0.985, y: 10 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 22,
        mass: 0.35,
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* 3 Mockups Display */}
      <div className="relative w-full overflow-hidden min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
        <motion.div
          key={activeIndex}
          variants={cascadeVariants}
          initial="hidden"
          animate="show"
          className="absolute inset-0 flex items-end justify-center gap-4 md:gap-6 lg:gap-8 w-full"
        >
          {currentImages.map((image, i) => (
            <motion.div key={`${image.src}-${i}`} variants={wireframeVariants} whileHover="hover">
              <motion.div variants={hoverVariants} className="relative">
            {/* Phone Frame */}
                <div className="relative mx-auto w-32 sm:w-36 md:w-44 lg:w-48 rounded-3xl border-6 sm:border-7 md:border-8 border-foreground/20 bg-foreground/5 overflow-hidden shadow-xl">
                  {/* Screen */}
                  <div className="relative w-full aspect-[9/19.5] bg-background">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, (max-width: 1024px) 192px, (max-width: 1280px) 208px, 208px"
                    />
                  </div>

              {/* Notch
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground rounded-b-2xl z-20" /> */}

                </div>

            {/* Label */}
                <p className="mt-3 text-xs font-medium text-muted-foreground text-center">
                  {/* Screen {activeIndex * itemsPerPage + i + 1} */}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dot Navigation */}
      {totalSlides > 1 && (
        <motion.div
          className="flex items-center justify-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            aria-label="Previous slide group"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${index === activeIndex
                ? 'w-2.5 h-2.5 bg-accent'
                : 'w-2 h-2 bg-foreground/20 hover:bg-foreground/40'
                }`}
              aria-label={`Go to slide group ${index + 1}`}
            />
          ))}
          </div>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            aria-label="Next slide group"
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
