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

  // The popup is designed at 1240 x 820 (see the Figma); the rest scrolls inside it. On a screen too
  // small for that, shrink the whole popup to fit, so it keeps the same proportions.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const fit = () => {
      const scale = Math.min(1, (window.innerHeight * 0.92) / 820, (window.innerWidth * 0.92) / 1240)
      if (scale >= 1 || window.innerWidth <= 720) {
        // big screens use the CSS as is; phones use the stacked layout
        dialog.style.zoom = ''
        dialog.style.width = ''
        dialog.style.maxHeight = ''
      } else {
        dialog.style.zoom = String(scale)
        dialog.style.width = '1240px'
        dialog.style.maxHeight = '820px'
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
            <span>WORK&nbsp; /&nbsp; {project.title.toUpperCase()}</span>
            <button
              type="button"
              className="project-dialog-close"
              aria-label="Close"
              onClick={onClose}
            >
              <img src="/images/ui/close.svg" alt="" width={18} height={18} />
            </button>
          </div>

          <div className="project-dialog-body">
            <div className="project-top">
              <div className="project-top-left">
                <div className="project-title-block">
                  <h2 id="project-dialog-title">{project.dialogTitle}</h2>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>

                <dl className="project-meta">
                  <div>
                    <dt>Dates</dt>
                    <dd>{project.dates}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>Team</dt>
                    <dd>
                      {project.team.href ? (
                        <a href={project.team.href} target="_blank" rel="noreferrer">
                          {project.team.label}
                        </a>
                      ) : (
                        project.team.label
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Links</dt>
                    <dd className="project-links">
                      {project.links.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="project-hero">
                <ProjectCard
                  variant="hero"
                  title={project.title}
                  year={project.year}
                  gradient={project.gradient}
                  image={project.image}
                />
              </div>
            </div>

            {project.sections.map((section) => (
              <section
                className={`project-section${section.image ? ` has-image image-${section.image.side}` : ''}`}
                key={section.heading}
              >
                {section.image && (
                  <div className="project-section-image">{section.image.label}</div>
                )}
                <div className="project-section-text">
                  <h3>{section.heading}</h3>
                  {section.body.map((text, j) => (
                    <p key={j}>{text}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </dialog>
  )
}

export default ProjectDialog
