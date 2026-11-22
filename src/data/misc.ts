// Données reprises de l'app d'origine.

export const AFFIRMATIONS = [
  "I am building strength, poise, and confidence with every mindful repetition.",
  "My body is capable of amazing transformations through gentle consistency.",
  "I honor my journey, celebrate my progress, and embrace my unique power.",
  "Strength looks radiant on me, both inside and outside the gym.",
  "Every small set brings me closer to the strongest version of myself.",
  "I show up for myself today with grace, intention, and boundless energy.",
  "My dedication fuels my glow and elevates my spirit.",
  "I am patient with my process and proud of how far I have already come.",
  "I move with purpose, breathe with intention, and sculpt my best self.",
  "Consistency is my superpower, and self-love is my daily foundation.",
  "I am strong, resilient, and unapologetically focused on my growth.",
  "Today I celebrate what my body can do and nourish its limitless vitality.",
  "Balance, beauty, and power align effortlessly within my routine.",
  "I lift with joy, rest with kindness, and trust my steady evolution."
] as const

export const MEASUREMENT_FIELDS = [
  {
    "key": "hips",
    "label": "Hanches / Fessiers",
    "unit": "cm"
  },
  {
    "key": "waist",
    "label": "Tour de taille",
    "unit": "cm"
  },
  {
    "key": "weight",
    "label": "Poids",
    "unit": "kg"
  },
  {
    "key": "thighs",
    "label": "Cuisses",
    "unit": "cm"
  },
  {
    "key": "arms",
    "label": "Bras",
    "unit": "cm"
  },
  {
    "key": "chest",
    "label": "Poitrine",
    "unit": "cm"
  }
] as const

export const EXERCISE_FILTERS = [
  {
    "id": "all",
    "label": "Tous"
  },
  {
    "id": "favs",
    "label": "⭐ Favoris"
  },
  {
    "id": "lower-body",
    "label": "Bas du corps"
  },
  {
    "id": "back",
    "label": "Dos"
  },
  {
    "id": "pecs",
    "label": "Pecs"
  },
  {
    "id": "arms",
    "label": "Bras & Épaules"
  },
  {
    "id": "abs",
    "label": "Abdos"
  },
  {
    "id": "cardio",
    "label": "Cardio"
  }
] as const

export const DEFAULT_OBJECTIVES = [
  {
    "id": "obj-1",
    "label": "Réaliser mes 3 séances complètes de la semaine",
    "completed": false
  },
  {
    "id": "obj-2",
    "label": "Augmenter ma charge sur 1 exercice bas du corps",
    "completed": false
  },
  {
    "id": "obj-3",
    "label": "Valider mon finisher cardio ou abdos en fin de séance",
    "completed": false
  }
] as const
