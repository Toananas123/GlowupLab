import { CalendarHeart, Check, Heart, Link2, Send, Zap } from 'lucide-react'
import { useState } from 'react'
import { localISO } from '../../lib/utils'
import { sessionsBetween, useClub, weekStart, type Member } from '../../store/ClubStore'
import { useWorkout } from '../../store/WorkoutStore'

/**
 * Club, reprises de l'app d'origine : qui s'entraîne aujourd'hui, comparateur de planning,
 * « On s'entraîne ensemble ? », « Chacune sa victoire » (7 récompenses), lien d'invitation.
 */

const DAY = 864e5
const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
/** Index lundi = 0 → getDay() JS (dimanche = 0). */
const jsDay = (i: number) => (i + 1) % 7
const todayIdx = () => (new Date().getDay() + 6) % 7
const isRest = (a?: string) => !a || /^repos/i.test(a)

export const Avatar = ({ m, size = 40 }: { m: Pick<Member, 'pseudo' | 'avatarColor'>; size?: number }) => (
  <span className="grid shrink-0 place-items-center rounded-full font-bold text-white" style={{ width: size, height: size, background: m.avatarColor, fontSize: size * 0.4 }} aria-hidden>
    {(m.pseudo || '?').charAt(0).toUpperCase()}
  </span>
)

/** Lundis des semaines où il y a au moins une séance. */
const weekSet = (dates: string[]) => new Set(dates.map((d) => weekStart(new Date(`${d}T12:00:00`))))
/** Semaines d'affilée avec au moins une séance (la semaine en cours ne casse pas la série). */
export function weeksInARow(dates: string[]) {
  const S = weekSet(dates), d = new Date()
  let n = 0
  for (let i = 0; i < 52; i++) { if (S.has(weekStart(d))) n++; else if (i > 0) break; d.setDate(d.getDate() - 7) }
  return n
}
/** Semaines d'affilée où les deux amies se sont entraînées. */
export function duoStreak(a: string[], b: string[]) {
  const A = weekSet(a), B = weekSet(b), d = new Date()
  let n = 0
  for (let i = 0; i < 52; i++) { const k = weekStart(d); if (A.has(k) && B.has(k)) n++; else if (i > 0) break; d.setDate(d.getDate() - 7) }
  return n
}

/** Mes données au même format que celles des amies. */
export function useMyPublic() {
  const { workouts, weeklyPlans } = useWorkout()
  const dates = workouts.filter((w) => w.status === 'completed').map((w) => w.date.slice(0, 10))
  const week = Object.fromEntries(weeklyPlans.map((d) => [d.dayOfWeek, d.activities?.filter((x) => !isRest(x)).join(' + ') || d.activity || 'Repos']))
  return { dates, week: week as Record<number, string> }
}

