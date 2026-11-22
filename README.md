# Glow Up Lab

Reconstruction de l'app Glow Up Lab (née sur Google AI Studio) : planning, séances guidées, suivi des charges, programmes et club social.

## Stack
- Vite + React 19 + TypeScript, Tailwind CSS v4, React Router
- Firebase Auth (e-mail/mot de passe, Google) + Firestore — **même projet et mêmes documents que l'app d'origine** : les comptes et données existants sont relus tels quels
- PWA installable (vite-plugin-pwa), déploiement Vercel (`vercel.json` gère le routage)

## Démarrer
```bash
npm install
cp .env.example .env   # config Firebase (projet existant)
npm run dev
```

## Organisation
| Dossier | Contenu |
| --- | --- |
| `src/data/` | Catalogue d'origine : 119 exercices, 21 séances, 6 programmes, finishers, circuits, guides |
| `src/store/WorkoutStore.tsx` | Données d'entraînement (cache localStorage + Firestore `users/{uid}/…`) |
| `src/store/SocialStore.tsx` | Club social (état dans `users/{uid}/profile/social_state_v2`) |
| `src/features/auth`, `profile` | Compte : inscription, connexion, Google, mot de passe, suppression |
| `src/features/*` | Écrans : exercices, séances, séance en cours, planning, programmes, suivi, social |
| `src/components/` | Coquille (navigation), icônes, logo, composants communs |

Les écrans marqués `// @ts-nocheck` ont été portés automatiquement depuis le code compilé de l'app d'origine (rendu identique, mêmes classes Tailwind). Ils seront typés au fil des évolutions.

## Différences avec l'app d'origine
- Navigation par URL (bouton retour, liens directs : `/exercices`, `/seances`, `/suivi`…)
- Dates en heure locale (l'original utilisait l'UTC, décalé autour de minuit)
- Sauvegarde non bloquante : l'interface n'attend plus le réseau (mode hors ligne réellement utilisable)
- Chargement des données Firestore en parallèle, écrans chargés à la demande, images en WebP
- « Ajouter à ma séance » ajoute vraiment l'exercice ; fenêtres fermables avec Échap
- En-tête de séance lisible sur mobile ; changement de mot de passe dans le profil

## Limite connue
Le club social de l'app d'origine est **simulé** : les amies et leurs séances sont générées localement, sans échange réel entre comptes. Il est reproduit à l'identique en attendant une vraie fonctionnalité multi-utilisateurs.
