import { ArrowUpRight, FileText, RotateCcw, Zap } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Modal } from '../../components/ui'
import { watchState } from '../../lib/cloud'
import { localISO } from '../../lib/utils'
import { freshExercises } from '../../lib/workout'
import { useWorkout } from '../../store/WorkoutStore'
import type { Program, ProgramDay } from '../../types'
import { blockFor, isHarder, setHarder, weekPhase } from './programEngine'
import { parseProgramText } from './programImport'

/** En tête de la page Programmes : programme en cours (phase, version au-dessus), bilan de fin, import d'un programme écrit. */
export function ProgramsExtras() {
  const { activeProgram: ap, programs } = useWorkout()
  const [importing, setImporting] = useState(false)
  const [, force] = useState(0)
  useEffect(() => watchState(() => force((n) => n + 1)), [])
  const program = ap ? programs.find((p) => p.id === ap.programId) : undefined

  return (
    <div className="mb-6 space-y-4">
      {ap && !ap.isCompleted && <ActivePanel />}
      {ap?.isCompleted && program && <EndSummary program={program} />}
      <button onClick={() => setImporting(true)} className="flex w-full items-center gap-3 rounded-3xl border border-dashed border-blush-line bg-surface p-4 text-left hover:bg-soft">
        <span className="grid size-11 place-items-center rounded-2xl bg-soft text-plum"><FileText size={20} /></span>
        <span className="flex-1"><span className="block font-semibold">Importer un programme écrit</span><span className="block text-sm text-muted">Copie-colle un programme depuis une appli, un PDF ou ton coach.</span></span>
      </button>
      <ImportModal open={importing} onClose={() => setImporting(false)} />
    </div>
  )
}

function ActivePanel() {
  const { activeProgram: ap } = useWorkout()
  if (!ap) return null
  const phase = weekPhase(ap.currentWeek, ap.durationWeeks)
  const block = blockFor(ap.currentWeek, ap.durationWeeks)
  const harder = isHarder(ap.programId)
  return (
    <section className="rounded-3xl p-5 text-white" style={{ background: 'var(--gradPlum)' }}>
      <p className="text-sm text-white/75">Programme en cours</p>
      <h2 className="font-display text-2xl font-bold">{ap.programTitle}</h2>
      <p className="mt-1 text-sm">Semaine <span className="font-mono font-bold">{ap.currentWeek}/{ap.durationWeeks}</span> · {phase.name}{block ? ` · bloc ${block}` : ''} · <span className="font-mono">{ap.progressPercent} %</span></p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-pink" style={{ width: `${ap.progressPercent}%` }} /></div>
      <p className="mt-3 text-sm text-white/85">{phase.note}</p>
      {block && <p className="mt-1 text-sm text-white/70">Rotation par blocs : les exercices secondaires changent à chaque bloc (Fondations, puis Volume, puis Intensité).</p>}
      <button onClick={() => setHarder(ap.programId, !harder)} aria-pressed={harder}
        className={`mt-4 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ${harder ? 'bg-pink text-white' : 'bg-white text-[#781539]'}`}>
        <Zap size={16} /> {harder ? 'Version au-dessus activée' : 'Passer à la version au-dessus'}
      </button>
      <p className="mt-2 text-xs text-white/70">Version au-dessus : +1 série, +2,5 kg et 15 s de repos en moins.</p>
    </section>
  )
}

