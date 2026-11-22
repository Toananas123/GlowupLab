/**
 * Séances cardio complètes (26 à 45 min), chacune avec une version « plus intense ».
 * Contenu rédigé d'après le README en attendant les fichiers d'origine (cardio.js) :
 * à remplacer par les données exactes dès qu'elles sont disponibles.
 */

export interface CardioStep {
  label: string
  seconds: number
  /** Réglages affichés pendant l'étape. */
  speed?: number      // km/h
  incline?: number    // %
  level?: number      // niveau machine (StairMaster, vélo, rameur)
  cue?: string
  /** Effort (true) ou récupération (false) : change la couleur et le son. */
  effort?: boolean
}

export interface CardioSession {
  id: string
  name: string
  machine: string
  summary: string
  steps: CardioStep[]
  intense: CardioStep[]
}

const min = (m: number) => Math.round(m * 60)
const repeat = (n: number, block: CardioStep[]) => Array.from({ length: n }, (_, i) => block.map((s) => ({ ...s, label: `${s.label} (${i + 1}/${n})` }))).flat()

export const CARDIO: CardioSession[] = [
  {
    id: 'cardio-marche-inclinee', name: 'Marche inclinée', machine: 'Tapis',
    summary: 'Le classique brûle-graisse, doux pour les articulations : on marche, on ne court pas.',
    steps: [
      { label: 'Échauffement', seconds: min(5), speed: 4.5, incline: 3, cue: 'Marche tranquille, épaules relâchées.' },
      { label: 'Montée progressive', seconds: min(5), speed: 5, incline: 8, effort: true },
      { label: 'Plateau incliné', seconds: min(20), speed: 5, incline: 12, effort: true, cue: 'Sans te tenir aux barres, buste droit, pousse dans les talons.' },
      { label: 'Retour au calme', seconds: min(5), speed: 4, incline: 2 },
    ],
    intense: [
      { label: 'Échauffement', seconds: min(5), speed: 4.8, incline: 4 },
      { label: 'Montée progressive', seconds: min(5), speed: 5.3, incline: 10, effort: true },
      { label: 'Plateau incliné', seconds: min(22), speed: 5.5, incline: 15, effort: true, cue: 'Pente maximale, bras qui accompagnent la marche.' },
      { label: 'Retour au calme', seconds: min(5), speed: 4, incline: 2 },
    ],
  },
  {
    id: 'cardio-12-3-30', name: '12-3-30', machine: 'Tapis',
    summary: 'Pente 12 %, 3 miles/h (4,8 km/h), 30 minutes : simple et redoutable.',
    steps: [
      { label: 'Échauffement', seconds: min(3), speed: 4.2, incline: 4 },
      { label: '12-3-30', seconds: min(30), speed: 4.8, incline: 12, effort: true, cue: 'Tiens le rythme, sans te tenir. Respiration régulière.' },
      { label: 'Retour au calme', seconds: min(3), speed: 4, incline: 0 },
    ],
    intense: [
      { label: 'Échauffement', seconds: min(3), speed: 4.5, incline: 5 },
      { label: '12-3-30 intensifié', seconds: min(32), speed: 5.3, incline: 14, effort: true },
      { label: 'Retour au calme', seconds: min(3), speed: 4, incline: 0 },
    ],
  },
  {
    id: 'cardio-fractionne-tapis', name: 'Fractionné tapis', machine: 'Tapis',
    summary: 'Alternance course et marche active pour le souffle et l’effet « afterburn ».',
    steps: [
      { label: 'Échauffement', seconds: min(5), speed: 5.5, incline: 1 },
      ...repeat(8, [
        { label: 'Course', seconds: 60, speed: 9.5, incline: 1, effort: true, cue: 'Foulée légère, regard loin devant.' },
        { label: 'Marche active', seconds: 120, speed: 5.5, incline: 1 },
      ]),
      { label: 'Retour au calme', seconds: min(3), speed: 4.5, incline: 0 },
    ],
    intense: [
      { label: 'Échauffement', seconds: min(5), speed: 6, incline: 1 },
      ...repeat(10, [
        { label: 'Course rapide', seconds: 60, speed: 11, incline: 1, effort: true },
        { label: 'Marche active', seconds: 90, speed: 5.5, incline: 1 },
      ]),
      { label: 'Retour au calme', seconds: min(3), speed: 4.5, incline: 0 },
    ],
  },
  {
    id: 'cardio-stairmaster-pyramide', name: 'StairMaster pyramide', machine: 'StairMaster',
    summary: 'Les niveaux montent puis redescendent : fessiers et cardio en même temps.',
    steps: [
      { label: 'Échauffement', seconds: min(3), level: 4 },
      ...[5, 6, 7, 8, 9, 8, 7, 6, 5].map((l, i) => ({ label: `Palier ${i + 1}`, seconds: min(2), level: l, effort: l >= 7, cue: l >= 8 ? 'Sans te tenir, pousse dans tout le pied.' : undefined })),
      { label: 'Retour au calme', seconds: min(5), level: 3 },
    ],
    intense: [
      { label: 'Échauffement', seconds: min(3), level: 5 },
      ...[6, 7, 8, 9, 10, 11, 10, 9, 8, 7].map((l, i) => ({ label: `Palier ${i + 1}`, seconds: min(2), level: l, effort: l >= 8 })),
      { label: 'Retour au calme', seconds: min(5), level: 3 },
    ],
  },
  {
    id: 'cardio-combo-3-machines', name: 'Combo 3 machines', machine: 'Tapis, vélo, rameur',
    summary: 'Trois blocs de 15 minutes pour varier les plaisirs et solliciter tout le corps.',
    steps: [
      { label: 'Tapis incliné', seconds: min(15), speed: 5, incline: 10, effort: true },
      { label: 'Changement de machine', seconds: 60 },
      { label: 'Vélo', seconds: min(14), level: 8, effort: true, cue: 'Cadence 80-90 tours/min.' },
      { label: 'Changement de machine', seconds: 60 },
      { label: 'Rameur', seconds: min(14), level: 5, effort: true, cue: 'Jambes, buste, bras… puis l’inverse au retour.' },
    ],
    intense: [
      { label: 'Tapis incliné', seconds: min(15), speed: 5.5, incline: 13, effort: true },
      { label: 'Changement de machine', seconds: 45 },
      { label: 'Vélo', seconds: min(14), level: 11, effort: true },
      { label: 'Changement de machine', seconds: 45 },
      { label: 'Rameur', seconds: min(14), level: 7, effort: true },
    ],
  },
  {
    id: 'cardio-velo-sprints', name: 'Vélo + sprints', machine: 'Vélo',
    summary: 'Endurance sur le vélo ponctuée de sprints courts et intenses.',
    steps: [
      { label: 'Échauffement', seconds: min(5), level: 5 },
      { label: 'Endurance', seconds: min(8), level: 8, effort: true },
      ...repeat(8, [
        { label: 'Sprint', seconds: 30, level: 13, effort: true, cue: 'À fond !' },
        { label: 'Récupération', seconds: 90, level: 5 },
      ]),
      { label: 'Retour au calme', seconds: min(3), level: 4 },
    ],
    intense: [
      { label: 'Échauffement', seconds: min(5), level: 6 },
      { label: 'Endurance', seconds: min(8), level: 10, effort: true },
      ...repeat(10, [
        { label: 'Sprint', seconds: 30, level: 15, effort: true },
        { label: 'Récupération', seconds: 60, level: 5 },
      ]),
      { label: 'Retour au calme', seconds: min(3), level: 4 },
    ],
  },
  {
    id: 'cardio-doux', name: 'Cardio doux', machine: 'Tapis ou vélo',
    summary: 'Pour les jours de récupération ou de règles : on bouge sans s’épuiser.',
    steps: [
      { label: 'Marche', seconds: min(10), speed: 4.5, incline: 2 },
      { label: 'Marche légèrement inclinée', seconds: min(20), speed: 4.8, incline: 6, cue: 'Tu dois pouvoir parler sans être essoufflée.' },
      { label: 'Retour au calme', seconds: min(10), speed: 4, incline: 0 },
    ],
    intense: [
      { label: 'Marche', seconds: min(8), speed: 4.8, incline: 3 },
      { label: 'Marche inclinée', seconds: min(22), speed: 5, incline: 8 },
      { label: 'Retour au calme', seconds: min(10), speed: 4, incline: 0 },
    ],
  },
]

export const totalMinutes = (steps: CardioStep[]) => Math.round(steps.reduce((s, x) => s + x.seconds, 0) / 60)
