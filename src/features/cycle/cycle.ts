import { getState, patchState } from '../../lib/cloud'
import { localISO } from '../../lib/utils'
import type { Workout } from '../../types'

/**
 * Suivi du cycle — facultatif et privé.
 * Stocké uniquement dans user_data.state.cycle (lisible par la seule propriétaire) et jamais publié au Club.
 */

export type Phase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal'
export type PhaseAdjust = 0 | -5 | -10

/** Check-in du jour (comme dans l'app d'origine) : chaque réponse « oui » retire 5 % aux charges. */
export interface CheckIn {
  /** Énergie basse */
  e: boolean
  /** Crampes */
  c: boolean
  /** Mal dormi */
  s: boolean
}

export interface CycleData {
  enabled: boolean
  /** Dates de début des règles (AAAA-MM-JJ), de la plus ancienne à la plus récente. */
  periods: string[]
  /** Ajustement des charges par phase, au choix : 0, –5 ou –10 %. */
  adjust: Record<Phase, PhaseAdjust>
  /** Check-in du jour, par date. */
  checkins: Record<string, CheckIn>
  /** Durée des règles en jours (2 à 9). */
  periodLength: number
}

export const DEFAULT_CYCLE: CycleData = {
  enabled: false,
  periods: [],
  adjust: { menstrual: -10, follicular: 0, ovulatory: 0, luteal: -5 },
  checkins: {},
  periodLength: 5,
}

export const DEFAULT_CYCLE_LENGTH = 28
export const MAX_REDUCTION = -20

export const PHASES: Record<Phase, { label: string; short: string; color: string; advice: string; session: string; tweak: string }> = {
  menstrual: { label: 'Phase menstruelle', short: 'Menstruelle', color: '#781539', advice: 'Technique, mobilité et gainage doux. Écoute ton corps.', session: 'Mobilité & gainage doux', tweak: '1 série de moins par exercice' },
  follicular: { label: 'Phase folliculaire', short: 'Folliculaire', color: '#EA3E8E', advice: 'Énergie en hausse : c’est le bon moment pour ta séance lourde et tes records.', session: 'Séance lourde · records', tweak: '' },
  ovulatory: { label: 'Phase ovulatoire', short: 'Ovulatoire', color: '#C2185B', advice: 'Force au top : échauffe bien genoux et hanches avant de charger.', session: 'Séance lourde + échauffement guidé', tweak: '' },
  luteal: { label: 'Phase lutéale', short: 'Lutéale', color: '#9D4E7A', advice: 'Charges modérées, un peu plus de répétitions et des repos plus longs.', session: 'Volume modéré · repos +15 s', tweak: '+2 répétitions et +15 s de repos' },
}

export const getCycle = (): CycleData => ({ ...DEFAULT_CYCLE, ...((getState().cycle as Partial<CycleData>) ?? {}) })
export const saveCycle = (patch: Partial<CycleData>) => patchState({ cycle: { ...getCycle(), ...patch } })

const daysBetween = (a: string, b: string) => Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)

/** Durée moyenne du cycle à partir des dates de règles (cycles de 20 à 45 jours seulement). */
export function averageCycleLength(periods: string[]): number {
  const sorted = [...periods].sort()
  const lengths = sorted.slice(1).map((d, i) => daysBetween(sorted[i], d)).filter((n) => n >= 20 && n <= 45)
  if (!lengths.length) return DEFAULT_CYCLE_LENGTH
  return Math.round(lengths.reduce((s, n) => s + n, 0) / lengths.length)
}

export function phaseForDay(day: number, length: number, periodLength = 5): Phase {
  const ovulation = length - 14
  if (day <= periodLength) return 'menstrual'
  if (day < ovulation - 1) return 'follicular'
  if (day <= ovulation + 1) return 'ovulatory'
  return 'luteal'
}

/** Jour du cycle et phase estimés à une date donnée (null si aucune date de règles). */
export function cycleStatus(c: CycleData, date = localISO()) {
  const sorted = [...c.periods].sort().filter((d) => d <= date)
  const last = sorted[sorted.length - 1]
  if (!last) return null
  const length = averageCycleLength(c.periods)
  const diff = daysBetween(last, date)
  if (diff >= length * 3) return null // trop ancien : il faut indiquer de nouvelles règles
  const day = (diff % length) + 1
  const phase = phaseForDay(day, length, Math.min(9, Math.max(2, c.periodLength || 5)))
  const nextPeriodIn = length - day + 1
  return { day, length, phase, lastPeriod: last, nextPeriodIn }
}

/** Ajustement dû au check-in : –5 % par réponse « oui » (énergie basse, crampes, mal dormi). */
export function checkInAdjust(ci?: Partial<CheckIn>): number {
  if (!ci) return 0
  return (ci.e ? -5 : 0) + (ci.c ? -5 : 0) + (ci.s ? -5 : 0)
}

/** Pesée en fin de phase lutéale ou en début de règles : rétention d'eau fréquente. */
export function isWaterPhase(c: CycleData, date: string) {
  const st = cycleStatus(c, date)
  return !!st && ((st.phase === 'luteal' && st.day >= st.length - 6) || (st.phase === 'menstrual' && st.day <= 2))
}

/** Ajustement total des charges du jour, en % (au maximum –20 %). 0 si le suivi est désactivé. */
export function todayAdjust(c: CycleData = getCycle(), date = localISO()) {
  if (!c.enabled) return { phase: null as Phase | null, phaseAdj: 0, checkAdj: 0, total: 0 }
  const st = cycleStatus(c, date)
  const phaseAdj = st ? c.adjust[st.phase] : 0
  const checkAdj = checkInAdjust(c.checkins[date])
  return { phase: st?.phase ?? null, phaseAdj, checkAdj, total: Math.max(MAX_REDUCTION, phaseAdj + checkAdj) }
}

/** Applique un ajustement en % à une charge (arrondi à 0,5 kg). */
export const adjustWeight = (kg: number, pct: number) => (kg > 0 && pct ? Math.max(0, Math.round((kg * (1 + pct / 100)) * 2) / 2) : kg)

/** Statistiques de performance par phase : nombre de séances, volume moyen, ressenti moyen. */
export function statsByPhase(c: CycleData, workouts: Workout[]) {
  const out: Record<Phase, { sessions: number; volume: number; rating: number }> = {
    menstrual: { sessions: 0, volume: 0, rating: 0 }, follicular: { sessions: 0, volume: 0, rating: 0 },
    ovulatory: { sessions: 0, volume: 0, rating: 0 }, luteal: { sessions: 0, volume: 0, rating: 0 },
  }
  for (const w of workouts) {
    if (w.status !== 'completed') continue
    const st = cycleStatus(c, w.date)
    if (!st) continue
    const vol = w.exercises.reduce((s, e) => s + e.sets.reduce((t, x) => (x.completed ? t + (x.actualWeight ?? x.targetWeight ?? 0) * (x.actualReps ?? x.targetReps ?? 0) : t), 0), 0)
    const o = out[st.phase]
    o.sessions += 1; o.volume += vol; o.rating += w.rating ?? 0
  }
  for (const k of Object.keys(out) as Phase[]) {
    const o = out[k]
    if (o.sessions) { o.volume = Math.round(o.volume / o.sessions); o.rating = Math.round((o.rating / o.sessions) * 10) / 10 }
  }
  return out
}
