export type { ClassValue } from 'clsx'

/** Site-level metadata — used in layout.tsx and page-level metadata exports */
export interface SiteMetadata {
  title: string
  description: string
  url: string
  ogImage?: string
  locale?: string
}

/** Navigation item */
export interface NavItem {
  label: string
  href: string
  external?: boolean
}

/** Service offered by the client */
export interface ServiceItem {
  id: string
  title: string
  description: string
  icon?: string
  href?: string
}

/** Testimonial / client review */
export interface TestimonialItem {
  id: string
  author: string
  role: string
  company: string
  content: string
  rating?: number
}

/** Portfolio project preview */
export interface ProjectPreview {
  id: string
  slug: string
  title: string
  tagline: string
  category: string
  coverImage?: string
  featured?: boolean
}

/** Color scheme for sections / project cards */
export type ColorScheme = 'default' | 'inverse' | 'signal'

/** Responsive breakpoint */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'
