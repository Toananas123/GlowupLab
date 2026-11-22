import { LogOut, Trash2 } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Alert, Field, Modal, PrimaryButton } from '../../components/ui'
import { useAuth } from '../auth/AuthProvider'
import { changeDisplayName, changePassword, deleteAccount, signOut, usesPassword } from '../auth/authService'
import { authErrorMessage } from '../auth/errors'
import { REST_OPTIONS, type UnitSystem } from './types'

const restLabel = (s: number) => (s >= 120 ? `${s / 60} minutes` : `${s} secondes`)

export function ProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, profile, saveProfile } = useAuth()
  const [name, setName] = useState('')
  const [spotify, setSpotify] = useState('')
  const [units, setUnits] = useState<UnitSystem>('metric')
  const [rest, setRest] = useState(75)
  const [msg, setMsg] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!profile) return
    setName(profile.displayName); setSpotify(profile.spotifyUrl); setUnits(profile.unitSystem); setRest(profile.defaultRestTime)
  }, [profile])

  if (!user) return null

  async function save(e: FormEvent) {
    e.preventDefault()
    if (spotify && !/^https:\/\/open\.spotify\.com\//.test(spotify.trim())) {
      setMsg({ tone: 'error', text: 'Le lien doit commencer par https://open.spotify.com/' }); return
    }
    setBusy(true); setMsg(null)
    try {
      if (name.trim() !== user!.displayName) await changeDisplayName(user!, name.trim())
      await saveProfile({ displayName: name.trim(), spotifyUrl: spotify.trim(), unitSystem: units, defaultRestTime: rest })
      setMsg({ tone: 'success', text: 'Enregistré !' })
    } catch (err) { setMsg({ tone: 'error', text: authErrorMessage(err) }) } finally { setBusy(false) }
  }

  return (
    <Modal open={open} onClose={onClose} title="Mon Profil & Paramètres" subtitle={user.email ?? undefined}>
    <div className="space-y-5">

      <form onSubmit={save} className="space-y-4 rounded-3xl border border-line bg-surface p-5">
        <Labeled label="Prénom ou pseudonyme"><Field value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre prénom" required /></Labeled>
        <Labeled label="Lien de votre playlist Spotify"><Field type="url" value={spotify} onChange={(e) => setSpotify(e.target.value)} placeholder="https://open.spotify.com/playlist/..." /></Labeled>
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="Système d'unités">
            <Select value={units} onChange={(v) => setUnits(v as UnitSystem)} options={[['metric', 'Métrique (kg / cm)'], ['imperial', 'Impérial (lbs / in)']]} />
          </Labeled>
          <Labeled label="Repos par défaut">
            <Select value={String(rest)} onChange={(v) => setRest(Number(v))} options={REST_OPTIONS.map((s) => [String(s), restLabel(s)])} />
          </Labeled>
        </div>
        {msg && <Alert tone={msg.tone}>{msg.text}</Alert>}
        <PrimaryButton type="submit" disabled={busy}>Sauvegarder mes préférences</PrimaryButton>
      </form>

      {usesPassword(user) && <PasswordCard />}

      <div className="space-y-3">
        <button onClick={() => signOut()} className="flex w-full items-center justify-center gap-2 rounded-full border border-blush-line bg-surface py-3 text-sm font-semibold text-ink hover:bg-soft">
          <LogOut size={16} /> Se déconnecter
        </button>
        <DeleteAccount />
      </div>
    </div>
    </Modal>
  )
}

function PasswordCard() {
  const { user } = useAuth()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [msg, setMsg] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMsg(null)
    try { await changePassword(user!, current, next); setCurrent(''); setNext(''); setMsg({ tone: 'success', text: 'Mot de passe modifié.' }) }
    catch (err) { setMsg({ tone: 'error', text: authErrorMessage(err) }) } finally { setBusy(false) }
  }
  return (
    <form onSubmit={submit} className="space-y-3 rounded-3xl border border-line bg-surface p-5">
      <h2 className="font-semibold">Changer de mot de passe</h2>
      <Field type="password" placeholder="Mot de passe actuel" value={current} onChange={(e) => setCurrent(e.target.value)} required autoComplete="current-password" />
      <Field type="password" placeholder="Nouveau mot de passe (6 caractères min.)" value={next} onChange={(e) => setNext(e.target.value)} required minLength={6} autoComplete="new-password" />
      {msg && <Alert tone={msg.tone}>{msg.text}</Alert>}
      <PrimaryButton type="submit" disabled={busy}>Mettre à jour</PrimaryButton>
    </form>
  )
}

function DeleteAccount() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  if (!user) return null
  const needsPassword = usesPassword(user)

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError('')
    try { await deleteAccount(user!, needsPassword ? password : undefined) }
    catch (err) { setError(authErrorMessage(err)); setBusy(false) }
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-rose-600 hover:underline">
      <Trash2 size={16} /> Supprimer mon compte et mes données
    </button>
  )
  return (
    <form onSubmit={submit} className="space-y-3 rounded-3xl border border-rose-200 bg-rose-50 p-6">
      <h2 className="font-semibold text-rose-700">Supprimer définitivement mon compte</h2>
      <p className="text-sm text-rose-700/80">Tes séances, programmes, mensurations et réglages seront effacés. Cette action est irréversible.</p>
      {needsPassword && <Field type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />}
      <Field placeholder='Tape "SUPPRIMER" pour confirmer' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      {error && <Alert>{error}</Alert>}
      <div className="flex gap-2">
        <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-surface py-3 text-sm font-semibold">Annuler</button>
        <button type="submit" disabled={busy || confirm !== 'SUPPRIMER'} className="flex-1 rounded-full bg-rose-600 py-3 text-sm font-semibold text-white disabled:opacity-50">Supprimer</button>
      </div>
    </form>
  )
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><span className="px-1 text-xs font-semibold uppercase tracking-wide text-plum">{label}</span>{children}</div>
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-full border border-blush-line bg-surface px-4 py-3 text-sm outline-none focus:border-pink">
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  )
}
