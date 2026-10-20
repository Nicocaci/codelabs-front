import { useEffect, useState } from 'react'
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
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Portfolio', href: '#portfolio' }
]

type NavbarProps = {
  // Links del menú (por defecto, los de la home)
  links?: NavLink[]
  // A dónde lleva el logo (en otras páginas: '/')
  logoHref?: string
  // Mensaje precargado del botón de WhatsApp
  mensajeWhatsapp?: string
}

function Navbar({ links = linksHome, logoHref = '#inicio', mensajeWhatsapp }: NavbarProps) {
  // Menú móvil abierto/cerrado (TS infiere boolean)
  const [isOpen, setIsOpen] = useState(false)
  // Para agregar sombra cuando el usuario scrollea
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Limpieza: se ejecuta al desmontar el componente
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Cerrar el menú con Escape. KeyboardEvent es un tipo global del DOM
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`container navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner" aria-label="Principal">
        <a href={logoHref} className="navbar__logo" onClick={closeMenu}>
          <img src="/logo-para-fondo-oscuro.svg" alt="Codelabs" />
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>

        <ul
          id="navbar-menu"
          className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Button href={whatsappUrl(mensajeWhatsapp) || '#comenzar-proyecto'}>Comenzar Proyecto</Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar