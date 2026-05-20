import { readFileSync } from 'fs'
import { join } from 'path'
import { redirect } from 'next/navigation'
import { DesignPreview } from './_preview'
import type { Proposal } from './_preview'

export const metadata = {
  title: 'Design Preview',
  robots: 'noindex, nofollow',
}

export default function DesignPreviewPage() {
  if (process.env.NODE_ENV !== 'development') redirect('/')

  let proposals: Proposal[] = []
  try {
    const raw = readFileSync(join(process.cwd(), 'docs/design-proposals.json'), 'utf-8')
    const data = JSON.parse(raw) as { proposals: Proposal[] }
    proposals = data.proposals ?? []
  } catch {
    // docs/design-proposals.json absent — /design pas encore lancé
  }

  return <DesignPreview proposals={proposals} />
}
