'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { MOTION } from '@/lib/constants'
import { siteConfig } from '@/lib/config/site'

export function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const isOpen = isMobile && menuOpen

  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-(--background)">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium hover:text-(--muted-foreground) transition-colors"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-(--muted-foreground) transition-colors hover:text-(--foreground)"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {siteConfig.cta.label && (
          <div className="hidden md:flex">
            <Link
              href={siteConfig.cta.href}
              className="inline-flex items-center justify-center h-9 px-5 text-xs font-medium bg-(--signal) text-(--signal-foreground) transition-colors hover:bg-(--signal)/90"
            >
              {siteConfig.cta.label}
            </Link>
          </div>
        )}

        <button
          className="md:hidden p-2 text-(--foreground)"
          onClick={() => setMenuOpen(!isOpen)}
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
            className="border-t border-(--border) bg-(--background) md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {siteConfig.cta.label && (
                <Link
                  href={siteConfig.cta.href}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium bg-(--signal) text-(--signal-foreground) transition-colors hover:bg-(--signal)/90 mt-2"
                >
                  {siteConfig.cta.label}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
