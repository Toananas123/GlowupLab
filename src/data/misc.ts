// Données reprises de l'app d'origine.

export const AFFIRMATIONS = [
  'I am proud of every step I take toward myself.',
  'My body is my ally, and I treat it with gentleness and respect.',
  'I deserve to take time for myself.',
  'I am exactly where I need to be today.',
  'Every day, I grow stronger in body and in mind.',
  'I move at my own pace, and that is perfectly fine.',
  'I choose consistency over perfection.',
  'My body is capable of wonderful things.',
  'I speak to myself with the same kindness I offer a friend.',
  'I celebrate my small victories.',
  'I am patient, and my efforts bear fruit.',
  'I listen to my body and give it what it needs.',
  'I am becoming the best version of myself.',
  'I feel light, confident, and full of energy.',
  'I am enough, today as much as yesterday.',
  'I breathe deeply and let the tension go.',
  'I am grateful for everything my body allows me to experience.',
  'I allow myself to learn, to stumble, and to grow.',
  'I am proud of my determination.',
  'I glow from within.',
  'Strength looks radiant on me, both inside and outside the gym.',
]
export const MEASUREMENT_FIELDS = [
  {
    key: 'hips',
    label: 'Hanches / Fessiers',
    unit: 'cm',
  },
  {
    key: 'waist',
    label: 'Tour de taille',
    unit: 'cm',
  },
  {
    key: 'weight',
    label: 'Poids',
    unit: 'kg',
  },
  {
    key: 'thighs',
    label: 'Cuisses',
    unit: 'cm',
  },
  {
    key: 'arms',
    label: 'Bras',
    unit: 'cm',
  },
  {
    key: 'chest',
    label: 'Poitrine',
    unit: 'cm',
  },
] as const

export const EXERCISE_FILTERS = [
  {
    id: 'all',
    label: 'Tous',
  },
  {
    id: 'favs',
    label: '⭐ Favoris',
  },
  {
    id: 'lower-body',
    label: 'Bas du corps',
  },
  {
    id: 'back',
    label: 'Dos',
  },
  {
    id: 'pecs',
    label: 'Pecs',
  },
  {
    id: 'arms',
    label: 'Bras & Épaules',
  },
  {
    id: 'abs',
    label: 'Abdos',
  },
  {
    id: 'cardio',
    label: 'Cardio',
  },
] as const

export const DEFAULT_OBJECTIVES = [
  {
    id: 'obj-1',
    label: 'Réaliser mes 3 séances complètes de la semaine',
    completed: false,
  },
  {
    id: 'obj-2',
    label: 'Augmenter ma charge sur 1 exercice bas du corps',
    completed: false,
  },
  {
    id: 'obj-3',
    label: 'Valider mon finisher cardio ou abdos en fin de séance',
    completed: false,
  },
] as const
