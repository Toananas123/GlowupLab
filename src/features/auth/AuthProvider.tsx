import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { auth } from '../../lib/firebase'
import { ensureProfile, updateProfileDoc } from '../profile/profileService'
import type { UserProfile } from '../profile/types'

interface AuthState {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  saveProfile: (patch: Partial<UserProfile>) => Promise<void>
  refreshProfile: () => Promise<void>
  /** Alias utilisé par les écrans portés de l'app d'origine. */
  updateUserProfile: (patch: Partial<UserProfile>) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (u: User) => {
    try {
      setProfile(await ensureProfile(u.uid, u.displayName ?? '', u.email ?? ''))
    } catch (err) {
      console.error('Profil indisponible', err)
      setProfile(null)
    }
  }, [])

  useEffect(
    () =>
      onAuthStateChanged(auth, async (u) => {
        // Le profil est chargé avant d'exposer l'utilisatrice, pour éviter un rendu sans prénom.
        if (u) await loadProfile(u)
        else setProfile(null)
        setUser(u)
        setLoading(false)
      }),
    [loadProfile],
  )

  const saveProfile = useCallback(
    async (patch: Partial<UserProfile>) => {
      if (!user) return
      await updateProfileDoc(user.uid, patch)
      setProfile((p) => (p ? { ...p, ...patch } : p))
    },
    [user],
  )

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user)
  }, [user, loadProfile])

  return (
    <AuthContext.Provider value={{ user, profile, loading, saveProfile, refreshProfile, updateUserProfile: saveProfile, logout: () => signOut(auth) }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>')
  return ctx
}
