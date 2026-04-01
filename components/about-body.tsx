'use client'

import { StartingFiveCard } from './starting-five-card'
import { HikingGallery } from './hiking-gallery'

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
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-handwritten text-accent/80 text-lg mb-2">the other stuff</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Beyond the work.
            </h2>
          </div>
        </div>

        {/* Starting Five Card */}
        <div className="flex justify-center md:justify-start mb-8">
          <StartingFiveCard />
        </div>

        {/* Hiking Gallery
        <div className="flex justify-center md:justify-start">
          <HikingGallery />
        </div> */}
      </div>

    </section >
  )
}
