import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

function Home() {
  return(
      <section className="home-content">
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Home