// ---------------------------------------------------------------- Qui s'entraîne aujourd'hui
export function TodayCards() {
  const club = useClub()
  const [sent, setSent] = useState<string | null>(null)
  const today = localISO()
  const dow = new Date().getDay()
  if (!club.friends.length) return null
  return (
    <section>
      <h2 className="mb-2 font-bold">Qui s’entraîne aujourd’hui ?</h2>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        {club.friends.map((f) => {
          const lab = f.publicData.week?.[dow] ?? 'Jour libre'
          const done = (f.publicData.sessionDates ?? []).includes(today)
          const live = club.liveFriends.some((x) => x.id === f.id)
          const status = done ? 'Séance faite ✓' : live ? 'En séance' : isRest(lab) ? 'Repos' : 'À la salle'
          return (
            <div key={f.id} className="flex w-52 shrink-0 flex-col gap-2 rounded-3xl border border-line bg-surface p-3">
              <div className="flex items-center gap-2">
                <Avatar m={f} size={34} />
                <p className="min-w-0 flex-1 truncate text-sm font-semibold">{club.nameOf(f)}</p>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${done ? 'bg-emerald-50 text-emerald-700' : live ? 'bg-pink text-white' : 'bg-soft text-muted'}`}>{status}</span>
              </div>
              <p className="truncate text-sm font-semibold">{lab}</p>
              {!done && !isRest(lab) && (
                <button onClick={async () => { await club.sendWizz(f, 'wizz', 'On y va ? Je crois en toi ! ⚡'); setSent(f.id) }}
                  className="flex items-center justify-center gap-1 rounded-full bg-soft py-1.5 text-xs font-semibold text-plum"><Zap size={13} /> {sent === f.id ? 'Wizz envoyé !' : 'Wizz de motivation'}</button>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- Comparateur de planning 7 jours
export function PlanCompare() {
  const club = useClub()
  const mine = useMyPublic()
  const [sel, setSel] = useState<string | null>(null)
  if (!club.friends.length) return null
  const f = club.friends.find((x) => x.id === sel) ?? club.friends[0]
  const theirs = f.publicData.week ?? {}
  const common = JOURS.filter((_, i) => !isRest(mine.week[jsDay(i)]) && !isRest(theirs[jsDay(i)])).length
  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Trouver vos créneaux communs</p>
      <h2 className="font-bold">Comparateur de planning 7 jours</h2>
      <div className="my-3 flex gap-1.5 overflow-x-auto scrollbar-none">
        {club.friends.map((x) => (
          <button key={x.id} onClick={() => setSel(x.id)} aria-pressed={x.id === f.id}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${x.id === f.id ? 'bg-[#781539] text-white' : 'bg-soft'}`}>Avec {club.nameOf(x)}</button>
        ))}
      </div>
      <ul className="space-y-1.5">
        {JOURS.map((j, i) => {
          const a = mine.week[jsDay(i)], b = theirs[jsDay(i)]
          const match = !isRest(a) && !isRest(b)
          return (
            <li key={j} className={`grid grid-cols-[72px_1fr_1fr] items-center gap-2 rounded-2xl px-3 py-2 text-xs ${match ? 'bg-blush font-semibold' : 'bg-soft'} ${i === todayIdx() ? 'ring-1 ring-pink' : ''}`}>
              <b className="text-sm">{j}</b>
              <span className="truncate"><span className="text-muted">Moi · </span>{isRest(a) ? 'Repos' : a}</span>
              <span className="truncate"><span className="text-muted">{club.nameOf(f)} · </span>{isRest(b) ? 'Repos' : b}</span>
            </li>
          )
        })}
      </ul>
      <p className="mt-2 text-xs text-muted">{common ? `${common} jour${common > 1 ? 's' : ''} en commun : idéal pour une séance ensemble 💪` : 'Aucun jour en commun cette semaine.'}</p>
    </section>
  )
}

