import type { ReactNode } from 'react'
import './css/PorQueElegirnos.css'

type Razon = {
  icon: ReactNode
  title: string
  text: string
}

const iconProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const razones: Razon[] = [
  {
    icon: (
      <svg {...iconProps}>
        <path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" />
      </svg>
    ),
    title: 'Entrega rápida',
    text: 'Ves avances reales desde la primera semana. No esperás al final para saber cómo va tu proyecto.',
  },
  {
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
        <path d="M8.5 11h7M8.5 14h4" />
      </svg>
    ),
    title: 'Hablás con quien programa',
    text: 'Sin intermediarios ni cuentas que pasan de mano en mano. Quien te escucha es quien construye.',
  },
  {
    icon: (
      <svg {...iconProps}>
        <circle cx="8" cy="15" r="4" />
        <path d="m10.8 12.2 8.7-8.7M16.5 6.5l2.5 2.5M14 9l2 2" />
      </svg>
    ),
    title: 'Todo queda a tu nombre',
    text: 'Dominio, hosting y código son tuyos. Si mañana querés seguir con otro, te llevás todo.',
  },
  {
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
      </svg>
    ),
    title: 'Soporte después de lanzar',
    text: 'No desaparecemos con la entrega. Corregimos errores y te ayudamos a sacarle provecho a lo que hicimos.',
  },
]

function PorQueElegirnos() {
  return (
    <section id="por-que-elegirnos" className="razones" aria-labelledby="razones-title">
      <div className="container">
        <p className="razones__eyebrow">// por qué codelabs</p>
        <h2 id="razones-title" className="razones__title">
          Somos tu socio, no tu proveedor
        </h2>
        <p className="razones__text">
          La diferencia se nota en cómo trabajamos y en lo que pasa después de
          la entrega.
        </p>

        <ol className="razones__grid">
          {razones.map((r, i) => (
            <li key={r.title} className="razon">
              <div className="razon__head">
                <span className="razon__icon">{r.icon}</span>
                <span className="razon__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="razon__title">{r.title}</h3>
              <p className="razon__text">{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default PorQueElegirnos
