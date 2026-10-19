import type { ReactNode } from 'react'
import Button from '../ui/Button'
import { CONTACTO, whatsappUrl } from '../../config/contacto'
import './Footer.css'

type FooterLink = { label: string; href: string }

const navegacion: FooterLink[] = [
  { label: 'Servicios', href: '#soluciones' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Por qué elegirnos', href: '#por-que-elegirnos' },
  { label: 'Presupuesto', href: '#presupuesto' },
  { label: 'Agendar reunión', href: '#comenzar-proyecto' },
]

const servicios: FooterLink[] = [
  { label: 'Desarrollo web', href: '#soluciones' },
  { label: 'E-commerce', href: '#soluciones' },
  { label: 'Sistemas de gestión', href: '#soluciones' },
  { label: 'Automatizaciones', href: '#soluciones' },
]

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const icons = {
  ubicacion: (
    <svg {...iconProps}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  whatsapp: (
    <svg {...iconProps}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a3.5 3.5 0 0 1-1.8-1.8l.8-1-1-2L9 9.5Z" />
    </svg>
  ),
  email: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  ),
}

function Footer() {
  const year = new Date().getFullYear()
  const wa = whatsappUrl()

  // Solo se muestran los datos que estén cargados en config/contacto.ts
  const contacto: { icon: ReactNode; label: string; href?: string }[] = [
    { icon: icons.ubicacion, label: CONTACTO.ubicacion },
    { icon: icons.whatsapp, label: CONTACTO.telefonoVisible, href: wa },
    { icon: icons.email, label: CONTACTO.email, href: `mailto:${CONTACTO.email}` },
  ].filter((item) => item.label)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#inicio" className="footer__logo">
              <img src="/logo-para-fondo-oscuro.svg" alt="Codelabs" />
            </a>
            <p className="footer__desc">
              Agencia de desarrollo en Buenos Aires. Webs, tiendas online,
              sistemas y automatizaciones para que tu negocio funcione mejor.
            </p>

            {contacto.length > 0 && (
              <ul className="footer__contact">
                {contacto.map((item) => (
                  <li key={item.label}>
                    <span className="footer__contact-icon">{item.icon}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.href.startsWith('http') && {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        })}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav className="footer__col" aria-label="Secciones">
            <p className="footer__col-title">// navegación</p>
            <ul>
              {navegacion.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Servicios">
            <p className="footer__col-title">// servicios</p>
            <ul>
              {servicios.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <p>© {year} Codelabs. Todos los derechos reservados.</p>
            {CONTACTO.privacidadUrl && (
              <a href={CONTACTO.privacidadUrl}>Política de privacidad</a>
            )}
          </div>
          <Button href={wa || '#comenzar-proyecto'}>
            Comenzar proyecto <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
