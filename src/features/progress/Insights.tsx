import { Activity, ChevronRight, Send, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { getState, patchState } from '../../lib/cloud'
import { localISO } from '../../lib/utils'
import { useClub } from '../../store/ClubStore'
import { useWorkout } from '../../store/WorkoutStore'
import type { Exercise, Workout } from '../../types'
import { rotAlt } from '../programs/programEngine'

/**
 * Cartes « coach » du Suivi, reprises de l'app d'origine :
 * stagnation, équilibre musculaire sur 30 jours, objectif hebdomadaire + série, et « Ton année Glow Up ».
 */

const DAY = 864e5
const ZBAL: Record<string, string> = { 'lower-body': 'Bas du corps', back: 'Dos', pecs: 'Pecs', arms: 'Bras & Épaules', abs: 'Abdos' }
const JRS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
const parse = (d: string) => new Date(`${d.slice(0, 10)}T12:00:00`)
const dow = (d: Date) => (d.getDay() + 6) % 7
/** Clé de semaine : date du lundi. */
export const weekKey = (d: Date) => { const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()); t.setDate(t.getDate() - dow(t)); return localISO(t) }
const done = (ws: Workout[]) => ws.filter((w) => w.status === 'completed' && w.date)
const topOf = (sets: Workout['exercises'][number]['sets']) => Math.max(0, ...sets.filter((s) => s.completed !== false).map((s) => Number(s.actualWeight ?? s.targetWeight ?? 0) || 0))
const kg = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',')

// ---------------------------------------------------------------- Stagnation
export function stagnations(workouts: Workout[], catalog: Exercise[]) {
  const L = done(workouts)
  const cut = localISO(new Date(Date.now() - 84 * DAY))
  const recent = localISO(new Date(Date.now() - 21 * DAY))
  const ids = new Set<string>()
  L.forEach((w) => w.exercises.forEach((e) => { const x = catalog.find((c) => c.id === e.exerciseId); if (x && x.category !== 'cardio') ids.add(e.exerciseId) }))
  const out: { id: string; name: string; max: number; wk: number }[] = []
  ids.forEach((id) => {
    const H = L.filter((w) => w.date >= cut).map((w) => { const it = w.exercises.find((e) => e.exerciseId === id); return it ? { d: w.date, k: topOf(it.sets) } : null })
      .filter((x): x is { d: string; k: number } => !!x && x.k > 0).sort((a, b) => a.d.localeCompare(b.d))
    if (H.length < 4) return
    const max = Math.max(...H.map((x) => x.k))
    const first = H.find((x) => x.k === max)!
    const after = H.filter((x) => x.d > first.d).length
    const wk = Math.floor((Date.now() - parse(first.d).getTime()) / (7 * DAY))
    if (wk >= 3 && after >= 3 && H[H.length - 1].d >= recent) out.push({ id, name: catalog.find((c) => c.id === id)?.name ?? id, max, wk })
  })
  return out.sort((a, b) => b.wk - a.wk).slice(0, 4)
}

function StagnationCard({ onOpenExercise }: { onOpenExercise?: (id: string) => void }) {
  const { workouts, allExercises } = useWorkout()
  const L = useMemo(() => stagnations(workouts, allExercises), [workouts, allExercises])
  if (!L.length) return null
  return (
    <section className="rounded-3xl p-5" style={{ background: 'var(--grad)' }}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-white text-plum"><Activity size={18} /></span>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-plum/80">Ton coach a remarqué</p><h2 className="text-lg font-bold text-[#781539]">{L.length > 1 ? `${L.length} exercices stagnent` : 'Un exercice stagne'}</h2></div>
      </div>
      {L.map((x) => {
        const alt = rotAlt(x.id, 1, new Set([x.id]), allExercises)
        const altName = alt && allExercises.find((e) => e.id === alt)?.name
        return (
          <div key={x.id} className="mt-3 rounded-2xl bg-white p-3">
            <p className="text-sm font-semibold">{x.name}</p>
            <p className="text-xs text-muted">Toujours {kg(x.max)} kg au maximum depuis {x.wk} semaines. C’est normal de plafonner, voici 3 pistes :</p>
            <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs leading-relaxed">
              <li><strong>Change de variante</strong> pendant 3 à 4 semaines{altName ? <> : {onOpenExercise ? <button className="font-semibold text-plum underline" onClick={() => onOpenExercise(alt!)}>{altName}</button> : <span className="font-semibold text-plum">{altName}</span>}</> : null}</li>
              <li><strong>Fais une semaine plus légère</strong> à 80 % pour récupérer, puis repars.</li>
              <li><strong>Change de zone de répétitions</strong> : 4 × 12-15 à −10 % pendant 2 semaines, puis reviens au lourd.</li>
            </ul>
          </div>
        )
      })}
    </section>
  )
}

