// Optimiza imágenes de Cloudinary agregando transformaciones a la URL:
// f_auto  → formato moderno según el navegador (WebP/AVIF)
// q_auto  → compresión automática sin pérdida visible
// w_XXX   → ancho máximo; c_limit evita agrandar imágenes chicas
// Si la URL no es de Cloudinary, se devuelve tal cual.
const UPLOAD = '/image/upload/'

export function cloudinaryUrl(url: string, width: number): string {
  if (!url.includes('res.cloudinary.com') || !url.includes(UPLOAD)) return url
  const transform = `f_auto,q_auto,c_limit,w_${width}/`
  return url.replace(UPLOAD, `${UPLOAD}${transform}`)
}

// srcSet listo para <img>: "url-480 480w, url-800 800w, ..."
export function cloudinarySrcSet(url: string, widths: number[]): string | undefined {
  if (!url.includes('res.cloudinary.com')) return undefined
  return widths.map((w) => `${cloudinaryUrl(url, w)} ${w}w`).join(', ')
}
