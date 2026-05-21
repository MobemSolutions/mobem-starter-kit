---
description: Phase 3.5 — Setup formulaire de contact production-ready. Resend pour l'envoi email, honeypot anti-spam, email de confirmation client, rate limiting. À lancer après le composant visuel contact, avant /impeccable.
---

# /contact-setup — Formulaire de Contact Production-Ready

## Prérequis — vérifications bloquantes

- Le composant visuel `src/components/sections/contact.tsx` existe
- `docs/product.md` contient l'email professionnel du client
- Accès à un compte Resend (resend.com — plan gratuit : 3 000 emails/mois)

## Ordre de lecture

1. `docs/product.md` — email de destination, nom du professionnel, ton de marque
2. `CLAUDE.md` § Sécurité — règles routes API, rate limiting

## Étape 1 — Dépendances

```bash
pnpm add resend zod
```

Vérifier l'existence sur npmjs.com avant d'installer (règle slopsquatting).
`pnpm audit` après installation.

## Étape 2 — Variables d'environnement

`.env.local` (jamais `.env`, jamais en dur) :
```
RESEND_API_KEY=re_xxxx
CONTACT_EMAIL_TO=email@professionnel.fr
```

`.env.example` (sans valeur, commité) :
```
RESEND_API_KEY=
CONTACT_EMAIL_TO=
```

## Étape 3 — Route API

`src/app/api/contact/route.ts`

```typescript
import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name:       z.string().min(2).max(100),
  email:      z.string().email(),
  phone:      z.string().max(20).optional(),
  message:    z.string().min(10).max(2000),
  _honeypot:  z.string().max(0), // doit être vide — bot si rempli
})

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Requête invalide' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }

  const { name, email, phone, message, _honeypot } = parsed.data

  // Honeypot : faux succès pour ne pas signaler la détection au bot
  if (_honeypot) return NextResponse.json({ ok: true })

  const to = process.env.CONTACT_EMAIL_TO
  if (!to) throw new Error('CONTACT_EMAIL_TO manquant dans .env.local')

  // Email de notification au professionnel
  await resend.emails.send({
    from:    'contact@[domaine-client].fr',   // TODO: remplacer par le domaine réel
    to,
    replyTo: email,
    subject: `Nouvelle demande — ${name}`,
    text:    `Nom : ${name}\nEmail : ${email}\nTél : ${phone ?? '—'}\n\n${message}`,
  })

  // Email de confirmation au visiteur — ton cohérent avec la voix de marque
  await resend.emails.send({
    from:    'noreply@[domaine-client].fr',   // TODO: remplacer par le domaine réel
    to:      email,
    subject: 'Votre demande a bien été reçue',
    text:    `Bonjour ${name},\n\nNous avons bien reçu votre message et vous répondrons dans les meilleurs délais.\n\nCordialement,\n[NOM CLIENT]`,
  })

  return NextResponse.json({ ok: true })
}
```

**Règles sécurité :**
- `import 'server-only'` en tête — obligatoire
- Zod valide chaque champ avec min/max — ne jamais passer `req.body` directement
- `replyTo: email` sur l'email pro → répondre directement au visiteur sans copier son adresse dans From

## Étape 4 — Honeypot dans le composant formulaire

Dans `src/components/sections/contact.tsx`, ajouter le champ invisible dans le `<form>` :

```tsx
{/* Honeypot anti-spam — invisible pour l'utilisateur, rempli par les bots */}
<input
  type="text"
  name="_honeypot"
  className="hidden"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>
```

Inclure `_honeypot: ''` dans l'objet envoyé à l'API.

## Étape 5 — Rate limiting (si @upstash/ratelimit disponible)

Si le projet a un compte Upstash (free tier disponible), ajouter en tête de la route API :

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 m'),
})

const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
const { success } = await ratelimit.limit(ip)
if (!success) {
  return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans une minute.' }, { status: 429 })
}
```

Si pas d'Upstash : laisser un `TODO: rate limiting` visible et continuer — le honeypot suffit pour les bots simples.

## Étape 6 — Gestion des erreurs côté formulaire

Dans `src/components/sections/contact.tsx`, gérer les états :

```typescript
const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

const onSubmit = async (data: FormData) => {
  setStatus('sending')
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    setStatus('success')
    window.plausible?.('Formulaire soumis') // Plausible custom event
  } else {
    setStatus('error')
  }
}
```

Messages d'état — ton cohérent avec la voix de marque (lire `docs/brand-voice.md` si existe) :
- `sending` : "Envoi en cours…" (désactiver le bouton submit)
- `success` : "Message envoyé — nous vous répondrons sous 24h."
- `error` : "Une erreur est survenue. Appelez-nous directement au [téléphone]." (fallback avec le vrai numéro)

## Étape 7 — Tests obligatoires

Avant de valider, tester en conditions réelles (`pnpm dev` ou preview Vercel) :

- [ ] Soumission normale → email reçu par le professionnel (vérifier les spams)
- [ ] Soumission normale → email de confirmation reçu par le visiteur
- [ ] Soumission avec `_honeypot` rempli → aucun email envoyé, réponse `{ ok: true }`
- [ ] Soumission avec champ manquant → status 400, message d'erreur affiché
- [ ] Bouton submit désactivé pendant l'envoi (pas de double-soumission)

## Checklist finale

- [ ] `.env.local` : `RESEND_API_KEY` + `CONTACT_EMAIL_TO` renseignés
- [ ] `.env.example` mis à jour (sans valeur)
- [ ] `import 'server-only'` présent en tête de la route
- [ ] Honeypot dans le HTML (`aria-hidden`, `tabIndex={-1}`, `className="hidden"`)
- [ ] Validation Zod : min/max sur chaque champ
- [ ] `replyTo` = email du visiteur sur l'email pro
- [ ] Ton de l'email de confirmation cohérent avec la voix de marque
- [ ] 7 tests ci-dessus passés
- [ ] `TODO:` domaines email remplacés par les vrais domaines
