import type { NavItem } from '@/types'

// Remplir après /strategy — source de vérité pour header, footer, metadata
export const siteConfig = {
  name: '',
  tagline: '',
  nav: [] as NavItem[],
  cta: {
    label: '',
    href: '/#contact',
  },
  contact: {
    phone: '',
    phoneHref: 'tel:+33',
    address: '',
    postalCode: '',
    city: '',
    hours: '',
    emergency: '',
    zone: '',
  },
  legal: {
    mentionsLegales: '/mentions-legales',
    confidentialite: '/confidentialite',
  },
}
