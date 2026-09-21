'use client'

import { StartingFiveCard } from './starting-five-card'

const photoStrip = [
  { src: '/hiking.jpeg', alt: 'Hiking outdoors', className: 'w-auto' },
  { src: '/basketball.JPEG', alt: 'Playing basketball', className: 'w-auto' },
  { src: '/nails.jpeg', alt: 'Nail art design', className: 'w-auto' },
  { src: '/vlog.jpg', alt: 'Vlogging / video diary', className: 'aspect-[3/5] object-cover' },
  { src: '/explore.jpg', alt: 'Exploring and travels', className: 'w-auto' },
]

export function AboutBody() {
  return (
    <section className="px-6 md:px-12 py-10 md:py-14 max-w-6xl mx-auto">

      {/* Narrative */}
      <div className="max-w-2xl">
        <p className="font-handwritten text-accent/80 text-lg mb-2">my story</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
          How I got here.
        </h2>
        <div className="space-y-4">
          <p className="text-base text-foreground/80 leading-relaxed">
            For me, user experience design is the perfect bridge between creativity and technology. From a young age, I was inspired by the art of storytelling and creating memorable experiences — whether immersing myself in film and lyrical narratives, participating in radio journalism, or filling notebooks with stories.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">
            Growing up in this age of technology, I've seen how my interests align with the industry: crafting user-friendly and enjoyable experiences with technology is, in itself, a form of storytelling. Decreasing the unfamiliarity of new technologies while crafting engaging experiences is what drives me as a designer.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '56px' }} />


      
      <div>
        <div className="max-w-2xl">
          <p className="font-handwritten text-accent/80 text-lg mb-2">the other stuff</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
            Beyond the work.
          </h2>

          {/* Photo strip */}
          <div className="flex flex-nowrap items-center gap-2 sm:gap-3 justify-start mb-6 overflow-x-auto no-scrollbar">
            {photoStrip.map((photo, index) => (
              <img
                key={index}
                src={photo.src}
                alt={photo.alt}
                className={`h-[140px] sm:h-[155px] md:h-[165px] rounded-xl border border-border/60 shadow-sm flex-shrink-0 ${photo.className || 'w-auto object-contain'}`}
              />
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-base text-foreground/80 leading-relaxed">
              You can find me eating my way through the city, exploring nature outside the city, or spending my evening as a hobbyist nail artist. Occasionally I&apos;ll play an aggressively average game of basketball or document my memories in video diaries. 📸
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
               I&apos;m also never far from a fun drink. Check out my scouting report below…
            </p>
          </div>
        </div>

        {/* Starting Five Card */}
        <div className="flex justify-center md:justify-start mt-6 md:mt-8 mb-8">
          <StartingFiveCard />
        </div>
      </div>

    </section >
  )
}
