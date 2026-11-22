import { Play, Zap } from 'lucide-react'
import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { localISO } from '../../lib/utils'
import { useWorkout } from '../../store/WorkoutStore'
import { CARDIO, totalMinutes, type CardioSession } from './cardioSessions'
import { GuidedTimer } from './GuidedTimer'
import { MyCircuits } from './MyCircuits'

export function CardioPage() {
  const { addCompletedWorkout } = useWorkout()
  const [intense, setIntense] = useState<Record<string, boolean>>({})
  const [running, setRunning] = useState<CardioSession | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const steps = (s: CardioSession) => (intense[s.id] ? s.intense : s.steps)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Cardio</h1>
        <p className="text-sm text-muted">Séances complètes avec minuteur guidé : il te dit quoi régler et quand changer de rythme.</p>
      </header>
      {saved && <p role="status" className="rounded-2xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">« {saved} » est enregistrée dans ton journal.</p>}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {CARDIO.map((s) => {
          const hard = !!intense[s.id]
          return (
            <article key={s.id} className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush text-plum"><Icon name="runner" className="size-6" /></span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold">{s.name}</h2>
                  <p className="text-sm text-muted">{s.machine} · <span className="font-mono">{totalMinutes(steps(s))} min</span></p>
                </div>
              </div>
              <p className="text-sm">{s.summary}</p>
              <div className="mt-auto flex items-center gap-2">
                <button onClick={() => setIntense((m) => ({ ...m, [s.id]: !hard }))} aria-pressed={hard}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold ${hard ? 'bg-pink text-white' : 'bg-soft text-plum'}`}>
                  <Zap size={15} /> Plus intense
                </button>
                <button onClick={() => setRunning(s)} className="ml-auto flex items-center gap-1.5 rounded-full bg-[#781539] px-4 py-2 text-sm font-semibold text-white"><Play size={15} /> Lancer</button>
              </div>
            </article>
          )
        })}
      </div>

      <MyCircuits />

      {running && (
        <GuidedTimer title={`${running.name}${intense[running.id] ? ' · plus intense' : ''}`} steps={steps(running)} onClose={() => setRunning(null)}
          onFinish={async (minutes) => {
            await addCompletedWorkout({
              name: `Cardio : ${running.name}${intense[running.id] ? ' (plus intense)' : ''}`, date: localISO(), status: 'completed',
              exercises: [], durationMinutes: minutes, completedAt: new Date().toISOString(), rating: 5,
            })
            setSaved(running.name)
          }} />
      )}
    </div>
  )
}
