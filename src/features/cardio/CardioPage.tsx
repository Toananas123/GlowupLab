import { Play, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { getState, patchState } from '../../lib/cloud'
import { localISO } from '../../lib/utils'
import { useWorkout } from '../../store/WorkoutStore'
import { CARDIO_WORKOUTS, HYBRID_SESSIONS, RUN30_WEEKS, RUN_ADVANCED, toStep, totalMinutes, type TimedSession } from './cardioSessions'
import { GuidedTimer } from './GuidedTimer'
import { MyCircuits } from './MyCircuits'

type Family = 'cardio' | 'run30' | 'run' | 'hybrid'
const FAMILIES: { id: Family; label: string; hint: string }[] = [
  { id: 'cardio', label: 'Cardio', hint: '30 à 45 min, avec minuteur guidé' },
  { id: 'run30', label: 'Objectif 30 min', hint: '8 semaines pour courir 30 min sans t’arrêter' },
  { id: 'run', label: 'Run avancé', hint: 'Intervalles, pente, montée graduelle' },
  { id: 'hybrid', label: 'Hybrid', hint: 'Course + renfo aux haltères' },
]

/** Séances minutées de l'app d'origine : cardio (version standard ou plus intense), course et hybrid. */
export function CardioPage() {
  const { addCompletedWorkout } = useWorkout()
  const [family, setFamily] = useState<Family>('cardio')
  const [intense, setIntense] = useState<boolean>(() => Boolean(getState().cardioUp))
  const [running, setRunning] = useState<{ s: TimedSession; up: boolean } | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const list = family === 'cardio' ? CARDIO_WORKOUTS : family === 'run30' ? RUN30_WEEKS : family === 'run' ? RUN_ADVANCED : HYBRID_SESSIONS
  const [params, setParams] = useSearchParams()
  // Lancement direct depuis l'accueil ou le planning (jour de programme Run / Hybrid).
  useEffect(() => {
    const id = params.get('seance')
    const s = id && [...CARDIO_WORKOUTS, ...RUN30_WEEKS, ...RUN_ADVANCED, ...HYBRID_SESSIONS].find((x) => x.id === id)
    if (s) { setRunning({ s, up: false }); setParams({}, { replace: true }) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const stepsOf = (s: TimedSession, up: boolean) => (up && s.intense ? s.intense : s.steps)
  const toggleIntense = (v: boolean) => { setIntense(v); patchState({ cardioUp: v }) }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Cardio & course</h1>
        <p className="text-sm text-muted">{FAMILIES.find((f) => f.id === family)?.hint}</p>
      </header>
      {saved && <p role="status" className="rounded-2xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">« {saved} » est enregistrée dans ton journal.</p>}

      <div className="flex gap-2 overflow-x-auto scrollbar-none" role="tablist">
        {FAMILIES.map((f) => (
          <button key={f.id} role="tab" aria-selected={family === f.id} onClick={() => setFamily(f.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${family === f.id ? 'bg-[#781539] text-white' : 'bg-soft text-ink'}`}>{f.label}</button>
        ))}
      </div>

      {family === 'cardio' && (
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-soft p-1">
          <button onClick={() => toggleIntense(false)} aria-pressed={!intense} className={`rounded-xl py-2 text-sm font-semibold ${!intense ? 'bg-surface text-plum shadow-sm' : 'text-muted'}`}>Standard</button>
          <button onClick={() => toggleIntense(true)} aria-pressed={intense} className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-semibold ${intense ? 'bg-surface text-plum shadow-sm' : 'text-muted'}`}><Zap size={14} /> Plus intense</button>
        </div>
      )}
      {family === 'cardio' && <p className="-mt-3 text-xs text-muted">{intense ? 'Intervalles plus longs, pente, vitesse ou résistance plus hautes.' : 'Les durées et réglages conseillés. Adapte la vitesse à ton niveau.'}</p>}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {list.map((s) => {
          const up = family === 'cardio' && intense
          const steps = stepsOf(s, up)
          return (
            <article key={s.id} className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush text-plum"><Icon name={family === 'hybrid' ? 'weightlifter' : 'runner'} className="size-6" /></span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold">{s.name}</h2>
                  <p className="text-sm text-muted"><span className="font-mono">{totalMinutes(steps)} min</span> · {steps.length} étapes</p>
                </div>
              </div>
              <p className="text-sm">{s.desc}</p>
              <details className="text-sm">
                <summary className="cursor-pointer font-semibold text-plum">Voir les étapes</summary>
                <ol className="mt-2 space-y-1 text-muted">{steps.map((x, i) => <li key={i}><strong className="text-ink">{x.label}</strong> · {x.text}</li>)}</ol>
              </details>
              <button onClick={() => setRunning({ s, up })} className="mt-auto ml-auto flex items-center gap-1.5 rounded-full bg-[#781539] px-4 py-2 text-sm font-semibold text-white"><Play size={15} /> Démarrer</button>
            </article>
          )
        })}
      </div>

      <MyCircuits />

      {running && (
        <GuidedTimer title={`${running.s.name}${running.up ? ' · plus intense' : ''}`} steps={stepsOf(running.s, running.up).map(toStep)} onClose={() => setRunning(null)}
          onFinish={async (minutes) => {
            await addCompletedWorkout({
              name: `${running.s.name}${running.up ? ' (plus intense)' : ''}`, date: localISO(), status: 'completed',
              exercises: [], durationMinutes: minutes, completedAt: new Date().toISOString(), rating: 5, kind: 'cardio',
            })
            setSaved(running.s.name)
          }} />
      )}
    </div>
  )
}
