'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MOTION } from '@/lib/constants'

const contactSchema = z.object({
  name:    z.string().min(2, 'Nom requis (2 caractères minimum)'),
  email:   z.string().email('Adresse email invalide'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message requis (10 caractères minimum)'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    reset()
  }

  return (
    <section id="contact" className="border-t border-[--border]">
      <div className="mx-auto max-w-[1280px] px-6 py-[--spacing-3xl]">
        <div className="grid md:grid-cols-2 gap-[--spacing-2xl]">

          <div>
            <p className="font-mono text-xs tracking-widest text-[--muted-foreground] uppercase mb-4">
              Contact
            </p>
            <h2
              className="font-display italic leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Parlons de votre projet.
            </h2>
            <p className="mt-4 text-[--muted-foreground] leading-relaxed">
              [Sous-titre contact — délai de réponse, engagements, etc.]
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ease: MOTION.ease, duration: MOTION.duration.macro }}
            className="flex flex-col gap-4"
            noValidate
          >
            {isSubmitSuccessful ? (
              <p className="font-mono text-sm text-[--signal]">
                Message envoyé. Nous vous répondrons rapidement.
              </p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <Input placeholder="Votre nom *" aria-label="Nom" {...register('name')} />
                    {errors.name && (
                      <p className="font-mono text-xs text-[--signal]">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Input type="email" placeholder="Email *" aria-label="Email" {...register('email')} />
                    {errors.email && (
                      <p className="font-mono text-xs text-[--signal]">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <Input
                  placeholder="Entreprise (optionnel)"
                  aria-label="Entreprise"
                  {...register('company')}
                />

                <div className="flex flex-col gap-1">
                  <textarea
                    placeholder="Décrivez votre projet *"
                    rows={4}
                    aria-label="Message"
                    className="flex w-full border border-[--input] bg-transparent px-3 py-2 text-sm font-mono placeholder:text-[--muted-foreground] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--ring] disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="font-mono text-xs text-[--signal]">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="signal"
                  disabled={isSubmitting}
                  className="self-start"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
