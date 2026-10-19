// Carga los proyectos de prueba a través de tu propia API (pasa por Mongoose,
// así las fechas se guardan como Date y se aplican las validaciones).
// Uso: node seed-portfolio.js http://localhost:3000/portfolio
import { readFile } from 'node:fs/promises'

const API = process.argv[2] ?? 'http://localhost:3000/api/portfolios/create'
const file = new URL('./portfolio-test.json', import.meta.url)
const projects = JSON.parse(await readFile(file, 'utf8'))

for (const project of projects) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  })
  const detail = res.ok ? '' : ` -> ${await res.text()}`
  console.log(`${res.ok ? 'OK   ' : 'ERROR'} ${project.nombre}${detail}`)
}