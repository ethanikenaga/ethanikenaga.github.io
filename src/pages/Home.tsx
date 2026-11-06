
import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectDialog from '../components/ProjectDialog'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

function Home() {
  const [selected, setSelected] = useState<Project | null>(null)

  return(
      <section className="home-content">
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            {...project}
            onSelect={() => setSelected(project)}
          />
        ))}
      </div>
       <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default Home
