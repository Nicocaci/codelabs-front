import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import type { PortfolioProject } from '../../types/portfolio'
import { cloudinarySrcSet, cloudinaryUrl } from '../../utils/cloudinary'
import './css/ProjectModal.css'

type GalleryProps = {
  images: string[]
  name: string
}

// Distancia mínima (px) para que un deslizamiento cuente como cambio de foto
const SWIPE_THRESHOLD = 50

// Slider de capturas. Tiene su propio estado (foto actual); como el modal
// lo usa con key={project._id}, se reinicia solo al abrir otro proyecto.
function Gallery({ images, name }: GalleryProps) {
  const [current, setCurrent] = useState(0)
  const [dragX, setDragX] = useState(0) // desplazamiento mientras se arrastra
  const startX = useRef<number | null>(null)
  const total = images.length

  const goTo = useCallback((i: number) => setCurrent((i + total) % total), [total])
  const prev = useCallback(() => goTo(current - 1), [goTo, current])
  const next = useCallback(() => goTo(current + 1), [goTo, current])

  // Flechas del teclado mientras el modal está abierto
  useEffect(() => {
    if (total < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, total])

  if (total === 0) return null

  // Deslizar con el dedo (o arrastrar con el mouse)
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (total < 2) return
    startX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current !== null) setDragX(e.clientX - startX.current)
  }
  const onPointerEnd = () => {
    if (startX.current === null) return
    if (dragX > SWIPE_THRESHOLD) prev()
    else if (dragX < -SWIPE_THRESHOLD) next()
    startX.current = null
    setDragX(0)
  }

  return (
    <div
      className="modal__gallery"
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Capturas del proyecto ${name}`}
    >
      <div
        className="modal__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div
          className={`modal__track ${dragX !== 0 ? 'is-dragging' : ''}`}
          style={{ transform: `translateX(calc(${-current * 100}% + ${dragX}px))` }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="modal__slide"
              aria-hidden={i !== current}
              aria-roledescription="diapositiva"
            >
              <img
                src={cloudinaryUrl(src, 1200)}
                srcSet={cloudinarySrcSet(src, [800, 1200, 1800])}
                sizes="(max-width: 960px) 100vw, 960px"
                // La actual y sus vecinas se cargan ya; el resto cuando hagan falta
                loading={Math.abs(i - current) <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                alt={`Captura ${i + 1} de ${total} del proyecto ${name}`}
              />
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
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

          <span className="modal__counter" aria-live="polite">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          <div className="modal__dots">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={i === current ? 'is-active' : ''}
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={i === current}
                onClick={() => goTo(i)}
              />
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