import { ClipboardCopy, Download, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { Alert } from '../../components/ui'
import { flush, getJournal, getState, patchState, setJournal } from '../../lib/cloud'
import { localISO } from '../../lib/utils'

const backup = () => JSON.stringify({ app: 'Glow Up Lab', version: 2, exportedAt: new Date().toISOString(), state: getState(), journal: getJournal() }, null, 2)

/** Restaure une sauvegarde puis recharge l'appli. Accepte aussi l'ancien format (exportAllDataJSON). */
async function restore(text: string) {
  const data = JSON.parse(text)
  if (!data || typeof data !== 'object') throw new Error('format')
  if (data.state && Array.isArray(data.journal)) {
    patchState(data.state)
    setJournal(data.journal)
  } else if (Array.isArray(data.workouts) || Array.isArray(data.routines)) {
    const { workouts, profile: _p, app: _a, version: _v, exportedAt: _e, ...rest } = data
    void _p; void _a; void _v; void _e
    patchState(rest)
    if (Array.isArray(workouts)) setJournal(workouts)
  } else throw new Error('format')
  await flush()
  window.location.reload()
}

/** Sauvegarde : export et import en fichier .json, et sauvegarde par copier-coller. */
export function BackupCard() {
  const [msg, setMsg] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)
  const [paste, setPaste] = useState('')
  const file = useRef<HTMLInputElement>(null)

  const download = () => {
    const url = URL.createObjectURL(new Blob([backup()], { type: 'application/json' }))
    const a = Object.assign(document.createElement('a'), { href: url, download: `glow-up-lab-${localISO()}.json` })
    a.click(); URL.revokeObjectURL(url)
    setMsg({ tone: 'success', text: 'Fichier de sauvegarde téléchargé.' })
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(backup()); setMsg({ tone: 'success', text: 'Sauvegarde copiée : colle-la dans une note pour la garder.' }) }
    catch { setMsg({ tone: 'error', text: 'Copie impossible sur cet appareil : utilise plutôt le fichier.' }) }
  }
  const run = async (text: string) => {
    try { await restore(text) } catch { setMsg({ tone: 'error', text: 'Sauvegarde illisible : vérifie que tu as collé ou choisi le bon contenu.' }) }
  }

  return (
    <div className="space-y-3 rounded-3xl border border-line bg-surface p-5">
      <div><h2 className="font-semibold">Sauvegarde</h2><p className="text-sm text-muted">Tes données se synchronisent automatiquement. Tu peux aussi en garder une copie.</p></div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={download} className="flex items-center justify-center gap-1.5 rounded-full bg-soft py-2.5 text-sm font-semibold text-plum"><Download size={15} /> Fichier .json</button>
        <button onClick={copy} className="flex items-center justify-center gap-1.5 rounded-full bg-soft py-2.5 text-sm font-semibold text-plum"><ClipboardCopy size={15} /> Copier</button>
      </div>
      <details className="rounded-2xl bg-soft px-4 py-3 text-sm">
        <summary className="cursor-pointer font-semibold">Restaurer une sauvegarde</summary>
        <p className="mt-2 text-xs text-muted">Remplace tes données actuelles par celles de la sauvegarde.</p>
        <input ref={file} type="file" accept="application/json,.json" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) await run(await f.text()) }} />
        <button onClick={() => file.current?.click()} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-surface py-2.5 font-semibold text-plum"><Upload size={15} /> Choisir un fichier</button>
        <textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={3} placeholder="…ou colle ta sauvegarde ici" aria-label="Coller une sauvegarde" className="mt-2 w-full rounded-2xl border border-blush-line bg-surface p-2.5 font-mono text-xs" />
        <button disabled={!paste.trim()} onClick={() => run(paste)} className="mt-2 w-full rounded-full bg-[#781539] py-2.5 font-semibold text-white disabled:opacity-50">Restaurer</button>
      </details>
      {msg && <Alert tone={msg.tone}>{msg.text}</Alert>}
    </div>
  )
}
