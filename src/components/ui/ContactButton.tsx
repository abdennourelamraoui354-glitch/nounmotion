import { MagneticButton } from './MagneticButton'

interface ContactButtonProps {
  label?: string
  href?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ContactButton({ label = 'Free Preview', href, className = '', size = 'md' }: ContactButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-10 py-5 text-base',
  }

  const inner = (
    <span
      className={`btn-primary inline-flex items-center gap-2 rounded-full font-semibold uppercase tracking-widest text-white ${sizeClasses[size]} ${className}`}
    >
      {label}
    </span>
  )

  return (
    <MagneticButton>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        inner
      )}
    </MagneticButton>
  )
}
