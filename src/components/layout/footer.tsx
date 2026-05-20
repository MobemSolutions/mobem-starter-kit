import Link from 'next/link'
import { siteConfig } from '@/lib/config/site'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-(--border)">
      <div className="mx-auto max-w-[1280px] px-6 py-(--spacing-2xl)">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="text-sm font-medium">{siteConfig.name}</p>
            {siteConfig.tagline && (
              <p className="mt-3 text-sm text-(--muted-foreground) leading-relaxed">
                {siteConfig.tagline}
              </p>
            )}
          </div>

          {siteConfig.nav.length > 0 && (
            <nav className="flex flex-col gap-2" aria-label="Navigation principale">
              <p className="text-xs font-medium text-(--muted-foreground) uppercase mb-1">
                Navigation
              </p>
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {siteConfig.name && (
          <div className="mt-(--spacing-2xl) border-t border-(--border) pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-(--muted-foreground)">
              © {YEAR} {siteConfig.name}. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link
                href={siteConfig.legal.mentionsLegales}
                className="text-xs text-(--muted-foreground) hover:text-(--foreground) transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href={siteConfig.legal.confidentialite}
                className="text-xs text-(--muted-foreground) hover:text-(--foreground) transition-colors"
              >
                Confidentialité
              </Link>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
