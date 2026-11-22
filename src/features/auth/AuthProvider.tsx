import type { Session } from '@supabase/supabase-js'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { closeCloud, getState, onRemoteChange, openCloud, patchState } from '../../lib/cloud'
import { demoMode, supabase } from '../../lib/supabase'
import { DEFAULT_PREFS, type UserPrefs, type UserProfile } from '../profile/types'

/** Utilisatrice connectée (forme compatible avec les écrans existants : uid, email, displayName). */
export interface AppUser {
  id: string
  uid: string
  email: string
  displayName: string
}

interface AuthState {
  user: AppUser | null
  profile: UserProfile | null
  loading: boolean
  /** Le lien « mot de passe oublié » a été ouvert : il faut choisir un nouveau mot de passe. */
  recovering: boolean
  finishRecovery: () => void
  saveProfile: (patch: Partial<UserProfile>) => Promise<void>
  refreshProfile: () => Promise<void>
  /** Alias utilisés par les écrans portés de l'app d'origine. */
  updateUserProfile: (patch: Partial<UserProfile>) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [recovering, setRecovering] = useState(false)

  const loadProfile = useCallback(async (s: Session) => {
    const uid = s.user.id
    await openCloud(uid)
    const { data: row } = await supabase.from('profiles').select('pseudo, code').eq('id', uid).maybeSingle()
    const prefs = { ...DEFAULT_PREFS, ...((getState().prefs as Partial<UserPrefs>) ?? {}) }
    setProfile({
      displayName: row?.pseudo || (s.user.user_metadata?.pseudo as string) || '',
      email: s.user.email ?? '',
      friendCode: row?.code,
      ...prefs,
    })
  }, [])

  useEffect(() => {
    let current: string | null = null
    const apply = async (s: Session | null) => {
      const id = s?.user.id ?? null
      if (id && id !== current) {
        current = id
        try { await loadProfile(s!) } catch (e) { console.warn('Profil indisponible', e) }
      } else if (!id && current) {
        current = null
        closeCloud()
        setProfile(null)
      }
      setSession(s)
      setLoading(false)
    }
    if (demoMode) {
      // Session fictive pour développer sans serveur.
      const demo = { user: { id: '00000000-0000-4000-8000-000000000000', email: 'demo@glowuplab.local', user_metadata: { pseudo: 'Chloé' } } } as unknown as Session
      void openCloud(demo.user.id).then(() => {
        setProfile({ displayName: 'Chloé', email: demo.user.email!, friendCode: 'GLOW-D3M', ...DEFAULT_PREFS, ...((getState().prefs as Partial<UserPrefs>) ?? {}) })
        setSession(demo)
        setLoading(false)
      })
      return
    }
    supabase.auth.getSession().then(({ data }) => apply(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === 'PASSWORD_RECOVERY') setRecovering(true)
      // Laisse Supabase finir son traitement avant d'appeler la base (recommandation de la doc).
      setTimeout(() => void apply(s), 0)
    })
    return () => sub.subscription.unsubscribe()
  }, [loadProfile])

  // Préférences modifiées depuis un autre appareil.
  useEffect(() => onRemoteChange((d) => {
    const prefs = d.state.prefs as Partial<UserPrefs> | undefined
    if (prefs) setProfile((p) => (p ? { ...p, ...prefs } : p))
  }), [])

  const saveProfile = useCallback(async (patch: Partial<UserProfile>) => {
    if (!session) return
    const { displayName, spotifyUrl, unitSystem, defaultRestTime } = patch
    const prefsPatch = Object.fromEntries(Object.entries({ spotifyUrl, unitSystem, defaultRestTime }).filter(([, v]) => v !== undefined))
    if (Object.keys(prefsPatch).length) patchState({ prefs: { ...DEFAULT_PREFS, ...((getState().prefs as object) ?? {}), ...prefsPatch } })
    if (displayName !== undefined && !demoMode) {
      const { error } = await supabase.from('profiles').update({ pseudo: displayName.trim() }).eq('id', session.user.id)
      if (error) throw error
    }
    setProfile((p) => (p ? { ...p, ...patch } : p))
  }, [session])

  const refreshProfile = useCallback(async () => { if (session) await loadProfile(session) }, [session, loadProfile])

  const user = useMemo<AppUser | null>(() => session ? {
    id: session.user.id,
    uid: session.user.id,
    email: session.user.email ?? '',
    displayName: profile?.displayName ?? '',
  } : null, [session, profile?.displayName])

  const value: AuthState = {
    user, profile, loading, recovering,
    finishRecovery: () => setRecovering(false),
    saveProfile, refreshProfile,
    updateUserProfile: saveProfile,
    logout: async () => { const { signOut } = await import('./authService'); await signOut() },
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>')
  return ctx
}
