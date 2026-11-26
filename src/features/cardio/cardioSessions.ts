import { CARDIO_WORKOUTS, HYBRID_SESSIONS, RUN30_WEEKS, RUN_ADVANCED, type TimedSession, type TimedStep } from '../../data/timed'

/** Étape du minuteur guidé. */
export interface CardioStep {
  label: string
  seconds: number
  speed?: number
  incline?: number
  level?: number
  cue?: string
  /** Effort (true) ou récupération (false) : change la couleur et le son. */
  effort?: boolean
}

const REST = /repos|récup|marche|retour|échauffement|transition|étirement|changement/i

/** Convertit une étape de l'app d'origine (« 5 min · 5 km/h, pente 8 % ») en étape du minuteur. */
export function toStep(s: TimedStep): CardioStep {
  const t = s.text
  const speed = t.match(/(\d+(?:[.,]\d+)?)\s*km\/h/)?.[1]
  const incline = t.match(/pente\s*(\d+(?:[.,]\d+)?)\s*%/i)?.[1]
  const level = t.match(/niv(?:eau|\.)?\s*(\d+)/i)?.[1]
  return {
    label: s.label, seconds: s.seconds, cue: t.replace(/^[^·]*·\s*/, ''), effort: !REST.test(s.label),
    speed: speed ? Number(speed.replace(',', '.')) : undefined, incline: incline ? Number(incline.replace(',', '.')) : undefined, level: level ? Number(level) : undefined,
  }
}

export const totalMinutes = (steps: { seconds: number }[]) => Math.round(steps.reduce((s, x) => s + x.seconds, 0) / 60)

export { CARDIO_WORKOUTS, HYBRID_SESSIONS, RUN30_WEEKS, RUN_ADVANCED }
export type { TimedSession }
