export type UnitSystem = 'metric' | 'imperial'

/**
 * Profil de l'utilisatrice.
 * - displayName : table `profiles` (pseudo, visible des amies)
 * - le reste : préférences privées dans `user_data.state.prefs`
 */
export interface UserProfile {
  displayName: string
  email: string
  spotifyUrl: string
  unitSystem: UnitSystem
  /** Temps de repos par défaut entre deux séries, en secondes. */
  defaultRestTime: number
  /** Code d'invitation au Club (GLOW-XXX). */
  friendCode?: string
}

export type UserPrefs = Pick<UserProfile, 'spotifyUrl' | 'unitSystem' | 'defaultRestTime'>

export const REST_OPTIONS = [45, 60, 75, 90, 120] as const

export const DEFAULT_PREFS: UserPrefs = { spotifyUrl: '', unitSystem: 'metric', defaultRestTime: 90 }
