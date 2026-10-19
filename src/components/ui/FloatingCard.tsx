import './css/FloatingCard.css'

type FloatingCardProps = {
  label: string // texto chico en mono: "Entrega"
  value: string // texto principal: "Desde 5 días hábiles"
  position: 'top-right' | 'bottom-left'
}

function FloatingCard({ label, value, position }: FloatingCardProps) {
  return (
    <div className={`floating-card floating-card--${position}`}>
      <span className="floating-card__label">{label}</span>
      <strong className="floating-card__value">{value}</strong>
    </div>
  )
}

export default FloatingCard