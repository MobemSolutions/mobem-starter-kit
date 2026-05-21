'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Remplacer par Sentry.captureException(error) si Sentry est configuré
    console.error(error)
  }, [error])

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-(--muted-foreground) mb-6">
        Erreur
      </p>
      <h2 className="font-display text-3xl mb-4 text-balance">
        Une erreur est survenue
      </h2>
      <p className="text-(--muted-foreground) mb-10 max-w-[40rem]">
        Veuillez réessayer. Si le problème persiste, contactez-nous directement.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center bg-(--foreground) text-(--background) px-6 py-3 text-sm font-medium transition-opacity hover:opacity-75"
      >
        Réessayer
      </button>
    </main>
  )
}
