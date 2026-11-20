import type { Project } from '../data/projects'

type Props = Pick<Project, 'title' | 'year' | 'gradient' | 'image'> & {
  variant?: 'card' | 'hero'
  onSelect?: () => void
}

function ProjectCard({ title, year, gradient, image, variant = 'card', onSelect }: Props) {
  const art = image ? <img className="project-card-art" src={image} alt="" /> : null

  // The big card inside the popup: no title pill, not clickable
  if (variant === 'hero') {
    return (
      <div className="project-card" style={{ background: gradient }}>
        {art}
      </div>
    )
  }

  return (
    <button
      type="button"
      className="project-card project-card-button"
      style={{ background: gradient }}
      onClick={onSelect}
      aria-haspopup="dialog"
      aria-label={`Open ${title} project`}
    >
      {art}
      <span className="project-card-pill">
        {title}
        <span className="project-card-year">• {year}</span>
      </span>
    </button>
  )
}

export default ProjectCard