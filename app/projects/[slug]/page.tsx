import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { ProjectDetail } from '@/components/project-detail'
import { getProjectData, getAllProjectSlugs } from '@/lib/projects-data'

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const projectData = getProjectData(params.slug)

  if (!projectData) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProjectDetail {...projectData} />
    </main>
  )
}
