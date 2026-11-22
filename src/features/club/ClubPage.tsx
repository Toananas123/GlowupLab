import { Check, Copy, EyeOff, Lock, MessageCircle, Plus, Send, Trash2, UserPlus, Zap } from 'lucide-react'
import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Icon } from '../../components/Icon'
import { Modal } from '../../components/ui'
import { monthReport } from '../../lib/monthReport'
import { localISO } from '../../lib/utils'
import { freshExercises } from '../../lib/workout'
import { REACTIONS, sessionsBetween, useClub, weekStart, type FeedItem, type Member, type Post } from '../../store/ClubStore'
import { useWorkout } from '../../store/WorkoutStore'

type Tab = 'feed' | 'friends' | 'challenges' | 'profile'
const TABS: { id: Tab; label: string }[] = [
  { id: 'feed', label: 'Fil' },
  { id: 'friends', label: 'Amies' },
  { id: 'challenges', label: 'Défis' },
  { id: 'profile', label: 'Mon profil' },
]
const COLORS = ['#781539', '#EA3E8E', '#9D4E7A', '#C2185B', '#701A75', '#BE185D']
const DAY = 86400000

const timeAgo = (iso: string) => {
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (min < 1) return 'À l’instant'
  if (min < 60) return `Il y a ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `Il y a ${h} h`
  const d = Math.round(h / 24)
  return d === 1 ? 'Hier' : d < 7 ? `Il y a ${d} jours` : new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

export function ClubPage() {
  const club = useClub()
  const [tab, setTab] = useState<Tab>('feed')
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Le Club</h1>
          <p className="text-sm text-muted">Visible seulement par tes amies. Ton cycle, tes mensurations et tes notes ne sont jamais partagés.</p>
        </div>
        {club.me?.code && <CopyCode code={club.me.code} />}
      </header>
      <nav className="flex gap-1 overflow-x-auto rounded-full bg-soft p-1 scrollbar-none" aria-label="Sections du Club">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} aria-pressed={tab === t.id}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${tab === t.id ? 'bg-surface text-plum shadow-sm' : 'text-muted'}`}>
            {t.label}{t.id === 'friends' && club.friends.length ? ` · ${club.friends.length}` : ''}
          </button>
        ))}
      </nav>
      {tab === 'feed' && <FeedTab />}
      {tab === 'friends' && <FriendsTab />}
      {tab === 'challenges' && <ChallengesTab />}
      {tab === 'profile' && <ProfileTab />}
    </div>
  )
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* presse-papiers indisponible */ } }}
      className="flex items-center gap-2 rounded-full bg-[#781539] px-4 py-2 text-sm font-semibold text-white">
      {copied ? <Check size={15} /> : <Copy size={15} />} <span className="font-mono">{code}</span>
    </button>
  )
}

const Avatar = ({ m, size = 40 }: { m: Pick<Member, 'pseudo' | 'avatarColor'>; size?: number }) => (
  <span className="grid shrink-0 place-items-center rounded-full font-bold text-white" style={{ width: size, height: size, background: m.avatarColor, fontSize: size * 0.4 }}>
    {(m.pseudo || '?').charAt(0).toUpperCase()}
  </span>
)

