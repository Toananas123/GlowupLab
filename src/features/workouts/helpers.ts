// Porté depuis l'app d'origine.
import type { Exercise } from '../../types'

/** Phases (1 étirement · 2 contraction · 3 unilatéral · 4 isolation) couvertes par un exercice bas du corps. */
export function legDayPhases(e: Exercise): number[] {
  let t = e.id.toLowerCase(),
    n = e.name.toLowerCase(),
    r: number[] = [],
    i = t.includes(`rdl`) || n.includes(`rdl`) || n.includes(`roumain`) || n.includes(`jambes tendues`),
    a = (n.includes(`squat`) && !n.includes(`sissy`)) || t.includes(`squat`),
    o = t.includes(`leg-press`) || n.includes(`presse`) || n.includes(`leg press`),
    s = t.includes(`bulgarian`) || n.includes(`bulgare`),
    c = t.includes(`step-up`) || n.includes(`step-up`)
  ;(i || a || o || s || c) && r.push(1)
  let l = t.includes(`hip-thrust`) || n.includes(`hip thrust`),
    u = t.includes(`kas-glute`) || n.includes(`kas glute`) || n.includes(`glute bridge`),
    d = t.includes(`hyperextension`) || t.includes(`back-extension`) || n.includes(`banc à lombaires`) || n.includes(`hyperextension`)
  ;(l || u || d) && r.push(2)
  let f = n.includes(`fente`) || t.includes(`lunge`) || s,
    p = t.includes(`single-leg-press`) || n.includes(`unilatérale`) || n.includes(`single leg press`),
    m = t.includes(`single-leg-rdl`) || n.includes(`unijambiste`) || n.includes(`single leg rdl`)
  ;(f || p || m || c) && r.push(3)
  let h = t.includes(`leg-curl`) || n.includes(`leg curl`),
    g = t.includes(`leg-extension`) || n.includes(`leg extension`),
    _ = t.includes(`kickback`) || n.includes(`kickback`) || n.includes(`kick back`),
    v = t.includes(`abduction`) || n.includes(`abduction`),
    y = t.includes(`adduct`) || n.includes(`adducteur`)
  return ((h || g || _ || v || y) && r.push(4), r)
}

/** Compose une séance bas du corps en 4 exercices dans l'ordre anatomique. */
export function buildLegDay(e: Exercise[], t: string[], n: string): { exercise: Exercise; phase: number }[] {
  let r = e.filter(
      (e) =>
        e.category === `lower-body` ||
        e.specificMuscle === `fessiers` ||
        e.specificMuscle === `ischios` ||
        e.specificMuscle === `quadriceps` ||
        e.specificMuscle === `adducteurs` ||
        e.id === `hyperextensions-bench`,
    ),
    i = (e: Exercise[]) =>
      [...e].sort((e, n) => {
        let r = t.includes(e.id),
          i = t.includes(n.id)
        return r && !i ? -1 : !r && i ? 1 : 0.5 - Math.random()
      }),
    a = new Set<string>(),
    o: { exercise: Exercise; phase: number }[] = [],
    s = r.filter((e) => legDayPhases(e).includes(1))
  if (n === `glutes`) {
    let e = s.filter(
      (e) =>
        e.specificMuscle === `fessiers` ||
        e.name.toLowerCase().includes(`rdl`) ||
        e.id === `leg-press-glutes-focus` ||
        e.name.toLowerCase().includes(`squat`),
    )
    e.length > 0 && (s = e)
  } else if (n === `posterior`) {
    let e = s.filter(
      (e) => e.specificMuscle === `ischios` || e.name.toLowerCase().includes(`rdl`) || e.name.toLowerCase().includes(`roumain`),
    )
    e.length > 0 && (s = e)
  } else if (n === `quads_adductors`) {
    let e = s.filter(
      (e) =>
        e.specificMuscle === `quadriceps` ||
        e.specificMuscle === `adducteurs` ||
        e.name.toLowerCase().includes(`squat`) ||
        e.id === `leg-press`,
    )
    e.length > 0 && (s = e)
  }
  let c = s.filter((e) => !e.name.toLowerCase().includes(`bulgare`) && !e.name.toLowerCase().includes(`step-up`)),
    l = c.length > 0 ? c : s,
    u = i(l.length > 0 ? l : r.filter((e) => legDayPhases(e).includes(1)))[0]
  u &&
    (a.add(u.id),
    o.push({
      exercise: u,
      phase: 1,
    }))
  let d = r.filter((e) => legDayPhases(e).includes(2) && !a.has(e.id))
  if (n === `posterior`) {
    let e = d.filter((e) => e.id.includes(`hip-thrust`) || e.id.includes(`hyperextension`) || e.id.includes(`kas-glute`))
    e.length > 0 && (d = e)
  }
  let f = i(d.length > 0 ? d : r.filter((e) => legDayPhases(e).includes(2) && !a.has(e.id)))[0]
  f &&
    (a.add(f.id),
    o.push({
      exercise: f,
      phase: 2,
    }))
  let p = r.filter((e) => legDayPhases(e).includes(3) && !a.has(e.id))
  if (n === `glutes`) {
    let e = p.filter(
      (e) =>
        e.name.toLowerCase().includes(`bulgare`) ||
        e.name.toLowerCase().includes(`fente`) ||
        e.id === `single-leg-press` ||
        e.id === `step-ups-dumbbell`,
    )
    e.length > 0 && (p = e)
  } else if (n === `posterior`) {
    let e = p.filter(
      (e) => e.id.includes(`single-leg-rdl`) || e.name.toLowerCase().includes(`arrières`) || e.name.toLowerCase().includes(`bulgare`),
    )
    e.length > 0 && (p = e)
  } else if (n === `quads_adductors`) {
    let e = p.filter((e) => e.name.toLowerCase().includes(`avant`) || e.id === `single-leg-press` || e.name.toLowerCase().includes(`fente`))
    e.length > 0 && (p = e)
  }
  let m = i(p.length > 0 ? p : r.filter((e) => legDayPhases(e).includes(3) && !a.has(e.id)))[0]
  m &&
    (a.add(m.id),
    o.push({
      exercise: m,
      phase: 3,
    }))
  let h = r.filter((e) => legDayPhases(e).includes(4) && !a.has(e.id))
  if (n === `glutes`) {
    let e = h.filter((e) => e.id.includes(`kickback`) || e.id.includes(`abduction`))
    e.length > 0 && (h = e)
  } else if (n === `posterior`) {
    let e = h.filter((e) => e.id.includes(`leg-curl`) || e.id.includes(`hyperextension`))
    e.length > 0 && (h = e)
  } else if (n === `quads_adductors`) {
    let e = h.filter((e) => e.id.includes(`leg-extension`) || e.id.includes(`adduct`))
    e.length > 0 && (h = e)
  }
  let g = i(h.length > 0 ? h : r.filter((e) => legDayPhases(e).includes(4) && !a.has(e.id)))[0]
  return (
    g &&
      (a.add(g.id),
      o.push({
        exercise: g,
        phase: 4,
      })),
    o
  )
}

