'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { MOTION } from '@/lib/constants'
import type { NavItem } from '@/types'

// Remplacer par les pages réelles du client via le prompt d'initialisation
const NAV_ITEMS: NavItem[] = [
  { label: '[Page 1]', href: '/#services' },
  { label: '[Page 2]', href: '/#realisations' },
  { label: '[Page 3]', href: '/a-propos' },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useIsMobile()

  React.useEffect(() => {
    if (!isMobile) setIsOpen(false)
  }, [isMobile])

  return (
    <header className="sticky top-0 z-40 border-b border-[--border] bg-[--background]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-widest hover:text-[--muted-foreground] transition-colors"
        >
          [NOM CLIENT]
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs font-medium tracking-wide text-[--muted-foreground] transition-colors hover:text-[--foreground]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center h-9 px-5 font-mono text-xs font-medium tracking-wide bg-[--signal] text-[--signal-foreground] transition-colors hover:bg-[--signal]/90"
          >
            [CTA principal]
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-[--foreground]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ ease: MOTION.ease, duration: MOTION.duration.micro }}
            className="border-t border-[--border] bg-[--background] md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center h-10 px-6 font-mono text-sm font-medium tracking-wide bg-[--signal] text-[--signal-foreground] transition-colors hover:bg-[--signal]/90 mt-2"
              >
                [CTA principal]
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
