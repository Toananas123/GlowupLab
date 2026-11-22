import { ArrowRight, Lock, Mail, User as UserIcon, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Alert, Field, PrimaryButton } from '../../components/ui'
import { resetPassword, signIn, signInWithGoogle, signUp } from './authService'
import { authErrorMessage } from './errors'

export type AuthMode = 'signin' | 'signup' | 'reset'

export function AuthModal({ initialMode = 'signin', onClose }: { initialMode?: AuthMode; onClose: () => void }) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const switchMode = (m: AuthMode) => { setMode(m); setError(''); setInfo('') }

  async function run(fn: () => Promise<unknown>) {
    setBusy(true); setError(''); setInfo('')
    try { await fn() } catch (e) { setError(authErrorMessage(e)) } finally { setBusy(false) }
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (mode === 'signin') run(() => signIn(email, password))
    else if (mode === 'signup') run(() => signUp(name, email, password))
    else run(async () => {
      await resetPassword(email)
      setInfo('Si un compte existe pour cette adresse, tu vas recevoir un lien de réinitialisation.')
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum-900/40 p-4 backdrop-blur-md" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[2rem] bg-blush-50 p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 id="auth-title" className="font-display text-2xl font-bold">{mode === 'reset' ? 'Mot de passe oublié' : 'Mon compte'}</h2>
          <button onClick={onClose} aria-label="Fermer" className="grid size-9 place-items-center rounded-full bg-blush-100 text-plum-700"><X size={16} /></button>
        </div>

        {mode !== 'reset' && (
          <div className="mb-5 grid grid-cols-2 rounded-full border border-blush-200 bg-blush-100 p-1 text-sm font-semibold">
            {(['signin', 'signup'] as const).map((m) => (
              <button key={m} type="button" onClick={() => switchMode(m)}
                className={`rounded-full py-2 transition ${mode === m ? 'bg-plum-700 text-white' : 'text-plum-900'}`}>
                {m === 'signin' ? 'Se connecter' : 'Créer un compte'}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          {mode === 'signup' && (
            <Field icon={<UserIcon size={16} />} placeholder="Ton prénom (ex: Chloé)" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="given-name" />
          )}
          <Field icon={<Mail size={16} />} type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          {mode !== 'reset' && (
            <Field icon={<Lock size={16} />} type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} />
          )}
          {mode === 'signin' && (
            <div className="text-right">
              <button type="button" onClick={() => switchMode('reset')} className="text-xs font-semibold text-plum-700 hover:underline">Mot de passe oublié ?</button>
            </div>
          )}
          {error && <Alert>{error}</Alert>}
          {info && <Alert tone="success">{info}</Alert>}
          <PrimaryButton type="submit" disabled={busy}>
            {mode === 'signin' ? 'Se connecter' : mode === 'signup' ? 'Créer mon compte' : 'Envoyer le lien'} <ArrowRight size={16} />
          </PrimaryButton>
        </form>

        {mode === 'reset' ? (
          <button onClick={() => switchMode('signin')} className="mt-4 w-full text-center text-sm font-semibold text-plum-700">← Retour à la connexion</button>
        ) : (
          <button onClick={() => run(signInWithGoogle)} disabled={busy}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-blush-200 bg-white py-3 text-sm font-semibold text-plum-900 transition hover:bg-blush-100 disabled:opacity-60">
            <GoogleIcon /> Continuer avec Google
          </button>
        )}
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  )
}