// ---------------------------------------------------------------- On s'entraîne ensemble ?
export function GymInvites() {
  const club = useClub()
  const [to, setTo] = useState('')
  const [day, setDay] = useState((todayIdx() + 1) % 7)
  const [time, setTime] = useState('18h00')
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)
  const since = new Date(Date.now() - 10 * DAY).toISOString()
  const incoming = club.invitesReceived.filter((x) => x.kind === 'gym' && x.at > since && !club.answerOf(x.id, club.me?.id ?? ''))
  const mineSent = club.myInvites.filter((x) => x.kind === 'gym' && x.at > since)
  if (!club.friends.length) return null
  return (
    <section className="space-y-3 rounded-3xl border border-line bg-surface p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Rendez-vous à la salle</p>
        <h2 className="font-bold">On s’entraîne ensemble ?</h2>
      </div>
      {incoming.map((x) => (
        <div key={x.id} className="rounded-2xl bg-blush p-3">
          <div className="flex items-center gap-2"><Avatar m={x.from} size={32} /><p className="text-sm"><strong>{club.nameOf(x.from)}</strong> te propose {JOURS[x.day ?? 0].toLowerCase()} à {x.time}{x.note ? ` · « ${x.note} »` : ''}</p></div>
          <div className="mt-2 flex gap-2">
            <button onClick={() => club.answer(x.from.id, x.id, 'no')} className="flex-1 rounded-full bg-white py-1.5 text-xs font-semibold">Pas dispo</button>
            <button onClick={() => club.answer(x.from.id, x.id, 'yes')} className="flex flex-1 items-center justify-center gap-1 rounded-full bg-[#781539] py-1.5 text-xs font-semibold text-white"><Check size={13} /> J’y serai</button>
          </div>
        </div>
      ))}
      {mineSent.map((x) => {
        const f = club.friends.find((m) => m.id === x.to)
        const a = club.answerOf(x.id, x.to)
        return f ? <p key={x.id} className="text-xs text-muted">Invitation à {club.nameOf(f)} · {JOURS[x.day ?? 0].toLowerCase()} {x.time} : <strong className={a === 'yes' ? 'text-emerald-700' : a === 'no' ? 'text-rose-700' : ''}>{a === 'yes' ? 'elle sera là 🎉' : a === 'no' ? 'pas dispo' : 'en attente'}</strong></p> : null
      })}
      <form className="grid grid-cols-2 gap-2" onSubmit={async (e) => {
        e.preventDefault()
        const f = club.friends.find((m) => m.id === to) ?? club.friends[0]
        await club.sendInvite(f, day, time, note); setNote(''); setSent(true); setTimeout(() => setSent(false), 2500)
      }}>
        <label className="col-span-2 text-xs font-semibold">Gym Bestie
          <select value={to || club.friends[0].id} onChange={(e) => setTo(e.target.value)} className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2 text-sm">
            {club.friends.map((f) => <option key={f.id} value={f.id}>{club.nameOf(f)} ({f.code})</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold">Jour
          <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2 text-sm">{JOURS.map((j, i) => <option key={j} value={i}>{j}</option>)}</select>
        </label>
        <label className="text-xs font-semibold">Heure<input value={time} onChange={(e) => setTime(e.target.value)} maxLength={10} className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2 font-mono text-sm" /></label>
        <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={120} placeholder="Leg day ensemble ? (facultatif)" aria-label="Message" className="col-span-2 rounded-2xl border border-blush-line bg-surface px-3 py-2 text-sm" />
        <button className="col-span-2 flex items-center justify-center gap-1.5 rounded-full bg-[#781539] py-2.5 text-sm font-semibold text-white"><CalendarHeart size={15} /> {sent ? 'Invitation envoyée ✓' : 'Proposer'}</button>
      </form>
    </section>
  )
}

// ---------------------------------------------------------------- Chacune sa victoire
interface PStats { m: Member; w: number; p: number; prev: number; prs: number; sup: number; st: number }
type Award = [string, string, string, (x: PStats) => number, (x: PStats) => string]
const s = (n: number) => (n > 1 ? 's' : '')
const AWARDS: Award[] = [
  ['reg', '🗓️', 'Planning tenu', (x) => (x.w >= x.p ? x.w / x.p : 0), (x) => `${x.w}/${x.p} séances prévues, c’est carré`],
  ['prog', '📈', 'Progression perso', (x) => x.w - x.prev, (x) => `+${x.w - x.prev} séance${s(x.w - x.prev)} par rapport à sa semaine dernière`],
  ['pr', '🏆', 'Reine des records', (x) => x.prs, (x) => `${x.prs} record${s(x.prs)} battu${s(x.prs)} cette semaine`],
  ['back', '🌱', 'Retour en force', (x) => (x.prev === 0 && x.w > 0 ? 1 : 0), () => 'Elle a repris cette semaine, et c’est le plus dur'],
  ['sup', '💌', 'Meilleure supportrice', (x) => x.sup, (x) => `${x.sup} encouragement${s(x.sup)} envoyé${s(x.sup)} aux copines`],
  ['streak', '🔥', 'Constance', (x) => (x.st >= 2 ? x.st : 0), (x) => `${x.st} semaines d’affilée sans lâcher`],
  ['go', '✨', 'Semaine lancée', (x) => x.w, (x) => `${x.w} séance${s(x.w)} au compteur, chaque séance compte`],
]

export function KindPodium() {
  const club = useClub()
  const mine = useMyPublic()
  const me = club.me
  if (!me) return null
  const ws = weekStart(), today = localISO()
  const pws = localISO(new Date(new Date(`${ws}T12:00:00`).getTime() - 7 * DAY)), pwe = localISO(new Date(new Date(`${ws}T12:00:00`).getTime() - DAY))
  const P: PStats[] = [me, ...club.friends].map((m) => {
    const isMe = m.id === me.id
    const dates = isMe ? mine.dates : m.publicData.sessionDates ?? []
    const week = isMe ? mine.week : m.publicData.week ?? {}
    const cnt = (a: string, b: string) => (isMe ? dates.filter((d) => d >= a && d <= b).length : sessionsBetween(m, a, b))
    return {
      m, w: cnt(ws, today), prev: cnt(pws, pwe), p: Object.values(week).filter((x) => !isRest(x)).length || 3,
      prs: club.feed.filter((x) => x.author.id === m.id && x.type === 'pr' && x.createdAt >= ws).length,
      sup: club.encouragementsSince(m.id, `${ws}T00:00:00`), st: weeksInARow(dates),
    }
  })
  const got = new Map<string, Award>()
  AWARDS.forEach((a) => { const c = P.filter((x) => !got.has(x.m.id) && a[3](x) > 0).sort((u, v) => a[3](v) - a[3](u))[0]; if (c) got.set(c.m.id, a) })
  P.forEach((x) => { if (!got.has(x.m.id)) { const a = AWARDS.find((a) => a[3](x) > 0); if (a) got.set(x.m.id, a) } })
  const tw = P.reduce((a, x) => a + x.w, 0), ts = P.reduce((a, x) => a + x.sup, 0)
  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Pas de classement · que des victoires</p>
      <h2 className="font-bold">Chacune sa victoire de la semaine</h2>
      <p className="text-sm text-muted">Chaque amie est comparée à elle-même, pas aux autres. Encourager les copines compte aussi !</p>
      <p className="my-3 flex items-center gap-1.5 rounded-2xl bg-blush px-3 py-2 text-sm"><Heart size={15} className="text-pink" /> Ensemble cette semaine : <b>{tw} séance{s(tw)}</b>{ts ? <> et <b>{ts} encouragement{s(ts)}</b></> : null}</p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {P.map((x) => {
          const a = got.get(x.m.id)
          const isMe = x.m.id === me.id
          return (
            <div key={x.m.id} className={`rounded-2xl p-3 ${a ? 'bg-soft' : 'border border-dashed border-line'}`}>
              <div className="flex items-center gap-2"><Avatar m={x.m} size={28} /><b className="min-w-0 truncate text-sm">{isMe ? 'Toi' : club.nameOf(x.m)}</b></div>
              <p className="mt-2 text-2xl" aria-hidden>{a ? a[1] : '🌙'}</p>
              <p className="text-sm font-bold">{a ? a[2] : 'Semaine douce'}</p>
              <p className="text-xs text-muted">{a ? a[4](x) : isMe ? 'Le repos fait partie du progrès. Ta semaine commence quand tu veux 💗' : 'Le repos fait partie du progrès.'}</p>
              {!a && !isMe && <button onClick={() => club.sendWizz(x.m, 'mot', 'Je pense à toi, prends soin de toi 💗')} className="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-plum">Un mot doux</button>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- Lien d'invitation
export function InviteLink() {
  const club = useClub()
  const [done, setDone] = useState(false)
  if (!club.me?.code) return null
  const url = `${location.origin}/social?code=${encodeURIComponent(club.me.code)}`
  const share = async () => {
    const text = `Rejoins-moi sur Glow Up Lab 🌸 Mon code : ${club.me!.code}`
    try {
      if (navigator.share) await navigator.share({ title: 'Glow Up Lab', text, url })
      else await navigator.clipboard.writeText(`${text}\n${url}`)
      setDone(true); setTimeout(() => setDone(false), 2500)
    } catch { /* partage annulé */ }
  }
  return (
    <button onClick={share} className="flex w-full items-center gap-3 rounded-3xl border border-line bg-surface p-4 text-left hover:bg-soft">
      <span className="grid size-10 place-items-center rounded-2xl bg-blush text-plum"><Link2 size={18} /></span>
      <span className="flex-1"><b className="block text-sm">Inviter une amie</b><span className="text-xs text-muted">{done ? 'Lien copié ✓' : 'Envoie ton lien : ton code est déjà rempli pour elle'}</span></span>
      <Send size={16} className="text-plum" />
    </button>
  )
}
