import { useState } from 'react'
// Página para comercios con catálogo grande (codelabs.com.ar/comercios).
// No figura en el menú de la home: es el link que va en los mensajes de prospección.
import Navbar from '../components/layout/Navbar.tsx'
import Footer from '../components/layout/Footer.tsx'
import Agendar from '../components/sections/Agendar.tsx'
import Preguntas, { type Pregunta } from '../components/sections/Preguntas.tsx'
import Button from '../components/ui/Button.tsx'
import BrowserFrame from '../components/ui/BrowserFrame.tsx'
import FloatingCard from '../components/ui/FloatingCard.tsx'
import Typewriter from '../components/ui/Typewriter.tsx'
import preview640 from '../assets/bulonera-home-640.webp'
import preview1200 from '../assets/bulonera-home-1200.webp'
import '../components/sections/css/Hero.css'
import './Comercios.css'

// Rubros que rotan en el título. Con ?rubro=... en el link (ej: /comercios?rubro=pintureria)
// el rubro del comercio aparece primero: sirve para personalizar los mensajes de prospección.
const RUBROS: Record<string, string> = {
  ferreteria: 'ferretería',
  bulonera: 'bulonera',
  pintureria: 'pinturería',
  catalogo: 'catálogo'
}

const rubrosOrdenados = (): string[] => {
  const todos = Object.values(RUBROS)
  const clave = new URLSearchParams(window.location.search).get('rubro')?.toLowerCase()
  const elegido = clave ? RUBROS[clave] : undefined
  return elegido ? [elegido, ...todos.filter((r) => r !== elegido)] : todos
}

const MENSAJE_WHATSAPP = 'Hola, vi la página de Codelabs para comercios y quiero consultar por mi negocio.'

const links = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Caso', href: '#caso' },
  { label: 'Precios', href: '#paquetes' },
  { label: 'Preguntas', href: '#preguntas' },
]

const problemas = [
  {
    title: 'Precios por WhatsApp, uno por uno',
    text: 'Cada consulta es un mensaje, una foto y una respuesta. Con miles de productos, eso se come el día.',
  },
  {
    title: 'Actualizar precios lleva días',
    text: 'Cuando llega una lista nueva del proveedor, hay que tocar producto por producto.',
  },
  {
    title: 'Pedidos desordenados',
    text: 'Llegan por WhatsApp, por teléfono y por mostrador, sin un lugar donde verlos todos juntos.',
  },
]

const pasos = [
  {
    title: 'Nos pasás tu lista de productos',
    text: 'En Excel o exportada de tu sistema. No hace falta cargar nada a mano.',
  },
  {
    title: 'Armamos tu catálogo online',
    text: 'Con buscador y filtros por categoría, medida o marca, para que el cliente encuentre lo que busca.',
  },
  {
    title: 'Actualizás precios de una vez',
    text: 'Subís un Excel y se actualizan todos los productos. Sin tocarlos uno por uno.',
  },
  {
    title: 'Los pedidos te llegan ordenados',
    text: 'Por WhatsApp con el detalle armado, o pagados online con Mercado Pago.',
  },
]

const casoHecho = [
  'Tienda online propia, desarrollada a medida',
  'Catálogo amplio con buscador y filtros',
  'Carrito y pagos con Mercado Pago',
  'Envíos con Enviopack o retiro por el local',
  'Panel para manejar stock y órdenes',
]

// Testimonio del cliente: cuando lo tengas (con su autorización por escrito), completalo acá.
// Mientras sea null, la tarjeta no se muestra.
const TESTIMONIO: { texto: string; autor: string } | null = null

type Paquete = {
  nombre: string
  precio: string
  bajada: string
  items: string[]
  destacado?: string
}

