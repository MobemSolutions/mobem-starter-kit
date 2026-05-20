import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Nom du Client — Tagline',
    template: '%s | Nom du Client',
  },
  description: 'Description courte du client et de son activité.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-(--background) text-(--foreground) font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
