import { useState } from 'react'
import { usePortfolio } from '../../hooks/usePortfolio'
import ProjectCard from '../ui/ProjectCard'
import ProjectModal from '../ui/ProjectModal'
import type { PortfolioProject } from '../../types/portfolio'
import './css/Portfolio.css'

const ALL = 'todos'

function Portfolio() {
  const { projects, loading, error } = usePortfolio()
  const [filter, setFilter] = useState<string>(ALL)
  // Proyecto abierto en el modal (null = modal cerrado)
  const [selected, setSelected] = useState<PortfolioProject | null>(null)

  // Las pestañas salen de los servicios que realmente existen en tus proyectos
  const services = [ALL, ...new Set(projects.map((p) => p.servicio))]

  const filtered =
    filter === ALL ? projects : projects.filter((p) => p.servicio === filter)

  // Los destacados primero (sort es estable: el resto mantiene su orden)
  const visible = [...filtered].sort(
    (a, b) => Number(Boolean(b.destacado)) - Number(Boolean(a.destacado)),
  )

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <p className="portfolio__eyebrow">// portfolio</p>
        <h2 className="portfolio__title">Proyectos que hablan por nosotros</h2>
        <p className="portfolio__text">
          Proyectos destacados que demuestran nuestra capacidad para crear
          experiencias digitales excepcionales con resultados medibles y
          comprobados.
        </p>

        {services.length > 2 && (
          <div className="portfolio__filters" role="group" aria-label="Filtrar por servicio">
            {services.map((service) => (
              <button
                key={service}
                type="button"
                className="portfolio__filter"
                aria-pressed={filter === service}
                onClick={() => setFilter(service)}
              >
                {service === ALL ? 'Todos' : service}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="portfolio__grid" aria-busy="true">
            {[1, 2, 3].map((n) => (
              <div key={n} className="portfolio__skeleton" />
            ))}
          </div>
        )}

        {error && <p className="portfolio__message">{error}</p>}

        {!loading && !error && visible.length === 0 && (
          <p className="portfolio__message">Todavía no hay proyectos para mostrar.</p>
        )}

        {!loading && !error && visible.length > 0 && (
          <div className="portfolio__grid">
            {visible.map((project, i) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={i}
                onOpen={() => setSelected(project)}
              />
            ))}
          </div>
        )}

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  )
}

export default Portfolio