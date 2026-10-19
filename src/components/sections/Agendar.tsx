import { useEffect, useRef, useState, type ReactNode } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import Button from '../ui/Button'
import { CONTACTO, whatsappUrl } from '../../config/contacto'
import './css/Agendar.css'

// Link del evento en Cal.com: "usuario/slug-del-evento" (se configura en .env)
const CAL_LINK = import.meta.env.VITE_CAL_LINK
const CAL_NAMESPACE = 'reunion'
// Tiene que coincidir con la duración del evento en Cal.com
const DURACION = '30 minutos'

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const items: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    ),
    title: 'Elegís el horario',
    text: 'Reservás el día y la hora que te queden cómodos.',
  },
  {
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    title: `${DURACION}, sin cargo`,
    text: 'Entendemos qué necesitás y te decimos si te podemos ayudar.',
  },
  {
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path d="m16 10 5-3v10l-5-3" />
      </svg>
    ),
    title: 'Por videollamada',
    text: 'Te llega el link por mail apenas confirmás.',
  },
]

function Agendar() {
  const sectionRef = useRef<HTMLElement>(null)
  // El embed se carga recién cuando la sección se acerca a la pantalla:
  // evita que el iframe haga scroll solo al cargar y no pesa en el primer render
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !CAL_LINK) return
    ;(async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        // Verde Reactivo como color de marca, con texto Tinta encima
        cssVarsPerTheme: {
          light: { 'cal-brand': '#3ee6a0', 'cal-brand-text': '#0c1618' },
          dark: { 'cal-brand': '#3ee6a0', 'cal-brand-text': '#0c1618' },
        },
      })
    })()
  }, [visible])

  return (
    <section
      ref={sectionRef}
      id="comenzar-proyecto"
      className="agendar"
      aria-labelledby="agendar-title"
    >
      <div className="container">
        <header className="agendar__header">
          <p className="agendar__eyebrow">// hablemos de tu proyecto</p>
          <h2 id="agendar-title" className="agendar__title">
            Agendá una reunión
            <span> sin cargo.</span>
          </h2>
          <p className="agendar__text">
            Contanos qué querés resolver y salís de la llamada sabiendo por dónde
            arrancar.
          </p>
        </header>

        <ul className="agendar__items">
          {items.map((item) => (
            <li key={item.title} className="agendar__item">
              <span className="agendar__icon">{item.icon}</span>
              <div>
                <h3 className="agendar__item-title">{item.title}</h3>
                <p className="agendar__item-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="agendar__embed">
          {!CAL_LINK && (
            <p className="agendar__fallback">
              Falta configurar <code>VITE_CAL_LINK</code> en el archivo .env
            </p>
          )}

          {CAL_LINK && !visible && <div className="agendar__skeleton" aria-hidden="true" />}

          {CAL_LINK && visible && (
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              config={{ layout: 'month_view', theme: 'dark' }}
              style={{ width: '100%', height: '100%', overflow: 'auto' }}
            />
          )}
        </div>

        {CONTACTO.privacidadUrl && (
          <p className="agendar__privacy">
            Al reservar aceptás nuestra{' '}
            <a href={CONTACTO.privacidadUrl} target="_blank" rel="noopener noreferrer">
              política de privacidad
            </a>
            .
          </p>
        )}

        {whatsappUrl() && (
          <div className="agendar__alt">
            <p>¿Preferís escribirnos directamente?</p>
            <Button href={whatsappUrl()} variant="secondary">
              Escribinos por WhatsApp <span aria-hidden="true">→</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Agendar
