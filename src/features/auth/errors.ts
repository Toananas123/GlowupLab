import { FirebaseError } from 'firebase/app'

const MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Adresse e-mail invalide.',
  'auth/missing-email': 'Indique ton adresse e-mail.',
  'auth/missing-password': 'Indique ton mot de passe.',
  'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
  'auth/wrong-password': 'E-mail ou mot de passe incorrect.',
  'auth/user-not-found': 'E-mail ou mot de passe incorrect.',
  'auth/user-disabled': 'Ce compte a été désactivé.',
  'auth/email-already-in-use': 'Un compte existe déjà avec cette adresse e-mail.',
  'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères.',
  'auth/too-many-requests': 'Trop de tentatives. Réessaie dans quelques minutes.',
  'auth/network-request-failed': 'Connexion impossible. Vérifie ton réseau.',
  'auth/popup-closed-by-user': 'Connexion Google annulée.',
  'auth/cancelled-popup-request': 'Connexion Google annulée.',
  'auth/popup-blocked': 'La fenêtre Google a été bloquée par le navigateur.',
  'auth/requires-recent-login': 'Par sécurité, confirme ton identité pour continuer.',
  'auth/operation-not-allowed': "Ce mode de connexion n'est pas activé.",
  'auth/invalid-api-key': "Firebase n'est pas configuré (clé API manquante).",
}

export function authErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) return MESSAGES[err.code] ?? 'Une erreur est survenue. Réessaie.'
  return 'Une erreur est survenue. Réessaie.'
}

export const isCode = (err: unknown, code: string) => err instanceof FirebaseError && err.code === code
