// Carga los proyectos de prueba a través de tu propia API (pasa por Mongoose,
// así las fechas se guardan como Date y se aplican las validaciones).
// Uso (PowerShell):
//   $env:ADMIN_API_KEY="tu-clave"; node src/scripts/seed-portfolio.js https://tu-api.up.railway.app/api/portfolios/create
import { readFile } from 'node:fs/promises'

const API = process.argv[2] ?? 'http://localhost:3000/api/portfolios/create'
const ADMIN_KEY = process.env.ADMIN_API_KEY
if (!ADMIN_KEY) {
  console.error('Falta la variable ADMIN_API_KEY')
  process.exit(1)
}

const file = new URL('./portfolio-test.json', import.meta.url)
const projects = JSON.parse(await readFile(file, 'utf8'))

for (const project of projects) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
    body: JSON.stringify(project),
  })
  const detail = res.ok ? '' : ` -> ${await res.text()}`
  console.log(`${res.ok ? 'OK   ' : 'ERROR'} ${project.nombre}${detail}`)
}
