export type UnitSystem = 'metric' | 'imperial'

/** Stocké dans users/{uid}/profile/main (même chemin que l'app d'origine). */
export interface UserProfile {
  displayName: string
  email: string
  spotifyUrl: string
  unitSystem: UnitSystem
  /** Temps de repos par défaut entre deux séries, en secondes. */
  defaultRestTime: number
  createdAt?: unknown
  updatedAt?: unknown
}

export const REST_OPTIONS = [45, 60, 75, 90, 120] as const

export const defaultProfile = (displayName: string, email: string): UserProfile => ({
  displayName,
  email,
  spotifyUrl: '',
  unitSystem: 'metric',
  defaultRestTime: 75,
})
