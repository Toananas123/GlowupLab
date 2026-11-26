import { ExternalLink, PenLine, Play, Plus, Shuffle, Star, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Modal } from '../../components/ui'
import { getState, patchState, watchState } from '../../lib/cloud'
import { localISO } from '../../lib/utils'
import { formatClock } from '../../lib/workout'
import { useWorkout } from '../../store/WorkoutStore'
import { GuidedTimer } from './GuidedTimer'
import { circuitSteps, parseCircuit, type ParsedCircuit } from './parseCircuit'

export interface SavedCircuit extends ParsedCircuit { id: string; name: string; createdAt: string; fav?: boolean; cat?: string }
const CATS = ['Abdos', 'Cardio', 'Bas du corps', 'Haut du corps', 'Full body']

const readCircuits = () => (getState().myCircuits as SavedCircuit[] | undefined) ?? []

/** « Mes circuits » : circuits trouvés sur Instagram ou TikTok, enregistrés à partir de la légende du post. */
export function MyCircuits() {
  const { addCompletedWorkout } = useWorkout()
  const [circuits, setCircuits] = useState<SavedCircuit[]>(readCircuits)
  const [adding, setAdding] = useState(false)
  const [running, setRunning] = useState<SavedCircuit | null>(null)
  const [confirm, setConfirm] = useState<string | null>(null)
  const [cat, setCat] = useState<string>('all')
  const [editing, setEditing] = useState<SavedCircuit | null>(null)
  useEffect(() => watchState(() => setCircuits(readCircuits())), [])
  const save = (list: SavedCircuit[]) => { setCircuits(list); patchState({ myCircuits: list }) }
  const update = (c: SavedCircuit) => save(circuits.map((x) => (x.id === c.id ? c : x)))
  const shown = circuits.filter((c) => cat === 'all' || (cat === 'fav' ? c.fav : c.cat === cat)).sort((a, b) => Number(!!b.fav) - Number(!!a.fav))
  // Au hasard : parmi le filtre en cours, les favoris ont deux fois plus de chances.
  const random = () => { const pool = shown.flatMap((c) => (c.fav ? [c, c] : [c])); if (pool.length) setRunning(pool[Math.floor(Math.random() * pool.length)]) }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold">Mes circuits</h2><p className="text-sm text-muted">Colle la légende d’un post Instagram ou TikTok : on reconnaît les mouvements et les tours.</p></div>
        <button onClick={() => setAdding(true)} className="flex shrink-0 items-center gap-1 rounded-full bg-soft px-3.5 py-2 text-sm font-semibold text-plum"><Plus size={15} /> Ajouter</button>
      </div>
      {circuits.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[['all', 'Tous'], ['fav', '★ Favoris'], ...CATS.filter((c) => circuits.some((x) => x.cat === c)).map((c) => [c, c])].map(([k, l]) => (
            <button key={k} onClick={() => setCat(k)} aria-pressed={cat === k} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${cat === k ? 'bg-[#781539] text-white' : 'bg-soft'}`}>{l}</button>
          ))}
          <button onClick={random} disabled={!shown.length} className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-blush px-3 py-1.5 text-xs font-semibold text-plum disabled:opacity-50"><Shuffle size={13} /> Au hasard</button>
        </div>
      )}
      {circuits.length === 0 ? <p className="rounded-3xl border border-dashed border-blush-line p-6 text-center text-sm text-muted">Aucun circuit enregistré pour l’instant.</p> : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {shown.map((c) => (
            <article key={c.id} className="space-y-2 rounded-3xl border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1"><h3 className="font-bold">{c.name}{c.cat && <span className="ml-2 rounded-full bg-soft px-2 py-0.5 text-[11px] font-semibold text-muted">{c.cat}</span>}</h3><p className="text-sm text-muted">{c.moves.length} mouvements · {c.rounds} tours · <span className="font-mono">{formatClock(circuitSteps(c).reduce((s, x) => s + x.seconds, 0))}</span></p></div>
                <button onClick={() => update({ ...c, fav: !c.fav })} aria-pressed={!!c.fav} aria-label={c.fav ? `Retirer ${c.name} des favoris` : `Ajouter ${c.name} aux favoris`} className="rounded-full p-1.5 hover:bg-soft">
                  <Star size={17} className={c.fav ? 'fill-pink text-pink' : 'text-muted'} />
                </button>
                <button onClick={() => setEditing(c)} aria-label={`Modifier ${c.name}`} className="rounded-full p-1.5 text-muted hover:bg-soft"><PenLine size={16} /></button>
                <button onClick={() => (confirm === c.id ? save(circuits.filter((x) => x.id !== c.id)) : setConfirm(c.id))} aria-label={`Supprimer ${c.name}`}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${confirm === c.id ? 'bg-rose-600 text-white' : 'text-muted hover:bg-soft'}`}>{confirm === c.id ? 'Supprimer ?' : <Trash2 size={14} />}</button>
              </div>
              <ul className="text-sm">{c.moves.map((m, i) => <li key={i}>{m.name} <span className="font-mono text-xs text-muted">{m.reps ? `× ${m.reps}` : `${m.seconds} s`}</span></li>)}</ul>
              <div className="flex gap-2">
                {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full bg-soft px-3.5 py-2 text-sm font-semibold text-plum"><ExternalLink size={14} /> Vidéo</a>}
                <button onClick={() => setRunning(c)} className="ml-auto flex items-center gap-1.5 rounded-full bg-[#781539] px-4 py-2 text-sm font-semibold text-white"><Play size={15} /> Lancer</button>
              </div>
            </article>
          ))}
        </div>
      )}
      <EditCircuit c={editing} onClose={() => setEditing(null)} onSave={(c) => { update(c); setEditing(null) }} />
      <AddCircuit open={adding} onClose={() => setAdding(false)} onSave={(c) => { save([c, ...circuits]); setAdding(false) }} />
      {running && (
        <GuidedTimer title={running.name} steps={circuitSteps(running)} onClose={() => setRunning(null)}
          onFinish={(minutes) => addCompletedWorkout({ name: `Circuit : ${running.name}`, date: localISO(), status: 'completed', exercises: [], durationMinutes: minutes, completedAt: new Date().toISOString(), rating: 5 })} />
      )}
    </section>
  )
}

