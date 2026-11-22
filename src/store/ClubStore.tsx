import type { RealtimeChannel } from '@supabase/supabase-js'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useAuth } from '../features/auth/AuthProvider'
import { getState, patchState } from '../lib/cloud'
import { demoMode, supabase } from '../lib/supabase'
import { localISO } from '../lib/utils'
import type { Workout } from '../types'
import { useWorkout } from './WorkoutStore'

/**
 * Le Club : social entre amies, sur Supabase.
 * - profiles : pseudo, code GLOW-XXX, couleur, bio, « masquer mes charges », données publiques légères
 * - friends  : « user_id a ajouté friend_id » (l'amitié vaut dans les deux sens)
 * - social   : une ligne par personne et par type — feed (mes publications et stories),
 *              reacts (mes réactions et commentaires sur les publications des autres), wizz (wizz et mots doux envoyés)
 * Rien de privé n'est publié : ni cycle, ni mensurations, ni notes, ni check-in.
 */

export type Reaction = 'fire' | 'muscle' | 'flower' | 'clap'
export const REACTIONS: { id: Reaction; emoji: string; label: string }[] = [
  { id: 'fire', emoji: '🔥', label: 'En feu' },
  { id: 'muscle', emoji: '💪', label: 'Solide' },
  { id: 'flower', emoji: '🌸', label: 'Glow up' },
  { id: 'clap', emoji: '👏', label: 'Bravo' },
]

export type PostType = 'workout' | 'pr' | 'objective' | 'month' | 'routine' | 'story' | 'challenge'

export interface Post {
  id: string
  type: PostType
  createdAt: string
  text?: string
  /** workout */
  workout?: { name: string; durationMinutes?: number; exercises: { name: string; sets: number; reps: string; topWeight?: number }[] }
  /** pr */
  pr?: { exercise: string; weight?: number; reps: number }
  /** objective */
  objective?: string
  /** month (bilan sans mensurations) */
  month?: { label: string; sessions: number; volumeKg: number; records: number }
  /** routine partagée (importable) */
  routine?: { name: string; exercises: { exerciseId: string; exerciseName: string; sets: number; reps: number }[] }
  /** story 24 h */
  story?: { kind: 'session' | 'note' | 'rest'; expiresAt: string }
  /** défi en duo */
  challenge?: { partnerId: string; title: string; target: number; start: string; end: string }
}

export interface ReactEntry { owner: string; postId: string; reaction?: Reaction; comment?: string; at: string }
export interface WizzEntry { to: string; kind: 'wizz' | 'mot'; text: string; at: string }

export interface PublicData {
  /** Dates des séances terminées (90 derniers jours) : sert aux défis et à « Chacune sa victoire ». */
  sessionDates?: string[]
  /** Activité prévue chaque jour de la semaine (0 = dimanche). */
  week?: Record<number, string>
}

export interface Member {
  id: string
  pseudo: string
  code: string
  avatarColor: string
  bio: string
  hideLoads: boolean
  publicData: PublicData
}

export interface FeedItem extends Post {
  author: Member
  reactions: Record<Reaction, string[]>
  comments: { authorId: string; authorName: string; text: string; at: string }[]
}

interface ClubState {
  loading: boolean
  me: Member | null
  friends: Member[]
  feed: FeedItem[]
  stories: FeedItem[]
  wizzReceived: (WizzEntry & { from: Member })[]
  refresh: () => Promise<void>
  updateMe: (patch: Partial<Pick<Member, 'pseudo' | 'avatarColor' | 'bio' | 'hideLoads'>>) => Promise<void>
  addFriendByCode: (code: string) => Promise<{ ok: boolean; message: string }>
  removeFriend: (id: string) => Promise<void>
  publish: (post: Omit<Post, 'id' | 'createdAt'>) => Promise<void>
  deletePost: (id: string) => Promise<void>
  react: (item: FeedItem, reaction: Reaction) => Promise<void>
  comment: (item: FeedItem, text: string) => Promise<void>
  sendWizz: (to: Member, kind: 'wizz' | 'mot', text: string) => Promise<void>
  shareWorkout: (w: Workout, text?: string) => Promise<void>
  groupTarget: number
  setGroupTarget: (n: number) => void
  /** Encouragements donnés depuis une date (réactions, commentaires, wizz, mots doux). */
  encouragementsSince: (memberId: string, since: string) => number
}

