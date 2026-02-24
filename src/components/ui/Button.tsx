import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'ghost' | 'blue' | 'red' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-cyan text-white hover:bg-brand-cyan/90',
  ghost:
    'bg-transparent border border-white text-white hover:bg-white/10',
  blue:
    'bg-brand-navy text-white hover:bg-brand-navy/90',
  red:
    'bg-brand-coral text-white hover:bg-brand-coral/90',
  outline:
    'bg-transparent border border-brand-navy text-brand-navy hover:bg-brand-navy/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

/**
 * Pill-shaped button with 5 variants and 3 sizes.
 *
 * Variants:
 *   primary  — cyan solid bg, white text (main CTAs)
 *   ghost    — transparent bg, white border and text (dark/image backgrounds)
 *   blue     — navy solid bg, white text (participation cards)
 *   red      — coral solid bg, white text (participation cards)
 *   outline  — transparent bg, navy border and text (participation cards)
 *
 * Sizes: sm | md | lg
 *
 * Uses cn() so callers can override individual classes via className prop.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-display font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
