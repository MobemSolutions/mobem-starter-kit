'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { MOTION } from '@/lib/constants'

export type TokenMap = Record<string, string>

export interface Proposal {
  id: string
  name: string
  ambiance: string
  tokens: TokenMap
  dark: TokenMap
  typography: { display: string; body: string; mono: string }
  radius: string
}

interface Props {
  proposals: Proposal[]
}

export function DesignPreview({ proposals }: Props) {
  const [activeId, setActiveId] = React.useState<string>(proposals[0]?.id ?? '')
  const [darkMode, setDarkMode] = React.useState(false)

  const active = proposals.find((p) => p.id === activeId)

  if (proposals.length === 0) {
    return (
      <div className="min-h-screen bg-(--background) text-(--foreground) flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-sm text-(--muted-foreground) font-mono">Aucune proposition disponible</p>
          <p className="text-xs text-(--muted-foreground)">
            Lancez <code className="font-mono bg-(--secondary) px-1.5 py-0.5">/design</code> pour générer les propositions de DA
          </p>
        </div>
      </div>
    )
  }

  const scopedTokens = {
    ...(active ? (darkMode ? { ...active.tokens, ...active.dark } : active.tokens) : {}),
  } as React.CSSProperties

  return (
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      {/* Header */}
      <div className="border-b border-(--border) bg-(--background)">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex items-center justify-between h-14">
            <p className="font-mono text-xs text-(--muted-foreground) uppercase tracking-wide">
              /_design — Prévisualisation DA
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode((d) => !d)}
                className="font-mono text-xs border border-(--border) px-3 py-1.5 text-(--muted-foreground) hover:text-(--foreground) transition-colors"
              >
                {darkMode ? '☀ Light' : '☾ Dark'}
              </button>
              <Badge variant="signal">dev only</Badge>
            </div>
          </div>

          {/* Proposal tabs */}
          <div className="flex gap-0 -mb-px">
            {proposals.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeId === p.id
                    ? 'border-(--foreground) text-(--foreground)'
                    : 'border-transparent text-(--muted-foreground) hover:text-(--foreground)'
                }`}
              >
                <span className="font-mono text-xs text-(--muted-foreground) mr-2">{p.id}</span>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Proposal content — scoped CSS variables */}
      {active && (
        <div style={scopedTokens}>
          <div
            className="min-h-screen"
            style={{ backgroundColor: `var(--background)`, color: `var(--foreground)` }}
          >
            <div className="mx-auto max-w-[1280px] px-6 py-10 space-y-16">

              {/* DA identity */}
              <section>
                <p className="font-mono text-xs uppercase tracking-wide mb-1"
                  style={{ color: 'var(--muted-foreground)' }}>
                  Direction artistique {active.id}
                </p>
                <h2 className="text-3xl font-medium mb-2">{active.name}</h2>
                <p style={{ color: 'var(--muted-foreground)' }} className="text-sm max-w-prose">
                  {active.ambiance}
                </p>
                <div className="mt-4 flex gap-6 text-xs font-mono"
                  style={{ color: 'var(--muted-foreground)' }}>
                  <span>Display : {active.typography.display}</span>
                  <span>Body : {active.typography.body}</span>
                  <span>Mono : {active.typography.mono}</span>
                  <span>Radius : {active.radius}</span>
                </div>
              </section>

              {/* Palette */}
              <section>
                <SectionTitle>Palette</SectionTitle>
                <PaletteSection tokens={darkMode ? { ...active.tokens, ...active.dark } : active.tokens} />
              </section>

              {/* Typographie */}
              <section>
                <SectionTitle>Typographie</SectionTitle>
                <TypographieSection typography={active.typography} />
              </section>

              {/* Composants */}
              <section>
                <SectionTitle>Composants</SectionTitle>
                <ComposantsSection radius={active.radius} />
              </section>

              {/* Motion */}
              <section>
                <SectionTitle>Motion</SectionTitle>
                <MotionSection />
              </section>

              {/* Espacements */}
              <section>
                <SectionTitle>Espacements</SectionTitle>
                <EspacementsSection />
              </section>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-wide mb-6"
      style={{ color: 'var(--muted-foreground)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
      {children}
    </p>
  )
}

function PaletteSection({ tokens }: { tokens: TokenMap }) {
  const swatches = [
    { key: '--background',           label: 'Background' },
    { key: '--foreground',           label: 'Foreground' },
    { key: '--primary',              label: 'Primary' },
    { key: '--primary-foreground',   label: 'Primary FG' },
    { key: '--signal',               label: 'Signal' },
    { key: '--signal-foreground',    label: 'Signal FG' },
    { key: '--secondary',            label: 'Secondary' },
    { key: '--secondary-foreground', label: 'Secondary FG' },
    { key: '--muted-foreground',     label: 'Muted FG' },
    { key: '--border',               label: 'Border' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {swatches.map(({ key, label }) => (
        <div key={key} style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div
            className="h-14"
            style={{
              backgroundColor: tokens[key] ?? `var(${key})`,
              outline: '1px solid oklch(0 0 0 / 0.05)',
            }}
          />
          <div className="p-2.5" style={{ backgroundColor: 'var(--background)' }}>
            <p className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>{label}</p>
            <p className="font-mono text-[0.6rem]" style={{ color: 'var(--muted-foreground)' }}>
              {tokens[key] ?? `var(${key})`}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TypographieSection({ typography }: { typography: Proposal['typography'] }) {
  return (
    <div className="space-y-8">
      <div className="space-y-5">
        {[
          { label: 'Display', style: { fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1, fontFamily: typography.display } },
          { label: 'H1',      style: { fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1, fontFamily: typography.display } },
          { label: 'H2',      style: { fontSize: 'clamp(1.5rem,3vw,2.25rem)', lineHeight: 1.2, fontFamily: typography.display } },
          { label: 'H3',      style: { fontSize: '1.25rem', lineHeight: 1.3, fontFamily: typography.body, fontWeight: 500 } },
        ].map(({ label, style }) => (
          <div key={label} className="flex items-baseline gap-4">
            <span className="font-mono text-xs w-16 shrink-0" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
            <p style={{ ...style, color: 'var(--foreground)' }}>
              Artisan de confiance
            </p>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <p className="text-base leading-relaxed max-w-prose mb-3"
          style={{ fontFamily: typography.body, color: 'var(--foreground)' }}>
          Corps de texte — Depuis 1998, nous intervenons sur tous vos travaux de plomberie et chauffage.
          Notre équipe vous accompagne du diagnostic jusqu&apos;à la livraison.
        </p>
        <p className="text-sm" style={{ fontFamily: typography.body, color: 'var(--muted-foreground)' }}>
          Disponible 7j/7 pour les urgences.
        </p>
      </div>

      <p className="font-mono text-xs tracking-wide uppercase"
        style={{ fontFamily: typography.mono, color: 'var(--muted-foreground)' }}>
        Label monospace · uppercase tracking-wide
      </p>
    </div>
  )
}

function ComposantsSection({ radius }: { radius: string }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>Boutons</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="default">Action primaire</Button>
          <Button variant="signal">CTA Signal</Button>
          <Button variant="outline">Secondaire</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm" variant="signal">sm</Button>
        </div>
      </div>

      <div>
        <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>Badges</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="solid">Solid</Badge>
          <Badge variant="signal">Signal</Badge>
          <Badge variant="muted">Muted</Badge>
        </div>
      </div>

      <div>
        <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>Input</p>
        <Input placeholder="Votre email" className="max-w-xs" />
      </div>

      <div>
        <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>Card</p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Exemple carte</CardTitle>
            <CardDescription>Description dans le style de la direction artistique.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="signal" size="sm">Demander un devis</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>
          Radius — {radius}
        </p>
        <div className="flex gap-6 items-end">
          {[
            { label: 'Bouton', cls: '' },
            { label: 'Card',   cls: '' },
            { label: 'Input',  cls: '' },
          ].map(({ label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-10 bg-(--signal)"
                style={{ borderRadius: radius }}
              />
              <p className="font-mono text-[0.6rem]" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MotionSection() {
  const [key, setKey] = React.useState(0)
  const EASE = MOTION.ease as unknown as [number, number, number, number]

  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <p className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
          ease [0.25, 0.1, 0.25, 1]
        </p>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="font-mono text-xs px-2 py-1 transition-colors"
          style={{ border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
        >
          ↺ Rejouer
        </button>
      </div>

      {([
        { label: 'micro',    value: MOTION.duration.micro,    desc: '200ms' },
        { label: 'standard', value: MOTION.duration.standard, desc: '300ms' },
        { label: 'macro',    value: MOTION.duration.macro,    desc: '400ms' },
      ] as const).map(({ label, value, desc }) => (
        <div key={label} className="flex items-center gap-4">
          <div className="w-24 shrink-0">
            <p className="font-mono text-xs" style={{ color: 'var(--foreground)' }}>{label}</p>
            <p className="font-mono text-[0.65rem]" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>
          </div>
          <div
            className="flex-1 h-9 overflow-hidden relative"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--secondary)' }}
          >
            <motion.div
              key={key}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: 'var(--signal)' }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ ease: EASE, duration: value, delay: 0.2 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function EspacementsSection() {
  const tokens = [
    { name: 'xs',   value: '8px',   h: 8   },
    { name: 'sm',   value: '16px',  h: 16  },
    { name: 'md',   value: '24px',  h: 24  },
    { name: 'lg',   value: '32px',  h: 32  },
    { name: 'xl',   value: '48px',  h: 48  },
    { name: '2xl',  value: '64px',  h: 64  },
    { name: '3xl',  value: '96px',  h: 96  },
    { name: 'hero', value: '128px', h: 128 },
  ]

  return (
    <div className="max-w-lg space-y-1.5">
      {tokens.map(({ name, value, h }) => (
        <div key={name} className="flex items-center gap-4">
          <span className="font-mono text-xs w-12 shrink-0" style={{ color: 'var(--muted-foreground)' }}>
            {name}
          </span>
          <div
            className="flex-1"
            style={{
              height: `${h}px`,
              backgroundColor: 'var(--signal)',
              opacity: 0.15,
              border: '1px solid var(--signal)',
            }}
          />
          <span className="font-mono text-xs w-10 text-right" style={{ color: 'var(--muted-foreground)' }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}
