import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { ProjectsSection } from '@/components/projects-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <PhilosophySection />
      <Footer />
    </main>
  )
}
