# Glow Up Lab 🌸

Application web de suivi de musculation et de cardio, pensée pour le mobile, dans un univers rose et prune.
Séances guidées et charges proposées, programmes qui progressent, cardio avec minuteur, suivi du cycle (privé),
progression (records, objectifs, mensurations, bilans) et un Club pour s'entraîner entre amies.

## Stack
- Vite + React 19 + TypeScript, Tailwind CSS v4, React Router — PWA installable (iPhone, Android)
- **Supabase** : Auth (e-mail + mot de passe, confirmation par e-mail), Postgres avec Row Level Security, temps réel
- Hébergement **Vercel** (le dépôt est relié : chaque push sur `main` est déployé)
- Polices Inter, Newsreader, Space Mono ; couleurs `--bg #FCF9FC`, `--card #F4E9F0`, `--plum #781539`, `--pink #EA3E8E`, `--ink #1F0C17`

## Mise en place de Supabase
1. Dans le projet Supabase, ouvrir **SQL Editor** et exécuter `supabase/glow-up-lab-supabase.sql`
   (tables `user_data`, `profiles`, `friends`, `social`, fonctions `find_by_code` et `delete_my_account`, RLS, temps réel).
   Le script peut être relancé sans risque.
2. **Authentication → URL Configuration** : *Site URL* = l'adresse du site (ex. `https://glowuplab-eight.vercel.app`),
   et ajouter cette même adresse dans *Redirect URLs* (liens de confirmation et de mot de passe oublié).
3. Variables d'environnement (Vercel → Settings → Environment Variables, et `.env` en local) :
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_ANON_KEY=...   # clé publique uniquement
   ```
   Ne jamais commiter ni utiliser la clé `service_role` / secret key côté site.

## Démarrer en local
```bash
npm install
cp .env.example .env   # renseigner SUPABASE_URL et SUPABASE_ANON_KEY
npm run dev
```
Mode démo sans serveur (utilisatrice fictive, données dans le navigateur) : `VITE_DEMO=1 npm run dev`.

## Organisation
| Dossier | Contenu |
| --- | --- |
| `supabase/` | Script de création de la base |
| `src/lib/cloud.ts` | Synchronisation de `user_data` (state + journal) : cache local, envois groupés, temps réel |
| `src/store/WorkoutStore.tsx` | Séances, routines, planning, programmes, mensurations |
| `src/store/ClubStore.tsx` | Club : amies, fil, stories, wizz, défis |
| `src/features/cycle` | Suivi du cycle (privé) et ajustement des charges |
| `src/features/cardio` | Séances cardio, minuteur guidé, « Mes circuits » |
| `src/features/programs` | Règles de progression, version au-dessus, rotation par blocs, import d'un programme écrit |
| `src/features/*`, `src/pages` | Écrans |
| `src/data/` | Catalogue : exercices, séances, programmes, circuits, guides |

Les écrans marqués `// @ts-nocheck` ont été repris de la première version de l'app ; ils seront typés au fil des évolutions.

## Confidentialité
- Mensurations, cycle, check-in et notes restent dans `user_data`, lisible uniquement par sa propriétaire, et ne sont jamais publiés au Club.
- Le Club n'est visible que des amies ajoutées ; l'option « masquer mes charges » retire les kilos des publications.
- La suppression du compte efface toutes les données (cascade).
