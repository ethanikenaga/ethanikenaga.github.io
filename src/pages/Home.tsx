import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

function Home() {
  return(
      <section className="home-content">
      <p className="work-eyebrow">02 — WORK</p>
      <h2 className="work-title">{"Things I've built"}</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Home
