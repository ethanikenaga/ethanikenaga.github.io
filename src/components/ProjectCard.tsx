import type { Project } from '../data/projects'

function ProjectCard({ title, year, gradient }: Project) {
  return (
    <article className="project-card" style={{ background: gradient }}>
      <span className="project-card-placeholder">+ project image</span>
      <p className="project-card-pill">
        {title}
        <span className="project-card-year">• {year}</span>
      </p>
    </article>
  )
}

export default ProjectCard
