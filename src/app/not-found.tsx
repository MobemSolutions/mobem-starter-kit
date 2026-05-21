import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-(--muted-foreground) mb-6">
        404
      </p>
      <h1 className="font-display text-3xl mb-4 text-balance">
        Cette page n&apos;existe pas
      </h1>
      <p className="text-(--muted-foreground) mb-10 max-w-[40rem]">
        La page que vous cherchez a peut-être été déplacée ou supprimée.
      </p>
      <Link
        href="/"
        className="inline-flex items-center bg-(--foreground) text-(--background) px-6 py-3 text-sm font-medium transition-opacity hover:opacity-75"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  )
}
