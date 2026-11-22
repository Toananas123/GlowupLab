// Données reprises de l'app d'origine.
import type { Routine } from '../types'
export const DEFAULT_ROUTINES: Routine[] = [
  {
    "id": "routine-glutes-focus",
    "name": "Booty Sculpt & Hypertrophie (Fessiers)",
    "targetZone": "lower-body",
    "description": "Séance reine 4 exercices axée sur la tension mécanique et l’hypertrophie des fessiers (Étirement → Contraction → Unilatéral → Isolation).",
    "isDefault": true,
    "finisher": "Abduction machine en drop-set (3 x 20 reps)",
    "notes": "Priorisez la contraction volontaire en haut de chaque répétition.",
    "exercises": [
      {
        "id": "r-ex-1",
        "exerciseId": "romanian-deadlift",
        "exerciseName": "Soulevé de terre roumain (RDL aux haltères)",
        "category": "lower-body",
        "equipment": "dumbbell",
        "restSeconds": 90,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 14,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 16,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 16,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-2",
        "exerciseId": "hip-thrust-barbell",
        "exerciseName": "Hip Thrust à la barre",
        "category": "lower-body",
        "equipment": "barbell",
        "restSeconds": 90,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 40,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 50,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 8,
            "targetWeight": 55,
            "completed": false
          },
          {
            "id": "s4",
            "setNumber": 4,
            "targetReps": 10,
            "targetWeight": 45,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-3",
        "exerciseId": "bulgarian-split-squat",
        "exerciseName": "Fentes bulgares aux haltères",
        "category": "lower-body",
        "equipment": "dumbbell",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-4",
        "exerciseId": "cable-glute-kickback",
        "exerciseName": "Kickback fessier à la poulie basse",
        "category": "lower-body",
        "equipment": "cable",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 12.5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 12.5,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-quads-glutes",
    "name": "Bas du Corps Complet (Quads, Fessiers & Ischios)",
    "targetZone": "lower-body",
    "description": "Équilibre parfait face avant et face arrière pour des jambes fuselées et toniques (Étirement → Contraction → Unilatéral → Isolation).",
    "isDefault": true,
    "finisher": "Leg Extension tempo brûlure (2 x 15 reps)",
    "notes": "Pensez à garder le dos plaqué à la presse et au hack squat.",
    "exercises": [
      {
        "id": "r-ex-q1",
        "exerciseId": "leg-press",
        "exerciseName": "Presse à cuisses 45°",
        "category": "lower-body",
        "equipment": "machine",
        "restSeconds": 90,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 80,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 100,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 100,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-q3",
        "exerciseId": "kas-glute-bridge",
        "exerciseName": "Kas Glute Bridge aux haltères",
        "category": "lower-body",
        "equipment": "dumbbell",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 18,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 20,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-q4",
        "exerciseId": "single-leg-press",
        "exerciseName": "Presse à cuisses unilatérale (Single Leg Press)",
        "category": "lower-body",
        "equipment": "machine",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 35,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 40,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 40,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-q5",
        "exerciseId": "lying-leg-curl",
        "exerciseName": "Leg Curl allongé à la machine",
        "category": "lower-body",
        "equipment": "machine",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 25,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 25,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 30,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-back-sculpt-no-widen",
    "name": "Dos Dessiné sans l’Élargir (Ordre 1-2-3-4)",
    "targetZone": "back",
    "description": "La méthode exacte en 4 étapes dans l’ordre pour sculpter les détails du dos sans élargir la taille : 1. Milieu du dos (coudes ouverts) → 2. Grand dorsal (1 seul exo) → 3. Arrière d’épaule → 4. Lombaires (Back Extension).",
    "isDefault": true,
    "finisher": "Circuit Abdos Sablier, Vacuum & Taille Fine (12 min)",
    "notes": "Respectez bien l’ordre : coudes ouverts sur le milieu du dos, un seul tirage grand dorsal, puis arrière d’épaule et back extension.",
    "exercises": [
      {
        "id": "r-bs-1",
        "exerciseId": "wide-grip-seated-cable-row",
        "exerciseName": "1. Tirage horizontal prise large (Milieu du dos)",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 25,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 30,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 30,
            "completed": false
          }
        ]
      },
      {
        "id": "r-bs-2",
        "exerciseId": "lat-pulldown",
        "exerciseName": "2. Tirage vertical poitrine (Grand dorsal)",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 30,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 35,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 35,
            "completed": false
          }
        ]
      },
      {
        "id": "r-bs-3",
        "exerciseId": "reverse-pec-deck",
        "exerciseName": "3. Oiseau inversé à la machine (Arrière d’épaule)",
        "category": "back",
        "equipment": "machine",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 15,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          }
        ]
      },
      {
        "id": "r-bs-4",
        "exerciseId": "hyperextensions-bench",
        "exerciseName": "4. Back Extension (Banc à lombaires 45°)",
        "category": "back",
        "equipment": "bodyweight",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 15,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 10,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-dos-pecs-antagonist",
    "name": "Séance Dos / Pecs (Upper Body Dessiné & Galbe)",
    "targetZone": "back",
    "description": "Combinaison antagoniste ultra-efficace : 2 exercices Dos pour la posture et le dessin + 2 exercices Pecs pour le maintien et le galbe du buste.",
    "isDefault": true,
    "finisher": "1. Marche Inclinée — Débutant (Pente 6 · Vitesse 4,5 · 20 min)",
    "notes": "Alternez un tirage dos puis une poussée pecs pour un équilibre postural parfait.",
    "exercises": [
      {
        "id": "r-dp-1",
        "exerciseId": "wide-grip-seated-cable-row",
        "exerciseName": "Tirage horizontal prise large",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 25,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 30,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 30,
            "completed": false
          }
        ]
      },
      {
        "id": "r-dp-2",
        "exerciseId": "incline-dumbbell-bench-press",
        "exerciseName": "Développé incliné aux haltères (Haut des pecs)",
        "category": "pecs",
        "equipment": "dumbbell",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-dp-3",
        "exerciseId": "lat-pulldown",
        "exerciseName": "Tirage vertical poitrine prise large (Lat Pulldown)",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 30,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 35,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 35,
            "completed": false
          }
        ]
      },
      {
        "id": "r-dp-4",
        "exerciseId": "pec-deck-butterfly",
        "exerciseName": "Écarté à la machine (Pec Deck / Butterfly)",
        "category": "pecs",
        "equipment": "machine",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 15,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-pecs-arms-push",
    "name": "Séance Pecs / Bras (Buste Tonique & Bras Fermes)",
    "targetZone": "pecs",
    "description": "Séance Push & Galbe combinant le travail des pectoraux (haut du buste et butterfly) avec la définition des épaules, triceps et biceps.",
    "isDefault": true,
    "finisher": "5. Circuit Global 360° : Abdos Complets & Gainage",
    "notes": "Contrôlez bien la descente sur les développés et gardez les coudes fixes sur les triceps.",
    "exercises": [
      {
        "id": "r-pb-1",
        "exerciseId": "incline-dumbbell-bench-press",
        "exerciseName": "Développé incliné aux haltères (Haut des pecs)",
        "category": "pecs",
        "equipment": "dumbbell",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-pb-2",
        "exerciseId": "pec-deck-butterfly",
        "exerciseName": "Écarté à la machine (Pec Deck / Butterfly)",
        "category": "pecs",
        "equipment": "machine",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 15,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          }
        ]
      },
      {
        "id": "r-pb-3",
        "exerciseId": "lateral-raises-dumbbell",
        "exerciseName": "Élévations latérales strictes aux haltères",
        "category": "arms",
        "equipment": "dumbbell",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 4,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          }
        ]
      },
      {
        "id": "r-pb-4",
        "exerciseId": "cable-tricep-pushdown",
        "exerciseName": "Extensions triceps à la corde (Pushdown)",
        "category": "arms",
        "equipment": "cable",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 15,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 17.5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 17.5,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-pecs-sculpt",
    "name": "Focus Pecs & Maintien du Buste (4 exos)",
    "targetZone": "pecs",
    "description": "Séance dédiée au galbe et à la tonicité des pectoraux sous tous les angles : incliné, presse convergente, poulie vis-à-vis et pompes.",
    "isDefault": true,
    "finisher": "Stomach Vacuum hypopressif (5 cycles de 12s)",
    "notes": "Gardez les omoplates resserrées pour isoler les pectoraux et préserver les épaules.",
    "exercises": [
      {
        "id": "r-p-1",
        "exerciseId": "incline-dumbbell-bench-press",
        "exerciseName": "Développé incliné aux haltères (Haut des pecs)",
        "category": "pecs",
        "equipment": "dumbbell",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-p-2",
        "exerciseId": "chest-press-machine",
        "exerciseName": "Presse à pectoraux assise (Chest Press)",
        "category": "pecs",
        "equipment": "machine",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 25,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 25,
            "completed": false
          }
        ]
      },
      {
        "id": "r-p-3",
        "exerciseId": "cable-chest-fly",
        "exerciseName": "Écartés à la poulie vis-à-vis (Cable Fly)",
        "category": "pecs",
        "equipment": "cable",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 12.5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 12.5,
            "completed": false
          }
        ]
      },
      {
        "id": "r-p-4",
        "exerciseId": "incline-push-ups",
        "exerciseName": "Pompes inclinées sur banc (ou au sol)",
        "category": "pecs",
        "equipment": "bodyweight",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 0,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-back-v-shape",
    "name": "Dos & Silhouette V-Shape (Posture)",
    "targetZone": "back",
    "description": "Postures altières, taille affinée par illusion d’optique et épaules dégagées.",
    "isDefault": true,
    "finisher": "Face Pulls légers en brûlure (3 x 15 reps)",
    "notes": "Pensez à tirer avec vos coudes et à fixer les omoplates vers le bas.",
    "exercises": [
      {
        "id": "r-ex-5",
        "exerciseId": "lat-pulldown",
        "exerciseName": "Tirage vertical poitrine prise large (Lat Pulldown)",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 30,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 35,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 8,
            "targetWeight": 40,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-6",
        "exerciseId": "seated-cable-row",
        "exerciseName": "Tirage horizontal poulie basse (Seated Row)",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 25,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 30,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 30,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-b3",
        "exerciseId": "cable-pullover",
        "exerciseName": "Pull-over à la poulie haute avec corde",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 15,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 17.5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 17.5,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-b4",
        "exerciseId": "face-pull-rope",
        "exerciseName": "Facepull à la corde (viser le front)",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 12.5,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 15,
            "targetWeight": 15,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 15,
            "targetWeight": 15,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-shoulders-arms",
    "name": "Épaules Galbées & Bras Toniques",
    "targetZone": "arms",
    "description": "Séance ciblée sur les 4 portions : deltoïdes latéraux, avant, triceps fermes et biceps.",
    "isDefault": true,
    "finisher": "Extensions triceps à la corde (3 x 15 reps)",
    "notes": "Charges modérées et tempo strict pour ne pas engager les trapèzes.",
    "exercises": [
      {
        "id": "r-ex-a1",
        "exerciseId": "overhead-press-dumbbell",
        "exerciseName": "Développé militaire assis aux haltères",
        "category": "arms",
        "equipment": "dumbbell",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 8,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-7",
        "exerciseId": "lateral-raises-dumbbell",
        "exerciseName": "Élévations latérales strictes aux haltères",
        "category": "arms",
        "equipment": "dumbbell",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 4,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s4",
            "setNumber": 4,
            "targetReps": 15,
            "targetWeight": 4,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-8",
        "exerciseId": "cable-tricep-pushdown",
        "exerciseName": "Extensions triceps à la corde (Pushdown)",
        "category": "arms",
        "equipment": "cable",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 15,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 17.5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 17.5,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-a4",
        "exerciseId": "incline-dumbbell-curl",
        "exerciseName": "Curl incliné aux haltères sur banc (Incline Curl)",
        "category": "arms",
        "equipment": "dumbbell",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 6,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 7,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 7,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-core-global",
    "name": "360° Abdos Complets & Gainage Profond",
    "targetZone": "abs",
    "description": "Circuit complet sollicitant le transverse, le grand droit, les obliques et le gainage.",
    "isDefault": true,
    "finisher": "Planche de gainage Hollow Body finale (60 sec)",
    "notes": "Prenez 30 secondes de repos entre chaque mouvement et répétez 3 fois.",
    "exercises": [
      {
        "id": "r-ex-c1",
        "exerciseId": "deadbug-core",
        "exerciseName": "Deadbug contrôlé au sol",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 30,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-c2",
        "exerciseId": "commando-plank",
        "exerciseName": "Planche commando dynamique",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 30,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-c3",
        "exerciseId": "hollow-body-hold",
        "exerciseName": "Hollow Body Hold (Position Cuillère)",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 45,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 35,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 35,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 35,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-c4",
        "exerciseId": "stomach-vacuum",
        "exerciseName": "Stomach Vacuum hypopressif",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 30,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 15,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 15,
            "targetWeight": 0,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-posterior-chain",
    "name": "Chaîne Postérieure (Fessiers & Ischios)",
    "targetZone": "lower-body",
    "description": "Séance 4 exercices axée sur la chaîne postérieure (Étirement → Contraction → Unilatéral → Isolation).",
    "isDefault": true,
    "finisher": "Hyperextensions au banc 45° focus fessiers (3 x 15)",
    "notes": "Poussez bien les hanches en arrière sur le soulevé de terre roumain.",
    "exercises": [
      {
        "id": "r-ex-p1",
        "exerciseId": "romanian-deadlift",
        "exerciseName": "Soulevé de terre roumain (RDL aux haltères)",
        "category": "lower-body",
        "equipment": "dumbbell",
        "restSeconds": 90,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 14,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 16,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 8,
            "targetWeight": 18,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-p2",
        "exerciseId": "hip-thrust-barbell",
        "exerciseName": "Hip Thrust à la barre",
        "category": "lower-body",
        "equipment": "barbell",
        "restSeconds": 90,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 45,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 50,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 8,
            "targetWeight": 55,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-p3",
        "exerciseId": "single-leg-rdl-dumbbell",
        "exerciseName": "RDL unijambiste avec haltère (Single Leg RDL)",
        "category": "lower-body",
        "equipment": "dumbbell",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-p4",
        "exerciseId": "seated-leg-curl",
        "exerciseName": "Leg Curl assis à la machine",
        "category": "lower-body",
        "equipment": "machine",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 25,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 25,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 30,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-quads-adductors",
    "name": "Quads Sculpt & Adducteurs Fermes",
    "targetZone": "lower-body",
    "description": "Séance 4 exercices sculptant l’avant et l’intérieur des cuisses (Étirement → Contraction → Unilatéral → Isolation).",
    "isDefault": true,
    "finisher": "Goblet Squat tempo lent (2 x 15 reps)",
    "notes": "Ouvrez bien les genoux sur les mouvements d’adducteurs.",
    "exercises": [
      {
        "id": "r-ex-qa1",
        "exerciseId": "leg-press",
        "exerciseName": "Presse à cuisses 45°",
        "category": "lower-body",
        "equipment": "machine",
        "restSeconds": 90,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 80,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 90,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 100,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-qa2",
        "exerciseId": "kas-glute-bridge",
        "exerciseName": "Kas Glute Bridge aux haltères",
        "category": "lower-body",
        "equipment": "dumbbell",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 18,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 20,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 20,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-qa3",
        "exerciseId": "forward-lunges-dumbbell",
        "exerciseName": "Fente avant avec haltères",
        "category": "lower-body",
        "equipment": "dumbbell",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-qa4",
        "exerciseId": "adductor-machine",
        "exerciseName": "Machine à adducteurs assise",
        "category": "lower-body",
        "equipment": "machine",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 20,
            "targetWeight": 35,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 15,
            "targetWeight": 40,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 15,
            "targetWeight": 40,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-fullbody-glow",
    "name": "Full Body Glow & Tonification Totale",
    "targetZone": "fullbody",
    "description": "Séance globale 4 mouvements polyarticulaires pour brûler et tonifier tout le corps.",
    "isDefault": true,
    "finisher": "10 min de marche inclinée ou 60s de gainage",
    "notes": "Parfaite si vous n’avez que 45 minutes pour tout travailler.",
    "exercises": [
      {
        "id": "r-ex-fb1",
        "exerciseId": "hip-thrust-barbell",
        "exerciseName": "Hip Thrust à la barre",
        "category": "lower-body",
        "equipment": "barbell",
        "restSeconds": 90,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 45,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 50,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 50,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-fb2",
        "exerciseId": "lat-pulldown",
        "exerciseName": "Tirage vertical poitrine prise large (Lat Pulldown)",
        "category": "back",
        "equipment": "cable",
        "restSeconds": 75,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 30,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 35,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 35,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-fb3",
        "exerciseId": "lateral-raises-dumbbell",
        "exerciseName": "Élévations latérales strictes aux haltères",
        "category": "arms",
        "equipment": "dumbbell",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 4,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          }
        ]
      },
      {
        "id": "r-ex-fb4",
        "exerciseId": "deadbug-core",
        "exerciseName": "Deadbug contrôlé au sol",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 45,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-abs-standing-weighted",
    "name": "Circuit Abdos Debout avec Charge (3 tours)",
    "targetZone": "abs",
    "description": "Circuit d’abdos 100% debout : Overhead marches (charge lourde), Around the body (charge lourde), Around the head (charge légère), Diagonal plate chops (charge légère) & Oblique bends (charge lourde).",
    "isDefault": true,
    "finisher": "Stomach Vacuum debout (3 x 15 sec)",
    "notes": "Enchaînez les 5 mouvements pour 1 tour complet, prenez 45s de repos et répétez 3 fois.",
    "exercises": [
      {
        "id": "r-abs-st-1",
        "exerciseId": "overhead-marches-heavy",
        "exerciseName": "Overhead Marches (avec charge lourde)",
        "category": "abs",
        "equipment": "dumbbell",
        "restSeconds": 20,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-st-2",
        "exerciseId": "around-the-body-heavy",
        "exerciseName": "Around the Body (avec charge lourde)",
        "category": "abs",
        "equipment": "dumbbell",
        "restSeconds": 20,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 10,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-st-3",
        "exerciseId": "around-the-head-light",
        "exerciseName": "Around the Head / Halo (avec charge légère)",
        "category": "abs",
        "equipment": "barbell",
        "restSeconds": 20,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 5,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-st-4",
        "exerciseId": "diagonal-plate-chops",
        "exerciseName": "Diagonal Plate Chops (10 de chaque côté, charge légère)",
        "category": "abs",
        "equipment": "barbell",
        "restSeconds": 20,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 5,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-st-5",
        "exerciseId": "oblique-bends-heavy",
        "exerciseName": "Oblique Bends (10 de chaque côté, charge lourde)",
        "category": "abs",
        "equipment": "dumbbell",
        "restSeconds": 45,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 12,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 12,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 12,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-abs-flutter-weighted-plank",
    "name": "Circuit Abdos Complet & Planche Lestée 60s (3x10)",
    "targetZone": "abs",
    "description": "Flutter kicks, Scissor kicks, In & Out, Leg raises au-dessus d’un haltère, Leg lift, Toe touches, Crunches pause en haut, Russian twist haltère & 60s Planche lestée.",
    "isDefault": true,
    "finisher": "Planche 60 sec avec charge sur le dos (3 tours)",
    "notes": "3 séries de 10 répétitions par exercice, terminez par 60s de planche lestée.",
    "exercises": [
      {
        "id": "r-abs-fl-1",
        "exerciseId": "leg-raises-over-dumbbell",
        "exerciseName": "Leg Raises au-dessus d'un haltère (3x10)",
        "category": "abs",
        "equipment": "dumbbell",
        "restSeconds": 25,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 6,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 6,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 6,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-fl-2",
        "exerciseId": "in-and-out-abs",
        "exerciseName": "In and Out + Flutter Kicks + Scissor Kicks (3x10)",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 25,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-fl-3",
        "exerciseId": "crunches-pause-top",
        "exerciseName": "Crunches with a Pause at the Top & Toe Touches (3x10)",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 25,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 10,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 10,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 10,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-fl-4",
        "exerciseId": "weighted-plank-60s",
        "exerciseName": "Russian Twist haltère (3x10) + Planche lestée sur le dos (60s)",
        "category": "abs",
        "equipment": "barbell",
        "restSeconds": 45,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 60,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 60,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 60,
            "targetWeight": 5,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-abs-over-unders-cocoon",
    "name": "Circuit Abdos 3x20 : Over-Unders, Cocoon & Plate Hollow Hold",
    "targetZone": "abs",
    "description": "3x20 Over unders (10 horaire + 10 anti-horaire), 3x20 Scissor kicks, 3x20 Side to side leg raises, 3x20 Cocoon passes, 3x20 Dead bugs avec charge & 3x Plate hollow hold max.",
    "isDefault": true,
    "finisher": "3 x Plate Hollow Hold (As Long As You Can)",
    "notes": "Gardez les lombaires plaquées au tapis sur tous les mouvements de jambes.",
    "exercises": [
      {
        "id": "r-abs-ou-1",
        "exerciseId": "over-unders-abs",
        "exerciseName": "Over Unders (10 Clocking + 10 Anti-Clocking)",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 25,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 20,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 20,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 20,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-ou-2",
        "exerciseId": "side-to-side-leg-raises",
        "exerciseName": "Side to Side Leg Raises & Scissor Kicks",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 25,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 20,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 20,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 20,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-ou-3",
        "exerciseId": "cocoon-passes-abs",
        "exerciseName": "Cocoon Passes & Dead Bugs avec charge",
        "category": "abs",
        "equipment": "dumbbell",
        "restSeconds": 30,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 20,
            "targetWeight": 4,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 20,
            "targetWeight": 4,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 20,
            "targetWeight": 4,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-ou-4",
        "exerciseId": "plate-hollow-hold",
        "exerciseName": "Plate Hollow Hold (As Long As You Can)",
        "category": "abs",
        "equipment": "barbell",
        "restSeconds": 45,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 45,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 45,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 45,
            "targetWeight": 5,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-abs-weighted-12",
    "name": "Circuit Abdos Lestés 3x12 (Kneel to Stand & Bridge Drives)",
    "targetZone": "abs",
    "description": "3x12 Weighted toe touches, 3x12 Bridge knee drives (chaque côté), 3x12 Dumbbell kneel to stand, 3x12 Weighted Russian twists & 3x12 Crunches.",
    "isDefault": true,
    "finisher": "3 x 12 Crunches lents contrôlés",
    "notes": "Utilisez un haltère modéré (4 à 8 kg) pour les exercices lestés.",
    "exercises": [
      {
        "id": "r-abs-w12-1",
        "exerciseId": "weighted-toe-touches",
        "exerciseName": "Weighted Toe Touches",
        "category": "abs",
        "equipment": "dumbbell",
        "restSeconds": 25,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 5,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-w12-2",
        "exerciseId": "bridge-knee-drives",
        "exerciseName": "Bridge Knee Drives (12 de chaque côté)",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 25,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-w12-3",
        "exerciseId": "dumbbell-kneel-to-stand",
        "exerciseName": "Dumbbell Kneel to Stand",
        "category": "abs",
        "equipment": "dumbbell",
        "restSeconds": 30,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 12,
            "targetWeight": 8,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 12,
            "targetWeight": 8,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-cardio-incline-walk",
    "name": "Circuit Cardio : Marche Inclinée 12-5-30 (ou Pente 6 / 10)",
    "targetZone": "cardio",
    "description": "Séance Marche Inclinée : Débutant (Pente 6 · Vitesse 4,5 · 20 min) | Intermédiaire (Pente 10 · Vitesse 4,5 · 30 min) | Confirmée (Pente 12 · Vitesse 5 · 30 min).",
    "isDefault": true,
    "finisher": "2 min de retour au calme pente 0% + étirement mollets",
    "notes": "Ne vous tenez pas aux poignées du tapis pour engager les abdos et les fessiers.",
    "exercises": [
      {
        "id": "r-cardio-inc-1",
        "exerciseId": "incline-walk-treadmill-levels",
        "exerciseName": "Marche inclinée Tapis (Pente 6 / 10 / 12 — Vitesse 4,5 à 5 km/h)",
        "category": "cardio",
        "equipment": "cardio_machine",
        "restSeconds": 0,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 30,
            "targetWeight": 10,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-cardio-stairmaster-booty",
    "name": "Circuit Cardio : StairMaster Booty Burner (20 min)",
    "targetZone": "cardio",
    "description": "Montée progressive par paliers et pas croisés sur escalier pour sculpter les fessiers et brûler un maximum.",
    "isDefault": true,
    "finisher": "2 min retour au calme niveau 4 + étirement fessiers",
    "notes": "Gardez le buste légèrement penché en avant sans vous appuyer sur les rampes.",
    "exercises": [
      {
        "id": "r-cardio-sm-1",
        "exerciseId": "stairmaster-glutes",
        "exerciseName": "StairMaster : Échauffement niv. 5 (3 min) + Pas 2 par 2 niv. 8 (5 min)",
        "category": "cardio",
        "equipment": "cardio_machine",
        "restSeconds": 30,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 8,
            "targetWeight": 8,
            "completed": false
          }
        ]
      },
      {
        "id": "r-cardio-sm-2",
        "exerciseId": "stairmaster-glutes",
        "exerciseName": "StairMaster HIIT : 6 tours (45s niv. 11 / 45s niv. 6) + Pas croisés (4 min)",
        "category": "cardio",
        "equipment": "cardio_machine",
        "restSeconds": 0,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 12,
            "targetWeight": 11,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-cardio-hiit-treadmill",
    "name": "Circuit Cardio : Fractionné HIIT Sprints Tapis (20 min)",
    "targetZone": "cardio",
    "description": "Alternance explosive de 8 sprints de 30s (12-14 km/h) et 60s de marche active (5 km/h).",
    "isDefault": true,
    "finisher": "4 min de marche lente à 4 km/h pour redescendre le rythme cardiaque",
    "notes": "Échauffez-vous 4 minutes en footing léger avant de lancer le premier sprint.",
    "exercises": [
      {
        "id": "r-cardio-hiit-1",
        "exerciseId": "treadmill-hiit-sprints",
        "exerciseName": "Sprints HIIT Tapis : 8 x (30s Sprint 12-14 km/h / 60s Marche 5 km/h)",
        "category": "cardio",
        "equipment": "cardio_machine",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 8,
            "targetWeight": 13,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-cardio-elliptical-rower",
    "name": "Circuit Cardio : Pyramide Elliptique & Rameur 500m (25 min)",
    "targetZone": "cardio",
    "description": "Combo cardio sans impact articulaire : 5 x 500m au Rameur ou Pyramide de résistance sur Elliptique.",
    "isDefault": true,
    "finisher": "3 min de retour au calme souple + hydratation",
    "notes": "Pédalez en arrière 4 minutes au milieu de la séance elliptique pour cibler fessiers et ischios.",
    "exercises": [
      {
        "id": "r-cardio-ell-1",
        "exerciseId": "elliptical-pyramid",
        "exerciseName": "Pyramide Elliptique (Paliers résistance 5 → 8 → 11 → 14 + Marche arrière)",
        "category": "cardio",
        "equipment": "cardio_machine",
        "restSeconds": 30,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 15,
            "targetWeight": 11,
            "completed": false
          }
        ]
      },
      {
        "id": "r-cardio-row-1",
        "exerciseId": "rower-intervals",
        "exerciseName": "Rameur Concept2 : 3 x 500m cadence soutenue (1 min récup)",
        "category": "cardio",
        "equipment": "cardio_machine",
        "restSeconds": 60,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 3,
            "targetWeight": 5,
            "completed": false
          }
        ]
      }
    ]
  },
  {
    "id": "routine-abs-sablier-vacuum",
    "name": "Circuit Abdos Sablier, Vacuum & Taille Fine (12 min)",
    "targetZone": "abs",
    "description": "Focus transverse profond (Stomach Vacuum), Mountain climbers croisés lents et gainage ventral actif.",
    "isDefault": true,
    "finisher": "5 cycles de 10s de Stomach Vacuum debout ou à 4 pattes",
    "notes": "Idéal en fin de séance ou le matin à jeun pour engager le transverse en profondeur.",
    "exercises": [
      {
        "id": "r-abs-sab-1",
        "exerciseId": "stomach-vacuum",
        "exerciseName": "Stomach Vacuum hypopressif (5 cycles de 10s)",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 20,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 5,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 5,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 5,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-sab-2",
        "exerciseId": "deadbug-core",
        "exerciseName": "Deadbug contrôlé lombaires plaquées",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 25,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 16,
            "targetWeight": 0,
            "completed": false
          }
        ]
      },
      {
        "id": "r-abs-sab-3",
        "exerciseId": "hollow-body-hold",
        "exerciseName": "Planche ventrale active & Hollow Hold (45 sec)",
        "category": "abs",
        "equipment": "bodyweight",
        "restSeconds": 30,
        "sets": [
          {
            "id": "s1",
            "setNumber": 1,
            "targetReps": 45,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s2",
            "setNumber": 2,
            "targetReps": 45,
            "targetWeight": 0,
            "completed": false
          },
          {
            "id": "s3",
            "setNumber": 3,
            "targetReps": 45,
            "targetWeight": 0,
            "completed": false
          }
        ]
      }
    ]
  }
]
