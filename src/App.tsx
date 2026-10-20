import "./App.css";
import Navbar from "./components/layout/Navbar.tsx";
import Footer from "./components/layout/Footer.tsx";
import Hero from "./components/sections/Hero.tsx";
import Portfolio from "./components/sections/Portfolio.tsx";
import Servicios from "./components/sections/Servicios.tsx";
import PorQueElegirnos from "./components/sections/PorQueElegirnos.tsx";
import Presupuesto from "./components/sections/Presupuesto.tsx";
import Agendar from "./components/sections/Agendar.tsx";
import Preguntas, { type Pregunta } from "./components/sections/Preguntas.tsx";

// Preguntas de la home: generales, para cualquier tipo de negocio
const preguntas: Pregunta[] = [
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende de lo que necesites. En la sección de presupuesto tenés los precios de entrada de cada servicio, y el valor final lo definimos en una reunión sin cargo, con el alcance por escrito.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Una landing puede estar en pocos días; una tienda online o un sistema de gestión depende del alcance. En la reunión te damos una fecha concreta.",
  },
  {
    q: "¿Por qué no uso Tiendanube, Wix o una plantilla?",
    a: "Para muchos negocios una plataforma alcanza, y si es tu caso te lo vamos a decir. Un desarrollo a medida conviene cuando necesitás algo específico: conectar con tu sistema de gestión, reglas propias de precios o stock, o automatizar tareas que hoy hacés a mano. Además, nosotros no cobramos comisión por venta: en Tiendanube, según el plan, pagás un porcentaje de cada venta si no usás su medio de pago (Pago Nube).",
  },
  {
    q: "¿Puedo modificar el contenido yo mismo?",
    a: "Sí. Según el proyecto, te dejamos un panel para editar textos, productos, precios o stock sin depender de nosotros.",
  },
  {
    q: "¿Cómo se paga?",
    a: "El precio se fija en dólares y se paga en pesos al tipo de cambio del día. 50% al empezar y 50% a la entrega.",
  },
  {
    q: "¿Qué pasa después de la entrega?",
    a: "Con el mantenimiento mensual (desde USD 40) nos ocupamos del hosting, los backups, la seguridad y los cambios que necesites.",
  },
];

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Portfolio />
        <PorQueElegirnos />
        <Presupuesto />
        <Preguntas preguntas={preguntas} />
        <Agendar />
      </main>
      <Footer />
    </>
  );
}

export default App;