const Ctx = createContext<ClubState | null>(null)
const MAX_POSTS = 120
const DAY = 86400000

const toMember = (r: Record<string, unknown>): Member => ({
  id: r.id as string, pseudo: (r.pseudo as string) || 'Amie', code: r.code as string, avatarColor: (r.avatar_color as string) || '#781539',
  bio: (r.bio as string) || '', hideLoads: Boolean(r.hide_loads), publicData: (r.public_data as PublicData) || {},
})

export function ClubProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth()
  const { workouts, weeklyPlans } = useWorkout()
  const uid = user?.id ?? null
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<Record<string, Member>>({})
  const [friendIds, setFriendIds] = useState<string[]>([])
  const [rows, setRows] = useState<Record<string, { feed: Post[]; reacts: ReactEntry[]; wizz: WizzEntry[] }>>({})
  const [groupTarget, setTarget] = useState<number>(() => Number(getState().clubGroupTarget) || 12)
  const channel = useRef<RealtimeChannel | null>(null)

  const load = useCallback(async () => {
    if (!uid || demoMode) { setLoading(false); return }
    const { data: links } = await supabase.from('friends').select('user_id, friend_id')
    const ids = [...new Set((links ?? []).map((l) => (l.user_id === uid ? l.friend_id : l.user_id)))]
    const all = [uid, ...ids]
    const [{ data: profs }, { data: social }] = await Promise.all([
      supabase.from('profiles').select('*').in('id', all),
      supabase.from('social').select('user_id, kind, data').in('user_id', all),
    ])
    setFriendIds(ids)
    setMembers(Object.fromEntries((profs ?? []).map((p) => [p.id, toMember(p)])))
    const next: typeof rows = {}
    for (const id of all) next[id] = { feed: [], reacts: [], wizz: [] }
    for (const s of social ?? []) (next[s.user_id] as Record<string, unknown>)[s.kind] = s.data ?? []
    setRows(next)
    setLoading(false)
  }, [uid])

  useEffect(() => {
    void load()
    if (!uid || demoMode) return
    // Temps réel : toute modification des amies ou de leurs publications recharge le Club.
    let timer: ReturnType<typeof setTimeout> | null = null
    const reload = () => { if (timer) clearTimeout(timer); timer = setTimeout(() => void load(), 400) }
    channel.current = supabase.channel(`club:${uid}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'social' }, reload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'friends' }, reload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, reload)
      .subscribe()
    return () => { if (timer) clearTimeout(timer); if (channel.current) void supabase.removeChannel(channel.current) }
  }, [uid, load])

  // Données publiques légères tenues à jour : dates de séances (90 j) et activités de la semaine.
  useEffect(() => {
    if (!uid || demoMode || loading) return
    const since = localISO(new Date(Date.now() - 90 * DAY))
    const publicData: PublicData = {
      sessionDates: workouts.filter((w) => w.status === 'completed' && w.date >= since).map((w) => w.date).sort(),
      week: Object.fromEntries(weeklyPlans.map((d) => [d.dayOfWeek, d.activities?.[0] || d.activity || 'Repos'])),
    }
    if (JSON.stringify(publicData) === JSON.stringify(members[uid]?.publicData)) return
    const t = setTimeout(() => { void supabase.from('profiles').update({ public_data: publicData }).eq('id', uid) }, 1500)
    return () => clearTimeout(t)
  }, [uid, loading, workouts, weeklyPlans, members])

  const writeRow = useCallback(async (kind: 'feed' | 'reacts' | 'wizz', data: unknown[]) => {
    if (!uid) return
    setRows((r) => ({ ...r, [uid]: { ...(r[uid] ?? { feed: [], reacts: [], wizz: [] }), [kind]: data } }))
    if (demoMode) return
    const { error } = await supabase.from('social').upsert({ user_id: uid, kind, data })
    if (error) throw error
  }, [uid])

  const mine = uid ? rows[uid] ?? { feed: [], reacts: [], wizz: [] } : { feed: [], reacts: [], wizz: [] }
  const me = uid ? members[uid] ?? (profile ? { id: uid, pseudo: profile.displayName, code: profile.friendCode ?? '', avatarColor: '#781539', bio: '', hideLoads: false, publicData: {} } : null) : null
  const friends = friendIds.map((id) => members[id]).filter(Boolean)

  // Fil : publications de moi et de mes amies, avec réactions et commentaires de tout le cercle.
  const { feed, stories } = useMemo(() => {
    const circle = [uid, ...friendIds].filter(Boolean) as string[]
    const allReacts = circle.flatMap((id) => (rows[id]?.reacts ?? []).map((r) => ({ ...r, by: id })))
    const items: FeedItem[] = circle.flatMap((id) => (rows[id]?.feed ?? []).map((p) => {
      const rs = allReacts.filter((r) => r.owner === id && r.postId === p.id)
      const reactions = { fire: [], muscle: [], flower: [], clap: [] } as Record<Reaction, string[]>
      rs.forEach((r) => { if (r.reaction) reactions[r.reaction].push(r.by) })
      return {
        ...p, author: members[id] ?? { id, pseudo: id === uid ? profile?.displayName || 'Moi' : 'Amie', code: '', avatarColor: '#781539', bio: '', hideLoads: false, publicData: {} },
        reactions,
        comments: rs.filter((r) => r.comment).map((r) => ({ authorId: r.by, authorName: members[r.by]?.pseudo ?? 'Amie', text: r.comment!, at: r.at })).sort((a, b) => a.at.localeCompare(b.at)),
      }
    })).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    const now = new Date().toISOString()
    return { feed: items.filter((i) => i.type !== 'story'), stories: items.filter((i) => i.type === 'story' && (i.story?.expiresAt ?? '') > now) }
  }, [rows, members, uid, friendIds, profile?.displayName])

  const wizzReceived = useMemo(() => friendIds.flatMap((id) => (rows[id]?.wizz ?? []).filter((w) => w.to === uid).map((w) => ({ ...w, from: members[id] })))
    .filter((w) => w.from).sort((a, b) => b.at.localeCompare(a.at)), [rows, friendIds, members, uid])

  const updateMe = useCallback(async (patch: Partial<Pick<Member, 'pseudo' | 'avatarColor' | 'bio' | 'hideLoads'>>) => {
    if (!uid) return
    const row: Record<string, unknown> = {}
    if (patch.pseudo !== undefined) row.pseudo = patch.pseudo.trim()
    if (patch.avatarColor !== undefined) row.avatar_color = patch.avatarColor
    if (patch.bio !== undefined) row.bio = patch.bio
    if (patch.hideLoads !== undefined) row.hide_loads = patch.hideLoads
    setMembers((m) => (m[uid] ? { ...m, [uid]: { ...m[uid], ...patch } } : m))
    if (!demoMode) { const { error } = await supabase.from('profiles').update(row).eq('id', uid); if (error) throw error }
  }, [uid])

  const addFriendByCode = useCallback(async (code: string) => {
    const c = code.trim().toUpperCase()
    if (!/^GLOW-[A-Z0-9]{3,}$/.test(c)) return { ok: false, message: 'Entre un code au format GLOW-XXX.' }
    if (c === me?.code) return { ok: false, message: 'C’est ton propre code : partage-le à tes amies !' }
    const { data, error } = await supabase.rpc('find_by_code', { p_code: c })
    if (error) return { ok: false, message: 'Recherche impossible pour le moment. Réessaie.' }
    const found = (data as { id: string; pseudo: string }[] | null)?.[0]
    if (!found) return { ok: false, message: 'Aucune amie trouvée avec ce code. Vérifie l’orthographe.' }
    if (friendIds.includes(found.id)) return { ok: false, message: `${found.pseudo || 'Cette amie'} fait déjà partie de ton cercle.` }
    const { error: e2 } = await supabase.from('friends').insert({ user_id: uid, friend_id: found.id })
    if (e2) return { ok: false, message: 'Ajout impossible pour le moment. Réessaie.' }
    await load()
    return { ok: true, message: `${found.pseudo || 'Ton amie'} a rejoint ton cercle 🌸` }
  }, [uid, me?.code, friendIds, load])

  const removeFriend = useCallback(async (id: string) => {
    await supabase.from('friends').delete().or(`and(user_id.eq.${uid},friend_id.eq.${id}),and(user_id.eq.${id},friend_id.eq.${uid})`)
    await load()
  }, [uid, load])

  const publish = useCallback(async (post: Omit<Post, 'id' | 'createdAt'>) => {
    const p: Post = { ...post, id: `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`, createdAt: new Date().toISOString() }
    const now = new Date().toISOString()
    // On garde les publications récentes et les stories encore actives.
    const kept = mine.feed.filter((x) => x.type !== 'story' || (x.story?.expiresAt ?? '') > now)
    await writeRow('feed', [p, ...kept].slice(0, MAX_POSTS))
  }, [mine.feed, writeRow])

  const deletePost = useCallback(async (id: string) => { await writeRow('feed', mine.feed.filter((p) => p.id !== id)) }, [mine.feed, writeRow])

  const react = useCallback(async (item: FeedItem, reaction: Reaction) => {
    const existing = mine.reacts.find((r) => r.owner === item.author.id && r.postId === item.id && r.reaction === reaction)
    const others = mine.reacts.filter((r) => !(r.owner === item.author.id && r.postId === item.id && r.reaction === reaction))
    await writeRow('reacts', existing ? others : [{ owner: item.author.id, postId: item.id, reaction, at: new Date().toISOString() }, ...others].slice(0, 500))
  }, [mine.reacts, writeRow])

  const comment = useCallback(async (item: FeedItem, text: string) => {
    if (!text.trim()) return
    await writeRow('reacts', [{ owner: item.author.id, postId: item.id, comment: text.trim().slice(0, 280), at: new Date().toISOString() }, ...mine.reacts].slice(0, 500))
  }, [mine.reacts, writeRow])

  const sendWizz = useCallback(async (to: Member, kind: 'wizz' | 'mot', text: string) => {
    try { navigator.vibrate?.([80, 40, 120]) } catch { /* non pris en charge */ }
    await writeRow('wizz', [{ to: to.id, kind, text: text.trim().slice(0, 200), at: new Date().toISOString() }, ...mine.wizz].slice(0, 100))
  }, [mine.wizz, writeRow])

  const shareWorkout = useCallback(async (w: Workout, text?: string) => {
    const hide = me?.hideLoads
    await publish({
      type: 'workout', text,
      workout: {
        name: w.name, durationMinutes: w.durationMinutes,
        exercises: w.exercises.slice(0, 6).map((e) => ({
          name: e.exerciseName, sets: e.sets.filter((s) => s.completed).length || e.sets.length,
          reps: String(e.sets[0]?.actualReps ?? e.sets[0]?.targetReps ?? ''),
          topWeight: hide ? undefined : Math.max(0, ...e.sets.map((s) => s.actualWeight ?? s.targetWeight ?? 0)) || undefined,
        })),
      },
    })
  }, [me?.hideLoads, publish])

  const setGroupTarget = useCallback((n: number) => { const v = Math.max(3, Math.min(60, Math.round(n))); setTarget(v); patchState({ clubGroupTarget: v }) }, [])

  const encouragementsSince = useCallback((memberId: string, since: string) => {
    const r = rows[memberId]
    if (!r) return 0
    return r.reacts.filter((x) => x.at >= since).length + r.wizz.filter((x) => x.at >= since).length
  }, [rows])

  const value: ClubState = {
    loading, me, friends, feed, stories, wizzReceived, refresh: load, updateMe, addFriendByCode, removeFriend,
    publish, deletePost, react, comment, sendWizz, shareWorkout, groupTarget, setGroupTarget, encouragementsSince,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useClub() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useClub doit être utilisé dans <ClubProvider>')
  return ctx
}

/** Séances d'une amie (ou de moi) entre deux dates incluses, d'après ses données publiques. */
export const sessionsBetween = (m: Member, from: string, to: string) => (m.publicData.sessionDates ?? []).filter((d) => d >= from && d <= to).length

/** Lundi de la semaine en cours (AAAA-MM-JJ). */
export function weekStart(d = new Date()) {
  const x = new Date(d); x.setDate(x.getDate() + (x.getDay() === 0 ? -6 : 1 - x.getDay())); return localISO(x)
}
