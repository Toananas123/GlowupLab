import { Lock } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Alert, Field, Modal, PrimaryButton } from '../../components/ui'
import { useAuth } from './AuthProvider'
import { setNewPassword } from './authService'
import { authErrorMessage } from './errors'

/** Ouvert depuis le lien « mot de passe oublié » reçu par e-mail. */
export function NewPasswordModal() {
  const { recovering, finishRecovery } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Les deux mots de passe ne sont pas identiques.'); return }
    setBusy(true); setError('')
    try { await setNewPassword(password); finishRecovery() } catch (err) { setError(authErrorMessage(err)) } finally { setBusy(false) }
  }

  return (
    <Modal open={recovering} onClose={finishRecovery} title="Choisis un nouveau mot de passe" maxWidth="max-w-md">
      <form onSubmit={submit} className="space-y-3">
        <Field icon={<Lock size={16} />} type="password" placeholder="Nouveau mot de passe (6 caractères min.)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete="new-password" />
        <Field icon={<Lock size={16} />} type="password" placeholder="Confirme le mot de passe" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={6} autoComplete="new-password" />
        {error && <Alert>{error}</Alert>}
        <PrimaryButton type="submit" disabled={busy}>{busy ? 'Enregistrement…' : 'Enregistrer le mot de passe'}</PrimaryButton>
      </form>
    </Modal>
  )
}
