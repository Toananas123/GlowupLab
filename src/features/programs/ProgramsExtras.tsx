import { ArrowUpRight, FileText, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Modal } from '../../components/ui'
import { watchState } from '../../lib/cloud'
import { freshExercises } from '../../lib/workout'
import { useWorkout } from '../../store/WorkoutStore'
import { DEFAULT_ROUTINES } from '../../data/routines'
import type { Program, ProgramDay } from '../../types'
import { BLOCKS, blockOf, cycleNumber, getUp, programHistory, progRule, progWeek, proposal, setUp, verName, versions, upNote } from './programEngine'
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
  const { activeProgram: ap, programs, workouts, allExercises, routines, startWorkout } = useWorkout()
  const program = ap ? programs.find((p) => p.id === ap.programId) : undefined
  const pw = progWeek(ap)
  const loads = useMemo(() => {
    if (!program || !pw) return []
    const rule = progRule(program, pw.w, ap)
    const ids = [...new Set(program.weeks[pw.w].days.flatMap((d) => routines.find((r) => r.id === d.routineId)?.exercises.map((e) => e.exerciseId) ?? []))]
    return ids.map((id) => ({ id, pr: proposal(allExercises.find((e) => e.id === id), rule, workouts) })).filter((x) => x.pr)
  }, [program, pw, ap, routines, allExercises, workouts])
  if (!ap || !program || !pw) return null
  const week = program.weeks[pw.w]
  const rule = progRule(program, pw.w, ap)
  const block = blockOf(program, pw.w)
  const up = getUp(program.id)
  const cyc = cycleNumber(ap)
  const hist = programHistory(program.id)
  const name = (id: string) => allExercises.find((e) => e.id === id)?.name ?? id
  return (
    <section className="space-y-3 rounded-3xl p-5 text-white" style={{ background: 'var(--gradPlum)' }}>
      <div>
        <p className="text-sm text-white/75">Programme en cours{cyc > 1 ? ` · cycle ${cyc}` : ''}</p>
        <h2 className="font-display text-2xl font-bold">{program.title}</h2>
        <p className="mt-1 text-sm">Semaine <span className="font-mono font-bold">{pw.w + 1}/{program.durationWeeks}</span> · {week.title}</p>
        <p className="mt-1 text-sm text-white/80">{week.focusNote}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-pink" style={{ width: `${((pw.w + 1) / program.durationWeeks) * 100}%` }} /></div>
      <p className="rounded-2xl bg-white/12 px-3.5 py-2.5 text-sm font-semibold">{rule.lab}</p>
      {block > 0 && <p className="text-sm text-white/80">Bloc {block + 1}/3 · {BLOCKS[block]} : nouvelles variantes sur les exercices secondaires (les 2 premiers restent les mêmes pour suivre ta progression).</p>}

      <div>
        <p className="mb-1.5 text-sm font-semibold">Version</p>
        <div className="flex flex-wrap gap-1.5">
          {versions(program).map(([u, label]) => (
            <button key={u} onClick={() => setUp(program.id, u)} aria-pressed={up === u} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${up === u ? 'bg-white text-[#781539]' : 'bg-white/15'}`}>{label}</button>
          ))}
        </div>
        {up > 0 && <p className="mt-2 text-sm text-white/85">Version {verName(program, up)} : +1 série sur les {up >= 2 ? 3 : 2} premiers exercices, variantes plus difficiles, repos -15 s. <strong>Technique d’intensité :</strong> {upNote(program, up)}</p>}
      </div>

      <details className="rounded-2xl bg-white/12 px-3.5 py-2.5 text-sm">
        <summary className="cursor-pointer font-semibold">Charges proposées cette semaine</summary>
        {loads.length ? (
          <ul className="mt-2 space-y-1">{loads.map((x) => <li key={x.id} className="flex justify-between gap-3"><span className="truncate">{name(x.id)}</span><span className="shrink-0 font-mono">{x.pr!.last} → <strong>{x.pr!.kg} kg</strong> × {x.pr!.r}</span></li>)}</ul>
        ) : <p className="mt-2 text-white/80">Fais une première séance du programme : les charges seront ensuite calculées automatiquement à partir de tes résultats.</p>}
      </details>

      {program.bonus && program.bonus.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-sm"><span className="text-white/80">Un créneau en plus ?</span>
          {program.bonus.map((b) => {
            const r = routines.find((x) => x.id === b.routineId) ?? DEFAULT_ROUTINES.find((x) => x.id === b.routineId)
            return r ? <button key={b.routineId} onClick={() => startWorkout({ name: r.name, exercises: freshExercises(r.exercises), finisher: r.finisher })} className="rounded-full bg-white px-3 py-1.5 font-semibold text-[#781539]">+ {b.label}</button> : null
          })}
        </div>
      )}
      {hist.length > 0 && <div className="flex flex-wrap gap-1.5 text-xs">{hist.map((h) => <span key={h.end + h.cycle} className="rounded-full bg-white/15 px-2.5 py-1">Cycle {h.cycle} · fini le {new Date(h.end).toLocaleDateString('fr-FR')}</span>)}</div>}
    </section>
  )
}

/** Bilan de fin de programme : séances, régularité, volume, records, charges début → fin, mensurations ; puis cycle suivant plus lourd. */
function EndSummary({ program }: { program: Program }) {
  const { activeProgram: ap, workouts, measurements, restartProgramHeavier, allExercises } = useWorkout()
  const st = useMemo(() => {
    if (!ap) return null
    const end = new Date(ap.startDate); end.setDate(end.getDate() + program.durationWeeks * 7 - 1)
    const a = ap.startDate, b = end.toISOString().slice(0, 10)
    const L = workouts.filter((w) => w.status === 'completed' && w.date >= a && w.date <= b).sort((x, y) => x.date.localeCompare(y.date))
    const by: Record<string, { d: string; k: number }[]> = {}
    L.forEach((w) => w.exercises.forEach((e) => { const k = Math.max(0, ...e.sets.filter((s) => s.completed).map((s) => s.actualWeight ?? 0)); if (k > 0) (by[e.exerciseId] ??= []).push({ d: w.date, k }) }))
    const rows = Object.entries(by).map(([ex, v]) => ({ ex, n: v.length, first: v[0].k, last: v[v.length - 1].k })).sort((x, y) => (y.last - y.first) - (x.last - x.first) || y.n - x.n).slice(0, 10)
    const planned = program.sessionsPerWeek * program.durationWeeks
    const vol = L.reduce((s, w) => s + w.exercises.reduce((t, e) => t + e.sets.reduce((u, x) => (x.completed ? u + (x.actualWeight ?? 0) * (x.actualReps ?? 0) : u), 0), 0), 0)
    const M = [...measurements].filter((m) => m.date >= a && m.date <= b).sort((x, y) => x.date.localeCompare(y.date))
    const mes = ([['hips', 'Hanches', 'cm'], ['waist', 'Tour de taille', 'cm'], ['thighs', 'Cuisses', 'cm'], ['weight', 'Poids', 'kg']] as const).map(([k, l, u]) => {
      const v = M.filter((m) => m[k] != null); return v.length >= 2 ? [l, Math.round(((v[v.length - 1][k] as number) - (v[0][k] as number)) * 10) / 10, u] as const : null
    }).filter(Boolean) as (readonly [string, number, string])[]
    return { n: L.length, reg: Math.min(100, Math.round((L.length / planned) * 100)), vol, prs: rows.filter((r) => r.last > r.first).length, rows, mes }
  }, [ap, workouts, measurements, program])
  if (!ap || !st) return null
  const cyc = cycleNumber(ap)
  const name = (id: string) => allExercises.find((e) => e.id === id)?.name ?? id
  return (
    <section className="space-y-4 rounded-3xl border border-line bg-surface p-5">
      <div><p className="text-sm text-muted">Programme terminé 🎉</p><h2 className="font-display text-2xl font-bold">Bilan : {program.title}</h2></div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[[st.n, 'séances faites'], [`${st.reg} %`, 'de régularité'], [st.vol >= 1000 ? `${(st.vol / 1000).toFixed(1).replace('.', ',')} t` : `${Math.round(st.vol)} kg`, 'soulevés'], [st.prs, 'en progrès']].map(([v, l]) => (
          <div key={String(l)} className="rounded-2xl bg-soft px-3 py-2"><span className="block font-mono text-lg font-bold">{v}</span><span className="text-xs text-muted">{l}</span></div>
        ))}
      </div>
      <div>
        <h3 className="mb-2 font-bold">Tes charges : début → fin</h3>
        {st.rows.length ? <ul className="divide-y divide-line text-sm">{st.rows.map((r) => { const dl = Math.round((r.last - r.first) * 10) / 10; return (
          <li key={r.ex} className="flex items-center justify-between gap-3 py-2"><span className="min-w-0 truncate">{name(r.ex)} <span className="text-xs text-muted">· {r.n} séance{r.n > 1 ? 's' : ''}</span></span><span className="shrink-0 font-mono">{r.first} → <strong className="text-plum">{r.last} kg</strong>{dl ? <span className={dl > 0 ? ' text-pink' : ' text-muted'}> {dl > 0 ? '+' : ''}{dl}</span> : null}</span></li>) })}</ul>
          : <p className="text-sm text-muted">Termine des séances avec des charges pendant le programme pour voir ta progression.</p>}
      </div>
      {st.mes.length > 0 && <div className="rounded-2xl bg-soft p-3.5 text-sm"><p className="mb-1 font-semibold">Tes mensurations <span className="text-xs font-normal text-muted">(privé)</span></p>{st.mes.map(([l, v, u]) => <p key={l} className="flex justify-between"><span>{l}</span><span className="font-mono font-bold">{v > 0 ? '+' : ''}{v} {u}</span></p>)}</div>}
      <div className="rounded-2xl bg-blush p-3.5 text-sm"><p className="font-semibold">Refaire ce programme, plus lourd</p><p className="text-muted">Le cycle {cyc + 1} repart de tes charges de fin de programme, avec +2 kg sur les polyarticulaires dès la semaine 1. Tes jours d’entraînement restent les mêmes.</p></div>
      <button onClick={() => restartProgramHeavier()} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#781539] py-3 text-sm font-semibold text-white"><RotateCcw size={16} /> Lancer le cycle {cyc + 1}</button>
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
