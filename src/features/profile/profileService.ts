import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { defaultProfile, type UserProfile } from './types'

const profileRef = (uid: string) => doc(db, 'users', uid, 'profile', 'main')

/** Sous-collections de users/{uid} à purger lors d'une suppression de compte. */
export const USER_SUBCOLLECTIONS = [
  'profile', 'exercises', 'favorites', 'measurements', 'programs', 'routines', 'weekly_plans', 'workouts',
] as const

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(profileRef(uid))
  return snap.exists() ? (snap.data() as UserProfile) : null
}

/** Crée le profil s'il n'existe pas encore (inscription e-mail ou première connexion Google). */
export async function ensureProfile(uid: string, displayName: string, email: string): Promise<UserProfile> {
  const existing = await getProfile(uid)
  if (existing) return { ...defaultProfile(displayName, email), ...existing }
  const profile = defaultProfile(displayName, email)
  await setDoc(profileRef(uid), { ...profile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  return profile
}

export async function updateProfileDoc(uid: string, patch: Partial<UserProfile>) {
  await setDoc(profileRef(uid), { ...patch, updatedAt: serverTimestamp() }, { merge: true })
}

/** Supprime toutes les données Firestore de l'utilisatrice (sous-collections connues puis document racine). */
export async function deleteUserData(uid: string) {
  for (const name of USER_SUBCOLLECTIONS) {
    const snap = await getDocs(collection(db, 'users', uid, name))
    for (let i = 0; i < snap.docs.length; i += 450) {
      const batch = writeBatch(db)
      snap.docs.slice(i, i + 450).forEach((d) => batch.delete(d.ref))
      await batch.commit()
    }
  }
  await deleteDoc(doc(db, 'users', uid))
}
