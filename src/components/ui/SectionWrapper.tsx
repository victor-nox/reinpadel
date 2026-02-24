import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type SectionAs = 'section' | 'div' | 'article'

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: SectionAs
  innerClassName?: string
}

/**
 * Layout wrapper that provides consistent horizontal padding, max-width
 * container, and vertical spacing across all page sections.
 *
 * Outer element: full-width, vertical padding (py-16 md:py-24)
 * Inner element: centered container, max-w-6xl, responsive horizontal padding
 *
 * Props:
 *   as            — semantic HTML element (section | div | article), default: section
 *   className     — applied to the outer element
 *   innerClassName — applied to the inner max-width container
 *   id            — forwarded for anchor links
 *   ...rest       — other HTML attributes spread onto the outer element
 */
export function SectionWrapper({
  as: Tag = 'section',
  className,
  innerClassName,
  children,
  ...rest
}: SectionWrapperProps) {
  return (
    <Tag className={cn('py-16 md:py-24', className)} {...rest}>
      <div
        className={cn(
          'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8',
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  )
}
