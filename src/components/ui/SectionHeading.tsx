import { FadeIn } from './FadeIn'

interface SectionHeadingProps {
  children: React.ReactNode
  eyebrow?: string
  dark?: boolean
  className?: string
}

export function SectionHeading({ children, eyebrow, dark = false, className = '' }: SectionHeadingProps) {
  return (
    <FadeIn className={className}>
      {eyebrow && (
        <p className={`mb-4 text-xs uppercase tracking-[0.3em] font-semibold ${dark ? 'text-[#0C0C0C]/50' : 'text-[rgba(215,226,234,0.5)]'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text`}>
        {children}
      </h2>
    </FadeIn>
  )
}
