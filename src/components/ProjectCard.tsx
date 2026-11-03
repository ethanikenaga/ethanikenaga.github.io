import type { Project } from '../data/projects'

type Props = Project & { onSelect: () => void }

function ProjectCard({ title, year, gradient, onSelect }: Props) {
  return (
    <button type="button" className="project-card" style={{ background: gradient }} onClick={onSelect}>
      <span className="project-card-placeholder">+ project image</span>
      <span className="project-card-pill">
        {title}
        <span className="project-card-year">• {year}</span>
      </span>
    </button>
  )
}

export default ProjectCard