/** Bilan de fin de programme : charges au début et à la fin, records, mensurations ; puis « Refaire plus lourd ». */
function EndSummary({ program }: { program: Program }) {
  const { activeProgram: ap, workouts, measurements, startProgram } = useWorkout()
  const done = useMemo(() => workouts.filter((w) => w.status === 'completed' && w.programId === program.id).sort((a, b) => a.date.localeCompare(b.date)), [workouts, program.id])
  const loads = useMemo(() => {
    const first = new Map<string, { name: string; kg: number }>(), last = new Map<string, { name: string; kg: number }>()
    for (const w of done) for (const e of w.exercises) {
      const kg = Math.max(0, ...e.sets.filter((s) => s.completed).map((s) => s.actualWeight ?? 0))
      if (!kg) continue
      if (!first.has(e.exerciseId)) first.set(e.exerciseId, { name: e.exerciseName, kg })
      last.set(e.exerciseId, { name: e.exerciseName, kg })
    }
    return [...first.entries()].map(([id, f]) => ({ name: f.name, start: f.kg, end: last.get(id)!.kg })).sort((a, b) => (b.end - b.start) - (a.end - a.start))
  }, [done])
  if (!ap) return null
  const start = ap.initialMeasurements
  const latest = measurements[0]
  const records = loads.filter((l) => l.end > l.start).length

  return (
    <section className="space-y-4 rounded-3xl border border-line bg-surface p-5">
      <div>
        <p className="text-sm text-muted">Programme terminé 🎉</p>
        <h2 className="font-display text-2xl font-bold">Bilan : {program.title}</h2>
        <p className="text-sm text-muted"><span className="font-mono">{ap.completedSessionCount}</span> séances · <span className="font-mono">{Math.round(ap.totalVolumeKg / 100) / 10} t</span> soulevées · <span className="font-mono">{records}</span> exercice(s) en progrès</p>
      </div>
      {loads.length > 0 && (
        <ul className="divide-y divide-line text-sm">
          {loads.slice(0, 8).map((l) => (
            <li key={l.name} className="flex items-center justify-between gap-3 py-2">
              <span className="truncate">{l.name}</span>
              <span className="shrink-0 font-mono">{l.start} → <strong>{l.end} kg</strong>{l.end > l.start && <span className="text-emerald-700"> +{Math.round((l.end - l.start) * 10) / 10}</span>}</span>
            </li>
          ))}
        </ul>
      )}
      {start && latest && latest.date > (start.date ?? '') && (
        <div className="rounded-2xl bg-soft p-3.5 text-sm">
          <p className="mb-1 font-semibold">Mensurations (privé)</p>
          <p className="font-mono text-xs text-muted">
            {(['weight', 'waist', 'hips', 'thighs'] as const).filter((k) => start[k] && latest[k]).map((k) => `${{ weight: 'Poids', waist: 'Taille', hips: 'Hanches', thighs: 'Cuisses' }[k]} ${start[k]} → ${latest[k]}`).join(' · ')}
          </p>
        </div>
      )}
      <button onClick={async () => { setHarder(program.id, true); await startProgram(program.id, ap.preferredDays, localISO()) }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#781539] py-3 text-sm font-semibold text-white">
        <RotateCcw size={16} /> Refaire plus lourd
      </button>
      <p className="text-center text-xs text-muted">Le cycle repart de tes dernières charges, en version au-dessus.</p>
    </section>
  )
}

function ImportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { allExercises, createRoutine, createCustomProgram } = useWorkout()
  const [text, setText] = useState('')
  const [source, setSource] = useState('')
  const [title, setTitle] = useState('')
  const [saved, setSaved] = useState(false)
  const parsed = useMemo(() => parseProgramText(text, allExercises), [text, allExercises])

  const save = async () => {
    const days: ProgramDay[] = []
    for (const [i, d] of parsed.days.entries()) {
      const routine = await createRoutine({
        name: `${title || parsed.title || 'Programme importé'} · ${d.title}`, description: source ? `Source : ${source}` : 'Programme importé',
        exercises: freshExercises(d.exercises.map((e, j) => ({
          id: `ex_${j}`, exerciseId: e.match?.id ?? `import_${j}`, exerciseName: e.match?.name ?? e.name, category: e.match?.category, equipment: e.match?.equipment, restSeconds: e.match?.defaultRestSeconds ?? 90,
          sets: Array.from({ length: e.sets }, (_, k) => ({ id: `s_${k}`, setNumber: k + 1, targetReps: e.reps, targetWeight: e.weight ?? 0, completed: false })),
        }))),
      })
      days.push({ id: `d${i + 1}`, dayNumber: i + 1, label: d.title, isRest: false, activityType: 'Musculation', routineId: routine.id, workoutTitle: routine.name })
    }
    await createCustomProgram({
      title: title || parsed.title || 'Programme importé', subtitle: source ? `Source : ${source}` : 'Programme importé',
      objective: 'hypertrophy', objectiveLabel: 'Programme personnalisé', durationWeeks: parsed.weeks, sessionsPerWeek: parsed.days.length,
      level: 'Pour toutes', coverImage: '', equipment: [], description: source ? `Programme importé depuis : ${source}` : 'Programme importé par copier-coller.',
      coachTips: [],
      weeks: Array.from({ length: parsed.weeks }, (_, w) => ({ weekNumber: w + 1, title: `Semaine ${w + 1}`, focusNote: (parsed.weekNotes[w + 1] ?? []).join(' ') || 'Même structure que la semaine précédente.', days: days.map((d) => ({ ...d, id: `w${w + 1}-${d.id}` })) })),
    })
    setSaved(true); setText('')
  }

  return (
    <Modal open={open} onClose={() => { setSaved(false); onClose() }} title="Importer un programme écrit" maxWidth="max-w-2xl">
      {saved ? (
        <div className="space-y-3 text-center"><p className="font-semibold">Programme enregistré ✓</p><p className="text-sm text-muted">Il apparaît dans la liste des programmes, prêt à démarrer.</p></div>
      ) : (
        <div className="space-y-3">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={9} aria-label="Texte du programme"
            placeholder={'Booty 6 semaines\nJour 1 : Fessiers\nHip thrust 4x10 @ 60kg\nFentes bulgares 3x12\nJour 2 : Dos\nTirage vertical 4 séries de 10\nSemaine 3 : on ajoute 2,5 kg partout'}
            className="w-full rounded-2xl border border-blush-line bg-surface p-3 font-mono text-xs outline-none focus:border-pink" />
          <div className="grid gap-2 sm:grid-cols-2">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={parsed.title || 'Nom du programme'} aria-label="Nom du programme" className="rounded-2xl border border-blush-line bg-surface px-3 py-2.5 text-sm" />
            <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source (appli, PDF, coach…)" aria-label="Source du programme" className="rounded-2xl border border-blush-line bg-surface px-3 py-2.5 text-sm" />
          </div>
          {parsed.days.length > 0 && (
            <div className="space-y-2 rounded-2xl bg-soft p-3.5 text-sm">
              <p className="font-semibold">{parsed.days.length} séance(s) · {parsed.weeks} semaines</p>
              {parsed.days.map((d, i) => (
                <div key={i}><p className="font-semibold text-plum">{d.title}</p>
                  <ul>{d.exercises.map((e, j) => <li key={j} className="flex justify-between gap-3"><span className={e.match ? '' : 'text-amber-700'}>{e.match?.name ?? `${e.name} (exercice non reconnu, gardé tel quel)`}</span><span className="shrink-0 font-mono text-xs">{e.sets}×{e.reps}{e.weight ? ` · ${e.weight} kg` : ''}</span></li>)}</ul>
                </div>
              ))}
              {Object.entries(parsed.weekNotes).map(([w, n]) => <p key={w} className="text-xs text-muted">Semaine {w} : {n.join(' ')}</p>)}
            </div>
          )}
          <button disabled={!parsed.days.length} onClick={save} className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#781539] py-3 text-sm font-semibold text-white disabled:opacity-50"><ArrowUpRight size={16} /> Créer le programme</button>
        </div>
      )}
    </Modal>
  )
}
