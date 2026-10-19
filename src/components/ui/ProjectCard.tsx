import type { PortfolioProject } from '../../types/portfolio'
import './css/ProjectCard.css'

type ProjectCardProps = {
  project: PortfolioProject
  index: number // para el código "exp_001"
  onOpen: () => void // abre el modal con el detalle
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const code = `exp_${String(index + 1).padStart(3, '0')}`
  const year = new Date(project.fechaCreacion).getFullYear()
  const cover = project.imagen[0] // puede ser undefined si no cargaron imágenes

  return (
    <article className="project-card">
      <div className="project-card__media">
        {cover && (
          <img src={cover} alt={`Captura del proyecto ${project.nombre}`} loading="lazy" />
        )}
        {project.destacado && <span className="project-card__badge">Destacado</span>}
      </div>

      <div className="project-card__body">
        <p className="project-card__meta">
          <span className="project-card__code">{code}</span>
          <span>{project.servicio}</span>
          <span className="project-card__year">{year}</span>
        </p>

        <h3 className="project-card__title">{project.nombre}</h3>
        <p className="project-card__text">{project.descripcion}</p>

        {project.resultado && (
          <p className="project-card__result">
            <span>resultado:</span> {project.resultado}
          </p>
        )}

        {/* El botón se estira sobre toda la card (ver ::after en el CSS),
            así toda la card es clickeable pero sigue siendo un <button> real */}
        <button type="button" className="project-card__more" onClick={onOpen}>
          Ver detalles <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )
}

export default ProjectCard