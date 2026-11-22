import type { RealtimeChannel } from '@supabase/supabase-js'
import { demoMode, supabase } from './supabase'

/**
 * Synchronisation de la ligne `user_data` (state + journal) de l'utilisatrice connectée.
 *
 * - Un seul objet `state` partagé par tous les écrans : chacun y écrit ses clés via `patchState`.
 * - Les écritures sont regroupées (1,2 s) puis envoyées en une fois ; un cache local permet
 *   d'ouvrir l'appli instantanément et de continuer hors ligne.
 * - Les changements faits sur un autre appareil arrivent en temps réel (`onRemoteChange`).
 */

export type CloudState = Record<string, unknown>
export interface CloudData { state: CloudState; journal: unknown[]; updatedAt: string | null }

const SAVE_DELAY = 1200
const cacheKey = (uid: string) => `glowuplab_cloud_${uid}`

let uid: string | null = null
let data: CloudData = { state: {}, journal: [], updatedAt: null }
let dirty = { state: false, journal: false }
let timer: ReturnType<typeof setTimeout> | null = null
let channel: RealtimeChannel | null = null
let lastOwnWrite = 0
const listeners = new Set<(d: CloudData) => void>()
/** Notifiés à chaque changement, local ou distant (pour les petits modules comme le cycle). */
const stateWatchers = new Set<() => void>()
const notify = () => stateWatchers.forEach((w) => w())

function writeCache() {
  if (!uid) return
  try { localStorage.setItem(cacheKey(uid), JSON.stringify(data)) } catch { /* quota */ }
}

/** Ouvre la session de données : renvoie d'abord le cache, puis la version serveur. */
export async function openCloud(userId: string): Promise<CloudData> {
  if (uid !== userId) closeCloud()
  uid = userId
  try {
    const cached = localStorage.getItem(cacheKey(userId))
    if (cached) data = JSON.parse(cached)
  } catch { /* cache illisible */ }
  if (demoMode) { notify(); return data }

  const { data: row, error } = await supabase.from('user_data').select('state, journal, updated_at').eq('user_id', userId).maybeSingle()
  if (error) {
    console.warn('Hors ligne ou erreur Supabase : données en cache conservées', error)
  } else if (row) {
    // Si des modifications locales n'ont pas encore été envoyées, elles gardent la priorité.
    if (!dirty.state) data.state = (row.state as CloudState) ?? {}
    if (!dirty.journal) data.journal = (row.journal as unknown[]) ?? []
    data.updatedAt = row.updated_at
    writeCache()
    notify()
  } else {
    await supabase.from('user_data').insert({ user_id: userId })
  }

  channel = supabase
    .channel(`user_data:${userId}`)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_data', filter: `user_id=eq.${userId}` }, (payload) => {
      const row = payload.new as { state: CloudState; journal: unknown[]; updated_at: string }
      // Ignore l'écho de nos propres écritures et ce qui serait écrasé par une écriture en attente.
      if (Date.now() - lastOwnWrite < 3000 || dirty.state || dirty.journal) return
      data = { state: row.state ?? {}, journal: row.journal ?? [], updatedAt: row.updated_at }
      writeCache()
      listeners.forEach((l) => l(data))
      notify()
    })
    .subscribe()
  return data
}

export function closeCloud() {
  if (timer) { clearTimeout(timer); timer = null; void flush() }
  if (channel) { void supabase.removeChannel(channel); channel = null }
  uid = null
  data = { state: {}, journal: [], updatedAt: null }
  dirty = { state: false, journal: false }
}

export const getState = () => data.state
export const getJournal = () => data.journal

/** Fusionne des clés dans `state` et programme l'enregistrement. */
export function patchState(patch: CloudState) {
  data = { ...data, state: { ...data.state, ...patch } }
  dirty.state = true
  schedule()
  notify()
}

/** Remplace le journal des séances et programme l'enregistrement. */
export function setJournal(journal: unknown[]) {
  data = { ...data, journal }
  dirty.journal = true
  schedule()
}

function schedule() {
  writeCache()
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { timer = null; void flush() }, SAVE_DELAY)
}

/** Envoie immédiatement les modifications en attente. */
export async function flush() {
  if (!uid || (!dirty.state && !dirty.journal)) return
  if (demoMode) { dirty = { state: false, journal: false }; return }
  const payload: Record<string, unknown> = { user_id: uid }
  if (dirty.state) payload.state = data.state
  if (dirty.journal) payload.journal = data.journal
  const sent = { ...dirty }
  dirty = { state: false, journal: false }
  lastOwnWrite = Date.now()
  const { error } = await supabase.from('user_data').upsert(payload)
  if (error) {
    console.warn('Synchronisation impossible, nouvel essai plus tard', error)
    dirty = { state: dirty.state || sent.state, journal: dirty.journal || sent.journal }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { timer = null; void flush() }, 15000)
  }
}

export function watchState(watcher: () => void) {
  stateWatchers.add(watcher)
  return () => { stateWatchers.delete(watcher) }
}

export function onRemoteChange(listener: (d: CloudData) => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

// Dernier envoi quand l'appli passe en arrière-plan ou que la connexion revient.
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') void flush() })
  window.addEventListener('online', () => void flush())
}
