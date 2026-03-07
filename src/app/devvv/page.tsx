'use client'

import { useState } from 'react'

export default function DevPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (res.ok) {
        setStatus('success')
        setMessage('Merci ! Vous êtes inscrit(e) à la newsletter.')
        setEmail('')
      } else {
        const data = await res.json()
        setStatus('error')
        setMessage(data.error || 'Une erreur est survenue.')
      }
    } catch {
      setStatus('error')
      setMessage('Erreur de connexion.')
    }
  }

  return (
    <div className="min-h-screen bg-brand-navy text-white">
      {/* Header */}
      <div className="py-8 text-center">
        <span className="inline-block rounded-full bg-brand-coral px-4 py-1 text-xs font-bold uppercase tracking-wider">
          Preview
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold">Newsletter Signup Options</h1>
        <p className="mt-2 text-white/60">3 Varianten für reinpadel.fr</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-16 px-4 pb-20">
        
        {/* Option 1: Inline im Footer-Stil */}
        <section className="rounded-2xl bg-white/5 p-8">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-brand-coral">
            Option A — Kompakt (Footer-Bereich)
          </h2>
          <div className="rounded-xl bg-brand-navy border border-white/10 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">Restez informé</h3>
                <p className="text-sm text-white/60">Recevez les actualités du Rein Padel Tour</p>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm placeholder-white/40 outline-none ring-1 ring-white/20 focus:ring-brand-cyan"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-lg bg-brand-coral px-5 py-2 text-sm font-bold transition-colors hover:bg-brand-coral/80 disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : "S'inscrire"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Option 2: Prominent CTA */}
        <section className="rounded-2xl bg-white/5 p-8">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-brand-coral">
            Option B — Prominent (Eigener Section)
          </h2>
          <div className="rounded-xl bg-gradient-to-br from-brand-navy to-brand-gray border border-white/10 p-8 text-center">
            <div className="mx-auto max-w-md">
              <span className="inline-block text-4xl mb-4">📬</span>
              <h3 className="font-display text-2xl font-bold">Suivez l&apos;aventure</h3>
              <p className="mt-2 text-white/60">
                Inscrivez-vous pour recevoir les résultats, photos et moments forts de chaque étape.
              </p>
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    required
                    className="rounded-lg bg-white/10 px-4 py-3 text-center placeholder-white/40 outline-none ring-1 ring-white/20 focus:ring-brand-cyan sm:w-64"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="rounded-lg bg-brand-coral px-6 py-3 font-bold transition-all hover:bg-brand-coral/80 hover:scale-105 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Envoi...' : 'Je m\'inscris →'}
                  </button>
                </div>
              </form>
              <p className="mt-4 text-xs text-white/40">Pas de spam, promis. Désinscription facile.</p>
            </div>
          </div>
        </section>

        {/* Option 3: Minimal Inline */}
        <section className="rounded-2xl bg-white/5 p-8">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-brand-coral">
            Option C — Minimal (Floating Bar)
          </h2>
          <div className="rounded-xl bg-brand-coral p-4">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <span className="font-display font-bold">🎾 Newsletter Rein Padel Tour</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                required
                className="rounded-lg bg-white/20 px-4 py-2 text-sm placeholder-white/60 outline-none ring-1 ring-white/30 focus:ring-white"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-lg bg-white px-5 py-2 text-sm font-bold text-brand-coral transition-colors hover:bg-white/90 disabled:opacity-50"
              >
                OK
              </button>
            </form>
          </div>
        </section>

        {/* Status Message */}
        {status !== 'idle' && (
          <div className={`rounded-lg p-4 text-center ${
            status === 'success' ? 'bg-green-500/20 text-green-300' :
            status === 'error' ? 'bg-red-500/20 text-red-300' :
            'bg-white/10 text-white/60'
          }`}>
            {message}
          </div>
        )}

      </div>
    </div>
  )
}
