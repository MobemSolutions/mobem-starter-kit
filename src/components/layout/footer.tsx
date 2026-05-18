import Link from 'next/link'

const YEAR = new Date().getFullYear()

// Remplacer par les pages réelles du client via le prompt d'initialisation
const NAV_LINKS = [
  { label: '[Page 1]', href: '/#services' },
  { label: '[Page 2]', href: '/#realisations' },
  { label: 'Contact',  href: '/#contact' },
]

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité',  href: '/confidentialite' },
]

export function Footer() {
  return (
    <footer className="border-t border-[--border]">
      <div className="mx-auto max-w-[1280px] px-6 py-[--spacing-2xl]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="font-mono text-sm font-medium tracking-widest">[NOM CLIENT]</p>
            <p className="mt-3 text-sm text-[--muted-foreground] leading-relaxed">
              [Activité — proposition de valeur courte en une phrase.]
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Navigation principale">
            <p className="font-mono text-xs font-medium tracking-widest text-[--muted-foreground] uppercase mb-1">
              Navigation
            </p>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-[--spacing-2xl] border-t border-[--border] pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-[--muted-foreground]">
            © {YEAR} [Nom Client]. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs text-[--muted-foreground] hover:text-[--foreground] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
