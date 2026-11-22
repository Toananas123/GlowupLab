import type { Exercise } from '../../types'

/**
 * Import d'un programme écrit (copié depuis une appli, un PDF ou un message de coach).
 * Reconnaît les semaines, les jours/séances et les exercices « Nom 4x10 », « Nom - 3 séries de 12 »,
 * « Nom 3 x 8-10 @ 40 kg », et retrouve chaque exercice dans le catalogue.
 */

export interface ImportedExercise { line: string; name: string; match?: Exercise; sets: number; reps: number; weight?: number }
export interface ImportedDay { title: string; exercises: ImportedExercise[] }
export interface ImportedProgram { title?: string; weeks: number; days: ImportedDay[]; weekNotes: Record<number, string[]>; unknown: string[] }

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
const STOP = new Set(['a', 'la', 'le', 'les', 'au', 'aux', 'de', 'des', 'du', 'en', 'avec', 'sur', 'et', 'l', 'd'])
const tokens = (s: string) => norm(s).split(' ').filter((t) => t.length > 1 && !STOP.has(t)).map((t) => t.replace(/s$/, ''))

/** Exercice du catalogue le plus proche (recouvrement des mots), ou undefined si rien de convaincant. */
export function matchExercise(name: string, catalog: Exercise[]): Exercise | undefined {
  const q = tokens(name)
  if (!q.length) return undefined
  let best: Exercise | undefined, score = 0
  for (const ex of catalog) {
    const t = new Set(tokens(ex.name))
    const hits = q.filter((w) => t.has(w)).length
    const sc = hits / Math.max(q.length, Math.min(t.size, q.length + 2))
    if (sc > score) { score = sc; best = ex }
  }
  return score >= 0.5 ? best : undefined
}

const DAY_RE = /^(?:jour|day|séance|seance|workout|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|j)\s*([a-z0-9]*)\b[\s:–—-]*(.*)$/i
const WEEK_RE = /^(?:semaine|week|sem\.?|s)\s*(\d{1,2})\b[\s:–—-]*(.*)$/i
const EX_RES: RegExp[] = [
  /^(.+?)\s*[:–—-]?\s*(\d{1,2})\s*[x×*]\s*(\d{1,3})(?:\s*[-–à]\s*\d{1,3})?\s*(?:reps?|rép\w*)?(?:\s*(?:@|à|a)\s*(\d+(?:[.,]\d+)?)\s*kg)?/i,
  /^(.+?)\s*[:–—-]?\s*(\d{1,2})\s*séries?\s*(?:de|x)\s*(\d{1,3})(?:\s*[-–à]\s*\d{1,3})?(?:.*?(\d+(?:[.,]\d+)?)\s*kg)?/i,
]

export function parseProgramText(text: string, catalog: Exercise[]): ImportedProgram {
  const days: ImportedDay[] = []
  const weekNotes: Record<number, string[]> = {}
  const unknown: string[] = []
  let weeks = Number(text.match(/(\d{1,2})\s*semaines/i)?.[1] ?? 0)
  let currentWeek = 0
  let title: string | undefined
  const seenWeeks = new Set<number>()

  for (const raw of text.split('\n')) {
    const line = raw.replace(/[\p{Extended_Pictographic}️‍]/gu, '').replace(/^[\s•\-–—*·>]+/, '').trim()
    if (!line) continue
    let m: RegExpMatchArray | null
    if ((m = line.match(WEEK_RE))) { currentWeek = Number(m[1]); seenWeeks.add(currentWeek); if (m[2]) (weekNotes[currentWeek] ??= []).push(m[2]); continue }
    if ((m = line.match(DAY_RE)) && line.length < 60 && !EX_RES.some((r) => r.test(line))) {
      // Les séances ne sont lues qu'une fois (semaine 1) : les semaines suivantes répètent la structure.
      if (currentWeek <= 1) days.push({ title: line, exercises: [] })
      continue
    }
    const ex = EX_RES.map((r) => line.match(r)).find(Boolean)
    if (ex) {
      if (currentWeek > 1) continue
      if (!days.length) days.push({ title: 'Séance 1', exercises: [] })
      const name = ex[1].replace(/[:–—-]+$/, '').trim()
      days[days.length - 1].exercises.push({ line, name, match: matchExercise(name, catalog), sets: Number(ex[2]), reps: Number(ex[3]), weight: ex[4] ? Number(ex[4].replace(',', '.')) : undefined })
      continue
    }
    if (!title && !days.length && line.length <= 70) { title = line; continue }
    if (currentWeek) (weekNotes[currentWeek] ??= []).push(line)
    else unknown.push(line)
  }
  if (!weeks) weeks = seenWeeks.size || 4
  return { title, weeks, days: days.filter((d) => d.exercises.length), weekNotes, unknown }
}
