import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectDialog from '../components/ProjectDialog'
import { projects } from '../data/projects'

function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selected = selectedIndex === null ? null : projects[selectedIndex]

  return (
    <section className="home-content">
      <div className="project-grid">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            year={project.year}
            gradient={project.gradient}
            image={project.image}
            onSelect={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      <ProjectDialog
        project={selected}
        onClose={() => setSelectedIndex(null)}
        onNext={() =>
          setSelectedIndex((i) => (i === null ? null : (i + 1) % projects.length))
        }
      />
    </section>
  )
}

export default Home
