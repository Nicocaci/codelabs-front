import { useState, type KeyboardEvent } from 'react'
import Button from '../ui/Button'
import BrowserFrame from '../ui/BrowserFrame'
import ServiceMockup, { type MockupVariant } from '../ui/ServiceMockup'
import './css/Presupuesto.css'

// Moneda en la que mostrás los rangos. Cambiala acá si preferís ARS
const MONEDA = 'USD'

// Abono mensual de entrada (hosting, backups, seguridad y 1 h de cambios)
const ABONO_DESDE = 40

type Plan = {
  slug: string
  variant: MockupVariant
  url: string
  title: string
  description: string
  // Precio de entrada en USD. null = se muestra "A definir"
  desde: number | null
  // Qué incluye exactamente ese precio de entrada
  incluye: string
  variables: string[]
}

// Precios de entrada (Fase 2). Lo más complejo se cotiza en la reunión
const planes: Plan[] = [
  {
    slug: 'desarrollo-web',
    variant: 'web',
    url: 'tunegocio.com.ar',
    title: 'Desarrollo web',
    description:
      'Sitio institucional o landing pensada para que te encuentren y te escriban.',
    desde: 150,
    incluye: 'Landing de una página. Sitio institucional de 5 páginas: USD 300.',
    variables: [
      'Cantidad de secciones o páginas',
      'Textos y fotos (los tenés o los armamos)',
      'Formularios e integraciones',
      'Idiomas',
    ],
  },
  {
    slug: 'e-commerce',
    variant: 'ecommerce',
    url: 'tutienda.com.ar',
    title: 'E-commerce',
    description:
      'Tienda online con catálogo, carrito y cobro con Mercado Pago, lista para vender.',
    desde: 500,
    incluye:
      'Catálogo online con buscador, filtros y pedido por WhatsApp. Tienda completa con Mercado Pago y envíos: a cotizar.',
    variables: [
      'Cantidad de productos y variantes',
      'Medios de pago y envío',
      'Carga inicial del catálogo',
      'Integración con stock o facturación',
    ],
  },
  {
    slug: 'sistemas',
    variant: 'sistemas',
    url: 'app.tunegocio.com.ar',
    title: 'Sistema de gestión',
    description:
      'Ventas, stock y caja en un solo lugar, accesible desde la PC o el celular.',
    desde: 500,
    incluye: 'Un módulo (por ejemplo, stock). Cada módulo extra se suma.',
    variables: [
      'Módulos (ventas, stock, caja, clientes…)',
      'Cantidad de usuarios y roles',
      'Migración de datos existentes',
      'Reportes a medida',
    ],
  },
  {
    slug: 'automatizaciones',
    variant: 'automatizaciones',
    url: 'flujos.tunegocio.com.ar',
    title: 'Automatizaciones',
    description:
      'Tareas repetitivas que se hacen solas: avisos, respuestas y reportes.',
    desde: 200,
    incluye: 'Un flujo simple (por ejemplo, avisos automáticos de pedidos).',
    variables: [
      'Cantidad de flujos',
      'Herramientas a conectar',
      'Uso de IA en las respuestas',
      'Volumen de mensajes',
    ],
  },
]

const formatPrecio = (n: number) => `$${n.toLocaleString('es-AR')}`

function Presupuesto() {
  const [index, setIndex] = useState(0)
  const total = planes.length
  const plan = planes[index]

  const go = (next: number) => setIndex((next + total) % total)

  // Flechas del teclado cuando el foco está dentro del carrusel
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') go(index + 1)
    if (e.key === 'ArrowLeft') go(index - 1)
  }

  return (
    <section id="presupuesto" className="presupuesto" aria-labelledby="presupuesto-title">
      <div className="container">
        <header className="presupuesto__header">
          <p className="presupuesto__eyebrow">// presupuesto orientativo</p>
          <h2 id="presupuesto-title" className="presupuesto__title">
            ¿Cuánto puede costar
            <span> tu proyecto?</span>
          </h2>
          <p className="presupuesto__text">
            Precios de entrada para que sepas dónde estás parado antes de
            hablar. El valor final depende del alcance.
          </p>
        </header>

        <div
          className="presupuesto__carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Presupuestos por servicio"
          onKeyDown={handleKeyDown}
        >
          <div className="presupuesto__info">
            <div className="presupuesto__nav">
              <button
                type="button"
                className="presupuesto__arrow"
                aria-label="Servicio anterior"
                onClick={() => go(index - 1)}
              >
                ←
              </button>
              <div className="presupuesto__heading" aria-live="polite">
                <span className="presupuesto__count">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h3 className="presupuesto__plan">{plan.title}</h3>
              </div>
              <button
                type="button"
                className="presupuesto__arrow"
                aria-label="Servicio siguiente"
                onClick={() => go(index + 1)}
              >
                →
              </button>
            </div>

            {/* key fuerza el remontado para repetir la animación de entrada */}
            <div key={plan.slug} className="presupuesto__card">
              <p className="presupuesto__desc">{plan.description}</p>

              <div className="presupuesto__price">
                <span className="presupuesto__price-label">desde</span>
                {plan.desde !== null ? (
                  <p className="presupuesto__price-value">
                    {formatPrecio(plan.desde)}
                    <span className="presupuesto__price-currency">{MONEDA}</span>
                  </p>
                ) : (
                  <p className="presupuesto__price-value presupuesto__price-value--pending">
                    A definir
                  </p>
                )}
                <p className="presupuesto__price-detail">{plan.incluye}</p>
              </div>

              <div className="presupuesto__vars">
                <p className="presupuesto__vars-title">El precio varía según:</p>
                <ul>
                  {plan.variables.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
                <p className="presupuesto__note">
                  * El presupuesto final se define en una reunión sin cargo.
                </p>
                <p className="presupuesto__note">
                  * Mantenimiento mensual (hosting, backups y cambios) desde{' '}
                  {formatPrecio(ABONO_DESDE)} {MONEDA}.
                </p>
              </div>
            </div>

            <div className="presupuesto__cta">
              <Button href="#comenzar-proyecto">
                Agendar reunión por este servicio <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>

          <div className="presupuesto__visual">
            <div key={plan.slug} className="presupuesto__frame">
              <BrowserFrame url={plan.url}>
                <ServiceMockup variant={plan.variant} />
              </BrowserFrame>
            </div>

            <div className="presupuesto__dots">
              {planes.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  className="presupuesto__dot"
                  aria-label={`Ver ${p.title}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Presupuesto
