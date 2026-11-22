import { ArrowUpRight, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { activityIcon, categoryIcon, Icon } from '../components/Icon'
import { useAuth } from '../features/auth/AuthProvider'
import { DAY_NAMES, localISO } from '../lib/utils'
import { CATEGORY_TILES, dailyAffirmation, formatClock, freshExercises, relativeDay, routineForActivity, shortActivity } from '../lib/workout'
import { useSocial } from '../store/SocialStore'
import { useWorkout } from '../store/WorkoutStore'
import type { Routine, WeeklyPlanDay } from '../types'

export function HomePage() {
  const { profile, user, saveProfile } = useAuth()
  const { weeklyPlans, routines, startWorkout, workouts, measurements } = useWorkout()
  const { friends } = useSocial()
  const navigate = useNavigate()
  const name = (profile?.displayName || user?.displayName || '').trim()
  const todayDow = new Date().getDay()
  const [selectedDow, setSelectedDow] = useState(todayDow)

  const done = useMemo(() => workouts.filter((w) => w.status === 'completed' || !w.status), [workouts])
  const last = useMemo(() => [...done].sort((a, b) => b.date.localeCompare(a.date))[0], [done])
  const thisWeek = useMemo(() => {
    const monday = new Date(); monday.setDate(monday.getDate() + (todayDow === 0 ? -6 : 1 - todayDow)); monday.setHours(0, 0, 0, 0)
    return done.filter((w) => w.date && new Date(w.date) >= monday).length
  }, [done, todayDow])
  const lastMeasure = measurements[0]

  const nextDays = [0, 1, 2].map((offset) => {
    const d = new Date(); d.setDate(d.getDate() + offset)
    const dow = d.getDay()
    const plan: WeeklyPlanDay = weeklyPlans.find((p) => Number(p.dayOfWeek) === dow) ?? { dayOfWeek: dow, dayName: DAY_NAMES[dow], date: localISO(d), activity: 'Repos', activities: ['Repos'], status: 'rest' }
    return { ...plan, dayNumber: d.getDate(), month: d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', ''), label: offset === 0 ? 'Aujourd’hui' : offset === 1 ? 'Demain' : DAY_NAMES[dow] }
  })
  const selected = nextDays.find((d) => d.dayOfWeek === selectedDow) ?? nextDays[0]
  const activities = selected.activities?.length ? selected.activities : [selected.activity || 'Repos']
  const main = activities[0] || 'Repos'
  const isRest = main === 'Repos'

  const launch = (r: Routine) => {
    startWorkout({ name: r.name, exercises: freshExercises(r.exercises), finisher: r.finisher, notes: r.notes })
    navigate('/seance')
  }
  const startSelected = () => {
    const r = (selected.routineId && routines.find((x) => x.id === selected.routineId)) || routineForActivity(main, routines)
    if (r) launch(r)
    else navigate('/seances')
  }

  return (
    <div className="space-y-7">
      {!name && <FirstNamePrompt onSave={(n) => saveProfile({ displayName: n })} />}

      <header>
        <p className="text-xs font-bold tracking-wider text-plum uppercase">{new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{name ? `Bonjour ${name}` : 'Accueil'}</h1>
      </header>

      {/* Sur ordinateur : la journée à gauche, le suivi à droite. */}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start">
      <div className="min-w-0 space-y-7">
      {/* 3 prochains jours */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted">3 prochains jours</span>
          <Link to="/planning" className="flex items-center text-sm font-semibold text-plum">Planning complet <ChevronRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {nextDays.map((d) => {
            const isToday = d.dayOfWeek === todayDow
            const active = d.dayOfWeek === selected.dayOfWeek
            const act = d.activities?.[0] || d.activity || 'Repos'
            return (
              <button key={d.dayOfWeek} onClick={() => setSelectedDow(d.dayOfWeek)} aria-pressed={active}
                className={`rounded-3xl p-3 text-left transition sm:p-4 ${active ? 'bg-[#831843] text-white shadow-md shadow-[#831843]/25' : isToday ? 'bg-blush text-plum ring-2 ring-pink/30' : 'bg-soft text-ink hover:bg-blush'}`}>
                <span className={`block text-xs font-semibold ${active ? 'text-blush-line' : 'text-muted'}`}>{d.label}</span>
                <span className="block font-display text-2xl font-bold sm:text-3xl">{d.dayNumber} <span className={`text-sm font-medium uppercase ${active ? 'text-blush-line' : 'text-muted'}`}>{d.month}</span></span>
                <span className={`my-2 grid size-9 place-items-center rounded-xl ${active ? 'bg-white/20' : 'bg-surface text-plum'}`}><Icon name={activityIcon(act)} className="size-5" /></span>
                <span className="block truncate text-sm font-semibold">{shortActivity(act)}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Séance du jour sélectionné */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#3b0726] text-white">
        <img src="/cta-training.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b091c] via-[#3b0726]/70 to-transparent" />
        <div className="relative flex min-h-48 flex-col lg:min-h-60 justify-between gap-6 p-5 sm:flex-row sm:items-start sm:p-6">
          <div className="flex items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/10"><Icon name={activityIcon(main)} className="size-7" /></span>
            <div>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full bg-pink px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">{selected.dayOfWeek === todayDow ? 'Aujourd’hui' : selected.dayName}</span>
                {selected.finisherType && selected.finisherType !== 'none' && <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">+ {selected.finisherType === 'cardio' ? 'Cardio' : 'Abdos'}</span>}
              </div>
              <h2 className="mt-1.5 font-display text-2xl font-bold">{main}</h2>
              {selected.workoutName && !isRest && <p className="text-sm text-blush-line">{selected.workoutName}</p>}
              {activities.length > 1 && <p className="text-sm text-blush-line">+ {activities.slice(1).join(' · ')}</p>}
            </div>
          </div>
          <button onClick={startSelected} className="flex items-center justify-center gap-1.5 self-start rounded-full bg-white px-5 py-3 text-sm font-bold text-[#831843] shadow-lg">
            {isRest ? 'Faire une séance quand même' : 'Commencer la séance'} <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Exercices */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Exercices</h2>
          <Link to="/exercices" className="text-sm font-semibold text-plum">Tout voir</Link>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush via-[#fdf2f8] to-blush-line/60 p-5">
          <p className="text-[11px] font-bold tracking-wider text-plum uppercase">Bibliothèque & Réglages</p>
          <h3 className="mb-3 text-xl font-bold">Tous tes exercices par zone</h3>
          <div className="flex flex-wrap gap-2 pr-16">
            {CATEGORY_TILES.map((c) => (
              <button key={c.category} onClick={() => navigate(`/exercices?zone=${c.category}`)} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#2b091c] shadow-sm hover:bg-blush">
                <Icon name={categoryIcon(c.category)} className="size-3.5 text-[#831843]" /> {c.title}
              </button>
            ))}
          </div>
          <Link to="/exercices" aria-label="Ouvrir les exercices" className="absolute right-5 bottom-5 grid size-14 place-items-center rounded-full bg-[#831843] text-white shadow-lg">
            <span className="flex flex-col items-center text-[10px] font-bold"><ArrowUpRight size={18} />Voir</span>
          </Link>
        </div>
      </section>

      </div>
      <div className="min-w-0 space-y-7">
      {/* Suivi */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Suivi</h2>
          <Link to="/suivi" className="flex items-center text-sm font-semibold text-plum">Détails <ChevronRight size={16} /></Link>
        </div>
        <Link to="/suivi" className="flex items-center gap-4 rounded-3xl border border-line bg-soft p-4 transition hover:bg-blush">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-surface text-plum"><Icon name="heart-pulse" className="size-6" /></span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-bold">{done.length} {done.length > 1 ? 'séances terminées' : 'séance terminée'}</span>
              {thisWeek > 0 && <span className="rounded-full bg-pink px-2 py-0.5 text-[11px] font-bold text-white">{thisWeek} cette semaine</span>}
            </span>
            <span className="block text-sm text-muted">{last ? `Dernière : ${last.name} (${relativeDay(last.date)})` : 'Aucune séance enregistrée pour l’instant'}</span>
          </span>
          {lastMeasure?.weight && <span className="hidden text-right sm:block"><span className="block text-[11px] text-muted">Poids</span><span className="font-bold">{lastMeasure.weight} kg</span></span>}
          <ChevronRight size={18} className="shrink-0 text-plum" />
        </Link>
      </section>

      {/* Social */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Social & Gym Besties</h2>
          <Link to="/social" className="flex items-center text-sm font-semibold text-plum">Ouvrir le Club <ChevronRight size={16} /></Link>
        </div>
        <Link to="/social" className="flex items-center gap-4 rounded-3xl border border-blush-line bg-gradient-to-r from-blush to-soft-2 p-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#831843] text-white"><Icon name="user" className="size-6" /></span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2"><span className="text-lg font-bold">Qui s’entraîne aujourd’hui ?</span><span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold text-plum">{friends.length === 0 ? '0 amie · Inviter' : `${friends.length} ${friends.length > 1 ? 'amies' : 'amie'}`}</span></span>
            <span className="block text-sm text-muted">Fil d’activité, Duo Streak, comparateur de planning 7j & Story Récap</span>
          </span>
          <ChevronRight size={18} className="shrink-0 text-plum" />
        </Link>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <QuickTimer />
        <Link to="/suivi/mensurations" className="flex items-center gap-4 rounded-3xl bg-soft p-4 transition hover:bg-blush">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-surface text-plum"><Icon name="body" className="size-6" /></span>
          <span className="flex-1"><span className="block font-semibold">Mes mensurations</span><span className="block text-sm text-muted">Suivre mon évolution</span></span>
          <ChevronRight size={18} className="text-plum" />
        </Link>
      </div>

      <p className="rounded-3xl bg-soft px-6 py-4 text-center font-serif text-sm text-muted italic">« {dailyAffirmation()} »</p>
      </div>
      </div>
    </div>
  )
}

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
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-surface text-plum"><Icon name="user" className="size-5" /></span>
        <div><p className="font-semibold">Quel est ton prénom ?</p><p className="text-sm text-muted">Pour personnaliser ton espace</p></div>
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input required value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ton prénom..." className="min-w-0 flex-1 rounded-full border border-blush-line bg-surface px-4 py-2 text-sm outline-none focus:border-pink" />
        <button disabled={busy} className="rounded-full bg-[#831843] px-4 py-2 text-sm font-semibold text-white">{busy ? '...' : 'OK'}</button>
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
        <button onClick={() => setRunning(!running)} aria-label={running ? 'Pause' : 'Lancer'}
          className={`grid size-12 place-items-center rounded-2xl transition ${running ? 'bg-pink text-white' : 'bg-surface text-plum shadow-sm'}`}>
          {running ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div><span className="block text-sm text-muted">Chrono rapide</span><span className="font-mono text-2xl font-bold tabular-nums">{formatClock(seconds)}</span></div>
      </div>
      {seconds > 0 && <button onClick={() => { setRunning(false); setSeconds(0) }} title="Réinitialiser" className="grid size-9 place-items-center rounded-full text-muted hover:bg-blush"><RotateCcw size={16} /></button>}
    </div>
  )
}
