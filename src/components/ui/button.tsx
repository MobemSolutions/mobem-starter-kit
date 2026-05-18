'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { MOTION } from '@/lib/constants'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[--primary] text-[--primary-foreground] hover:bg-[--primary]/90',
        outline: 'border border-[--border] bg-transparent hover:bg-[--secondary] hover:text-[--secondary-foreground]',
        ghost:   'hover:bg-[--secondary] hover:text-[--secondary-foreground]',
        signal:  'bg-[--signal] text-[--signal-foreground] hover:bg-[--signal]/90',
        link:    'text-[--primary] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm:      'h-8 px-4 text-xs',
        lg:      'h-12 px-8 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonProps = HTMLMotionProps<'button'> & VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ ease: MOTION.ease, duration: MOTION.duration.micro }}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
