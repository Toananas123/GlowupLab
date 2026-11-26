import { ChevronRight, Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { activityIcon, Icon, type IconName } from '../components/Icon'
import { useAuth } from '../features/auth/AuthProvider'
import { cycleStatus, PHASES, todayAdjust } from '../features/cycle/cycle'
import { CycleRing } from '../features/cycle/CyclePage'
import { useCycle } from '../features/cycle/useCycle'
import { monthReport, showMonthReportOnHome } from '../lib/monthReport'
import { DAY_NAMES, localISO, WEEK_ORDER } from '../lib/utils'
import { dailyAffirmation, formatClock, freshExercises, routineForActivity, shortActivity } from '../lib/workout'
import { useWorkout } from '../store/WorkoutStore'
import type { Routine, WeeklyPlanDay } from '../types'

const SHORTCUTS: { to: string; label: string; hint: string; icon: IconName }[] = [
  { to: '/seances?rapide=1', label: 'Séance rapide', hint: '20 min · 3 zones', icon: 'stopwatch' },
  { to: '/cardio', label: 'Cardio', hint: 'Séances guidées', icon: 'runner' },
  { to: '/programmes', label: 'Programmes', hint: 'Par niveau', icon: 'sparkle' },
  { to: '/exercices', label: 'Exercices', hint: 'Fiches & guides', icon: 'dumbbell' },
  { to: '/suivi/mensurations', label: 'Mensurations', hint: 'Mon évolution', icon: 'body' },
  { to: '/social', label: 'Le Club', hint: 'Mes amies', icon: 'user' },
]

export function HomePage() {
  const { profile, user, saveProfile } = useAuth()
  const { weeklyPlans, routines, startWorkout, workouts, measurements } = useWorkout()
  const [cycle] = useCycle()
  const navigate = useNavigate()
  const name = (profile?.displayName || user?.displayName || '').trim()
  const todayDow = new Date().getDay()
  const [selectedDow, setSelectedDow] = useState(todayDow)

  // Semaine en cours, du lundi au dimanche.
  const week = useMemo(() => {
    const monday = new Date(); monday.setDate(monday.getDate() + (todayDow === 0 ? -6 : 1 - todayDow))
    return WEEK_ORDER.map((dow, i) => {
      const d = new Date(monday); d.setDate(monday.getDate() + i)
      const plan: WeeklyPlanDay = weeklyPlans.find((p) => Number(p.dayOfWeek) === dow) ?? { dayOfWeek: dow, dayName: DAY_NAMES[dow], date: localISO(d), activity: 'Repos', status: 'rest' }
      return { ...plan, dayNumber: d.getDate(), done: workouts.some((w) => w.status === 'completed' && w.date === localISO(d)) }
    })
  }, [weeklyPlans, workouts, todayDow])
  const selected = week.find((d) => d.dayOfWeek === selectedDow) ?? week[0]
  const activities = selected.activities?.length ? selected.activities : [selected.activity || 'Repos']
  const main = activities[0] || 'Repos'
  const isRest = main === 'Repos'
  const report = useMemo(() => (showMonthReportOnHome() ? monthReport(workouts, measurements) : null), [workouts, measurements])

  const launch = (r: Routine) => {
    startWorkout({ name: r.name, exercises: freshExercises(r.exercises), finisher: r.finisher, notes: r.notes })
    navigate('/seance')
  }
  const startSelected = () => {
    // Jour de programme Run / Hybrid : séance minutée.
    if (selected.timedSessionId) { navigate(`/cardio?seance=${selected.timedSessionId}`); return }
    const r = (selected.routineId && routines.find((x) => x.id === selected.routineId)) || routineForActivity(main, routines)
    if (r) launch(r)
    else navigate('/seances')
  }

  return (
    <div className="space-y-6">
      {!name && <FirstNamePrompt onSave={(n) => saveProfile({ displayName: n })} />}

      <header className="space-y-2">
        <p className="text-sm font-medium text-muted first-letter:uppercase">{new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</p>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{name ? `Bonjour ${name}` : 'Bonjour'}</h1>
        <p lang="en" className="max-w-xl font-serif text-lg leading-snug text-plum italic">{dailyAffirmation()}</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0 space-y-6">
          {/* Planning simplifié de la semaine */}
          <section aria-label="Ma semaine">
            <div className="mb-2.5 flex items-center justify-between">
              <h2 className="font-bold">Ma semaine</h2>
              <Link to="/planning" className="flex items-center text-sm font-semibold text-plum">Planning <ChevronRight size={16} /></Link>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {week.map((d) => {
                const act = d.activities?.[0] || d.activity || 'Repos'
                const active = d.dayOfWeek === selected.dayOfWeek
                const isToday = d.dayOfWeek === todayDow
                return (
                  <button key={d.dayOfWeek} onClick={() => setSelectedDow(d.dayOfWeek)} aria-pressed={active} aria-label={`${d.dayName} : ${act}`}
                    className={`flex flex-col items-center gap-1 rounded-2xl py-2.5 transition ${active ? 'bg-[#781539] text-white' : isToday ? 'bg-blush text-plum ring-2 ring-pink/40' : 'bg-soft text-ink hover:bg-blush'}`}>
                    <span className={`text-[11px] font-semibold ${active ? 'text-blush-line' : 'text-muted'}`}>{d.dayName.slice(0, 3)}</span>
                    <span className="font-mono text-base font-bold">{d.dayNumber}</span>
                    <span className="relative"><Icon name={activityIcon(act)} className={`size-4 ${act === 'Repos' ? 'opacity-40' : ''}`} />
                      {d.done && <span className="absolute -right-1.5 -bottom-1 size-2 rounded-full bg-emerald-500 ring-2 ring-white" />}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Séance du jour sélectionné */}
          <section className="relative overflow-hidden rounded-[2rem] text-white" style={{ background: 'var(--gradPlum)' }}>
            <img src="/cta-training.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity" />
            <div className="relative flex min-h-44 flex-col justify-between gap-5 p-5 sm:p-6">
              <div>
                <p className="text-sm text-blush-line">{selected.dayOfWeek === todayDow ? 'Aujourd’hui' : selected.dayName}{selected.finisherType && selected.finisherType !== 'none' ? ` · + ${selected.finisherType === 'cardio' ? 'cardio' : 'abdos'}` : ''}</p>
                <h2 className="font-display text-3xl font-bold">{shortActivity(main)}</h2>
                {selected.workoutName && !isRest && <p className="text-sm text-blush-line">{selected.workoutName}</p>}
                {activities.length > 1 && <p className="text-sm text-blush-line">+ {activities.slice(1).join(', ')}</p>}
              </div>
              <button onClick={startSelected} className="flex items-center justify-center gap-1.5 self-start rounded-full bg-white px-5 py-3 text-sm font-bold text-[#781539]">
                {isRest ? 'Faire une séance quand même' : 'Commencer la séance'} <ChevronRight size={16} />
              </button>
            </div>
          </section>

          {/* Raccourcis */}
          <section aria-label="Raccourcis" className="grid grid-cols-3 gap-2.5">
            {SHORTCUTS.map((s) => (
              <Link key={s.to} to={s.to} className="flex flex-col gap-2 rounded-3xl bg-soft p-3.5 transition hover:bg-blush">
                <span className="grid size-9 place-items-center rounded-xl bg-surface text-plum"><Icon name={s.icon} className="size-[18px]" /></span>
                <span><span className="block text-sm font-semibold leading-tight">{s.label}</span><span className="block text-xs text-muted">{s.hint}</span></span>
              </Link>
            ))}
          </section>
        </div>

        <div className="min-w-0 space-y-4">
          {report && <MonthReportCard report={report} />}
          <CycleCard cycle={cycle} />
          <QuickTimer />
        </div>
      </div>
    </div>
  )
}

function CycleCard({ cycle }: { cycle: ReturnType<typeof useCycle>[0] }) {
  if (!cycle.enabled) {
    return (
      <Link to="/cycle" className="flex items-center gap-4 rounded-3xl border border-dashed border-blush-line p-4 hover:bg-soft">
        <span className="grid size-11 place-items-center rounded-2xl bg-soft text-plum"><Icon name="heart-pulse" className="size-5" /></span>
        <span className="flex-1"><span className="block font-semibold">Suivre mon cycle</span><span className="block text-sm text-muted">Facultatif et privé : adapte tes charges à ta phase</span></span>
        <ChevronRight size={18} className="text-plum" />
      </Link>
    )
  }
  const st = cycleStatus(cycle)
  const adj = todayAdjust(cycle)
  const checked = Boolean(cycle.checkins[localISO()])
  return (
    <Link to="/cycle" className="flex items-center gap-4 rounded-3xl bg-soft p-4 hover:bg-blush">
      {st ? <CycleRing day={st.day} length={st.length} size={76} /> : <span className="grid size-[76px] place-items-center rounded-full border-4 border-blush-line text-plum"><Icon name="heart-pulse" className="size-6" /></span>}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold" style={st ? { color: PHASES[st.phase].color } : undefined}>{st ? PHASES[st.phase].label : 'Mon cycle'}</span>
        <span className="block text-sm text-muted">{adj.total ? `Charges ajustées de ${adj.total} % aujourd’hui` : st ? 'Charges habituelles aujourd’hui' : 'Indique la date de tes dernières règles'}</span>
        <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${checked ? 'bg-surface text-muted' : 'bg-pink text-white'}`}>{checked ? 'Check-in fait' : 'Faire mon check-in du jour'}</span>
      </span>
    </Link>
  )
}

function MonthReportCard({ report }: { report: ReturnType<typeof monthReport> }) {
  return (
    <Link to="/suivi#bilan-du-mois" className="block rounded-3xl p-5 text-white" style={{ background: 'var(--grad)' }}>
      <p className="text-sm text-white/80">Bilan du mois</p>
      <h2 className="font-display text-2xl font-bold first-letter:uppercase">{report.label}</h2>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Stat value={report.sessions} label={report.sessions > 1 ? 'séances' : 'séance'} />
        <Stat value={`${Math.round((report.volumeKg / 1000) * 10) / 10} t`} label="soulevées" />
        <Stat value={report.records.length} label={report.records.length > 1 ? 'records' : 'record'} />
      </div>
      <p className="mt-3 flex items-center text-sm font-semibold">Voir le bilan complet <ChevronRight size={16} /></p>
    </Link>
  )
}

const Stat = ({ value, label }: { value: string | number; label: string }) => (
  <div className="rounded-2xl bg-white/15 px-3 py-2"><span className="block font-mono text-xl font-bold">{value}</span><span className="text-xs text-white/80">{label}</span></div>
)

function FirstNamePrompt({ onSave }: { onSave: (name: string) => Promise<void> }) {
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    setBusy(true)
    try { await onSave(value.trim()) } finally { setBusy(false) }
  }
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-blush-line bg-blush p-4 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="font-semibold">Quel est ton prénom ?</p><p className="text-sm text-muted">Il s’affiche aussi pour tes amies du Club.</p></div>
      <form onSubmit={submit} className="flex gap-2">
        <input required value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ton prénom" aria-label="Ton prénom" className="min-w-0 flex-1 rounded-full border border-blush-line bg-surface px-4 py-2 text-sm outline-none focus:border-pink" />
        <button disabled={busy} className="rounded-full bg-[#781539] px-4 py-2 text-sm font-semibold text-white">{busy ? '…' : 'Valider'}</button>
      </form>
    </div>
  )
}

function QuickTimer() {
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!running) return
    const start = Date.now() - seconds * 1000
    const t = setInterval(() => setSeconds(Math.floor((Date.now() - start) / 1000)), 250)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])
  return (
    <div className="flex items-center justify-between rounded-3xl bg-soft p-4">
      <div className="flex items-center gap-4">
        <button onClick={() => setRunning(!running)} aria-label={running ? 'Mettre le chrono en pause' : 'Lancer le chrono'}
          className={`grid size-12 place-items-center rounded-2xl transition ${running ? 'bg-pink text-white' : 'bg-surface text-plum'}`}>
          {running ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div><span className="block text-sm text-muted">Chrono</span><span className="font-mono text-2xl font-bold">{formatClock(seconds)}</span></div>
      </div>
      {seconds > 0 && <button onClick={() => { setRunning(false); setSeconds(0) }} aria-label="Remettre le chrono à zéro" className="grid size-9 place-items-center rounded-full text-muted hover:bg-blush"><RotateCcw size={16} /></button>}
    </div>
  )
}