// ---------------------------------------------------------------- Équilibre musculaire
export function zoneBalance(workouts: Workout[], catalog: Exercise[]) {
  const cut = localISO(new Date(Date.now() - 30 * DAY))
  const z: Record<string, number> = Object.fromEntries(Object.keys(ZBAL).map((k) => [k, 0]))
  done(workouts).filter((w) => w.date >= cut).forEach((w) => w.exercises.forEach((e) => {
    const k = e.category ?? catalog.find((c) => c.id === e.exerciseId)?.category
    if (k && z[k] != null) z[k] += e.sets.filter((s) => s.completed !== false).length
  }))
  const tot = Object.values(z).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(z).sort((a, b) => b[1] - a[1])
  let msg = ''
  const bas = z['lower-body'], dos = z.back
  if (dos && bas / dos >= 2.5) msg = `Tu fais ${Math.round(bas / dos)} fois plus de séries pour le bas du corps que pour le dos. Ajoute 2 à 3 séries de tirage par semaine : un dos tonique dessine la taille et protège ta posture.`
  else if (!dos && bas) msg = 'Aucune série de dos ce mois-ci : ajoute une séance Dos & Silhouette, c’est elle qui crée l’effet sablier.'
  else if (z.abs < tot * 0.06) msg = 'Les abdos sont un peu oubliés : un circuit court de 5 min en fin de séance suffit.'
  else msg = `Belle répartition ! Ta zone star : ${ZBAL[sorted[0][0]]}. La moins travaillée : ${ZBAL[sorted[sorted.length - 1][0]]}.`
  return { z, tot, sorted, max: Math.max(...Object.values(z)), msg }
}

function BalanceCard() {
  const { workouts, allExercises } = useWorkout()
  const b = useMemo(() => zoneBalance(workouts, allExercises), [workouts, allExercises])
  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Équilibre musculaire · 30 jours</p>
      {b.tot < 10 ? <p className="mt-1.5 text-sm text-muted">Encore quelques séances pour voir comment tes séries se répartissent entre les zones.</p> : (
        <>
          <h2 className="mb-2 text-lg font-bold">Tes séries par zone</h2>
          <div className="space-y-2">
            {b.sorted.map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 text-sm">
                <span className="w-28 shrink-0 text-xs">{ZBAL[k]}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-soft"><div className="h-full rounded-full bg-pink" style={{ width: `${b.max ? Math.round((v / b.max) * 100) : 0}%` }} /></div>
                <span className="w-8 text-right font-mono text-xs font-bold">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-2xl bg-soft px-3 py-2 text-xs leading-relaxed">{b.msg}</p>
        </>
      )}
    </section>
  )
}

// ---------------------------------------------------------------- Objectif hebdo + série
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))
export const weeklyGoal = () => clamp(Number(getState().wGoal) || 3, 1, 7)
export function weeksHist(workouts: Workout[]) {
  const h: Record<string, number> = {}
  done(workouts).forEach((w) => { const k = weekKey(parse(w.date)); h[k] = (h[k] ?? 0) + 1 })
  return h
}
export function weekStreak(workouts: Workout[], goal = weeklyGoal()) {
  const h = weeksHist(workouts), d = new Date()
  let n = (h[weekKey(d)] ?? 0) >= goal ? 1 : 0
  d.setDate(d.getDate() - 7)
  for (let i = 0; i < 104; i++) { if ((h[weekKey(d)] ?? 0) >= goal) n++; else break; d.setDate(d.getDate() - 7) }
  return n
}

