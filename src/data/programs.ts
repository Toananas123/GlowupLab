// Données reprises de l'app d'origine.
import type { ObjectiveMeta, Program } from '../types'
export const PROGRAMS: Program[] = [
  {
    "id": "prog-booty-builder-8w",
    "title": "Booty Builder 8 Semaines",
    "subtitle": "Hypertrophie fessiers 3D, galbe supérieur & chaîne postérieure",
    "objective": "hypertrophy",
    "objectiveLabel": "Prise de masse / Hypertrophie",
    "durationWeeks": 8,
    "sessionsPerWeek": 4,
    "level": "Intermédiaire",
    "coverImage": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    "equipment": [
      "Barre & Poids",
      "Haltères",
      "Machines",
      "Sangle chevillère",
      "Bandes de résistance"
    ],
    "description": "Le programme signature GlowUpLab en 8 semaines pour construire un galbe fessier rebondi sous tous les angles (grand, moyen et petit fessier) tout en dessinant un dos en V qui affine visuellement la taille.",
    "coachTips": [
      "Appliquez la surcharge progressive chaque semaine : +2 kg sur le Hip Thrust et la Presse dès que vous validez toutes vos répétitions.",
      "Activez vos moyens fessiers avec une bande de résistance pendant 3 minutes avant chaque séance Bas du corps."
    ],
    "weeks": [
      {
        "weekNumber": 1,
        "title": "Semaine 1 — Connexion Neuromusculaire & Tempo",
        "focusNote": "Maîtrisez la pause de 2s en haut du Hip Thrust et du Kickback.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Booty Sculpt & Tension Mécanique",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w1-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Dos V-Shape & Posture Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w1-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos & Mobilité des Hanches",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Chaîne Postérieure (Fessiers & Ischios)",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w1-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Épaules Galbées & Abdos Vacuum",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Bras Toniques",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w1-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos Actif (8 000 pas)",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos Complet & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d7"
          }
        ]
      },
      {
        "weekNumber": 2,
        "title": "Semaine 2 — Augmentation du Volume (+1-2 reps)",
        "focusNote": "Visez le haut de la fourchette de répétitions avec la même charge.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Booty Sculpt & Tension Mécanique",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w2-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Dos V-Shape & Posture Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w2-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos & Mobilité des Hanches",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Chaîne Postérieure (Fessiers & Ischios)",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w2-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Épaules Galbées & Abdos Vacuum",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Bras Toniques",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w2-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos Actif (8 000 pas)",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos Complet & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d7"
          }
        ]
      },
      {
        "weekNumber": 3,
        "title": "Semaine 3 — Première Surcharge (+2 kg)",
        "focusNote": "Ajoutez +2 kg sur vos mouvements polyarticulaires (Hip Thrust, RDL).",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Booty Sculpt & Tension Mécanique",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w3-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Dos V-Shape & Posture Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w3-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos & Mobilité des Hanches",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Chaîne Postérieure (Fessiers & Ischios)",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w3-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Épaules Galbées & Abdos Vacuum",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Bras Toniques",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w3-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos Actif (8 000 pas)",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos Complet & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d7"
          }
        ]
      },
      {
        "weekNumber": 4,
        "title": "Semaine 4 — Semaine de Consolidation",
        "focusNote": "Stabilisez vos nouvelles charges avec une exécution chirurgicale.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Booty Sculpt & Tension Mécanique",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w4-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Dos V-Shape & Posture Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w4-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos & Mobilité des Hanches",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Chaîne Postérieure (Fessiers & Ischios)",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w4-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Épaules Galbées & Abdos Vacuum",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Bras Toniques",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w4-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos Actif (8 000 pas)",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos Complet & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d7"
          }
        ]
      },
      {
        "weekNumber": 5,
        "title": "Semaine 5 — Cycle Intensité & Contraction Pic",
        "focusNote": "Intégrez systématiquement les Finishers Pump en fin de séance.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Booty Sculpt & Tension Mécanique",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w5-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Dos V-Shape & Posture Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w5-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos & Mobilité des Hanches",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Chaîne Postérieure (Fessiers & Ischios)",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w5-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Épaules Galbées & Abdos Vacuum",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Bras Toniques",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w5-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos Actif (8 000 pas)",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos Complet & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d7"
          }
        ]
      },
      {
        "weekNumber": 6,
        "title": "Semaine 6 — Surcharge Progressive Palier 2",
        "focusNote": "Nouveau palier de charge (+2 kg recommandés sur vos records).",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Booty Sculpt & Tension Mécanique",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w6-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Dos V-Shape & Posture Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w6-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos & Mobilité des Hanches",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Chaîne Postérieure (Fessiers & Ischios)",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w6-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Épaules Galbées & Abdos Vacuum",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Bras Toniques",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w6-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos Actif (8 000 pas)",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos Complet & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d7"
          }
        ]
      },
      {
        "weekNumber": 7,
        "title": "Semaine 7 — Semaine Peak Volume",
        "focusNote": "Semaine la plus dense du programme avant le bilan final.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Booty Sculpt & Tension Mécanique",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w7-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Dos V-Shape & Posture Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w7-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos & Mobilité des Hanches",
            "isRest": true,
            "activityType": "Repos",
            "id": "w7-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Chaîne Postérieure (Fessiers & Ischios)",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w7-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Épaules Galbées & Abdos Vacuum",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Bras Toniques",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w7-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos Actif (8 000 pas)",
            "isRest": true,
            "activityType": "Repos",
            "id": "w7-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos Complet & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w7-d7"
          }
        ]
      },
      {
        "weekNumber": 8,
        "title": "Semaine 8 — Semaine de Records & Bilan GlowUp",
        "focusNote": "Testez vos nouveaux records personnels et célébrez votre transformation !",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Booty Sculpt & Tension Mécanique",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w8-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Dos V-Shape & Posture Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w8-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos & Mobilité des Hanches",
            "isRest": true,
            "activityType": "Repos",
            "id": "w8-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Chaîne Postérieure (Fessiers & Ischios)",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 55,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w8-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Épaules Galbées & Abdos Vacuum",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Bras Toniques",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w8-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos Actif (8 000 pas)",
            "isRest": true,
            "activityType": "Repos",
            "id": "w8-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos Complet & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w8-d7"
          }
        ]
      }
    ]
  },
  {
    "id": "prog-fullbody-vshape-6w",
    "title": "Full Body V-Shape 6 Semaines",
    "subtitle": "Silhouette sablier en 3 séances complètes par semaine",
    "objective": "hypertrophy",
    "objectiveLabel": "Prise de masse / Hypertrophie",
    "durationWeeks": 6,
    "sessionsPerWeek": 3,
    "level": "Débutant",
    "coverImage": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
    "equipment": [
      "Haltères",
      "Machines",
      "Barre & Poids",
      "Poids du corps"
    ],
    "description": "Idéal pour progresser avec un emploi du temps chargé : 3 séances ultra-efficaces par semaine combinant bas du corps galbé, dos dessiné et taille affinée.",
    "coachTips": [
      "Laissez toujours au moins 1 jour de repos entre deux séances Full Body pour optimiser la surcompensation musculaire.",
      "Concentrez-vous sur la qualité de chaque répétition avant d’augmenter la charge."
    ],
    "weeks": [
      {
        "weekNumber": 1,
        "title": "Semaine 1 — Apprentissage Moteur",
        "focusNote": "Trouvez vos charges de référence sur chaque machine.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Glow (Dominante Fessiers & Dos)",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w1-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Quads, Fessiers & Posture Haut du Corps",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-glutes",
            "workoutTitle": "Bas du Corps Complet (Quads, Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w1-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Booty & Silhouette V-Shape",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w1-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d7"
          }
        ]
      },
      {
        "weekNumber": 2,
        "title": "Semaine 2 — Régularité & Contrôle",
        "focusNote": "Ajoutez +1 à 2 répétitions sur chaque série.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Glow (Dominante Fessiers & Dos)",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w2-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Quads, Fessiers & Posture Haut du Corps",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-glutes",
            "workoutTitle": "Bas du Corps Complet (Quads, Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w2-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Booty & Silhouette V-Shape",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w2-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d7"
          }
        ]
      },
      {
        "weekNumber": 3,
        "title": "Semaine 3 — Surcharge Progressive (+2 kg)",
        "focusNote": "Augmentez légèrement la charge sur le premier exercice de chaque séance.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Glow (Dominante Fessiers & Dos)",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w3-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Quads, Fessiers & Posture Haut du Corps",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-glutes",
            "workoutTitle": "Bas du Corps Complet (Quads, Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w3-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Booty & Silhouette V-Shape",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w3-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d7"
          }
        ]
      },
      {
        "weekNumber": 4,
        "title": "Semaine 4 — Densité & Gainage",
        "focusNote": "Réduisez vos temps de repos de 10 secondes.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Glow (Dominante Fessiers & Dos)",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w4-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Quads, Fessiers & Posture Haut du Corps",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-glutes",
            "workoutTitle": "Bas du Corps Complet (Quads, Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w4-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Booty & Silhouette V-Shape",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w4-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d7"
          }
        ]
      },
      {
        "weekNumber": 5,
        "title": "Semaine 5 — Intensification V-Shape",
        "focusNote": "Nouveau palier de charge sur le Hip Thrust et le Tirage vertical.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Glow (Dominante Fessiers & Dos)",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w5-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Quads, Fessiers & Posture Haut du Corps",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-glutes",
            "workoutTitle": "Bas du Corps Complet (Quads, Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w5-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Booty & Silhouette V-Shape",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w5-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d7"
          }
        ]
      },
      {
        "weekNumber": 6,
        "title": "Semaine 6 — Semaine Finale & Bilan",
        "focusNote": "Donnez tout sur vos dernières séances et consultez votre bilan !",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Glow (Dominante Fessiers & Dos)",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w6-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Récupération",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Quads, Fessiers & Posture Haut du Corps",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-glutes",
            "workoutTitle": "Bas du Corps Complet (Quads, Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w6-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Booty & Silhouette V-Shape",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-drop-set-mecanique",
            "id": "w6-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d7"
          }
        ]
      }
    ]
  },
  {
    "id": "prog-shred-and-sweat-6w",
    "title": "Shred & Sweat 6 Semaines",
    "subtitle": "Sèche métabolique, définition musculaire & cardio brûle-graisse",
    "objective": "shred",
    "objectiveLabel": "Perte de poids / Sèche",
    "durationWeeks": 6,
    "sessionsPerWeek": 4,
    "level": "Intermédiaire",
    "coverImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    "equipment": [
      "Haltères",
      "Machines",
      "Poids du corps",
      "Bandes de résistance"
    ],
    "description": "Un programme hybride combinant renforcement musculaire dense et Finishers cardio métaboliques (12-5-30, StairMaster, Pyramide Sprint) pour maximiser l’effet afterburn tout en préservant le galbe musculaire.",
    "coachTips": [
      "Ne négligez jamais le Finisher de 5 minutes en fin de séance : c’est lui qui déclenche le pic métabolique post-entraînement.",
      "Maintenez vos charges lourdes en musculation pour préserver votre masse musculaire sèche."
    ],
    "weeks": [
      {
        "weekNumber": 1,
        "title": "Semaine 1 — Relance Métabolique",
        "focusNote": "Respectez scrupuleusement les temps de repos courts (60s).",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Lower Body Burn & 12-5-30 Express",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-adductors",
            "workoutTitle": "Quads Sculpt & Adducteurs Fermes",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w1-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Upper Body Sculpt & Tabata Core",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w1-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Booty Métabolique & StairMaster",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-stairmaster-burn-5m",
            "id": "w1-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Circuit Cardio HIIT & Abdos Sablier",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w1-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d7"
          }
        ]
      },
      {
        "weekNumber": 2,
        "title": "Semaine 2 — Intensification Cardio",
        "focusNote": "Validez tous vos Finishers cardio sans poser les mains sur les poignées.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Lower Body Burn & 12-5-30 Express",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-adductors",
            "workoutTitle": "Quads Sculpt & Adducteurs Fermes",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w2-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Upper Body Sculpt & Tabata Core",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w2-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Booty Métabolique & StairMaster",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-stairmaster-burn-5m",
            "id": "w2-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Circuit Cardio HIIT & Abdos Sablier",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w2-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d7"
          }
        ]
      },
      {
        "weekNumber": 3,
        "title": "Semaine 3 — Surcharge + Densité",
        "focusNote": "+1 à 2 répétitions par série tout en gardant un rythme soutenu.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Lower Body Burn & 12-5-30 Express",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-adductors",
            "workoutTitle": "Quads Sculpt & Adducteurs Fermes",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w3-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Upper Body Sculpt & Tabata Core",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w3-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Booty Métabolique & StairMaster",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-stairmaster-burn-5m",
            "id": "w3-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Circuit Cardio HIIT & Abdos Sablier",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w3-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d7"
          }
        ]
      },
      {
        "weekNumber": 4,
        "title": "Semaine 4 — Semaine Haute Combustion",
        "focusNote": "Enchaînez les exercices avec fluidité et explosivité.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Lower Body Burn & 12-5-30 Express",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-adductors",
            "workoutTitle": "Quads Sculpt & Adducteurs Fermes",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w4-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Upper Body Sculpt & Tabata Core",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w4-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Booty Métabolique & StairMaster",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-stairmaster-burn-5m",
            "id": "w4-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Circuit Cardio HIIT & Abdos Sablier",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w4-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d7"
          }
        ]
      },
      {
        "weekNumber": 5,
        "title": "Semaine 5 — Pic de Définition",
        "focusNote": "Maintenez vos charges acquises et battez votre record au Finisher.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Lower Body Burn & 12-5-30 Express",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-adductors",
            "workoutTitle": "Quads Sculpt & Adducteurs Fermes",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w5-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Upper Body Sculpt & Tabata Core",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w5-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Booty Métabolique & StairMaster",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-stairmaster-burn-5m",
            "id": "w5-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Circuit Cardio HIIT & Abdos Sablier",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w5-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d7"
          }
        ]
      },
      {
        "weekNumber": 6,
        "title": "Semaine 6 — Sprint Final Shred & Sweat",
        "focusNote": "Dernière ligne droite avant votre bilan complet de sèche !",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Lower Body Burn & 12-5-30 Express",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-quads-adductors",
            "workoutTitle": "Quads Sculpt & Adducteurs Fermes",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w6-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Upper Body Sculpt & Tabata Core",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w6-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos Actif",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Booty Métabolique & StairMaster",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Hypertrophie (Fessiers)",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-stairmaster-burn-5m",
            "id": "w6-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Circuit Cardio HIIT & Abdos Sablier",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w6-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d7"
          }
        ]
      }
    ]
  },
  {
    "id": "prog-tonique-posture-4w",
    "title": "Tonique & Posture 4 Semaines",
    "subtitle": "Ventre plat, dos fortifié & énergie retrouvée en douceur",
    "objective": "toning",
    "objectiveLabel": "Remise en forme / Tonicité",
    "durationWeeks": 4,
    "sessionsPerWeek": 3,
    "level": "Débutant",
    "coverImage": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=80",
    "equipment": [
      "Poids du corps",
      "Bandes de résistance",
      "Haltères"
    ],
    "description": "Un cycle de 4 semaines pensé pour reprendre le sport avec plaisir, renforcer le transverse profond (Stomach Vacuum & Gainage), ouvrir la cage thoracique et tonifier l’ensemble du corps sans impact articulaire.",
    "coachTips": [
      "Pratiquez la respiration hypopressive en fin de séance pour engager le transverse profond.",
      "Privilégiez l’amplitude complète et la fluidité du mouvement."
    ],
    "weeks": [
      {
        "weekNumber": 1,
        "title": "Semaine 1 — Réveil Musculaire & Posture",
        "focusNote": "Concentrez-vous sur l’alignement du dos et la respiration.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Tonique & Gainage Doux",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w1-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Étirements",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Dos Altière, Épaules & Abdos Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w1-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Jambes Fuselées & Marche Inclinée",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w1-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d7"
          }
        ]
      },
      {
        "weekNumber": 2,
        "title": "Semaine 2 — Engagement du Centre (Core)",
        "focusNote": "Ajoutez +2 répétitions par série avec un contrôle parfait.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Tonique & Gainage Doux",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w2-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Étirements",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Dos Altière, Épaules & Abdos Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w2-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Jambes Fuselées & Marche Inclinée",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w2-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d7"
          }
        ]
      },
      {
        "weekNumber": 3,
        "title": "Semaine 3 — Progression des Charges (+1 à 2 kg)",
        "focusNote": "Augmentez légèrement vos haltères pour stimuler la tonicité.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Tonique & Gainage Doux",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w3-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Étirements",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Dos Altière, Épaules & Abdos Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w3-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Jambes Fuselées & Marche Inclinée",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w3-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d7"
          }
        ]
      },
      {
        "weekNumber": 4,
        "title": "Semaine 4 — Ancrage & Vitalité",
        "focusNote": "Savourez vos progrès d’endurance et de maintien postural !",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Full Body Tonique & Gainage Doux",
            "isRest": false,
            "activityType": "Musculation",
            "routineId": "routine-fullbody-glow",
            "workoutTitle": "Full Body Glow & Tonification Totale",
            "targetZone": "fullbody",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w4-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos & Étirements",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Dos Altière, Épaules & Abdos Sablier",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Posture)",
            "targetZone": "back",
            "durationMinutes": 40,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w4-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Jambes Fuselées & Marche Inclinée",
            "isRest": false,
            "activityType": "Séance Bas du corps",
            "routineId": "routine-posterior-chain",
            "workoutTitle": "Chaîne Postérieure (Fessiers & Ischios)",
            "targetZone": "lower-body",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-cardio-12-5-30-express",
            "id": "w4-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d7"
          }
        ]
      }
    ]
  },
  {
    "id": "prog-objectif-tractions-8w",
    "title": "Objectif Tractions & Force Athlétique",
    "subtitle": "Débloquez vos premières tractions strictes tout en sculptant le bas du corps",
    "objective": "performance",
    "objectiveLabel": "Performance / Spécifique",
    "durationWeeks": 8,
    "sessionsPerWeek": 3,
    "level": "Avancé",
    "coverImage": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80",
    "equipment": [
      "Bandes de résistance",
      "Machines",
      "Haltères",
      "Poids du corps"
    ],
    "description": "Programme spécifique de force relative : travail excentrique, tirages lourds, gainage Hollow Body et maintien du galbe bas du corps pour réussir vos tractions strictes.",
    "coachTips": [
      "Engagez toujours vos omoplates vers le bas (dépression scapulaire) avant de fléchir les coudes.",
      "Le gainage Hollow Body en Finisher est le secret d’un transfert de force optimal à la barre fixe."
    ],
    "weeks": [
      {
        "weekNumber": 1,
        "title": "Semaine 1 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Force Tirage Vertical & Scapula",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Force Tractions)",
            "targetZone": "back",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w1-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Puissance Bas du Corps & Explosivité",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Puissance Hanches",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w1-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Bras, Épaules & Gainage Strict",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Force Biceps/Dos",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w1-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d7"
          }
        ]
      },
      {
        "weekNumber": 2,
        "title": "Semaine 2 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Force Tirage Vertical & Scapula",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Force Tractions)",
            "targetZone": "back",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w2-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Puissance Bas du Corps & Explosivité",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Puissance Hanches",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w2-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Bras, Épaules & Gainage Strict",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Force Biceps/Dos",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w2-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d7"
          }
        ]
      },
      {
        "weekNumber": 3,
        "title": "Semaine 3 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Force Tirage Vertical & Scapula",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Force Tractions)",
            "targetZone": "back",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w3-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Puissance Bas du Corps & Explosivité",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Puissance Hanches",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w3-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Bras, Épaules & Gainage Strict",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Force Biceps/Dos",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w3-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d7"
          }
        ]
      },
      {
        "weekNumber": 4,
        "title": "Semaine 4 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Force Tirage Vertical & Scapula",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Force Tractions)",
            "targetZone": "back",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w4-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Puissance Bas du Corps & Explosivité",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Puissance Hanches",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w4-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Bras, Épaules & Gainage Strict",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Force Biceps/Dos",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w4-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d7"
          }
        ]
      },
      {
        "weekNumber": 5,
        "title": "Semaine 5 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Force Tirage Vertical & Scapula",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Force Tractions)",
            "targetZone": "back",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w5-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Puissance Bas du Corps & Explosivité",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Puissance Hanches",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w5-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Bras, Épaules & Gainage Strict",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Force Biceps/Dos",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w5-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w5-d7"
          }
        ]
      },
      {
        "weekNumber": 6,
        "title": "Semaine 6 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Force Tirage Vertical & Scapula",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Force Tractions)",
            "targetZone": "back",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w6-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Puissance Bas du Corps & Explosivité",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Puissance Hanches",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w6-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Bras, Épaules & Gainage Strict",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Force Biceps/Dos",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w6-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w6-d7"
          }
        ]
      },
      {
        "weekNumber": 7,
        "title": "Semaine 7 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Force Tirage Vertical & Scapula",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Force Tractions)",
            "targetZone": "back",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w7-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w7-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Puissance Bas du Corps & Explosivité",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Puissance Hanches",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w7-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w7-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Bras, Épaules & Gainage Strict",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Force Biceps/Dos",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w7-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w7-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w7-d7"
          }
        ]
      },
      {
        "weekNumber": 8,
        "title": "Semaine 8 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Force Tirage Vertical & Scapula",
            "isRest": false,
            "activityType": "Séance Dos",
            "routineId": "routine-back-v-shape",
            "workoutTitle": "Dos & Silhouette V-Shape (Force Tractions)",
            "targetZone": "back",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w8-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w8-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Puissance Bas du Corps & Explosivité",
            "isRest": false,
            "activityType": "Séance Fessiers",
            "routineId": "routine-glutes-focus",
            "workoutTitle": "Booty Sculpt & Puissance Hanches",
            "targetZone": "lower-body",
            "durationMinutes": 50,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w8-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w8-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Bras, Épaules & Gainage Strict",
            "isRest": false,
            "activityType": "Séance Bras",
            "routineId": "routine-shoulders-arms",
            "workoutTitle": "Épaules Galbées & Force Biceps/Dos",
            "targetZone": "arms",
            "durationMinutes": 45,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w8-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w8-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w8-d7"
          }
        ]
      }
    ]
  },
  {
    "id": "prog-cardio-express-4w",
    "title": "Cardio Express & Souffle Athlétique",
    "subtitle": "Boostez votre VO2max et votre endurance en séances courtes de 35 min",
    "objective": "performance",
    "objectiveLabel": "Performance / Spécifique",
    "durationWeeks": 4,
    "sessionsPerWeek": 4,
    "level": "Intermédiaire",
    "coverImage": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=80",
    "equipment": [
      "Machines",
      "Poids du corps"
    ],
    "description": "4 semaines d’entraînement cardio structuré (Pyramides, StairMaster HIIT, 12-5-30 et Core athlétique) pour transformer votre souffle, votre récupération et votre explosivité.",
    "coachTips": [
      "Surveillez votre récupération cardiaque entre les intervalles : plus votre pouls redescend vite en 20s, plus votre condition progresse."
    ],
    "weeks": [
      {
        "weekNumber": 1,
        "title": "Semaine 1 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Marche Inclinée 12-5-30 & Core",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-incline-walk",
            "workoutTitle": "Circuit Cardio : Marche Inclinée 12-5-30",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w1-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — StairMaster Booty Burner HIIT",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w1-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Sprints Fractionnés HIIT Tapis",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-hiit-treadmill",
            "workoutTitle": "Circuit Cardio : Fractionné HIIT Sprints Tapis",
            "targetZone": "cardio",
            "durationMinutes": 30,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w1-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Elliptique, Rameur 500m & Abdos",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-elliptical-rower",
            "workoutTitle": "Circuit Cardio : Pyramide Elliptique & Rameur 500m",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w1-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w1-d7"
          }
        ]
      },
      {
        "weekNumber": 2,
        "title": "Semaine 2 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Marche Inclinée 12-5-30 & Core",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-incline-walk",
            "workoutTitle": "Circuit Cardio : Marche Inclinée 12-5-30",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w2-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — StairMaster Booty Burner HIIT",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w2-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Sprints Fractionnés HIIT Tapis",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-hiit-treadmill",
            "workoutTitle": "Circuit Cardio : Fractionné HIIT Sprints Tapis",
            "targetZone": "cardio",
            "durationMinutes": 30,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w2-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Elliptique, Rameur 500m & Abdos",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-elliptical-rower",
            "workoutTitle": "Circuit Cardio : Pyramide Elliptique & Rameur 500m",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w2-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w2-d7"
          }
        ]
      },
      {
        "weekNumber": 3,
        "title": "Semaine 3 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Marche Inclinée 12-5-30 & Core",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-incline-walk",
            "workoutTitle": "Circuit Cardio : Marche Inclinée 12-5-30",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w3-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — StairMaster Booty Burner HIIT",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w3-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Sprints Fractionnés HIIT Tapis",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-hiit-treadmill",
            "workoutTitle": "Circuit Cardio : Fractionné HIIT Sprints Tapis",
            "targetZone": "cardio",
            "durationMinutes": 30,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w3-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Elliptique, Rameur 500m & Abdos",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-elliptical-rower",
            "workoutTitle": "Circuit Cardio : Pyramide Elliptique & Rameur 500m",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w3-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w3-d7"
          }
        ]
      },
      {
        "weekNumber": 4,
        "title": "Semaine 4 — Progression & Intensification",
        "focusNote": "Augmentez vos charges de +1 à +2,5 kg ou ajoutez +1 répétition par série par rapport à la semaine précédente.",
        "days": [
          {
            "dayNumber": 1,
            "label": "Jour 1 — Marche Inclinée 12-5-30 & Core",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-incline-walk",
            "workoutTitle": "Circuit Cardio : Marche Inclinée 12-5-30",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-plank-no-pause-3m",
            "id": "w4-d1"
          },
          {
            "dayNumber": 2,
            "label": "Jour 2 — StairMaster Booty Burner HIIT",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-stairmaster-booty",
            "workoutTitle": "Circuit Cardio : StairMaster Booty Burner (20 min)",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-tabata-core-30-15",
            "id": "w4-d2"
          },
          {
            "dayNumber": 3,
            "label": "Jour 3 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d3"
          },
          {
            "dayNumber": 4,
            "label": "Jour 4 — Sprints Fractionnés HIIT Tapis",
            "isRest": false,
            "activityType": "HIIT",
            "routineId": "routine-cardio-hiit-treadmill",
            "workoutTitle": "Circuit Cardio : Fractionné HIIT Sprints Tapis",
            "targetZone": "cardio",
            "durationMinutes": 30,
            "finisherPresetId": "finisher-pyramide-sprint-4m",
            "id": "w4-d4"
          },
          {
            "dayNumber": 5,
            "label": "Jour 5 — Elliptique, Rameur 500m & Abdos",
            "isRest": false,
            "activityType": "Cardio",
            "routineId": "routine-cardio-elliptical-rower",
            "workoutTitle": "Circuit Cardio : Pyramide Elliptique & Rameur 500m",
            "targetZone": "cardio",
            "durationMinutes": 35,
            "finisherPresetId": "finisher-challenge-100-reps",
            "id": "w4-d5"
          },
          {
            "dayNumber": 6,
            "label": "Jour 6 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d6"
          },
          {
            "dayNumber": 7,
            "label": "Jour 7 — Repos",
            "isRest": true,
            "activityType": "Repos",
            "id": "w4-d7"
          }
        ]
      }
    ]
  }
]

