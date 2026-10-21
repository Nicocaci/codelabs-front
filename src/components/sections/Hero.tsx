import Button from '../ui/Button'
import { whatsappUrl } from '../../config/contacto'
import BrowserFrame from '../ui/BrowserFrame'
import FloatingCard from '../ui/FloatingCard'
import Typewriter from '../ui/Typewriter'
import preview640 from '../../assets/bulonera-home-640.webp'
import preview1200 from '../../assets/bulonera-home-1200.webp'
import './css/Hero.css'

// Palabras que rotan al final del título (la primera es la que leen los lectores de pantalla)
const PALABRAS = ['tu negocio', 'tus ventas', 'tu marca']

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Agencia digital · Buenos Aires</span>

          <h1 className="hero__title">
            Webs, tiendas y sistemas
            <span className="hero__title-muted">
              que hacen crecer <Typewriter words={PALABRAS} />
            </span>
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
            {/* WebP en 2 tamaños: el navegador elige según el ancho de pantalla.
                width/height reservan el espacio y evitan saltos al cargar */}
            <img
              src={preview1200}
              srcSet={`${preview640} 640w, ${preview1200} 1200w`}
              sizes="(max-width: 768px) 1px, (max-width: 1240px) 45vw, 560px"
              width={1200}
              height={588}
              alt="Captura de la tienda online de Bulonera El Triángulo, desarrollada por Codelabs"
              loading="eager"
              fetchPriority="high"
              decoding="async"
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