import type { ReactNode } from 'react';
import './css/Button.css'

type ButtonProps = {
    children: ReactNode
    variant?: 'primary' | 'secondary'
    href?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
}

function Button({ children, variant = 'primary', href, onClick, type} : ButtonProps) {
    const className = `btn btn--${variant}`;

    if (href) {
        // Links externos (WhatsApp, etc.) se abren en otra pestaña
        const external = href.startsWith('http')
        return (
            <a
                href={href}
                className={className}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
                {children}
            </a>
        )
    }
    return <button onClick={onClick} type={type} className={className}>
        {children}
    </button>
}
export default Button;
