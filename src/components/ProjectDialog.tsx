import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'

type Props = { project: Project | null; onClose: () => void }

function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {project && (
        <div className="project-dialog-body">
          <h3>{project.title}</h3>
          <p className="project-dialog-year">{project.year}</p>
          <p>{project.description}</p>
          <button type="button" onClick={onClose}>Close</button>
        </div>
      )}
    </dialog>
  )
}

export default ProjectDialog
