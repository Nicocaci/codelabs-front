import type { ReactNode } from 'react'
import Button from '../ui/Button'
import './css/Servicios.css'

type Servicio = {
  code: string
  slug: string
  icon: ReactNode
  title: string
  outcome: string
  items: string[]
  footer: { label: string; value: string; href?: string }
}

// Íconos inline (stroke = currentColor, toman el color del contenedor)
const iconProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const icons = {
  web: (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9.5 13.5 7.5 15.5l2 2M14.5 13.5l2 2-2 2" />
    </svg>
  ),
  ecommerce: (
    <svg {...iconProps}>
      <path d="M3 4h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2" />
      <circle cx="9.5" cy="19.5" r="1.2" />
      <circle cx="17" cy="19.5" r="1.2" />
    </svg>
  ),
  sistemas: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <path d="M17.25 14v6.5M14 17.25h6.5" />
    </svg>
  ),
  automatizaciones: (
    <svg {...iconProps}>
      <path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" />
    </svg>
  ),
}

// Los datos viven fuera del componente: no se recrean en cada render
const servicios: Servicio[] = [
  {
    code: 'SRV_01',
    slug: 'desarrollo-web',
    icon: icons.web,
    title: 'Desarrollo web',
    outcome: 'Que te encuentren en Google y te escriban.',
    items: [
      'Diseño a medida, rápido en celular',
      'SEO técnico básico y alta en Google Business',
      'Botón de WhatsApp y formulario de contacto',
      'Dominio, hosting y SSL configurados',
    ],
    footer: { label: 'ideal para', value: 'estudios, profesionales, comercios' },
  },
  {
    code: 'SRV_02',
    slug: 'e-commerce',
    icon: icons.ecommerce,
    title: 'E-commerce',
    outcome: 'Vendé las 24 horas con cobro integrado.',
    items: [
      'Catálogo con buscador y filtros',
      'Checkout con Mercado Pago',
      'Panel para gestionar productos, stock y pedidos',
      'Cálculo de envío o retiro en local',
    ],
    footer: { label: 'caso', value: 'Bulonera El Triángulo', href: '#portfolio' },
  },
  {
    code: 'SRV_03',
    slug: 'sistemas',
    icon: icons.sistemas,
    title: 'Sistemas de gestión',
    outcome: 'Dejá el Excel y el cuaderno.',
    items: [
      'Ventas, stock y caja en un solo lugar',
      'Usuarios con roles y permisos',
      'Reportes de lo que vendés y lo que te falta',
      'Funciona desde la PC o el celular',
    ],
    footer: { label: 'ideal para', value: 'locales, distribuidoras, talleres' },
  },
  {
    code: 'SRV_04',
    slug: 'automatizaciones',
    icon: icons.automatizaciones,
    title: 'Automatizaciones',
    outcome: 'Que las tareas repetitivas se hagan solas.',
    items: [
      'Avisos y respuestas automáticas por WhatsApp o email',
      'Conexión entre tu tienda, tus planillas y tu facturación',
      'Reportes que llegan solos cada semana',
      'Asistentes con IA para consultas frecuentes',
    ],
    footer: { label: 'ideal para', value: 'negocios con mucho mensaje repetido' },
  },
]

function Servicios() {
  return (
    <section id="soluciones" className="servicios" aria-labelledby="servicios-title">
      <div className="container">
        <p className="servicios__eyebrow">// servicios</p>
        <h2 id="servicios-title" className="servicios__title">
          Qué construimos
        </h2>
        <p className="servicios__text">
          Elegí el problema. Nosotros armamos la solución, la probamos y la
          lanzamos.
        </p>

        <ul className="servicios__grid">
          {servicios.map((s) => (
            <li key={s.slug} className="servicio-card">
              <div className="servicio-card__head">
                <span className="servicio-card__icon">{s.icon}</span>
                <span className="servicio-card__code">
                  {s.code} <span>· {s.slug}</span>
                </span>
              </div>

              <h3 className="servicio-card__title">{s.title}</h3>
              <p className="servicio-card__outcome">{s.outcome}</p>

              <ul className="servicio-card__list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="servicio-card__footer">
                <span>{s.footer.label}:</span>{' '}
                {s.footer.href ? (
                  <a href={s.footer.href}>
                    {s.footer.value} <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  s.footer.value
                )}
              </p>
            </li>
          ))}
        </ul>

        <div className="servicios__cta">
          <div>
            <p className="servicios__cta-title">¿No sabés cuál necesitás?</p>
            <p className="servicios__cta-text">
              Contanos qué querés resolver y te recomendamos por dónde arrancar.
              La cotización es sin cargo.
            </p>
          </div>
          <Button href="#comenzar-proyecto">Contanos tu caso</Button>
        </div>
      </div>
    </section>
  )
}

export default Servicios