// ---------------------------------------------------------------- Fil
function FeedTab() {
  const club = useClub()
  const [composer, setComposer] = useState<null | 'story' | 'share'>(null)
  const storyAuthors = useMemo(() => {
    const by = new Map<string, FeedItem[]>()
    club.stories.forEach((s) => by.set(s.author.id, [...(by.get(s.author.id) ?? []), s]))
    return [...by.values()]
  }, [club.stories])
  const [openStory, setOpenStory] = useState<FeedItem[] | null>(null)

  return (
    <div className="space-y-5">
      {/* Stories 24 h */}
      <section className="flex gap-3 overflow-x-auto pb-1 scrollbar-none" aria-label="Stories">
        <button onClick={() => setComposer('story')} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
          <span className="grid size-14 place-items-center rounded-full border-2 border-dashed border-pink text-pink"><Plus size={20} /></span>
          <span className="text-xs font-medium">Ma story</span>
        </button>
        {storyAuthors.map((list) => (
          <button key={list[0].author.id} onClick={() => setOpenStory(list)} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
            <span className="rounded-full p-0.5" style={{ background: 'var(--grad)' }}><span className="block rounded-full border-2 border-bg"><Avatar m={list[0].author} size={50} /></span></span>
            <span className="w-full truncate text-center text-xs font-medium">{list[0].author.id === club.me?.id ? 'Moi' : list[0].author.pseudo}</span>
          </button>
        ))}
      </section>

      {club.wizzReceived.slice(0, 3).filter((w) => Date.now() - new Date(w.at).getTime() < 3 * DAY).map((w) => (
        <div key={w.at + w.from.id} className="flex items-center gap-3 rounded-3xl bg-blush px-4 py-3">
          <Avatar m={w.from} size={36} />
          <p className="text-sm"><strong>{w.from.pseudo}</strong> {w.kind === 'wizz' ? 't’envoie un wizz ⚡' : 't’a laissé un mot doux 💌'} {w.text && <span className="text-muted">« {w.text} »</span>}</p>
        </div>
      ))}

      <button onClick={() => setComposer('share')} className="flex w-full items-center gap-3 rounded-3xl border border-line bg-surface p-4 text-left hover:bg-soft">
        {club.me && <Avatar m={club.me} />}
        <span className="flex-1 text-sm text-muted">Partager une séance, un record, un objectif, ton bilan…</span>
        <Send size={18} className="text-plum" />
      </button>

      {club.feed.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-blush-line p-8 text-center">
          <p className="font-semibold">Le fil est encore vide</p>
          <p className="mt-1 text-sm text-muted">Ajoute une amie avec son code GLOW, puis partage ta prochaine séance.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">{club.feed.map((item) => <PostCard key={item.author.id + item.id} item={item} />)}</div>
      )}

      <ShareModal mode={composer} onClose={() => setComposer(null)} />
      <Modal open={!!openStory} onClose={() => setOpenStory(null)} title={openStory ? `Story de ${openStory[0].author.pseudo}` : ''} maxWidth="max-w-sm">
        <div className="space-y-3">
          {openStory?.map((s) => (
            <div key={s.id} className="rounded-3xl p-5 text-white" style={{ background: 'var(--grad)' }}>
              <p className="text-sm text-white/80">{s.story?.kind === 'session' ? 'Séance du jour' : s.story?.kind === 'rest' ? 'Jour de repos' : 'Petit mot'} · {timeAgo(s.createdAt)}</p>
              <p className="mt-1 font-serif text-xl italic">{s.text}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

function PostCard({ item }: { item: FeedItem }) {
  const club = useClub()
  const { createRoutine, allExercises } = useWorkout()
  const [comment, setComment] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [imported, setImported] = useState(false)
  const mine = item.author.id === club.me?.id
  const submit = (e: FormEvent) => { e.preventDefault(); void club.comment(item, comment); setComment('') }

  return (
    <article className="space-y-3 rounded-3xl border border-line bg-surface p-4">
      <header className="flex items-center gap-3">
        <Avatar m={item.author} />
        <div className="min-w-0 flex-1"><p className="truncate font-semibold">{mine ? 'Moi' : item.author.pseudo}</p><p className="text-xs text-muted">{timeAgo(item.createdAt)}</p></div>
        {mine && <button onClick={() => (confirm ? club.deletePost(item.id) : setConfirm(true))} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${confirm ? 'bg-rose-600 text-white' : 'text-muted hover:bg-soft'}`}>{confirm ? 'Supprimer ?' : <Trash2 size={14} />}</button>}
      </header>

      <PostBody item={item} />
      {item.text && <p className="text-sm">{item.text}</p>}
      {item.type === 'routine' && item.routine && !mine && (
        <button disabled={imported} onClick={async () => {
          await createRoutine({
            name: item.routine!.name, description: `Routine partagée par ${item.author.pseudo}`,
            exercises: freshExercises(item.routine!.exercises.map((e, i) => {
              const ex = allExercises.find((x) => x.id === e.exerciseId)
              return { id: `ex_${i}`, exerciseId: e.exerciseId, exerciseName: e.exerciseName, category: ex?.category, equipment: ex?.equipment, restSeconds: ex?.defaultRestSeconds ?? 75,
                sets: Array.from({ length: e.sets }, (_, j) => ({ id: `s_${j}`, setNumber: j + 1, targetReps: e.reps, targetWeight: 0, completed: false })) }
            })),
          })
          setImported(true)
        }} className="w-full rounded-full bg-soft py-2 text-sm font-semibold text-plum disabled:opacity-60">{imported ? 'Ajoutée à mes séances ✓' : 'Ajouter à mes séances'}</button>
      )}

      <div className="flex flex-wrap gap-1.5">
        {REACTIONS.map((r) => {
          const by = item.reactions[r.id]
          const mineR = club.me ? by.includes(club.me.id) : false
          return (
            <button key={r.id} onClick={() => club.react(item, r.id)} aria-pressed={mineR} title={r.label}
              className={`rounded-full px-3 py-1 text-sm transition ${mineR ? 'bg-blush ring-1 ring-pink' : 'bg-soft hover:bg-blush'}`}>
              {r.emoji}{by.length > 0 && <span className="ml-1 font-mono text-xs font-bold">{by.length}</span>}
            </button>
          )
        })}
      </div>

      {item.comments.length > 0 && (
        <ul className="space-y-1.5 border-t border-line pt-2.5">
          {item.comments.map((c, i) => <li key={i} className="text-sm"><strong>{c.authorId === club.me?.id ? 'Moi' : c.authorName}</strong> {c.text}</li>)}
        </ul>
      )}
      <form onSubmit={submit} className="flex gap-2">
        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Encourager…" aria-label="Écrire un commentaire" maxLength={280}
          className="min-w-0 flex-1 rounded-full bg-soft px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blush-line" />
        <button disabled={!comment.trim()} aria-label="Envoyer le commentaire" className="grid size-9 place-items-center rounded-full bg-[#781539] text-white disabled:opacity-40"><MessageCircle size={16} /></button>
      </form>
    </article>
  )
}

function PostBody({ item }: { item: FeedItem }) {
  const box = (title: string, children: ReactNode, icon: Parameters<typeof Icon>[0]['name']) => (
    <div className="rounded-2xl bg-soft p-3.5">
      <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-plum"><Icon name={icon} className="size-4" /> {title}</p>
      {children}
    </div>
  )
  switch (item.type) {
    case 'workout': return box(item.workout?.name ?? 'Séance', (
      <ul className="space-y-1 text-sm">
        {item.workout?.exercises.map((e, i) => (
          <li key={i} className="flex justify-between gap-3"><span className="truncate">{e.name}</span><span className="shrink-0 font-mono text-xs text-muted">{e.sets}×{e.reps}{e.topWeight ? ` · ${e.topWeight} kg` : ''}</span></li>
        ))}
        {item.workout?.durationMinutes ? <li className="pt-1 text-xs text-muted">{item.workout.durationMinutes} min</li> : null}
      </ul>), 'weightlifter')
    case 'pr': return box('Nouveau record', <p className="text-sm"><strong>{item.pr?.exercise}</strong>{item.pr?.weight ? <span className="font-mono"> · {item.pr.weight} kg × {item.pr.reps}</span> : null}</p>, 'trophy')
    case 'objective': return box('Objectif atteint', <p className="text-sm">{item.objective}</p>, 'sparkle')
    case 'month': return box(`Bilan de ${item.month?.label}`, <p className="font-mono text-sm">{item.month?.sessions} séances · {Math.round((item.month?.volumeKg ?? 0) / 100) / 10} t · {item.month?.records} record(s)</p>, 'calendar')
    case 'routine': return box(`Routine : ${item.routine?.name}`, <ul className="text-sm text-muted">{item.routine?.exercises.map((e, i) => <li key={i}>{e.exerciseName} — {e.sets}×{e.reps}</li>)}</ul>, 'dumbbell')
    case 'challenge': return box(item.challenge?.title ?? 'Défi en duo', <p className="text-sm text-muted">Objectif commun : {item.challenge?.target} séances d’ici le {item.challenge && new Date(item.challenge.end).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>, 'heart-pulse')
    default: return null
  }
}

function ShareModal({ mode, onClose }: { mode: null | 'story' | 'share'; onClose: () => void }) {
  const club = useClub()
  const { workouts, measurements, routines, getPersonalRecords, allExercises } = useWorkout()
  const [text, setText] = useState('')
  const [kind, setKind] = useState<'session' | 'note' | 'rest'>('note')
  const [busy, setBusy] = useState(false)
  const last = workouts.find((w) => w.status === 'completed')
  const prs = Object.entries(getPersonalRecords()).slice(0, 8)
  const report = monthReport(workouts, measurements)
  const customRoutines = routines.filter((r) => !r.isDefault)
  const run = async (fn: () => Promise<void>) => { setBusy(true); try { await fn(); setText(''); onClose() } finally { setBusy(false) } }
  const hide = club.me?.hideLoads

  return (
    <Modal open={!!mode} onClose={onClose} title={mode === 'story' ? 'Ma story (24 h)' : 'Partager au Club'} maxWidth="max-w-lg">
      {mode === 'story' ? (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {([['session', 'Séance du jour'], ['note', 'Petit mot'], ['rest', 'Jour de repos']] as const).map(([k, l]) => (
              <button key={k} onClick={() => setKind(k)} aria-pressed={kind === k} className={`rounded-2xl py-2.5 text-sm font-semibold ${kind === k ? 'bg-[#781539] text-white' : 'bg-soft'}`}>{l}</button>
            ))}
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} maxLength={160} placeholder={kind === 'rest' ? 'Repos mérité, on reprend demain !' : kind === 'session' ? 'Leg day bouclé 🔥' : 'Un mot pour tes amies'}
            className="w-full rounded-2xl border border-blush-line bg-surface p-3 text-sm outline-none focus:border-pink" />
          <button disabled={busy || !text.trim()} onClick={() => run(() => club.publish({ type: 'story', text: text.trim(), story: { kind, expiresAt: new Date(Date.now() + DAY).toISOString() } }))}
            className="w-full rounded-full bg-[#781539] py-3 text-sm font-semibold text-white disabled:opacity-50">Publier pour 24 h</button>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} maxLength={280} placeholder="Ajoute un message (facultatif)"
            className="w-full rounded-2xl border border-blush-line bg-surface p-3 text-sm outline-none focus:border-pink" />
          {hide && <p className="flex items-center gap-1.5 text-xs text-muted"><EyeOff size={13} /> Tes charges sont masquées au Club.</p>}
          <ShareRow disabled={!last || busy} title="Ma dernière séance" hint={last ? last.name : 'Aucune séance terminée'} onClick={() => run(() => club.shareWorkout(last!, text.trim() || undefined))} />
          {prs.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-bold">Célébrer un record</p>
              <div className="flex flex-wrap gap-2">
                {prs.map(([id, pr]) => {
                  const name = allExercises.find((e) => e.id === id)?.name ?? id
                  return <button key={id} disabled={busy} onClick={() => run(() => club.publish({ type: 'pr', text: text.trim() || undefined, pr: { exercise: name, weight: hide ? undefined : pr.maxWeight, reps: pr.reps } }))}
                    className="rounded-full bg-soft px-3 py-1.5 text-sm hover:bg-blush">{name}{!hide && <span className="font-mono text-xs"> · {pr.maxWeight} kg</span>}</button>
                })}
              </div>
            </div>
          )}
          <ShareRow disabled={busy || !text.trim()} title="Un objectif atteint" hint="Écris ton objectif dans le message ci-dessus" onClick={() => run(() => club.publish({ type: 'objective', objective: text.trim() }))} />
          <ShareRow disabled={busy || report.sessions === 0} title={`Mon bilan de ${report.label}`} hint="Séances, volume et records (sans tes mensurations)"
            onClick={() => run(() => club.publish({ type: 'month', text: text.trim() || undefined, month: { label: report.label, sessions: report.sessions, volumeKg: hide ? 0 : report.volumeKg, records: report.records.length } }))} />
          {customRoutines.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-bold">Partager une routine</p>
              <div className="flex flex-wrap gap-2">
                {customRoutines.map((r) => (
                  <button key={r.id} disabled={busy} onClick={() => run(() => club.publish({ type: 'routine', text: text.trim() || undefined, routine: { name: r.name, exercises: r.exercises.map((e) => ({ exerciseId: e.exerciseId, exerciseName: e.exerciseName, sets: e.sets.length, reps: e.sets[0]?.targetReps ?? 10 })) } }))}
                    className="rounded-full bg-soft px-3 py-1.5 text-sm hover:bg-blush">{r.name}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

const ShareRow = ({ title, hint, onClick, disabled }: { title: string; hint: string; onClick: () => void; disabled?: boolean }) => (
  <button disabled={disabled} onClick={onClick} className="flex w-full items-center justify-between gap-3 rounded-2xl bg-soft px-4 py-3 text-left hover:bg-blush disabled:opacity-50">
    <span><span className="block text-sm font-semibold">{title}</span><span className="block text-xs text-muted">{hint}</span></span>
    <Send size={16} className="shrink-0 text-plum" />
  </button>
)

// ---------------------------------------------------------------- Amies
function FriendsTab() {
  const club = useClub()
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null)
  const [mot, setMot] = useState<Member | null>(null)
  const [motText, setMotText] = useState('')
  const [confirm, setConfirm] = useState<string | null>(null)
  const [sent, setSent] = useState<string | null>(null)
  const dow = new Date().getDay()
  const ws = weekStart()

  return (
    <div className="space-y-5">
      <form onSubmit={async (e) => { e.preventDefault(); setMsg(await club.addFriendByCode(code)); setCode('') }}
        className="flex flex-col gap-2 rounded-3xl border border-line bg-surface p-4 sm:flex-row sm:items-center">
        <UserPlus size={20} className="hidden shrink-0 text-plum sm:block" />
        <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Code de ton amie (GLOW-XXX)" aria-label="Code d’invitation"
          className="min-w-0 flex-1 rounded-full bg-soft px-4 py-2.5 font-mono text-sm uppercase outline-none focus:ring-2 focus:ring-blush-line" />
        <button disabled={!code.trim()} className="rounded-full bg-[#781539] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">Ajouter</button>
      </form>
      {msg && <p role="status" className={`rounded-2xl px-4 py-2.5 text-sm ${msg.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{msg.message}</p>}

      {club.friends.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-blush-line p-8 text-center text-sm text-muted">Partage ton code <strong className="font-mono text-plum">{club.me?.code}</strong> ou entre celui d’une amie pour commencer.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {club.friends.map((f) => {
            const today = f.publicData.week?.[dow] ?? '—'
            const thisWeek = sessionsBetween(f, ws, localISO())
            return (
              <div key={f.id} className="space-y-3 rounded-3xl border border-line bg-surface p-4">
                <div className="flex items-center gap-3">
                  <Avatar m={f} size={46} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{f.pseudo}</p>
                    <p className="truncate text-sm text-muted">{f.bio || `Aujourd’hui : ${today}`}</p>
                  </div>
                  <span className="text-right"><span className="block font-mono text-lg font-bold">{thisWeek}</span><span className="text-xs text-muted">cette sem.</span></span>
                </div>
                <div className="flex gap-2">
                  <button onClick={async () => { await club.sendWizz(f, 'wizz', 'Zéro excuse, on garde notre régularité ! 💪'); setSent(f.id); setTimeout(() => setSent(null), 2500) }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#781539] py-2 text-sm font-semibold text-white"><Zap size={15} /> {sent === f.id ? 'Envoyé !' : 'Wizz'}</button>
                  <button onClick={() => setMot(f)} className="flex-1 rounded-full bg-soft py-2 text-sm font-semibold text-plum">Mot doux 💌</button>
                  <button onClick={() => (confirm === f.id ? club.removeFriend(f.id) : setConfirm(f.id))} aria-label={`Retirer ${f.pseudo}`}
                    className={`rounded-full px-3 text-sm font-semibold ${confirm === f.id ? 'bg-rose-600 text-white' : 'text-muted hover:bg-soft'}`}>{confirm === f.id ? 'Retirer ?' : <Trash2 size={15} />}</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={!!mot} onClose={() => setMot(null)} title={`Mot doux pour ${mot?.pseudo}`} maxWidth="max-w-sm">
        <form onSubmit={async (e) => { e.preventDefault(); await club.sendWizz(mot!, 'mot', motText); setMotText(''); setMot(null) }} className="space-y-3">
          <textarea value={motText} onChange={(e) => setMotText(e.target.value)} rows={3} maxLength={200} required placeholder="Fière de toi, continue comme ça 🌸"
            className="w-full rounded-2xl border border-blush-line bg-surface p-3 text-sm outline-none focus:border-pink" />
          <button className="w-full rounded-full bg-[#781539] py-3 text-sm font-semibold text-white">Envoyer</button>
        </form>
      </Modal>
    </div>
  )
}

// ---------------------------------------------------------------- Défis
function ChallengesTab() {
  const club = useClub()
  const { workouts } = useWorkout()
  const me = club.me
  const today = localISO()
  const ws = weekStart()
  const [creating, setCreating] = useState(false)
  const [partner, setPartner] = useState('')
  const [target, setTarget] = useState(6)
  const [weeks, setWeeks] = useState(1)
  const [title, setTitle] = useState('Défi duo : on ne lâche rien')

  if (!me) return null
  const circle = [me, ...club.friends]
  const myAll = club.feed.concat().filter((p) => p.type === 'challenge')
  const challenges = myAll.filter((p) => p.author.id === me.id || p.challenge?.partnerId === me.id)
  const mineSessions = (from: string, to: string) => workouts.filter((w) => w.status === 'completed' && w.date >= from && w.date <= to).length
  const count = (m: Member, from: string, to: string) => (m.id === me.id ? mineSessions(from, to) : sessionsBetween(m, from, to))
  const groupTotal = circle.reduce((s, m) => s + count(m, ws, today), 0)

  // « Chacune sa victoire » : chacune comparée à sa propre moyenne des 4 semaines précédentes.
  const victories = circle.map((m) => {
    const start = new Date(ws)
    const prev = [1, 2, 3, 4].map((k) => {
      const a = new Date(start.getTime() - k * 7 * DAY), b = new Date(start.getTime() - (k - 1) * 7 * DAY - DAY)
      return count(m, localISO(a), localISO(b))
    })
    const avg = prev.reduce((s, n) => s + n, 0) / 4
    const now = count(m, ws, today)
    return { m, now, avg: Math.round(avg * 10) / 10, delta: Math.round((now - avg) * 10) / 10, cheers: club.encouragementsSince(m.id, `${ws}T00:00:00`) }
  })

  const badges = [
    { title: 'Première séance', ok: workouts.some((w) => w.status === 'completed') },
    { title: 'Régulière', hint: '3 séances dans la semaine', ok: mineSessions(ws, today) >= 3 },
    { title: 'Supportrice', hint: '5 encouragements cette semaine', ok: club.encouragementsSince(me.id, `${ws}T00:00:00`) >= 5 },
    { title: 'Cercle au complet', hint: '3 amies', ok: club.friends.length >= 3 },
    { title: 'Record partagé', ok: club.feed.some((p) => p.type === 'pr' && p.author.id === me.id) },
    { title: 'Club des 10', hint: '10 séances', ok: workouts.filter((w) => w.status === 'completed').length >= 10 },
  ]

  return (
    <div className="space-y-5">
      {/* Cagnotte de groupe */}
      <section className="rounded-3xl p-5 text-white" style={{ background: 'var(--gradPlum)' }}>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-bold">Cagnotte de la semaine</h2>
          <label className="text-sm text-white/80">Objectif <input type="number" min={3} max={60} value={club.groupTarget} onChange={(e) => club.setGroupTarget(Number(e.target.value))} aria-label="Objectif de séances du groupe" className="w-14 rounded-lg bg-white/15 px-2 py-0.5 text-center font-mono text-white outline-none" /></label>
        </div>
        <p className="mt-2 font-mono text-4xl font-bold">{groupTotal}<span className="text-lg text-white/70"> / {club.groupTarget}</span></p>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-pink transition-all" style={{ width: `${Math.min(100, (groupTotal / club.groupTarget) * 100)}%` }} /></div>
        <p className="mt-2 text-sm text-white/80">{groupTotal >= club.groupTarget ? 'Objectif atteint ensemble, bravo ! 🎉' : `Encore ${club.groupTarget - groupTotal} séance(s) à vous toutes.`}</p>
      </section>

      {/* Chacune sa victoire */}
      <section className="rounded-3xl border border-line bg-surface p-5">
        <h2 className="font-bold">Chacune sa victoire</h2>
        <p className="mb-4 text-sm text-muted">Pas de classement : chacune est comparée à elle-même, et encourager les copines compte aussi.</p>
        <ul className="space-y-3">
          {victories.map((v) => (
            <li key={v.m.id} className="flex items-center gap-3">
              <Avatar m={v.m} size={36} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{v.m.id === me.id ? 'Moi' : v.m.pseudo}</p>
                <p className="text-xs text-muted">{v.now} séance(s) cette semaine · moyenne {v.avg} · {v.cheers} encouragement(s)</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${v.delta > 0 ? 'bg-emerald-50 text-emerald-700' : v.cheers > 0 ? 'bg-blush text-plum' : 'bg-soft text-muted'}`}>
                {v.delta > 0 ? `+${v.delta} vs sa moyenne` : v.cheers > 0 ? 'Supportrice' : 'En route'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Défis en duo */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Défis en duo</h2>
          {club.friends.length > 0 && <button onClick={() => setCreating(true)} className="flex items-center gap-1 rounded-full bg-soft px-3 py-1.5 text-sm font-semibold text-plum"><Plus size={15} /> Nouveau défi</button>}
        </div>
        {challenges.length === 0 && <p className="text-sm text-muted">{club.friends.length ? 'Lance un défi à une amie : un objectif de séances commun, une barre de progression partagée.' : 'Ajoute une amie pour lancer un défi en duo.'}</p>}
        {challenges.map((c) => {
          const ch = c.challenge!
          const other = c.author.id === me.id ? club.friends.find((f) => f.id === ch.partnerId) : c.author
          if (!other) return null
          const end = ch.end < today ? ch.end : today
          const a = count(me, ch.start, end), b = count(other, ch.start, end)
          const pct = Math.min(100, ((a + b) / ch.target) * 100)
          const over = ch.end < today
          return (
            <div key={c.id} className="space-y-2 rounded-3xl border border-line bg-surface p-4">
              <div className="flex items-baseline justify-between gap-2"><p className="font-semibold">{ch.title}</p><span className="text-xs text-muted">{over ? 'Terminé' : `jusqu’au ${new Date(ch.end).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`}</span></div>
              <p className="text-sm text-muted">Moi <span className="font-mono font-bold text-ink">{a}</span> + {other.pseudo} <span className="font-mono font-bold text-ink">{b}</span> = <span className="font-mono font-bold text-plum">{a + b} / {ch.target}</span></p>
              <div className="flex h-3 overflow-hidden rounded-full bg-soft">
                <div className="h-full bg-[#781539]" style={{ width: `${Math.min(pct, (a / ch.target) * 100)}%` }} />
                <div className="h-full bg-pink" style={{ width: `${Math.max(0, pct - (a / ch.target) * 100)}%` }} />
              </div>
              {a + b >= ch.target && <p className="text-sm font-semibold text-emerald-700">Défi réussi ensemble 🎉</p>}
            </div>
          )
        })}
      </section>

      {/* Badges */}
      <section>
        <h2 className="mb-3 font-bold">Mes badges</h2>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {badges.map((b) => (
            <div key={b.title} className={`rounded-2xl p-3 ${b.ok ? 'bg-blush' : 'bg-soft opacity-60'}`}>
              <Icon name={b.ok ? 'trophy' : 'sparkle'} className={`size-5 ${b.ok ? 'text-pink' : 'text-muted'}`} />
              <p className="mt-1 text-sm font-semibold">{b.title}</p>
              {b.hint && <p className="text-xs text-muted">{b.hint}</p>}
            </div>
          ))}
        </div>
      </section>

      <Modal open={creating} onClose={() => setCreating(false)} title="Nouveau défi en duo" maxWidth="max-w-md">
        <form className="space-y-3" onSubmit={async (e) => {
          e.preventDefault()
          const end = localISO(new Date(Date.now() + (weeks * 7 - 1) * DAY))
          await club.publish({ type: 'challenge', challenge: { partnerId: partner || club.friends[0].id, title: title.trim() || 'Défi duo', target, start: today, end } } as Omit<Post, 'id' | 'createdAt'>)
          setCreating(false)
        }}>
          <label className="block text-sm font-semibold">Avec
            <select value={partner || club.friends[0]?.id} onChange={(e) => setPartner(e.target.value)} className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5">
              {club.friends.map((f) => <option key={f.id} value={f.id}>{f.pseudo}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold">Nom du défi<input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={60} className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-semibold">Séances à deux<input type="number" min={2} max={40} value={target} onChange={(e) => setTarget(Number(e.target.value))} className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5 font-mono" /></label>
            <label className="block text-sm font-semibold">Durée
              <select value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5"><option value={1}>1 semaine</option><option value={2}>2 semaines</option><option value={4}>4 semaines</option></select>
            </label>
          </div>
          <button className="w-full rounded-full bg-[#781539] py-3 text-sm font-semibold text-white">Lancer le défi</button>
        </form>
      </Modal>
    </div>
  )
}

// ---------------------------------------------------------------- Profil Club
function ProfileTab() {
  const club = useClub()
  const me = club.me
  const [pseudo, setPseudo] = useState(me?.pseudo ?? '')
  const [bio, setBio] = useState(me?.bio ?? '')
  const [saved, setSaved] = useState(false)
  if (!me) return null
  return (
    <form className="max-w-xl space-y-4 rounded-3xl border border-line bg-surface p-5" onSubmit={async (e) => {
      e.preventDefault(); await club.updateMe({ pseudo, bio }); setSaved(true); setTimeout(() => setSaved(false), 2000)
    }}>
      <div className="flex items-center gap-4"><Avatar m={{ pseudo, avatarColor: me.avatarColor }} size={56} /><div><p className="font-semibold">{pseudo || 'Mon pseudo'}</p><p className="font-mono text-sm text-plum">{me.code}</p></div></div>
      <label className="block text-sm font-semibold">Pseudo<input value={pseudo} onChange={(e) => setPseudo(e.target.value)} maxLength={30} required className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5" /></label>
      <label className="block text-sm font-semibold">Ma phrase<input value={bio} onChange={(e) => setBio(e.target.value)} maxLength={80} placeholder="En plein glow up 🌸" className="mt-1 w-full rounded-2xl border border-blush-line bg-surface px-3 py-2.5" /></label>
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold">Couleur</legend>
        <div className="flex gap-2">{COLORS.map((c) => <button type="button" key={c} onClick={() => club.updateMe({ avatarColor: c })} aria-label={`Couleur ${c}`} aria-pressed={me.avatarColor === c} className={`size-9 rounded-full ${me.avatarColor === c ? 'ring-2 ring-offset-2 ring-ink' : ''}`} style={{ background: c }} />)}</div>
      </fieldset>
      <label className="flex items-center justify-between gap-3 rounded-2xl bg-soft px-4 py-3">
        <span><span className="block text-sm font-semibold">Masquer mes charges</span><span className="block text-xs text-muted">Tes séances et records sont partagés sans les kilos.</span></span>
        <input type="checkbox" checked={me.hideLoads} onChange={(e) => club.updateMe({ hideLoads: e.target.checked })} className="size-5 accent-[#781539]" />
      </label>
      <p className="flex items-start gap-1.5 text-xs text-muted"><Lock size={13} className="mt-0.5 shrink-0" /> Tes mensurations, ton cycle, ton check-in et tes notes restent privés : ils ne sont jamais publiés au Club.</p>
      <button className="w-full rounded-full bg-[#781539] py-3 text-sm font-semibold text-white">{saved ? 'Enregistré ✓' : 'Enregistrer'}</button>
    </form>
  )
}