function EditCircuit({ c, onClose, onSave }: { c: SavedCircuit | null; onClose: () => void; onSave: (c: SavedCircuit) => void }) {
  const [d, setD] = useState<SavedCircuit | null>(c)
  useEffect(() => setD(c), [c])
  if (!d) return <Modal open={false} onClose={onClose} title="">{null}</Modal>
  const setMove = (i: number, patch: Partial<SavedCircuit['moves'][number]>) => setD({ ...d, moves: d.moves.map((m, j) => (j === i ? { ...m, ...patch } : m)) })
  return (
    <Modal open={!!c} onClose={onClose} title="Modifier le circuit" maxWidth="max-w-lg">
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); onSave({ ...d, name: d.name.trim() || 'Mon circuit', moves: d.moves.filter((m) => m.name.trim()) }) }}>
        <input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} aria-label="Nom du circuit" className="w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5 text-sm font-semibold" />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Catégorie">
          {CATS.map((k) => <button type="button" key={k} onClick={() => setD({ ...d, cat: d.cat === k ? undefined : k })} aria-pressed={d.cat === k} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${d.cat === k ? 'bg-[#781539] text-white' : 'bg-soft'}`}>{k}</button>)}
        </div>
        <ul className="space-y-1.5">
          {d.moves.map((m, i) => (
            <li key={i} className="flex items-center gap-2">
              <input value={m.name} onChange={(e) => setMove(i, { name: e.target.value })} aria-label={`Mouvement ${i + 1}`} className="min-w-0 flex-1 rounded-xl bg-soft px-3 py-2 text-sm" />
              <input type="number" min={1} value={m.reps ?? m.seconds ?? 0} onChange={(e) => setMove(i, m.reps ? { reps: Number(e.target.value) } : { seconds: Number(e.target.value) })} aria-label={m.reps ? 'Répétitions' : 'Secondes'} className="w-16 rounded-xl bg-soft px-2 py-2 font-mono text-sm" />
              <span className="w-6 text-xs text-muted">{m.reps ? 'rép.' : 's'}</span>
              <button type="button" onClick={() => setD({ ...d, moves: d.moves.filter((_, j) => j !== i) })} aria-label="Retirer" className="p-1 text-muted"><Trash2 size={14} /></button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button type="button" onClick={() => setD({ ...d, moves: [...d.moves, { name: '', reps: 10 } as SavedCircuit['moves'][number]] })} className="flex items-center gap-1 rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-plum"><Plus size={13} /> Mouvement</button>
          <label className="flex items-center gap-2">Tours <input type="number" min={1} max={10} value={d.rounds} onChange={(e) => setD({ ...d, rounds: Number(e.target.value) })} className="w-16 rounded-xl bg-soft px-2 py-1 font-mono" /></label>
        </div>
        <input value={d.url ?? ''} onChange={(e) => setD({ ...d, url: e.target.value || undefined })} placeholder="Lien de la vidéo (facultatif)" aria-label="Lien de la vidéo" className="w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5 text-sm" />
        <button className="w-full rounded-full bg-[#781539] py-3 text-sm font-semibold text-white">Enregistrer</button>
      </form>
    </Modal>
  )
}

function AddCircuit({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (c: SavedCircuit) => void }) {
  const [caption, setCaption] = useState('')
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const parsed = useMemo(() => parseCircuit(caption), [caption])
  const [rounds, setRounds] = useState<number | null>(null)
  const effRounds = rounds ?? parsed.rounds
  return (
    <Modal open={open} onClose={onClose} title="Ajouter un circuit" maxWidth="max-w-lg">
      <div className="space-y-3">
        <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={6} placeholder={'Colle ici la légende du post, par exemple :\n4 tours\n15 squats sautés\n20 fentes alternées\n30s planche\n12 burpees'}
          className="w-full rounded-2xl border border-blush-line bg-surface p-3 text-sm outline-none focus:border-pink" aria-label="Légende du post" />
        <input value={link || parsed.url || ''} onChange={(e) => setLink(e.target.value)} placeholder="Lien de la vidéo (facultatif)" aria-label="Lien de la vidéo" className="w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5 text-sm" />
        {parsed.moves.length > 0 ? (
          <div className="space-y-2 rounded-2xl bg-soft p-3.5">
            <p className="text-sm font-bold">{parsed.moves.length} mouvements reconnus</p>
            <ul className="text-sm">{parsed.moves.map((m, i) => <li key={i}>{m.name} <span className="font-mono text-xs text-muted">{m.reps ? `× ${m.reps}` : `${m.seconds} s`}</span></li>)}</ul>
            <label className="flex items-center gap-2 text-sm">Tours <input type="number" min={1} max={10} value={effRounds} onChange={(e) => setRounds(Number(e.target.value))} className="w-16 rounded-xl bg-surface px-2 py-1 font-mono" /></label>
          </div>
        ) : caption.trim() && <p className="text-sm text-muted">Aucun mouvement reconnu : vérifie qu’il y a un nombre (répétitions ou secondes) sur chaque ligne.</p>}
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={parsed.title || 'Nom du circuit'} aria-label="Nom du circuit" className="w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5 text-sm" />
        <button disabled={!parsed.moves.length} onClick={() => {
          onSave({ ...parsed, rounds: effRounds, url: link || parsed.url, id: `c_${Date.now()}`, name: name.trim() || parsed.title || 'Mon circuit', createdAt: new Date().toISOString() })
          setCaption(''); setName(''); setLink(''); setRounds(null)
        }} className="w-full rounded-full bg-[#781539] py-3 text-sm font-semibold text-white disabled:opacity-50">Enregistrer le circuit</button>
      </div>
    </Modal>
  )
}