/** Double bip + vibration à la fin du temps de repos. */
export function playRestDoneSound() {
  try {
    let e = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!e) return
    let t = new e(),
      n = t.currentTime,
      r = t.createOscillator(),
      i = t.createGain()
    ;((r.type = `sine`),
      r.frequency.setValueAtTime(698.46, n),
      i.gain.setValueAtTime(0.15, n),
      i.gain.exponentialRampToValueAtTime(0.001, n + 0.5),
      r.connect(i),
      i.connect(t.destination),
      r.start(n),
      r.stop(n + 0.5))
    let a = t.createOscillator(),
      o = t.createGain()
    ;((a.type = `sine`),
      a.frequency.setValueAtTime(880, n + 0.15),
      o.gain.setValueAtTime(0.2, n + 0.15),
      o.gain.exponentialRampToValueAtTime(0.001, n + 0.8),
      a.connect(o),
      o.connect(t.destination),
      a.start(n + 0.15),
      a.stop(n + 0.8),
      `vibrate` in navigator && navigator.vibrate([150, 80, 250]))
  } catch (e) {
    console.debug(`Audio feedback not permitted or error`, e)
  }
}

/** Bips des finishers (compte à rebours, effort, repos, transition, fin). */
export function playFinisherBeep(e: 'countdown' | 'effort' | 'rest' | 'transition' | 'complete') {
  try {
    let t = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!t) return
    let n = new t(),
      r = n.currentTime,
      i = (e: number, t: number, i: number, a = 0.14) => {
        let o = n.createOscillator(),
          s = n.createGain()
        ;((o.type = `triangle`),
          o.frequency.setValueAtTime(e, r + t),
          s.gain.setValueAtTime(a, r + t),
          s.gain.exponentialRampToValueAtTime(0.001, r + t + i),
          o.connect(s),
          s.connect(n.destination),
          o.start(r + t),
          o.stop(r + t + i))
      }
    e === `countdown`
      ? i(587.33, 0, 0.12, 0.1)
      : e === `effort`
        ? (i(880, 0, 0.15, 0.18), i(1046.5, 0.14, 0.28, 0.22), `vibrate` in navigator && navigator.vibrate([120, 60, 180]))
        : e === `rest`
          ? (i(659.25, 0, 0.18, 0.16), i(523.25, 0.16, 0.3, 0.16), `vibrate` in navigator && navigator.vibrate(150))
          : e === `transition`
            ? (i(783.99, 0, 0.14, 0.18), i(783.99, 0.18, 0.24, 0.18), `vibrate` in navigator && navigator.vibrate([100, 60, 100]))
            : e === `complete` &&
              (i(523.25, 0, 0.15, 0.18),
              i(659.25, 0.14, 0.15, 0.18),
              i(783.99, 0.28, 0.15, 0.18),
              i(1046.5, 0.42, 0.5, 0.24),
              `vibrate` in navigator && navigator.vibrate([180, 80, 180, 80, 350]))
  } catch (e) {
    console.debug(`Finisher audio beep error`, e)
  }
}

export const FINISHER_RECORDS_KEY = 'glow_up_lab_finisher_records'
