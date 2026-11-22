/** Supprime récursivement les valeurs `undefined` (refusées par Firestore). */
export function clean<T>(value: T): T {
  if (Array.isArray(value)) return value.map(clean) as T
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) if (v !== undefined) out[k] = clean(v)
    return out as T
  }
  return value
}

/** Date locale au format AAAA-MM-JJ (l'original utilisait l'UTC, décalé autour de minuit). */
export const localISO = (d: Date = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const todayISO = () => localISO()

/** Retire les emojis en tête d'un libellé. */
export const stripLeadingEmoji = (s?: string) => (s ? s.replace(/^[\p{Extended_Pictographic}️‍\s]+/gu, '').trim() : s)

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* quota / navigation privée */ }
}

export const encodeBase64 = (obj: unknown) => btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
export const decodeBase64 = <T,>(s: string): T => JSON.parse(decodeURIComponent(escape(atob(s.trim())))) as T

export const DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]
