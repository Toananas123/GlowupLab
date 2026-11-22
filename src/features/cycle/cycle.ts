import { getState, patchState } from '../../lib/cloud'
import { localISO } from '../../lib/utils'
import type { Workout } from '../../types'

/**
 * Suivi du cycle — facultatif et privé.
 * Stocké uniquement dans user_data.state.cycle (lisible par la seule propriétaire) et jamais publié au Club.
 */

export type Phase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal'
export type PhaseAdjust = 0 | -5 | -10

export interface CheckIn {
  /** 1 (à plat) à 5 (au top) */
  energy: number
  /** 0 (aucune) à 3 (fortes) */
  cramps: number
  /** 1 (très mal dormi) à 5 (très bien dormi) */
  sleep: number
}

export interface CycleData {
  enabled: boolean
  /** Dates de début des règles (AAAA-MM-JJ), de la plus ancienne à la plus récente. */
  periods: string[]
  /** Ajustement des charges par phase, au choix : 0, –5 ou –10 %. */
  adjust: Record<Phase, PhaseAdjust>
  /** Check-in du jour, par date. */
  checkins: Record<string, CheckIn>
}

export const DEFAULT_CYCLE: CycleData = {
  enabled: false,
  periods: [],
  adjust: { menstrual: -10, follicular: 0, ovulatory: 0, luteal: -5 },
  checkins: {},
}

export const DEFAULT_CYCLE_LENGTH = 28
const PERIOD_LENGTH = 5
export const MAX_REDUCTION = -20

export const PHASES: Record<Phase, { label: string; short: string; color: string; advice: string; session: string; hydration: string }> = {
  menstrual: {
    label: 'Phase menstruelle', short: 'Règles', color: '#781539',
    advice: 'Écoute ton corps : charges un peu plus légères, mouvements maîtrisés, repos un peu plus long.',
    session: 'Séance douce : mobilité, gainage léger et cardio doux (marche inclinée tranquille, vélo).',
    hydration: 'Pense à boire régulièrement et à garder une bouillotte à portée de main après la séance.',
  },
  follicular: {
    label: 'Phase folliculaire', short: 'Folliculaire', color: '#EA3E8E',
    advice: 'L’énergie remonte : c’est le bon moment pour augmenter les charges et le volume.',
    session: 'Séance force : exercices polyarticulaires lourds (hip thrust, RDL, presse), 6 à 10 répétitions.',
    hydration: 'Bois environ 500 ml pendant la séance.',
  },
  ovulatory: {
    label: 'Phase ovulatoire', short: 'Ovulation', color: '#C2185B',
    advice: 'Pic de forme : idéal pour tenter un record, en soignant l’échauffement (articulations plus laxes).',
    session: 'Séance record : échauffement progressif puis tentative de record sur ton exercice principal.',
    hydration: 'Bois environ 500 ml pendant la séance, plus s’il fait chaud.',
  },
  luteal: {
    label: 'Phase lutéale', short: 'Lutéale', color: '#9D4E7A',
    advice: 'L’endurance baisse un peu : garde tes charges, réduis légèrement le volume et allonge le repos.',
    session: 'Séance modérée : charges habituelles, une série de moins, repos de 90 s et cardio basse intensité.',
    hydration: 'Hydrate-toi davantage : ton corps retient plus l’eau et ta température monte un peu.',
  },
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

export function phaseForDay(day: number, length: number): Phase {
  const ovulation = length - 14
  if (day <= PERIOD_LENGTH) return 'menstrual'
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
  const day = (daysBetween(last, date) % length) + 1
  const phase = phaseForDay(day, length)
  const nextPeriodIn = length - day + 1
  return { day, length, phase, lastPeriod: last, nextPeriodIn }
}

/** Ajustement dû au check-in : énergie basse, crampes, mauvais sommeil. */
export function checkInAdjust(ci?: CheckIn): number {
  if (!ci) return 0
  let adj = 0
  if (ci.energy <= 2) adj -= ci.energy === 1 ? 10 : 5
  adj -= ci.cramps * 5
  if (ci.sleep <= 2) adj -= ci.sleep === 1 ? 10 : 5
  return adj
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
