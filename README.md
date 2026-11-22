# Glow Up Lab

Reconstruction de l'app Glow Up Lab (planning, séances, suivi des charges, social).

## Stack
- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Firebase Auth (e-mail/mot de passe, Google) + Firestore
- Déploiement Vercel (`vercel.json` gère le routage SPA)

## Démarrer
```bash
npm install
cp .env.example .env   # renseigner la config Firebase
npm run dev
```

## Gestion de compte (`src/features/auth`, `src/features/profile`)
- Inscription (prénom, e-mail, mot de passe ≥ 6 caractères), connexion, Google, mot de passe oublié
- Profil `users/{uid}/profile/main` : `displayName`, `spotifyUrl`, `unitSystem`, `defaultRestTime` (mêmes champs que l'app d'origine)
- Changement de mot de passe et suppression du compte avec ré-authentification, purge des données Firestore
- Messages d'erreur Firebase traduits en français
- `firestore.rules` : chaque utilisatrice n'accède qu'à `users/{son uid}/**`
