import type { CardioStep } from './cardioSessions'

export interface CircuitMove { name: string; reps?: number; seconds?: number }
export interface ParsedCircuit { moves: CircuitMove[]; rounds: number; url?: string; title?: string }

const clean = (s: string) => s
  .replace(/[\p{Extended_Pictographic}️‍]/gu, '')
  .replace(/^[\s•\-–—*·>]+|[\s•\-–—*·]+$/g, '')
  .replace(/^\d+[.)]\s+(?=\D)/, '') // « 1. Squats » -> « Squats »
  .trim()

const toSeconds = (n: number, unit: string) => (/^m/i.test(unit) ? n * 60 : n)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Reconnaît un circuit dans une légende de post (Instagram, TikTok) :
 * « 15 squats », « Squats x15 », « 30s planche », « Planche : 45 sec », « 4 tours »…
 */
export function parseCircuit(caption: string): ParsedCircuit {
  const url = caption.match(/https?:\/\/\S+/)?.[0]
  let rounds = 0
  const moves: CircuitMove[] = []
  let title: string | undefined

  for (const raw of caption.split(/\n|;/)) {
    let line = raw.replace(/https?:\/\/\S+/g, '').replace(/#[\p{L}\d_]+/gu, '').replace(/@[\w.]+/g, '')
    line = clean(line)
    if (!line) continue

    const r = line.match(/(?:^|\s)(\d{1,2})\s*(?:tours?|rounds?|séries|sets?|fois)\b/i) || line.match(/^(?:x|×)\s*(\d{1,2})$/i) || line.match(/^(\d{1,2})\s*(?:x|×)$/i)
    if (r && line.length < 40) { rounds = Number(r[1]); continue }

    let m: RegExpMatchArray | null
    // Ligne de titre avec le nombre de tours : « Circuit abdos x3 », « Booty HIIT ×4 ».
    if (!moves.length && (m = line.match(/^(.+?)\s*[x×]\s*(\d{1,2})$/i)) && /circuit|workout|séance|routine|abdos|booty|cardio|hiit|full ?body|leg ?day|tabata/i.test(m[1])) {
      title = cap(clean(m[1])); rounds = Number(m[2]); continue
    }
    if ((m = line.match(/^(\d{1,3})\s*(s|sec|secondes?|min|minutes?)\b\.?\s*(?:de\s+|d[’'])?(.+)$/i))) {
      moves.push({ name: cap(clean(m[3])), seconds: toSeconds(Number(m[1]), m[2]) }); continue
    }
    if ((m = line.match(/^(.+?)\s*[:x×\-–]\s*(\d{1,3})\s*(s|sec|secondes?|min|minutes?)\b/i))) {
      moves.push({ name: cap(clean(m[1])), seconds: toSeconds(Number(m[2]), m[3]) }); continue
    }
    if ((m = line.match(/^(\d{1,3})\s*(?:x|×|reps?|répétitions?)?\s+(.{3,})$/i))) {
      moves.push({ name: cap(clean(m[2])), reps: Number(m[1]) }); continue
    }
    if ((m = line.match(/^(.{3,}?)\s*[:x×\-–]\s*(\d{1,3})\s*(?:reps?|répétitions?|fois)?$/i))) {
      moves.push({ name: cap(clean(m[1])), reps: Number(m[2]) }); continue
    }
    if (!title && moves.length === 0 && line.length <= 60) title = cap(line)
  }
  return { moves, rounds: rounds || (moves.length ? 3 : 0), url, title }
}

/** Transforme un circuit en étapes de minuteur (≈ 3 s par répétition, 20 s de transition, 60 s entre les tours). */
export function circuitSteps(c: ParsedCircuit, restBetweenRounds = 60): CardioStep[] {
  const steps: CardioStep[] = []
  for (let r = 1; r <= c.rounds; r++) {
    c.moves.forEach((mv, i) => {
      steps.push({
        label: `${mv.name} (tour ${r}/${c.rounds})`, effort: true,
        seconds: mv.seconds ?? Math.max(20, (mv.reps ?? 10) * 3),
        cue: mv.reps ? `${mv.reps} répétitions` : undefined,
      })
      if (i < c.moves.length - 1) steps.push({ label: 'Transition', seconds: 15 })
    })
    if (r < c.rounds) steps.push({ label: 'Récupération', seconds: restBetweenRounds })
  }
  return steps
}
