import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const barraFinalComercios: Plugin = {
  name: 'barra-final-comercios',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const [ruta, query] = (req.url ?? '').split('?')
      if (ruta === '/comercios') {
        res.statusCode = 301
        res.setHeader('Location', `/comercios/${query ? `?${query}` : ''}`)
        res.end()
        return
      }
      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), barraFinalComercios],
  build: {
    // Dos páginas: la home y /comercios (cada una con su propio HTML y meta tags)
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        comercios: fileURLToPath(new URL('./comercios/index.html', import.meta.url)),
      },
    },
  },
})
