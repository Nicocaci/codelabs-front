// Refleja lo que devuelve el backend (modelo Mongoose + campos que agrega MongoDB)
export type PortfolioProject = {
  _id: string
  nombre: string
  descripcion: string
  fechaCreacion: string // en JSON las fechas llegan como string ISO, no como Date
  imagen: string[]
  servicio: string
  desafio: string
  solucion: string
  caracteristicas: string[]
  url: string
  // Opcionales: los proyectos viejos de tu base pueden no tenerlos
  destacado?: boolean
  resultado?: string
}