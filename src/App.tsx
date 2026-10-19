import "./App.css";
import Navbar from "./components/layout/Navbar.tsx";
import Footer from "./components/layout/Footer.tsx";
import Hero from "./components/sections/Hero.tsx";
import Portfolio from "./components/sections/Portfolio.tsx";
import Servicios from "./components/sections/Servicios.tsx";
import PorQueElegirnos from "./components/sections/PorQueElegirnos.tsx";
import Presupuesto from "./components/sections/Presupuesto.tsx";
import Agendar from "./components/sections/Agendar.tsx";

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
        <Agendar />
      </main>
      <Footer />
    </>
  );
}

export default App;
