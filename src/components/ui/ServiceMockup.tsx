import './css/ServiceMockup.css'

export type MockupVariant = 'web' | 'ecommerce' | 'sistemas' | 'automatizaciones'

// Wireframes hechos solo con CSS: bloques que sugieren cada tipo de proyecto
function ServiceMockup({ variant }: { variant: MockupVariant }) {
  return (
    <div className={`mock mock--${variant}`} aria-hidden="true">
      {variant === 'web' && <MockWeb />}
      {variant === 'ecommerce' && <MockEcommerce />}
      {variant === 'sistemas' && <MockSistemas />}
      {variant === 'automatizaciones' && <MockAutomatizaciones />}
    </div>
  )
}

function MockNav() {
  return (
    <div className="mock__nav">
      <i className="mock__logo" />
      <span>
        <i />
        <i />
        <i className="mock__pill" />
      </span>
    </div>
  )
}

function MockWeb() {
  return (
    <>
      <MockNav />
      <div className="mock__hero">
        <i className="mock__line mock__line--xl" />
        <i className="mock__line mock__line--md" />
        <i className="mock__btn" />
      </div>
      <div className="mock__features">
        {[1, 2, 3].map((n) => (
          <div key={n}>
            <i className="mock__circle" />
            <i className="mock__line mock__line--sm" />
            <i className="mock__line mock__line--xs" />
          </div>
        ))}
      </div>
      <i className="mock__wa" />
    </>
  )
}

function MockEcommerce() {
  return (
    <>
      <MockNav />
      <div className="mock__search">
        <i />
        <span>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="mock__products">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n}>
            <i className="mock__thumb" />
            <i className="mock__line mock__line--sm" />
            <i className="mock__price" />
          </div>
        ))}
      </div>
    </>
  )
}

function MockSistemas() {
  return (
    <div className="mock__app">
      <aside className="mock__sidebar">
        <i className="mock__logo" />
        {[1, 2, 3, 4, 5].map((n) => (
          <i key={n} className={n === 1 ? 'is-active' : ''} />
        ))}
      </aside>
      <div className="mock__main">
        <div className="mock__stats">
          {[1, 2, 3].map((n) => (
            <div key={n}>
              <i className="mock__line mock__line--xs" />
              <i className="mock__stat" />
            </div>
          ))}
        </div>
        <div className="mock__chart">
          {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mock__table">
          {[1, 2, 3, 4].map((n) => (
            <div key={n}>
              <i />
              <i />
              <i className="mock__tag" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MockAutomatizaciones() {
  const nodes = [
    { label: 'nuevo pedido', accent: false },
    { label: 'actualizar stock', accent: false },
    { label: 'aviso al cliente', accent: true },
  ]
  return (
    <div className="mock__flow">
      {nodes.map((node, i) => (
        <div key={node.label} className="mock__flow-step">
          <div className={`mock__node ${node.accent ? 'mock__node--accent' : ''}`}>
            <i className="mock__node-icon" />
            <span>{node.label}</span>
          </div>
          {i < nodes.length - 1 && <i className="mock__connector" />}
        </div>
      ))}
      <div className="mock__chat">
        <i className="mock__bubble" />
        <i className="mock__bubble mock__bubble--out" />
      </div>
    </div>
  )
}

export default ServiceMockup
