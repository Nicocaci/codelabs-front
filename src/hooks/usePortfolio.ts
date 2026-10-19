// src/hooks/usePortfolio.ts
import { useEffect, useState } from 'react'
import type { PortfolioProject } from '../types/portfolio'

const API_URL = import.meta.env.VITE_API_URL

export function usePortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Permite cancelar la petición si el componente se desmonta
    const controller = new AbortController()

    async function load() {
      try {
        // Ajustá la ruta a la que tengas en tu router (/portfolio, /api/portfolio...)
        const res = await fetch(`${API_URL}/api/portfolios`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Error ${res.status} al pedir los proyectos`)

        const data: unknown = await res.json()
        if (!Array.isArray(data)) throw new Error('Respuesta inesperada del servidor')

        setProjects(data as PortfolioProject[])
      } catch (err) {
        // Cancelar no es un error real
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(
          err instanceof Error ? err.message : 'No se pudieron cargar los proyectos',
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return { projects, loading, error }
}