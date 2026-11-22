import { ArrowRight, Lock, Mail, User as UserIcon, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Alert, Field, PrimaryButton } from '../../components/ui'
import { resendConfirmation, resetPassword, signIn, signUp } from './authService'
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
  const [pendingEmail, setPendingEmail] = useState('')

  const switchMode = (m: AuthMode) => { setMode(m); setError(''); setInfo('') }

  async function run(fn: () => Promise<unknown>) {
    setBusy(true); setError(''); setInfo('')
    try { await fn() } catch (e) { setError(authErrorMessage(e)) } finally { setBusy(false) }
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (mode === 'signin') run(async () => {
      try { await signIn(email, password) } catch (err) {
        if (/not confirmed/i.test(String((err as Error)?.message))) setPendingEmail(email)
        throw err
      }
    })
    else if (mode === 'signup') run(async () => {
      const { needsConfirmation } = await signUp(name, email, password)
      if (needsConfirmation) {
        setPendingEmail(email)
        setInfo(`Compte créé ! Ouvre l’e-mail envoyé à ${email.trim()} et clique sur le lien pour activer ton compte.`)
        setMode('signin')
      }
    })
    else run(async () => {
      await resetPassword(email)
      setInfo('Si un compte existe pour cette adresse, tu vas recevoir un lien de réinitialisation.')
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f0c17]/40 p-4 backdrop-blur-md" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[2rem] bg-bg p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 id="auth-title" className="font-display text-2xl font-bold">{mode === 'reset' ? 'Mot de passe oublié' : 'Mon compte'}</h2>
          <button onClick={onClose} aria-label="Fermer" className="grid size-9 place-items-center rounded-full bg-soft text-plum"><X size={16} /></button>
        </div>

        {mode !== 'reset' && (
          <div className="mb-5 grid grid-cols-2 rounded-full border border-blush-line bg-soft p-1 text-sm font-semibold">
            {(['signin', 'signup'] as const).map((m) => (
              <button key={m} type="button" onClick={() => switchMode(m)}
                className={`rounded-full py-2 transition ${mode === m ? 'bg-[#781539] text-white' : 'text-ink'}`}>
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
              <button type="button" onClick={() => switchMode('reset')} className="text-xs font-semibold text-plum hover:underline">Mot de passe oublié ?</button>
            </div>
          )}
          {error && <Alert>{error}</Alert>}
          {info && <Alert tone="success">{info}</Alert>}
          <PrimaryButton type="submit" disabled={busy}>
            {busy ? 'Chargement...' : mode === 'signin' ? 'Se connecter' : mode === 'signup' ? 'Créer mon compte' : 'Envoyer le lien'} <ArrowRight size={16} />
          </PrimaryButton>
        </form>

        {pendingEmail && mode === 'signin' && (
          <button type="button" disabled={busy} onClick={() => run(async () => { await resendConfirmation(pendingEmail); setInfo('E-mail de confirmation renvoyé.') })}
            className="mt-4 w-full text-center text-sm font-semibold text-plum hover:underline">Renvoyer l’e-mail de confirmation</button>
        )}
        {mode === 'reset' && (
          <button onClick={() => switchMode('signin')} className="mt-4 w-full text-center text-sm font-semibold text-plum">← Retour à la connexion</button>
        )}
      </div>
    </div>
  )
}
