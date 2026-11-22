import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  updatePassword,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { deleteUserData, ensureProfile, updateProfileDoc } from '../profile/profileService'

const google = new GoogleAuthProvider()
google.setCustomParameters({ prompt: 'select_account' })

export async function signUp(displayName: string, email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password)
  await updateProfile(user, { displayName: displayName.trim() })
  await ensureProfile(user.uid, displayName.trim(), user.email ?? email.trim())
  return user
}

export async function signIn(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email.trim(), password)
  return user
}

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(auth, google)
  await ensureProfile(user.uid, user.displayName ?? '', user.email ?? '')
  return user
}

export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email.trim())

export const signOut = () => fbSignOut(auth)

export const usesPassword = (user: User) => user.providerData.some((p) => p.providerId === 'password')

/** Ré-authentification exigée par Firebase avant les opérations sensibles. */
export async function reauthenticate(user: User, password?: string) {
  if (usesPassword(user)) {
    if (!password || !user.email) throw new Error('password-required')
    await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password))
  } else {
    await reauthenticateWithPopup(user, google)
  }
}

export async function changePassword(user: User, currentPassword: string, newPassword: string) {
  await reauthenticate(user, currentPassword)
  await updatePassword(user, newPassword)
}

export async function changeDisplayName(user: User, displayName: string) {
  await updateProfile(user, { displayName })
  await updateProfileDoc(user.uid, { displayName })
}

/** Supprime les données puis le compte Auth. Ré-authentifie d'abord (Firebase l'exige). */
export async function deleteAccount(user: User, password?: string) {
  await reauthenticate(user, password)
  await deleteUserData(user.uid)
  await deleteUser(user)
}
