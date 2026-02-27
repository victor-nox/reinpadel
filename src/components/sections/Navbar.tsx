'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Fr } from '@/lib/typography'

const NAV_LINKS = [
  { href: '#etapes', label: 'Les etapes' },
  { href: '#partenaires', label: 'Partenaires' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo + name */}
        <a href="#hero" className="flex items-center gap-2">
          <Image
            src="/rpt_logo.png"
            alt="Rein Padel Tour"
            width={424}
            height={424}
            className="h-8 w-8 object-contain"
          />
          <span className="hidden font-display text-sm font-semibold uppercase tracking-wide text-white sm:block">
            Rein Padel Tour
          </span>
        </a>

        {/* Links */}
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                <Fr>{link.label}</Fr>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:reinpadeltour@gmail.com"
          className="rounded-full bg-brand-coral px-4 py-1.5 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-coral/90"
        >
          reinpadeltour@gmail.com
        </a>
      </nav>
    </header>
  )
}