const paquetes: Paquete[] = [
  {
    nombre: 'Catálogo online',
    precio: 'Desde USD 500',
    bajada: 'Para mostrar todo tu catálogo y recibir pedidos por WhatsApp.',
    items: [
      'Catálogo con buscador y filtros',
      'Precios visibles y actualizables por Excel',
      'Botón de pedido por WhatsApp',
      'Panel para cargar y editar productos',
    ],
  },
  {
    nombre: 'Tienda completa',
    precio: 'A cotizar',
    bajada: 'Para vender y cobrar online, como Bulonera El Triángulo.',
    items: [
      'Todo lo del catálogo online',
      'Carrito y pagos con Mercado Pago',
      'Envíos con Enviopack o retiro en el local',
      'Panel de stock y órdenes',
    ],
    destacado: 'el caso de la Bulonera',
  },
  {
    nombre: 'Tienda con integración',
    precio: 'A cotizar',
    bajada: 'Para comercios que ya trabajan con un sistema de gestión.',
    items: [
      'Todo lo de la tienda completa',
      'Conexión con tu sistema de stock o facturación',
      'Listas de precios mayorista y minorista',
      'Cuentas para clientes mayoristas',
    ],
  },
]

const preguntas: Pregunta[] = [
  {
    q: '¿Por qué no uso Tiendanube?',
    a: 'Para muchos comercios Tiendanube alcanza, y si es tu caso te lo vamos a decir. Una tienda a medida conviene cuando necesitás algo específico: listas de precios distintas para mayoristas y minoristas, conectar con tu sistema de gestión o reglas propias de stock y precios. Además la tienda es tuya y nosotros no cobramos comisión por venta: en Tiendanube, según el plan, pagás un porcentaje de cada venta si no usás su medio de pago (Pago Nube). Mercado Pago cobra su comisión en cualquiera de los dos casos.',
  },
  {
    q: '¿Tengo que cargar yo los productos?',
    a: 'No. Si tenés tu lista en Excel o en tu sistema, la importamos. La carga inicial se cotiza según la cantidad de productos y fotos.',
  },
  {
    q: '¿Puedo cambiar los precios yo mismo?',
    a: 'Sí. Podés editar cada producto desde el panel o actualizar muchos precios a la vez subiendo un Excel.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Depende del tamaño del catálogo y de lo que necesites. En la reunión te damos una fecha concreta.',
  },
  {
    q: '¿Cómo se paga?',
    a: 'El precio se fija en dólares y se paga en pesos al tipo de cambio del día. 50% al empezar y 50% a la entrega.',
  },
  {
    q: '¿Qué pasa después de la entrega?',
    a: 'Con el mantenimiento mensual (desde USD 40) nos ocupamos del hosting, los backups, la seguridad y los cambios que necesites.',
  },
]