export function WeekGoalCard() {
  const { workouts } = useWorkout()
  const [goal, setGoal] = useState(weeklyGoal)
  const [edit, setEdit] = useState(false)
  const count = weeksHist(workouts)[weekKey(new Date())] ?? 0
  const streak = weekStreak(workouts, goal)
  const left = Math.max(0, goal - count)
  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Mon objectif de la semaine</p>
          <h2 className="text-lg font-bold">{count >= goal ? 'Objectif atteint ! 🎉' : `Encore ${left} séance${left > 1 ? 's' : ''}`}</h2>
        </div>
        <div className="text-right"><span className="font-mono text-2xl font-bold text-plum">{streak}</span><span className="block text-xs text-muted">semaine{streak > 1 ? 's' : ''} d’affilée 🔥</span></div>
      </div>
      <div className="mt-3 flex gap-1.5" aria-label={`${count} séance(s) sur ${goal}`}>
        {Array.from({ length: goal }, (_, i) => <span key={i} className={`h-2.5 flex-1 rounded-full ${i < count ? 'bg-pink' : 'bg-soft'}`} />)}
      </div>
      {edit ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button key={n} aria-pressed={n === goal} onClick={() => { setGoal(n); patchState({ wGoal: n }); setEdit(false) }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${n === goal ? 'bg-[#781539] text-white' : 'bg-soft'}`}>{n} / sem.</button>
          ))}
        </div>
      ) : <button onClick={() => setEdit(true)} className="mt-2 text-sm font-semibold text-plum underline-offset-2 hover:underline">Objectif : {goal} séance{goal > 1 ? 's' : ''} par semaine · modifier</button>}
      <p className="mt-2 text-xs text-muted">La série compte les semaines où tu atteins ton objectif. Une semaine ratée ? Elle repart simplement à zéro, sans pression.</p>
    </section>
  )
}

// ---------------------------------------------------------------- Ton année Glow Up
export function yearStats(workouts: Workout[], y: number, catalog: Exercise[]) {
  const all = done(workouts).sort((a, b) => a.date.localeCompare(b.date))
  const L = all.filter((w) => w.date.startsWith(String(y)))
  if (!L.length) return null
  const cnt: Record<string, number> = {}, zs: Record<string, number> = {}, wd = [0, 0, 0, 0, 0, 0, 0]
  let best: { name: string; k: number } | null = null, vol = 0, min = 0, prs = 0
  const bestSoFar = new Map<string, number>()
  for (const w of all.filter((w) => w.date < `${y}-01-01`)) for (const e of w.exercises) bestSoFar.set(e.exerciseId, Math.max(bestSoFar.get(e.exerciseId) ?? 0, topOf(e.sets)))
  for (const w of L) {
    wd[dow(parse(w.date))]++
    min += w.durationMinutes ?? 0
    for (const e of w.exercises) {
      cnt[e.exerciseName] = (cnt[e.exerciseName] ?? 0) + 1
      const k = e.category ?? catalog.find((c) => c.id === e.exerciseId)?.category
      if (k && ZBAL[k]) zs[k] = (zs[k] ?? 0) + e.sets.length
      const t = topOf(e.sets)
      if (t > 0 && (!best || t > best.k)) best = { name: e.exerciseName, k: t }
      if (t > 0 && t > (bestSoFar.get(e.exerciseId) ?? 0)) { if (bestSoFar.has(e.exerciseId)) prs++; bestSoFar.set(e.exerciseId, t) }
      for (const s of e.sets) if (s.completed !== false) vol += (Number(s.actualWeight ?? s.targetWeight) || 0) * (Number(s.actualReps ?? s.targetReps) || 0)
    }
  }
  const H = new Set(L.map((w) => weekKey(parse(w.date))))
  let st = 0, cur = 0
  const d = new Date(y, 0, 1)
  for (let i = 0; i < 53; i++) { if (H.has(weekKey(d))) { cur++; st = Math.max(st, cur) } else cur = 0; d.setDate(d.getDate() + 7) }
  const top = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0] ?? null
  const zt = Object.entries(zs).sort((a, b) => b[1] - a[1])[0]
  return { y, n: L.length, days: new Set(L.map((w) => w.date.slice(0, 10))).size, vol, prs, top, best, wd: JRS[wd.indexOf(Math.max(...wd))], st, zone: zt ? ZBAL[zt[0]] : '', min }
}
type YearStats = NonNullable<ReturnType<typeof yearStats>>

/** Année proposée : en décembre l'année en cours, jusqu'au 15 janvier l'année passée. */
export function recapYear(d = new Date()) { return d.getMonth() === 11 ? d.getFullYear() : d.getMonth() === 0 && d.getDate() <= 15 ? d.getFullYear() - 1 : 0 }

const PLUM = 'linear-gradient(160deg,#781539,#B0245F)'
const ROSE = 'linear-gradient(160deg,#FCE4EF,#F9C6DB)'

function slides(t: YearStats, hide: boolean) {
  const v = hide ? '—' : t.vol >= 1000 ? `${(t.vol / 1000).toFixed(1).replace('.', ',')} tonnes` : `${kg(t.vol)} kg`
  const S: { bg: string; fg: string; ey: string; body: ReactNode }[] = [
    { bg: PLUM, fg: '#fff', ey: 'Ton année Glow Up', body: <><p className="text-7xl font-bold">{t.y}</p><p className="mt-3 text-lg">Prête à voir tout ce que tu as accompli ? ✨</p></> },
    { bg: ROSE, fg: '#781539', ey: 'Tu t’es choisie', body: <><p className="text-7xl font-bold">{t.n}</p><p className="text-2xl font-bold">séances</p><p className="mt-2 text-sm">sur {t.days} jours différents{t.min ? ` · ${Math.round(t.min / 60)} h d’entraînement` : ''}</p></> },
    { bg: 'linear-gradient(160deg,#FFC9A8,#EA3E8E)', fg: '#fff', ey: 'Tu as soulevé', body: <><p className="text-5xl font-bold">{v}</p>{t.vol >= 1000 && !hide && <p className="mt-2 text-sm">soit l’équivalent de {Math.max(1, Math.round(t.vol / 1500))} voiture{t.vol >= 3000 ? 's' : ''} 🚗</p>}</> },
  ]
  if (t.top) S.push({ bg: 'linear-gradient(160deg,#F9C6DB,#C9A7F0)', fg: '#781539', ey: 'Ton exercice préféré', body: <><p className="text-3xl font-bold">{t.top[0]}</p><p className="mt-2 text-sm">{t.top[1]} séances avec lui</p></> })
  if (t.best) S.push({ bg: PLUM, fg: '#fff', ey: 'Ta plus grosse charge', body: <><p className="text-6xl font-bold">{hide ? '🏆' : `${kg(t.best.k)} kg`}</p><p className="mt-1 text-2xl font-bold">{t.best.name}</p><p className="mt-2 text-sm">{t.prs} record{t.prs > 1 ? 's' : ''} battu{t.prs > 1 ? 's' : ''} dans l’année</p></> })
  S.push({ bg: ROSE, fg: '#781539', ey: 'Ta régularité', body: <><p className="text-7xl font-bold">{t.st}</p><p className="text-2xl font-bold">semaines d’affilée</p><p className="mt-2 text-sm">Ton jour préféré : le {t.wd}{t.zone ? ` · Zone star : ${t.zone}` : ''}</p></> })
  return S
}

export function YearRecap({ year, onClose }: { year: number; onClose: () => void }) {
  const { workouts, allExercises } = useWorkout()
  const club = useClub()
  const t = useMemo(() => yearStats(workouts, year, allExercises), [workouts, year, allExercises])
  const [i, setI] = useState(0)
  const [posted, setPosted] = useState(false)
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') setI((x) => x + 1); if (e.key === 'ArrowLeft') setI((x) => Math.max(0, x - 1)) }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [onClose])
  if (!t) return null
  const L = slides(t, Boolean(club.me?.hideLoads))
  const last = i >= L.length
  const s = last ? { bg: PLUM, fg: '#fff', ey: 'Bravo 💗', body: null } : L[i]
  const total = L.length + 1
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`Mon année ${t.y}`} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-0 sm:p-6">
      <div className="relative flex h-full w-full max-w-md flex-col overflow-hidden sm:h-[min(760px,92vh)] sm:rounded-[2rem]" style={{ background: s.bg, color: s.fg }}>
        <div className="flex gap-1 px-4 pt-4">{Array.from({ length: total }, (_, k) => <i key={k} className="h-1 flex-1 overflow-hidden rounded-full bg-current/25"><b className="block h-full bg-current transition-all" style={{ width: k <= i ? '100%' : '0%' }} /></i>)}</div>
        <div className="flex items-center px-4 pt-3"><b className="flex-1 text-sm">Glow Up Lab · {t.y}</b><button onClick={onClose} aria-label="Fermer" className="relative z-10 rounded-full p-1.5 hover:bg-white/15"><X size={20} /></button></div>
        <div className="flex flex-1 flex-col justify-center px-8 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] opacity-80">{s.ey}</p>
          {last ? (
            <>
              <p className="font-display text-3xl font-bold leading-tight">Chaque séance de {t.y} était un cadeau fait à toi-même.</p>
              {club.me && (
                <button disabled={posted} onClick={async () => {
                  await club.publish({ type: 'year', text: `Mon année ${t.y} : ${t.n} séances et ${t.prs} records 💪🌸`, year: { y: t.y, sessions: t.n, days: t.days, records: t.prs, streak: t.st, top: t.top?.[0] ?? '' } })
                  setPosted(true)
                }} className="relative z-10 mx-auto mt-6 flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#781539] disabled:opacity-70"><Send size={15} /> {posted ? 'Partagé au Club ✓' : 'Partager au Club'}</button>
              )}
            </>
          ) : s.body}
        </div>
        <p className="pb-5 text-center text-xs opacity-80">Touche à droite pour continuer</p>
        <button aria-label="Précédent" onClick={() => setI((x) => Math.max(0, x - 1))} className="absolute bottom-0 left-0 top-20 w-1/3" />
        <button aria-label="Suivant" onClick={() => (last ? onClose() : setI((x) => x + 1))} className="absolute bottom-0 right-0 top-20 w-2/3" style={{ pointerEvents: last ? 'none' : undefined }} />
      </div>
    </div>,
    document.body,
  )
}

export function YearCard() {
  const { workouts, allExercises } = useWorkout()
  const [open, setOpen] = useState(false)
  const y = recapYear()
  const has = useMemo(() => (y ? Boolean(yearStats(workouts, y, allExercises)) : false), [workouts, y, allExercises])
  if (!y || !has) return null
  return (
    <>
      <button onClick={() => setOpen(true)} className="flex w-full items-center gap-3 rounded-3xl p-4 text-left text-white" style={{ background: PLUM }}>
        <span className="grid size-11 place-items-center rounded-2xl bg-white/15"><Sparkles size={20} /></span>
        <span className="flex-1"><b className="block">Ton année {y} est prête ✨</b><span className="text-xs opacity-80">Ton récap à faire défiler et à partager</span></span>
        <ChevronRight size={18} />
      </button>
      {open && <YearRecap year={y} onClose={() => setOpen(false)} />}
    </>
  )
}

/** Bloc complet affiché en tête du Suivi. */
export function Insights() {
  return (
    <div className="mb-5 space-y-5">
      <YearCard />
      <StagnationCard />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <WeekGoalCard />
        <BalanceCard />
      </div>
    </div>
  )
}
