import { useState } from 'react'
import { AuthModal, type AuthMode } from '../features/auth/AuthModal'

/** Page vitrine minimale : sera reconstruite à partir des règles de gestion. */
export function LandingPage() {
  const [mode, setMode] = useState<AuthMode | null>(null)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-display text-4xl font-bold sm:text-6xl">Planifie. Entraîne-toi. <span className="italic text-glow-500">Progresse.</span></h1>
      <p className="max-w-xl text-plum-700/80">Toute ta routine au même endroit : prépare ta semaine, valide tes séries en un geste et suis l'évolution de tes charges sans effort.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={() => setMode('signup')} className="rounded-full bg-plum-700 px-6 py-3 font-semibold text-white">Démarrer gratuitement</button>
        <button onClick={() => setMode('signin')} className="rounded-full border border-blush-200 bg-white px-6 py-3 font-semibold">J'ai déjà un compte</button>
      </div>
      {mode && <AuthModal initialMode={mode} onClose={() => setMode(null)} />}
    </div>
  )
}
