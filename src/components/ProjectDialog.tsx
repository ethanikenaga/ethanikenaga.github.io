import { useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'
import type { Project } from '../data/projects'

type Props = {
  project: Project | null
  onClose: () => void
  onNext: () => void
}

function ProjectDialog({ project, onClose, onNext }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
    if (project) dialog.scrollTop = 0 // each project starts at the top
  }, [project])

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose() // click on the dimmed backdrop
      }}
    >
      {project && (
        <>
          <div className="project-dialog-bar">
            <span>WORK / {project.title.toUpperCase()}</span>
            <button
              type="button"
              className="project-dialog-close"
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <div className="project-dialog-body">
            <p className="project-eyebrow">{project.eyebrow}</p>
            <h2 id="project-dialog-title">{project.title}</h2>
            <p className="project-tagline">{project.tagline}</p>

            <dl className="project-meta">
              <div>
                <dt>YEAR</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>ROLE</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>TEAM</dt>
                <dd>{project.team}</dd>
              </div>
              <div>
                <dt>LINKS</dt>
                <dd className="project-links">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                      {link.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            </dl>

            <ProjectCard
              variant="hero"
              title={project.title}
              year={project.year}
              gradient={project.gradient}
              image={project.image}
            />
            <p className="project-figure">Fig. 1 {project.title}</p>

            {project.sections.map((section, i) => (
              <section className="project-section" key={section.label}>
                <p className="project-section-label">
                  {String(i + 1).padStart(2, '0')} — {section.label}
                </p>
                <h3>{section.heading}</h3>
                {section.body.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </section>
            ))}

            <button type="button" className="project-next" onClick={onNext}>
              Next project →
            </button>
          </div>
        </>
      )}
    </dialog>
  )
}

export default ProjectDialog
