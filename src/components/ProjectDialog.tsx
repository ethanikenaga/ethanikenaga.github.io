import { useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'
import type { Project } from '../data/projects'

type Props = {
  project: Project | null
  onClose: () => void
}

function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
    if (project) dialog.scrollTop = 0 // each project starts at the top
  }, [project])

  // The popup is designed at 1000 x 1040 (see the Figma). On a screen too small for that, shrink
  // the whole popup to fit, so it keeps the same proportions and the full card stays visible.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const fit = () => {
      const scale = Math.min(1, (window.innerHeight * 0.92) / 1040, (window.innerWidth * 0.92) / 1000)
      if (scale >= 1 || window.innerWidth <= 720) {
        // big screens use the CSS as is; phones use the stacked layout
        dialog.style.zoom = ''
        dialog.style.width = ''
        dialog.style.maxHeight = ''
      } else {
        dialog.style.zoom = String(scale)
        dialog.style.width = '1000px'
        dialog.style.maxHeight = '1040px'
      }
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

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
          </div>
        </>
      )}
    </dialog>
  )
}

export default ProjectDialog
