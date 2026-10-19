import Button from '../ui/Button'
import { whatsappUrl } from '../../config/contacto'
import BrowserFrame from '../ui/BrowserFrame'
import FloatingCard from '../ui/FloatingCard'
import projectPreview from '../../assets/bulonera-home.png'
import './css/Hero.css'

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Agencia digital · Buenos Aires</span>

          <h1 className="hero__title">
            Webs, tiendas y sistemas
            <span className="hero__title-muted">que hacen crecer tu negocio.</span>
          </h1>

          <p className="hero__text">
            Desarrollo a medida y soluciones de software para empresas y
            emprendedores. Desde la idea hasta el producto final, te
            acompañamos en todo el proceso.
          </p>

          <div className="hero__actions">
            <Button href={whatsappUrl() || '#comenzar-proyecto'}>Comenzar proyecto</Button>
            <Button href="#portfolio" variant="secondary">
              Ver portfolio
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <BrowserFrame url="buloneraeltriangulo.com">
            <img
              src={projectPreview}
              alt="Captura de un proyecto desarrollado por Codelabs"
              loading="eager"
            />
          </BrowserFrame>
          <FloatingCard
            position="top-right"
            label="Después del lanzamiento"
            value="Soporte incluido"
          />
          <FloatingCard
            position="bottom-left"
            label="Entrega"
            value="Desde 5 días hábiles"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero