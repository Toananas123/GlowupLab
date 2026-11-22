import confetti from 'canvas-confetti'
import { Plus, Send, Target, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from '../../components/ui'
import { getState, patchState, watchState } from '../../lib/cloud'
import { monthReport } from '../../lib/monthReport'
import { useClub } from '../../store/ClubStore'
import { useWorkout } from '../../store/WorkoutStore'

interface LoadGoal { exerciseId: string; target: number; createdAt: string; reachedAt?: string }
const readGoals = () => (getState().loadGoals as LoadGoal[] | undefined) ?? []

/** Objectifs de charge par exercice et bilan du mois, affichés en tête du Suivi. */
export function ProgressExtras() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <LoadGoals />
      <MonthSummary />
    </div>
  )
}

function LoadGoals() {
  const { allExercises, getPersonalRecords, workouts } = useWorkout()
  const [goals, setGoals] = useState<LoadGoal[]>(readGoals)
  const [adding, setAdding] = useState(false)
  const [exerciseId, setExerciseId] = useState('')
  const [target, setTarget] = useState('')
  const [query, setQuery] = useState('')
  const [confirm, setConfirm] = useState<string | null>(null)
  useEffect(() => watchState(() => setGoals(readGoals())), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const prs = useMemo(() => getPersonalRecords(), [workouts, getPersonalRecords])
  const save = (list: LoadGoal[]) => { setGoals(list); patchState({ loadGoals: list }) }
  const celebrated = useRef(false)

  // Célébration quand un objectif vient d'être atteint.
  useEffect(() => {
    const newly = goals.filter((g) => !g.reachedAt && (prs[g.exerciseId]?.maxWeight ?? 0) >= g.target)
    if (!newly.length || celebrated.current) return
    celebrated.current = true
    try { confetti({ particleCount: 90, spread: 70, origin: { y: 0.4 }, colors: ['#781539', '#EA3E8E', '#FBCFE8', '#ffffff'] }) } catch { /* animation indisponible */ }
    save(goals.map((g) => (newly.includes(g) ? { ...g, reachedAt: new Date().toISOString() } : g)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals, prs])

  const name = (id: string) => allExercises.find((e) => e.id === id)?.name ?? id
  const matches = allExercises.filter((e) => e.category !== 'cardio' && e.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)

  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold"><Target size={18} className="text-pink" /> Objectifs de charge</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1 rounded-full bg-soft px-3 py-1.5 text-sm font-semibold text-plum"><Plus size={15} /> Ajouter</button>
      </div>
      {goals.length === 0 ? <p className="text-sm text-muted">Fixe-toi une charge à atteindre sur un exercice : la barre avance à chaque record.</p> : (
        <ul className="space-y-3">
          {goals.map((g) => {
            const best = prs[g.exerciseId]?.maxWeight ?? 0
            const pct = Math.min(100, (best / g.target) * 100)
            const reached = best >= g.target
            return (
              <li key={g.exerciseId}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="truncate font-semibold">{name(g.exerciseId)}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="font-mono">{best} / {g.target} kg</span>
                    <button onClick={() => (confirm === g.exerciseId ? save(goals.filter((x) => x.exerciseId !== g.exerciseId)) : setConfirm(g.exerciseId))} aria-label={`Supprimer l’objectif ${name(g.exerciseId)}`}
                      className={`rounded-full px-1.5 text-xs ${confirm === g.exerciseId ? 'bg-rose-600 px-2 py-0.5 font-semibold text-white' : 'text-muted'}`}>{confirm === g.exerciseId ? 'Supprimer ?' : <Trash2 size={13} />}</button>
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-soft"><div className={`h-full rounded-full ${reached ? 'bg-emerald-500' : 'bg-pink'}`} style={{ width: `${pct}%` }} /></div>
                {reached && <p className="mt-1 text-xs font-semibold text-emerald-700">Objectif atteint 🎉</p>}
              </li>
            )
          })}
        </ul>
      )}

      <Modal open={adding} onClose={() => setAdding(false)} title="Nouvel objectif de charge" maxWidth="max-w-md">
        <div className="space-y-3">
          <input value={query} onChange={(e) => { setQuery(e.target.value); setExerciseId('') }} placeholder="Rechercher un exercice" aria-label="Rechercher un exercice" className="w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5 text-sm" />
          <div className="flex flex-wrap gap-1.5">
            {matches.map((e) => <button key={e.id} onClick={() => { setExerciseId(e.id); setQuery(e.name) }} aria-pressed={exerciseId === e.id}
              className={`rounded-full px-3 py-1.5 text-sm ${exerciseId === e.id ? 'bg-[#781539] text-white' : 'bg-soft'}`}>{e.name}</button>)}
          </div>
          {exerciseId && <p className="text-sm text-muted">Record actuel : <span className="font-mono font-bold text-ink">{prs[exerciseId]?.maxWeight ?? 0} kg</span></p>}
          <label className="block text-sm font-semibold">Charge visée (kg)
            <input type="number" inputMode="decimal" min={1} step={0.5} value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5 font-mono" />
          </label>
          <button disabled={!exerciseId || !Number(target)} onClick={() => {
            save([...goals.filter((g) => g.exerciseId !== exerciseId), { exerciseId, target: Number(target), createdAt: new Date().toISOString() }])
            setAdding(false); setExerciseId(''); setTarget(''); setQuery('')
          }} className="w-full rounded-full bg-[#781539] py-3 text-sm font-semibold text-white disabled:opacity-50">Enregistrer l’objectif</button>
        </div>
      </Modal>
    </section>
  )
}

function MonthSummary() {
  const { workouts, measurements } = useWorkout()
  const club = useClub()
  const [offset, setOffset] = useState(-1)
  const [shared, setShared] = useState(false)
  const r = useMemo(() => monthReport(workouts, measurements, new Date(), offset), [workouts, measurements, offset])
  const hide = club.me?.hideLoads
  return (
    <section id="bilan-du-mois" className="rounded-3xl border border-line bg-surface p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold first-letter:uppercase">Bilan : {r.label}</h2>
        <div className="flex rounded-full bg-soft p-0.5 text-xs font-semibold">
          <button onClick={() => setOffset(-1)} aria-pressed={offset === -1} className={`rounded-full px-3 py-1 ${offset === -1 ? 'bg-surface text-plum shadow-sm' : 'text-muted'}`}>Mois dernier</button>
          <button onClick={() => setOffset(0)} aria-pressed={offset === 0} className={`rounded-full px-3 py-1 ${offset === 0 ? 'bg-surface text-plum shadow-sm' : 'text-muted'}`}>Ce mois-ci</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[[r.sessions, 'séances'], [r.activeDays, 'jours actifs'], [r.minutes, 'minutes'], [`${Math.round(r.volumeKg / 100) / 10} t`, 'soulevées'], [r.sets, 'séries'], [r.records.length, 'records']].map(([v, l]) => (
          <div key={String(l)} className="rounded-2xl bg-soft px-3 py-2"><span className="block font-mono text-lg font-bold">{v}</span><span className="text-xs text-muted">{l}</span></div>
        ))}
      </div>
      {r.records.length > 0 && <p className="mt-3 text-sm"><span className="font-semibold">Records : </span>{r.records.map((x) => `${x.exercise} (${x.weight} kg)`).join(', ')}</p>}
      {r.topExercise && <p className="mt-1 text-sm text-muted">Exercice le plus fait : {r.topExercise}</p>}
      {r.weightChange !== null && <p className="mt-1 text-sm text-muted">Poids sur le mois : <span className="font-mono">{r.weightChange > 0 ? '+' : ''}{r.weightChange} kg</span> <span className="text-xs">(privé)</span></p>}
      <button disabled={r.sessions === 0 || shared} onClick={async () => {
        await club.publish({ type: 'month', month: { label: r.label, sessions: r.sessions, volumeKg: hide ? 0 : r.volumeKg, records: r.records.length } })
        setShared(true)
      }} className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#781539] py-2.5 text-sm font-semibold text-white disabled:opacity-50">
        <Send size={15} /> {shared ? 'Partagé au Club ✓' : 'Partager au Club (sans mes mensurations)'}
      </button>
    </section>
  )
}
