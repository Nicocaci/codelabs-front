import type { ReactNode } from 'react'
import './css/BrowserFrame.css'

type BrowserFrameProps = {
  url: string // lo que se muestra en la barra, ej: "tuproyecto.com.ar"
  children: ReactNode // lo que va adentro de la ventana (una imagen, por ejemplo)
}

function BrowserFrame({ url, children }: BrowserFrameProps) {
  return (
    <div className="browser">
      <div className="browser__bar">
        <span className="browser__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="browser__url">{url}</span>
      </div>
      <div className="browser__body">{children}</div>
    </div>
  )
}

export default BrowserFrame