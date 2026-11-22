import { closeCloud, flush } from '../../lib/cloud'
import { supabase } from '../../lib/supabase'

const redirectTo = () => `${window.location.origin}/`

/** Inscription : Supabase envoie un e-mail de confirmation avant la première connexion. */
export async function signUp(pseudo: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { pseudo: pseudo.trim() }, emailRedirectTo: redirectTo() },
  })
  if (error) throw error
  // Sans session, la confirmation par e-mail est requise.
  return { needsConfirmation: !data.session }
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
  if (error) throw error
}

/** Renvoie l'e-mail de confirmation d'inscription. */
export async function resendConfirmation(email: string) {
  const { error } = await supabase.auth.resend({ type: 'signup', email: email.trim(), options: { emailRedirectTo: redirectTo() } })
  if (error) throw error
}

/** Envoie le lien « mot de passe oublié » ; le lien rouvre l'appli sur l'écran de nouveau mot de passe. */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirectTo() })
  if (error) throw error
}

export async function setNewPassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw error
}

export async function signOut() {
  await flush()
  closeCloud()
  await supabase.auth.signOut()
}

/** Vérifie le mot de passe actuel (avant une opération sensible). */
async function verifyPassword(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error('Invalid login credentials')
}

export async function changePassword(email: string, currentPassword: string, newPassword: string) {
  await verifyPassword(email, currentPassword)
  await setNewPassword(newPassword)
}

/** Supprime le compte et toutes les données (fonction SQL delete_my_account, suppression en cascade). */
export async function deleteAccount(email: string, password: string) {
  await verifyPassword(email, password)
  const { error } = await supabase.rpc('delete_my_account')
  if (error) throw error
  closeCloud()
  try {
    Object.keys(localStorage).filter((k) => k.startsWith('glowuplab_') || k.startsWith('glow_up_lab_')).forEach((k) => localStorage.removeItem(k))
  } catch { /* stockage indisponible */ }
  await supabase.auth.signOut()
}
