const MESSAGES: [RegExp, string][] = [
  [/invalid login credentials/i, 'Adresse e-mail ou mot de passe incorrect.'],
  [/email not confirmed/i, 'Confirme ton adresse e-mail : clique sur le lien reçu par e-mail, puis reconnecte-toi.'],
  [/user already registered|already been registered/i, 'Cette adresse e-mail possède déjà un compte. Connecte-toi directement.'],
  [/password should be at least|weak password/i, 'Le mot de passe doit comporter au moins 6 caractères.'],
  [/unable to validate email|invalid email|email address .* is invalid/i, 'Adresse e-mail invalide.'],
  [/rate limit|too many/i, 'Trop de tentatives. Réessaie dans quelques minutes.'],
  [/failed to fetch|network/i, 'Connexion impossible. Vérifie ton réseau.'],
  [/same as the old|different from the old/i, 'Le nouveau mot de passe doit être différent de l’ancien.'],
  [/session.*missing|not authenticated|jwt/i, 'Ta session a expiré. Reconnecte-toi.'],
]

export function authErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : typeof err === 'object' && err && 'message' in err ? String((err as { message: unknown }).message) : String(err)
  return MESSAGES.find(([re]) => re.test(msg))?.[1] ?? 'Une erreur est survenue. Réessaie.'
}
