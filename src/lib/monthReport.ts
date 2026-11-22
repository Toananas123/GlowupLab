import type { Measurement, Workout } from '../types'

export interface MonthReport {
  /** Mois analysé, ex. « octobre 2026 ». */
  label: string
  key: string
  sessions: number
  minutes: number
  volumeKg: number
  sets: number
  /** Records battus pendant le mois (charge max supérieure à tout l'historique précédent). */
  records: { exercise: string; weight: number }[]
  topExercise: string | null
  activeDays: number
  averageRating: number | null
  /** Variation de poids sur le mois (privé : jamais partagé au Club). */
  weightChange: number | null
}

const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

/** Bilan d'un mois (par défaut le mois précédent). */
export function monthReport(workouts: Workout[], measurements: Measurement[], ref = new Date(), offset = -1): MonthReport {
  const target = new Date(ref.getFullYear(), ref.getMonth() + offset, 1)
  const key = monthKey(target)
  const done = workouts.filter((w) => w.status === 'completed')
  const inMonth = done.filter((w) => w.date?.startsWith(key))
  const before = done.filter((w) => w.date < `${key}-01`)

  const bestBefore = new Map<string, number>()
  for (const w of before) for (const e of w.exercises) for (const s of e.sets) {
    const kg = s.completed ? s.actualWeight ?? 0 : 0
    if (kg > (bestBefore.get(e.exerciseId) ?? 0)) bestBefore.set(e.exerciseId, kg)
  }

  let volumeKg = 0, sets = 0
  const count = new Map<string, number>()
  const monthBest = new Map<string, { name: string; kg: number }>()
  for (const w of inMonth) for (const e of w.exercises) {
    count.set(e.exerciseName, (count.get(e.exerciseName) ?? 0) + 1)
    for (const s of e.sets) {
      if (!s.completed) continue
      sets += 1
      const kg = s.actualWeight ?? s.targetWeight ?? 0
      volumeKg += kg * (s.actualReps ?? s.targetReps ?? 0)
      if (kg > (monthBest.get(e.exerciseId)?.kg ?? 0)) monthBest.set(e.exerciseId, { name: e.exerciseName, kg })
    }
  }
  const records = [...monthBest.entries()]
    .filter(([id, b]) => b.kg > 0 && b.kg > (bestBefore.get(id) ?? 0) && bestBefore.has(id))
    .map(([, b]) => ({ exercise: b.name, weight: b.kg }))

  const ratings = inMonth.map((w) => w.rating).filter((r): r is number => typeof r === 'number')
  const meas = measurements.filter((m) => m.date.startsWith(key) && m.weight).sort((a, b) => a.date.localeCompare(b.date))

  return {
    label: target.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    key,
    sessions: inMonth.length,
    minutes: inMonth.reduce((s, w) => s + (w.durationMinutes ?? 0), 0),
    volumeKg: Math.round(volumeKg),
    sets,
    records,
    topExercise: [...count.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
    activeDays: new Set(inMonth.map((w) => w.date)).size,
    averageRating: ratings.length ? Math.round((ratings.reduce((s, r) => s + r, 0) / ratings.length) * 10) / 10 : null,
    weightChange: meas.length >= 2 ? Math.round((meas[meas.length - 1].weight! - meas[0].weight!) * 10) / 10 : null,
  }
}

/** Le bilan du mois précédent s'affiche à l'accueil pendant les 7 premiers jours du mois. */
export const showMonthReportOnHome = (d = new Date()) => d.getDate() <= 7
