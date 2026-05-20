import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-(--border) bg-transparent text-(--foreground)',
        solid:   'bg-(--primary) text-(--primary-foreground)',
        signal:  'bg-(--signal) text-(--signal-foreground)',
        muted:   'bg-(--secondary) text-(--muted-foreground)',
      },
      size: {
        default: 'px-2.5 py-0.5 rounded-[var(--radius-hair)]',
        sm:      'px-2 py-px rounded-[var(--radius-hair)] text-[0.6875rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
