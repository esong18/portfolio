import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AboutHeader } from '@/components/about-header'
import { AboutBody } from '@/components/about-body'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main >
        <AboutHeader />
        <AboutBody />
      </main >
      <Footer />
    </>
  )
}