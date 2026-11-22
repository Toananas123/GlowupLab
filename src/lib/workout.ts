import { AFFIRMATIONS } from '../data/misc'
import type { Routine, WorkoutExercise } from '../types'

/** « Séance Fessiers » → « Fessiers ». */
export const shortActivity = (s: string) =>
  s.replace(/^Séance\s+/i, '').replace(/^Circuit\s+/i, '').replace(/\(Tapis\s*\/\s*Escalier\)/i, 'Tapis').trim() || s

/** Affirmation du jour (change chaque jour de l'année). */
export function dailyAffirmation(d = new Date()) {
  const day = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000)
  return AFFIRMATIONS[Math.abs(day) % AFFIRMATIONS.length]
}

/** Copie les exercices d'une routine pour une nouvelle séance (séries non validées, charges cibles préremplies). */
export function freshExercises(exercises: WorkoutExercise[]): WorkoutExercise[] {
  const t = Date.now()
  return exercises.map((ex, i) => ({
    ...ex,
    id: `ex_${t}_${i}`,
    sets: ex.sets.map((s, j) => ({ ...s, id: `s_${t}_${i}_${j}`, completed: false, actualWeight: s.targetWeight, actualReps: s.targetReps })),
  }))
}

/** Routine correspondant à une activité du planning (« Séance Dos », « Séance Pecs / Bras »…). */
export function routineForActivity(activity: string, routines: Routine[]): Routine | undefined {
  const t = activity.toLowerCase()
  return routines.find((r) =>
    (t.includes('fessier') && (r.targetZone === 'glutes' || r.id.includes('glutes'))) ||
    (t.includes('bas du corps') && r.targetZone === 'lower-body') ||
    (t.includes('dos') && t.includes('pec') && r.id.includes('dos-pecs')) ||
    (t.includes('pec') && t.includes('bras') && r.id.includes('pecs-arms')) ||
    (t.includes('dos') && r.targetZone === 'back') ||
    (t.includes('pec') && r.targetZone === 'pecs') ||
    (t.includes('bras') && r.targetZone === 'arms') ||
    (t.includes('abdo') && r.targetZone === 'abs') ||
    (t.includes('cardio') && r.targetZone === 'cardio'))
}

export const formatClock = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`

/** « Aujourd'hui », « Hier », « Il y a 3j » ou « 12 nov. ». */
export function relativeDay(date?: string) {
  if (!date) return ''
  const d = new Date(date)
  const days = Math.floor((Date.now() - d.getTime()) / 86400000)
  if (days <= 0) return "Aujourd'hui"
  if (days === 1) return 'Hier'
  if (days < 7) return `Il y a ${days}j`
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

export const CATEGORY_TILES = [
  { category: 'lower-body', title: 'Bas du corps' },
  { category: 'back', title: 'Dos' },
  { category: 'pecs', title: 'Pecs & Buste' },
  { category: 'arms', title: 'Bras & Épaules' },
  { category: 'abs', title: 'Abdos & Gainage' },
  { category: 'cardio', title: 'Cardio & Circuits' },
] as const
