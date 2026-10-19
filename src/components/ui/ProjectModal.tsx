import { useEffect, useRef, useState } from 'react'
import type { PortfolioProject } from '../../types/portfolio'
import './css/ProjectModal.css'

type GalleryProps = {
  images: string[]
  name: string
}

// Tiene su propio estado (imagen actual). Como el modal la usa con
// key={project._id}, se reinicia sola al abrir otro proyecto.
function Gallery({ images, name }: GalleryProps) {
  const [current, setCurrent] = useState(0)

  if (images.length === 0) return null

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length)
  const next = () => setCurrent((i) => (i + 1) % images.length)

  return (
    <div className="modal__gallery">
      <img
        src={images[current]}
        alt={`Captura ${current + 1} de ${images.length} del proyecto ${name}`}
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="modal__nav modal__nav--prev"
            onClick={prev}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="modal__nav modal__nav--next"
            onClick={next}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
          <div className="modal__dots" aria-hidden="true">
            {images.map((_, i) => (
              <span key={i} className={i === current ? 'is-active' : ''} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

type ProjectModalProps = {
  project: PortfolioProject | null // null = cerrado
  onClose: () => void
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Sincroniza el <dialog> nativo con el estado de React
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  const year = project ? new Date(project.fechaCreacion).getFullYear() : null

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose} // se dispara también al apretar Escape
      onClick={(e) => {
        // Click en el fondo oscuro (el propio <dialog>), no en el contenido
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {project && (
        <>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>

          <div className="modal__scroll">
            <Gallery key={project._id} images={project.imagen} name={project.nombre} />

            <div className="modal__body">
              <header className="modal__header">
                <div>
                  <p className="modal__eyebrow">// proyecto</p>
                  <h2 id="modal-title" className="modal__title">
                    {project.nombre}
                  </h2>
                  <p className="modal__lead">{project.descripcion}</p>
                </div>
                <a
                  className="btn btn--primary"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver sitio ↗
                </a>
              </header>

              <dl className="modal__stats">
                {project.resultado && (
                  <div className="modal__stat modal__stat--accent">
                    <dt>Resultado</dt>
                    <dd>{project.resultado}</dd>
                  </div>
                )}
                <div className="modal__stat">
                  <dt>Servicio</dt>
                  <dd>{project.servicio}</dd>
                </div>
                <div className="modal__stat">
                  <dt>Año</dt>
                  <dd>{year}</dd>
                </div>
              </dl>

              <div className="modal__columns">
                <section>
                  <h3 className="modal__heading">// desafío</h3>
                  <p>{project.desafio}</p>
                </section>
                <section>
                  <h3 className="modal__heading">// solución</h3>
                  <p>{project.solucion}</p>
                </section>
              </div>

              {project.caracteristicas.length > 0 && (
                <section>
                  <h3 className="modal__heading">// características</h3>
                  <ul className="modal__features">
                    {project.caracteristicas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </>
      )}
    </dialog>
  )
}

export default ProjectModal