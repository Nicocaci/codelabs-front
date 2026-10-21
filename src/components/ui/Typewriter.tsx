import { useEffect, useState } from 'react'
import './css/Typewriter.css'

type TypewriterProps = {
  words: string[]
  typeMs?: number // velocidad al escribir (por letra)
  deleteMs?: number // velocidad al borrar (por letra)
  holdMs?: number // cuánto queda la palabra completa
  startDelayMs?: number // espera inicial (deja terminar la animación de entrada)
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Escribe y borra palabras en loop, con cursor de terminal.
// - Reserva el ancho de la palabra más larga: el texto de alrededor no salta.
// - Los lectores de pantalla leen solo la primera palabra, sin el tipeo.
// - Con "reducir movimiento" activado muestra la primera palabra fija.
function Typewriter({
  words,
  typeMs = 75,
  deleteMs = 40,
  holdMs = 2200,
  startDelayMs = 900,
}: TypewriterProps) {
  const [reduced] = useState(prefersReducedMotion)
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState(reduced ? words[0] : '')
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(reduced)

  // Espera inicial
  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setStarted(true), startDelayMs)
    return () => clearTimeout(t)
  }, [reduced, startDelayMs])

  // Un paso del tipeo por vez: escribir, esperar, borrar, pasar a la siguiente
  useEffect(() => {
    if (!started || reduced || words.length === 0) return
    const word = words[wordIndex]

    let delay: number
    let step: () => void

    if (!deleting && text === word) {
      if (words.length === 1) return // una sola palabra: queda fija
      delay = holdMs
      step = () => setDeleting(true)
    } else if (deleting && text === '') {
      delay = 350
      step = () => {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }
    } else {
      delay = deleting ? deleteMs : typeMs
      step = () =>
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }

    const t = setTimeout(step, delay)
    return () => clearTimeout(t)
  }, [started, reduced, words, wordIndex, text, deleting, typeMs, deleteMs, holdMs])

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className="typewriter">
      {/* Texto para lectores de pantalla */}
      <span className="sr-only">{words[0]}</span>

      <span className="typewriter__box" aria-hidden="true">
        {/* Fantasma invisible: reserva el ancho de la palabra más larga */}
        <span className="typewriter__ghost">{longest}</span>
        <span className="typewriter__text">
          {text}
          <span className={`typewriter__cursor ${deleting || text !== words[wordIndex] ? 'is-typing' : ''}`} />
        </span>
      </span>
    </span>
  )
}

export default Typewriter
