import './css/Preguntas.css'

export type Pregunta = { q: string; a: string }

type PreguntasProps = {
  preguntas: Pregunta[]
  titulo?: string
}

// Preguntas frecuentes. Se usa en la home y en /comercios, cada una con sus propias preguntas.
// <details> funciona sin JavaScript y es accesible con teclado.
function Preguntas({ preguntas, titulo = 'Lo que más nos preguntan' }: PreguntasProps) {
  return (
    <section id="preguntas" className="preguntas" aria-labelledby="preguntas-title">
      <div className="container">
        <p className="preguntas__eyebrow">// preguntas frecuentes</p>
        <h2 id="preguntas-title" className="preguntas__title">
          {titulo}
        </h2>
        <div className="preguntas__list">
          {preguntas.map((p) => (
            <details key={p.q} className="preguntas__item">
              <summary>{p.q}</summary>
              <p>{p.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Preguntas