export const OBJECTIVES: Record<string, ObjectiveMeta> = {
  "hypertrophy": {
    "label": "Prise de masse / Hypertrophie",
    "shortLabel": "Hypertrophie & Galbe",
    "badgeBg": "bg-pink-500/15 border-pink-400/30",
    "badgeText": "text-pink-700",
    "description": "Tension mécanique maximale et surcharge progressive pour sculpter et galber vos formes."
  },
  "shred": {
    "label": "Perte de poids / Sèche",
    "shortLabel": "Sèche & Métabolique",
    "badgeBg": "bg-amber-500/15 border-amber-400/30",
    "badgeText": "text-amber-700",
    "description": "Circuits haute dépense énergétique et finishers cardio pour affiner et dessiner la silhouette."
  },
  "toning": {
    "label": "Remise en forme / Tonicité",
    "shortLabel": "Tonicité & Posture",
    "badgeBg": "bg-emerald-500/15 border-emerald-400/30",
    "badgeText": "text-emerald-700",
    "description": "Renforcement profond, sangle abdominale engagée et posture altière au quotidien."
  },
  "performance": {
    "label": "Performance / Spécifique",
    "shortLabel": "Performance & Défis",
    "badgeBg": "bg-purple-500/15 border-purple-400/30",
    "badgeText": "text-purple-700",
    "description": "Cycles ciblés pour débloquer des mouvements athlétiques (tractions, explosivité, cardio)."
  }
}

export const PROGRAM_EQUIPMENT: string[] = [
  "Bandes de résistance",
  "Sangle chevillère",
  "Haltères",
  "Poids du corps",
  "Machines",
  "Barre & Poids"
]