function Comercios() {
  const [rubros] = useState(rubrosOrdenados)

  return (
    <>
      <Navbar links={links} logoHref="/" mensajeWhatsapp={MENSAJE_WHATSAPP} />
      <main>
        {/* ---------- Hero ---------- */}
        <section id="inicio" className="hero">
          <div className="container hero__inner">
            <div className="hero__content">
              <span className="hero__badge">Para comercios con catálogo grande</span>
              <h1 className="hero__title hero__title--compact">
                Tu <Typewriter words={rubros} /> online,
                <span className="hero__title-muted">con precios que se actualizan en minutos.</span>
              </h1>
              <p className="hero__text">
                Tiendas y catálogos online para ferreterías, buloneras, pinturerías, casas de repuestos e insumos
                industriales. Pensados para miles de productos y precios que cambian seguido.
              </p>
              <div className="hero__actions">
                <Button href="#comenzar-proyecto">Agendar una reunión</Button>
                <Button href="#caso" variant="secondary">
                  Ver un caso real
                </Button>
              </div>
            </div>

            <div className="hero__visual">
              <BrowserFrame url="buloneraeltriangulo.com">
                <img
                  src={preview1200}
                  srcSet={`${preview640} 640w, ${preview1200} 1200w`}
                  sizes="(max-width: 768px) 1px, (max-width: 1240px) 45vw, 560px"
                  width={1200}
                  height={588}
                  alt="Tienda online de Bulonera El Triángulo, desarrollada por Codelabs"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </BrowserFrame>
              <FloatingCard position="top-right" label="Pagos" value="Mercado Pago" />
              <FloatingCard position="bottom-left" label="Envíos" value="Enviopack o retiro" />
            </div>
          </div>
        </section>

        {/* ---------- Problemas ---------- */}
        <section className="cm-section" aria-labelledby="problemas-title">
          <div className="container">
            <p className="cm-eyebrow">// ¿te suena?</p>
            <h2 id="problemas-title" className="cm-title">
              Lo que vemos en casi todos los comercios
            </h2>
            <ul className="cm-grid cm-grid--3">
              {problemas.map((p) => (
                <li key={p.title} className="cm-card">
                  <h3 className="cm-card__title">{p.title}</h3>
                  <p className="cm-card__text">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Cómo funciona ---------- */}
        <section id="como-funciona" className="cm-section" aria-labelledby="como-title">
          <div className="container">
            <p className="cm-eyebrow">// cómo funciona</p>
            <h2 id="como-title" className="cm-title">
              De tu Excel a vender online
            </h2>
            <ol className="cm-pasos">
              {pasos.map((p, i) => (
                <li key={p.title} className="cm-paso">
                  <span className="cm-paso__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="cm-card__title">{p.title}</h3>
                    <p className="cm-card__text">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Caso ---------- */}
        <section id="caso" className="cm-section" aria-labelledby="caso-title">
          <div className="container cm-caso">
            <div>
              <p className="cm-eyebrow">// caso real</p>
              <h2 id="caso-title" className="cm-title">
                Bulonera El Triángulo
              </h2>
              <p className="cm-text">
                Bulones, herramientas y elementos de seguridad industrial, con un catálogo amplio. Hoy sus clientes
                compran online y eligen recibir en su casa o retirar por el local.
              </p>
              <div className="cm-caso__cta">
                <Button href="https://buloneraeltriangulo.com" variant="secondary">
                  Ver la tienda <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>
            <div className="cm-card">
              <p className="cm-card__label">Qué hicimos</p>
              <ul className="cm-check">
                {casoHecho.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {TESTIMONIO && (
                <blockquote className="cm-testimonio">
                  <p>“{TESTIMONIO.texto}”</p>
                  <footer>{TESTIMONIO.autor}</footer>
                </blockquote>
              )}
            </div>
          </div>
        </section>

        {/* ---------- Paquetes ---------- */}
        <section id="paquetes" className="cm-section" aria-labelledby="paquetes-title">
          <div className="container">
            <p className="cm-eyebrow">// precios</p>
            <h2 id="paquetes-title" className="cm-title">
              Tres formas de arrancar
            </h2>
            <ul className="cm-grid cm-grid--3">
              {paquetes.map((p) => (
                <li key={p.nombre} className={`cm-card cm-paquete ${p.destacado ? 'cm-paquete--destacado' : ''}`}>
                  {p.destacado && <span className="cm-paquete__tag">{p.destacado}</span>}
                  <h3 className="cm-card__title">{p.nombre}</h3>
                  <p className="cm-paquete__precio">{p.precio}</p>
                  <p className="cm-card__text">{p.bajada}</p>
                  <ul className="cm-check">
                    {p.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="cm-nota">
              * Mantenimiento mensual desde USD 40: hosting, backups, seguridad y cambios. El presupuesto final se
              define en una reunión sin cargo.
            </p>
          </div>
        </section>

        <Preguntas preguntas={preguntas} />

        <Agendar mensajeWhatsapp={MENSAJE_WHATSAPP} />
      </main>
      <Footer base="/" mensajeWhatsapp={MENSAJE_WHATSAPP} />
    </>
  )
}

export default Comercios
