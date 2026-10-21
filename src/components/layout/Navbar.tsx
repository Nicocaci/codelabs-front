import { useEffect, useState, type CSSProperties } from 'react'
import './Navbar.css'
import Button from '../ui/Button.tsx'
import { whatsappUrl } from '../../config/contacto'

// Tipo para cada link del menú
type NavLink = {
  label: string
  href: string // id de la sección, ej: '#servicios'
}

// Los links viven fuera del componente: no se recrean en cada render
const linksHome: NavLink[] = [
  { label: 'Servicios', href: '#soluciones' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Presupuesto', href: '#presupuesto' },
  { label: 'Preguntas', href: '#preguntas' },
]

// Debajo de este ancho se usa el menú de celular
const MOBILE_QUERY = '(max-width: 860px)'

type NavbarProps = {
  // Links del menú (por defecto, los de la home)
  links?: NavLink[]
  // A dónde lleva el logo (en otras páginas: '/')
  logoHref?: string
  // Mensaje precargado del botón de WhatsApp
  mensajeWhatsapp?: string
}

function Navbar({ links = linksHome, logoHref = '#inicio', mensajeWhatsapp }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false) // menú de celular
  const [scrolled, setScrolled] = useState(false) // fondo translúcido al scrollear
  const [active, setActive] = useState<string | null>(null) // sección visible

  const ctaHref = whatsappUrl(mensajeWhatsapp) || '#comenzar-proyecto'
  const closeMenu = () => setIsOpen(false)

  // Fondo con blur cuando se scrollea
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Escape cierra el menú; si se agranda la ventana a desktop, también
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = () => {
      if (!mq.matches) setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [])

  // Con el menú abierto, la página de atrás no scrollea
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Marca el link de la sección que está en pantalla
  useEffect(() => {
    const sections = links
      .filter((l) => l.href.startsWith('#'))
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      // Cuenta como "activa" la sección que cruza la mitad de la pantalla
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [links])

  const classes = [
    'navbar',
    scrolled ? 'navbar--scrolled' : '',
    isOpen ? 'navbar--open' : '',
  ].join(' ')

  return (
    <header className={classes}>
      <div className="container navbar__inner">
        <a href={logoHref} className="navbar__logo" onClick={closeMenu}>
          <img src="/logo-para-fondo-oscuro.svg" alt="Codelabs" />
        </a>

        {/* Desktop */}
        <nav className="navbar__nav" aria-label="Principal">
          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__link"
                  aria-current={active === link.href ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <span className="navbar__cta">
            <Button href={ctaHref}>Comenzar proyecto</Button>
          </span>

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={isOpen}
            aria-controls="navbar-panel"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="navbar__toggle-bar" />
            <span className="navbar__toggle-bar" />
          </button>
        </div>
      </div>

      {/* Celular: panel a pantalla completa. inert = no se puede enfocar cerrado */}
      <div id="navbar-panel" className="navbar__panel" inert={!isOpen}>
        <nav className="container" aria-label="Principal (celular)">
          <ol className="navbar__panel-links">
            {links.map((link, i) => (
              <li key={link.href} style={{ '--i': i } as CSSProperties}>
                <a href={link.href} onClick={closeMenu}>
                  <span className="navbar__panel-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ol>

          <div className="navbar__panel-footer">
            <Button href={ctaHref}>
              Comenzar proyecto <span aria-hidden="true">→</span>
            </Button>
            <p className="navbar__panel-note">// te respondemos por WhatsApp</p>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
