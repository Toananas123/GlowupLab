// Données reprises de l'app d'origine.
import type { AbsCircuit, CardioSession, FinisherPreset } from '../types'
export const ABS_CIRCUITS: AbsCircuit[] = [
  {
    id: 'c_debout',
    name: 'Circuit Abdos Debout avec charge',
    focus: 'Debout, haltère ou disque : gainage profond.',
    rounds: 3,
    durationMinutes: 11,
    exercises: [
      {
        name: 'Overhead Marches',
        reps: '10',
        exerciseId: 'overheadmarch',
        position: 'Debout, charge en main, ventre serré.',
      },
      {
        name: 'Around the Body',
        reps: '10',
        exerciseId: 'aroundbody',
        position: 'Debout, charge en main, ventre serré.',
      },
      {
        name: 'Halo',
        reps: '10',
        exerciseId: 'halo',
        position: 'Debout, charge en main, ventre serré.',
      },
      {
        name: 'Diagonal Plate Chops',
        reps: '10 / côté',
        exerciseId: 'platechops',
        position: 'Debout, charge en main, ventre serré.',
      },
      {
        name: 'Oblique Bends',
        reps: '10 / côté',
        exerciseId: 'obliquebends',
        position: 'Debout, charge en main, ventre serré.',
      },
    ],
  },
  {
    id: 'c_complet',
    name: 'Circuit Abdos Complet (9 mouvements)',
    focus: 'Le circuit complet en 3 tours, 10 répétitions.',
    rounds: 3,
    durationMinutes: 20,
    exercises: [
      {
        name: 'Flutter kicks',
        reps: '10',
        exerciseId: 'flutter',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Scissors kicks',
        reps: '10',
        exerciseId: 'scissors',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'In and out',
        reps: '10',
        exerciseId: 'inandout',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Leg raises',
        reps: '10',
        exerciseId: 'legraises',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Leg lift',
        reps: '10',
        exerciseId: 'legslift',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Toe touches',
        reps: '10',
        exerciseId: 'toetouch',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Mini crunch, pause en haut',
        reps: '10',
        exerciseId: 'crunchpause',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Russian twist',
        reps: '10',
        exerciseId: 'russian',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Planche',
        reps: '60 sec',
        exerciseId: 'planche',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
    ],
  },
  {
    id: 'c_3x20',
    name: 'Circuit Abdos 3×20 : Over Unders',
    focus: 'Trois mouvements, 20 reps, trois tours.',
    rounds: 3,
    durationMinutes: 9,
    exercises: [
      {
        name: 'Over Unders',
        reps: '20',
        exerciseId: 'overunders',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Side to Side Leg Raises',
        reps: '20',
        exerciseId: 'sidelegraises',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Cocoon Passes',
        reps: '20',
        exerciseId: 'cocoon',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Dead Bugs avec charge',
        reps: '20',
        exerciseId: 'deadbugcharge',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
    ],
  },
  {
    id: 'c_lestes',
    name: 'Circuit Abdos Lestés 3×12',
    focus: 'Avec un haltère ou un disque.',
    rounds: 3,
    durationMinutes: 7,
    exercises: [
      {
        name: 'Weighted Toe Touches',
        reps: '12',
        exerciseId: 'toetouches',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Plate Hollow Hold',
        reps: 'Max',
        exerciseId: 'platehollow',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Dumbbell Kneel to Stand',
        reps: '12',
        exerciseId: 'kneeltostand',
        position: 'Debout, charge en main, ventre serré.',
      },
    ],
  },
  {
    id: 'c_gainage',
    name: 'Circuit Gainage',
    focus: 'Statique et anti-rotation.',
    rounds: 3,
    durationMinutes: 11,
    exercises: [
      {
        name: 'Planche',
        reps: '45 sec',
        exerciseId: 'planche',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Planche latérale',
        reps: '30 sec / côté',
        exerciseId: 'planchelat',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Bird dog',
        reps: '10 / côté',
        exerciseId: 'birddog',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Dead bug',
        reps: '10 / côté',
        exerciseId: 'deadbug',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Mountain climbers',
        reps: '30 sec',
        exerciseId: 'mountain',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
    ],
  },
  {
    id: 'c_basventre',
    name: 'Circuit Bas du ventre',
    focus: 'Le bas des abdos en contrôle.',
    rounds: 3,
    durationMinutes: 11,
    exercises: [
      {
        name: 'Reverse crunch',
        reps: '12',
        exerciseId: 'reversecrunch',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Leg raises',
        reps: '12',
        exerciseId: 'legraises',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Flutter kicks',
        reps: '20',
        exerciseId: 'flutter',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Bicycle crunch',
        reps: '20',
        exerciseId: 'bicycle',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Hollow hold',
        reps: '20 sec',
        exerciseId: 'hollow',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
    ],
  },
  {
    id: 'c_obliques',
    name: 'Circuit Obliques',
    focus: 'Taille dessinée.',
    rounds: 3,
    durationMinutes: 9,
    exercises: [
      {
        name: 'Planche latérale',
        reps: '30 sec / côté',
        exerciseId: 'planchelat',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Russian twist',
        reps: '20',
        exerciseId: 'russian',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Bicycle crunch',
        reps: '20',
        exerciseId: 'bicycle',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Oblique Bends',
        reps: '12 / côté',
        exerciseId: 'obliquebends',
        position: 'Debout, charge en main, ventre serré.',
      },
    ],
  },
  {
    id: 'c_profonds',
    name: 'Circuit Abdos profonds',
    focus: 'Transverse et posture.',
    rounds: 3,
    durationMinutes: 9,
    exercises: [
      {
        name: 'Dead bug',
        reps: '10 / côté',
        exerciseId: 'deadbug',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Bird dog',
        reps: '10 / côté',
        exerciseId: 'birddog',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Stomach Vacuum',
        reps: '3 × 15 sec',
        exerciseId: 'vacuum',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Planche commando',
        reps: '10',
        exerciseId: 'commando',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
    ],
  },
  {
    id: 'c_douceur',
    name: 'Circuit Abdos en douceur (débutante)',
    focus: 'Pour démarrer sans douleur.',
    rounds: 2,
    durationMinutes: 8,
    exercises: [
      {
        name: 'Mini crunch, pause en haut',
        reps: '10',
        exerciseId: 'crunchpause',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Dead bug',
        reps: '8 / côté',
        exerciseId: 'deadbug',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Bird dog',
        reps: '8 / côté',
        exerciseId: 'birddog',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Planche sur les genoux',
        reps: '20 sec',
        exerciseId: 'planche',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Reverse crunch',
        reps: '8',
        exerciseId: 'reversecrunch',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
    ],
  },
  {
    id: 'c_tabata',
    name: 'Circuit Abdos Tabata (4 min)',
    focus: '20 sec d’effort, 10 sec de repos, sans pause entre les mouvements.',
    rounds: 2,
    durationMinutes: 6,
    exercises: [
      {
        name: 'Mountain climbers',
        reps: '20 sec',
        exerciseId: 'mountain',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Bicycle crunch',
        reps: '20 sec',
        exerciseId: 'bicycle',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Flutter kicks',
        reps: '20 sec',
        exerciseId: 'flutter',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Planche',
        reps: '20 sec',
        exerciseId: 'planche',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
    ],
  },
  {
    id: 'c_pilates',
    name: 'Circuit Abdos Pilates',
    focus: 'Lent, contrôlé, le nombril rentré à chaque répétition.',
    rounds: 3,
    durationMinutes: 11,
    exercises: [
      {
        name: 'Dead bug',
        reps: '10 / côté',
        exerciseId: 'deadbug',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Hollow hold',
        reps: '20 sec',
        exerciseId: 'hollow',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Reverse crunch',
        reps: '10',
        exerciseId: 'reversecrunch',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Side to Side Leg Raises',
        reps: '10 / côté',
        exerciseId: 'sidelegraises',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Bird dog',
        reps: '8 / côté',
        exerciseId: 'birddog',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
    ],
  },
  {
    id: 'c_taille',
    name: 'Circuit Taille fine',
    focus: 'Transverse et obliques pour une taille dessinée.',
    rounds: 3,
    durationMinutes: 9,
    exercises: [
      {
        name: 'Stomach Vacuum',
        reps: '15 sec',
        exerciseId: 'vacuum',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Planche latérale',
        reps: '30 sec / côté',
        exerciseId: 'planchelat',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Russian twist',
        reps: '20',
        exerciseId: 'russian',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Oblique Bends',
        reps: '12 / côté',
        exerciseId: 'obliquebends',
        position: 'Debout, charge en main, ventre serré.',
      },
    ],
  },
  {
    id: 'c_express5',
    name: 'Circuit Abdos Express (5 min)',
    focus: 'Quatre mouvements, deux tours, parfait en fin de séance.',
    rounds: 2,
    durationMinutes: 6,
    exercises: [
      {
        name: 'Mini crunch, pause en haut',
        reps: '15',
        exerciseId: 'crunchpause',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Leg raises',
        reps: '12',
        exerciseId: 'legraises',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Russian twist',
        reps: '20',
        exerciseId: 'russian',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Planche',
        reps: '45 sec',
        exerciseId: 'planche',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
    ],
  },
  {
    id: 'c_dos',
    name: 'Circuit Abdos sans douleur au dos',
    focus: 'Aucun mouvement qui tire sur les lombaires.',
    rounds: 3,
    durationMinutes: 9,
    exercises: [
      {
        name: 'Dead bug',
        reps: '8 / côté',
        exerciseId: 'deadbug',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
      {
        name: 'Bird dog',
        reps: '8 / côté',
        exerciseId: 'birddog',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Planche sur les genoux',
        reps: '30 sec',
        exerciseId: 'planche',
        position: 'Installe-toi sur le tapis, ventre serré.',
      },
      {
        name: 'Bridge Knee Drives',
        reps: '10 / côté',
        exerciseId: 'kneedrives',
        position: 'Allongée ou assise sur le tapis, ventre gainé.',
      },
    ],
  },
]
export const CARDIO_SESSIONS: CardioSession[] = [
  {
    id: 'k_stair',
    name: 'Circuit Cardio : StairMaster Finisher',
    machine: 'StairMaster',
    rounds: 3,
    durationMinutes: 18,
    intensity: '3 tours',
    description: '3 min niv. 5 · 2 min niv. 8 · 1 min niv. 10 · 45 sec niv. 12.',
    intervals: [
      {
        time: '3 min · niveau 5',
        instruction: 'StairMaster',
      },
      {
        time: '2 min · niveau 8',
        instruction: 'StairMaster',
      },
      {
        time: '1 min · niveau 10',
        instruction: 'StairMaster',
      },
      {
        time: '45 sec · niveau 12',
        instruction: 'StairMaster',
      },
    ],
  },
  {
    id: 'k_cote',
    name: 'Circuit Cardio : Marche en côte',
    machine: 'Tapis',
    rounds: 4,
    durationMinutes: 28,
    intensity: '4 tours',
    description: 'Pentes qui montent.',
    intervals: [
      {
        time: '2 min · pente 8 %',
        instruction: 'Tapis',
      },
      {
        time: '2 min · pente 10 %',
        instruction: 'Tapis',
      },
      {
        time: '1 min · pente 12 %',
        instruction: 'Tapis',
      },
      {
        time: '2 min · pente 2 %',
        instruction: 'Récup',
      },
    ],
  },
  {
    id: 'k_fract',
    name: 'Circuit Cardio : Fractionné au tapis',
    machine: 'Course',
    rounds: 8,
    durationMinutes: 16,
    intensity: '8 tours',
    description: 'Course et marche.',
    intervals: [
      {
        time: '1 min · 8 km/h',
        instruction: 'Course',
      },
      {
        time: '1 min · 4,5 km/h',
        instruction: 'Marche',
      },
    ],
  },
  {
    id: 'k_velo',
    name: 'Circuit Cardio : Sprints au vélo',
    machine: 'Sprint',
    rounds: 8,
    durationMinutes: 4,
    intensity: '8 tours',
    description: '30 sec à fond.',
    intervals: [
      {
        time: '30 sec · résistance 8',
        instruction: 'Sprint',
      },
      {
        time: '90 sec · résistance 3',
        instruction: 'Récup',
      },
    ],
  },
  {
    id: 'k_ellip',
    name: 'Circuit Cardio : Pyramide à l’elliptique',
    machine: 'Elliptique',
    rounds: 2,
    durationMinutes: 18,
    intensity: '2 tours',
    description: 'Résistance qui monte et redescend.',
    intervals: [
      {
        time: '1 min · rés. 6',
        instruction: 'Elliptique',
      },
      {
        time: '2 min · rés. 8',
        instruction: 'Elliptique',
      },
      {
        time: '3 min · rés. 10',
        instruction: 'Elliptique',
      },
      {
        time: '2 min · rés. 8',
        instruction: 'Elliptique',
      },
      {
        time: '1 min · rés. 6',
        instruction: 'Elliptique',
      },
    ],
  },
  {
    id: 'k_rameur',
    name: 'Circuit Cardio : Intervalles au rameur',
    machine: 'Rameur',
    rounds: 4,
    durationMinutes: 4,
    intensity: '4 tours',
    description: '500 m soutenus.',
    intervals: [
      {
        time: '500 m · allure soutenue',
        instruction: 'Rameur',
      },
      {
        time: '1 min',
        instruction: 'Repos',
      },
    ],
  },
  {
    id: 'k_stair20',
    name: 'Circuit Cardio : StairMaster continu',
    machine: 'StairMaster',
    rounds: 1,
    durationMinutes: 20,
    intensity: 'Continu',
    description: '20 minutes à rythme régulier.',
    intervals: [
      {
        time: '20 min · niveau 6',
        instruction: 'StairMaster',
      },
    ],
  },
  {
    id: 'k_express',
    name: 'Circuit Cardio : 12-5-30 Express',
    machine: 'Marche inclinée',
    rounds: 1,
    durationMinutes: 8,
    intensity: 'Continu',
    description: 'Tapis 12 %, 5 km/h, mains libres.',
    intervals: [
      {
        time: '8 min · pente 12 %',
        instruction: 'Marche inclinée',
      },
    ],
  },
  {
    id: 'k_pyramid',
    name: 'Circuit Cardio : Pyramide Sprint',
    machine: 'Sprint',
    rounds: 2,
    durationMinutes: 4,
    intensity: '2 tours',
    description: 'Rameur ou Assault Bike.',
    intervals: [
      {
        time: '10 s / 10 s repos',
        instruction: 'Sprint',
      },
      {
        time: '20 s / 20 s repos',
        instruction: 'Sprint',
      },
      {
        time: '30 s / 30 s repos',
        instruction: 'Sprint',
      },
      {
        time: '20 s / 20 s repos',
        instruction: 'Sprint',
      },
    ],
  },
  {
    id: 'k_ellsteady',
    name: 'Circuit Cardio : Elliptique tranquille',
    machine: 'Elliptique',
    rounds: 1,
    durationMinutes: 25,
    intensity: 'Continu',
    description: 'Récupération active.',
    intervals: [
      {
        time: '25 min · rés. 5',
        instruction: 'Elliptique',
      },
    ],
  },
  {
    id: 'k_pdc',
    name: 'Circuit Cardio : HIIT sans machine',
    machine: 'Jumping jacks',
    rounds: 3,
    durationMinutes: 4,
    intensity: '3 tours',
    description: 'Au poids du corps, à faire n’importe où. 40 sec d’effort, 20 sec de repos.',
    intervals: [
      {
        time: '40 sec',
        instruction: 'Jumping jacks',
      },
      {
        time: '40 sec',
        instruction: 'Mountain climbers',
      },
      {
        time: '40 sec',
        instruction: 'Squats sautés',
      },
      {
        time: '40 sec',
        instruction: 'Montées de genoux',
      },
      {
        time: '60 sec',
        instruction: 'Repos',
      },
    ],
  },
  {
    id: 'k_stairint',
    name: 'Circuit Cardio : StairMaster intervalles',
    machine: 'StairMaster',
    rounds: 8,
    durationMinutes: 16,
    intensity: '8 tours',
    description: 'Une minute intense, une minute tranquille.',
    intervals: [
      {
        time: '1 min · niveau 10',
        instruction: 'StairMaster',
      },
      {
        time: '1 min · niveau 5',
        instruction: 'StairMaster',
      },
    ],
  },
  {
    id: 'k_cote20',
    name: 'Circuit Cardio : Côte progressive (20 min)',
    machine: 'Tapis',
    rounds: 1,
    durationMinutes: 20,
    intensity: 'Continu',
    description: 'La pente monte toutes les 4 minutes, vitesse fixe autour de 5 km/h.',
    intervals: [
      {
        time: '4 min · pente 5 %',
        instruction: 'Tapis',
      },
      {
        time: '4 min · pente 8 %',
        instruction: 'Tapis',
      },
      {
        time: '4 min · pente 11 %',
        instruction: 'Tapis',
      },
      {
        time: '4 min · pente 14 %',
        instruction: 'Tapis',
      },
      {
        time: '4 min · pente 3 %',
        instruction: 'Tapis',
      },
    ],
  },
  {
    id: 'k_combo3',
    name: 'Circuit Cardio : Combo 3 machines (30 min)',
    machine: 'Rameur',
    rounds: 1,
    durationMinutes: 30,
    intensity: 'Continu',
    description: '10 minutes sur chaque machine pour ne pas s’ennuyer.',
    intervals: [
      {
        time: '10 min · allure modérée',
        instruction: 'Rameur',
      },
      {
        time: '10 min · résistance 6',
        instruction: 'Vélo',
      },
      {
        time: '10 min · rés. 7',
        instruction: 'Elliptique',
      },
    ],
  },
  {
    id: 'k_rameurpyr',
    name: 'Circuit Cardio : Pyramide au rameur',
    machine: 'Rameur',
    rounds: 1,
    durationMinutes: 4,
    intensity: 'Continu',
    description: '250 m, 500 m, 750 m, 500 m, 250 m, avec 1 min de repos entre chaque.',
    intervals: [
      {
        time: '250 m',
        instruction: 'Rameur',
      },
      {
        time: '500 m',
        instruction: 'Rameur',
      },
      {
        time: '750 m',
        instruction: 'Rameur',
      },
      {
        time: '500 m',
        instruction: 'Rameur',
      },
      {
        time: '250 m',
        instruction: 'Rameur',
      },
    ],
  },
]
export const FINISHERS: FinisherPreset[] = [
  {
    id: 'finisher-tabata-core-30-15',
    name: '30/15 Tabata Core (4 min)',
    category: 'abs',
    categoryLabel: 'Abdos & Gainage',
    durationLabel: '4 min',
    totalDurationSeconds: 240,
    executionMode: 'interval',
    summary: '4 tours de [30s Hollow Rock ou Gainage / 15s repos + 30s Crunchs ou Relevés de bassin / 15s repos].',
    instructions: [
      'Alternez 30 secondes d’effort intense et 15 secondes de récupération pendant 4 tours complets.',
      'Exercice A : Hollow Rock (position cuillère) ou Gainage ventral.',
      'Exercice B : Crunchs contrôlés ou Relevés de bassin au sol.',
      'Gardez le nombril aspiré et les lombaires plaquées au tapis sur les exercices sur le dos.',
    ],
    intervals: [
      {
        label: 'Tour 1/4 — Hollow Rock ou Gainage',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Aspirez le nombril et verrouillez la sangle abdominale !',
      },
      {
        label: 'Tour 1/4 — Repos rapide',
        type: 'rest',
        durationSeconds: 15,
        cue: 'Respirez profondément, préparez-vous pour les Crunchs / Relevés de bassin.',
      },
      {
        label: 'Tour 1/4 — Crunchs ou Relevés de bassin',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Expirez à chaque contraction, décollez le bassin sans élan.',
      },
      {
        label: 'Tour 1/4 — Repos',
        type: 'rest',
        durationSeconds: 15,
        cue: 'Soufflez, prochain tour en gainage !',
      },
      {
        label: 'Tour 2/4 — Hollow Rock ou Gainage',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Aspirez le nombril et verrouillez la sangle abdominale !',
      },
      {
        label: 'Tour 2/4 — Repos rapide',
        type: 'rest',
        durationSeconds: 15,
        cue: 'Respirez profondément, préparez-vous pour les Crunchs / Relevés de bassin.',
      },
      {
        label: 'Tour 2/4 — Crunchs ou Relevés de bassin',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Expirez à chaque contraction, décollez le bassin sans élan.',
      },
      {
        label: 'Tour 2/4 — Repos',
        type: 'rest',
        durationSeconds: 15,
        cue: 'Soufflez, prochain tour en gainage !',
      },
      {
        label: 'Tour 3/4 — Hollow Rock ou Gainage',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Aspirez le nombril et verrouillez la sangle abdominale !',
      },
      {
        label: 'Tour 3/4 — Repos rapide',
        type: 'rest',
        durationSeconds: 15,
        cue: 'Respirez profondément, préparez-vous pour les Crunchs / Relevés de bassin.',
      },
      {
        label: 'Tour 3/4 — Crunchs ou Relevés de bassin',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Expirez à chaque contraction, décollez le bassin sans élan.',
      },
      {
        label: 'Tour 3/4 — Repos',
        type: 'rest',
        durationSeconds: 15,
        cue: 'Soufflez, prochain tour en gainage !',
      },
      {
        label: 'Tour 4/4 — Hollow Rock ou Gainage',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Aspirez le nombril et verrouillez la sangle abdominale !',
      },
      {
        label: 'Tour 4/4 — Repos rapide',
        type: 'rest',
        durationSeconds: 15,
        cue: 'Respirez profondément, préparez-vous pour les Crunchs / Relevés de bassin.',
      },
      {
        label: 'Tour 4/4 — Crunchs ou Relevés de bassin',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Expirez à chaque contraction, décollez le bassin sans élan.',
      },
      {
        label: 'Récupération finale',
        type: 'rest',
        durationSeconds: 15,
        cue: 'Dernières secondes avant la victoire !',
      },
    ],
  },
  {
    id: 'finisher-plank-no-pause-3m',
    name: 'Plank Finisher sans pause (3 min)',
    category: 'abs',
    categoryLabel: 'Abdos & Gainage',
    durationLabel: '3 min',
    totalDurationSeconds: 180,
    executionMode: 'countdown',
    summary: '1 min gainage ventral + 1 min latéral droit (pulsations) + 1 min latéral gauche sans poser les genoux.',
    instructions: [
      '0:00 à 1:00 — Gainage ventral sur les avant-bras, fessiers et abdos contractés.',
      '1:00 à 2:00 — Pivotez directement en gainage latéral DROIT avec petites pulsations de hanche.',
      '2:00 à 3:00 — Pivotez en gainage latéral GAUCHE avec pulsations sans jamais poser les genoux au sol !',
    ],
    phaseAlerts: [
      {
        atElapsedSeconds: 0,
        label: 'Phase 1/3 : Gainage Ventral (60s)',
        cue: 'Corps aligné, coudes sous les épaules, serrez les fessiers !',
      },
      {
        atElapsedSeconds: 60,
        label: 'Phase 2/3 : Gainage Latéral DROIT + Pulsations (60s)',
        cue: 'PIVOT ! Passez sur le côté droit sans poser les genoux et pulsez la hanche vers le plafond.',
      },
      {
        atElapsedSeconds: 120,
        label: 'Phase 3/3 : Gainage Latéral GAUCHE + Pulsations (60s)',
        cue: 'DERNIÈRE MINUTE ! Pivotez côté gauche, tenez bon jusqu’au bout !',
      },
    ],
  },
  {
    id: 'finisher-cardio-12-5-30-express',
    name: '12-5-30 Express (5 à 8 min)',
    category: 'cardio',
    categoryLabel: 'Cardio & Brûle-graisse',
    durationLabel: '6 min',
    totalDurationSeconds: 360,
    executionMode: 'countdown',
    summary: 'Tapis de course à 12% d’inclinaison, vitesse 5 km/h en marche active sans se tenir aux poignées.',
    instructions: [
      'Réglez immédiatement votre tapis de course sur Inclinaison 12% et Vitesse 5,0 km/h.',
      'Ne vous tenez PAS aux poignées : balancez les bras naturellement pour engager le gainage et les fessiers.',
      'Poussez fort dans les talons à chaque pas pour recruter toute la chaîne postérieure.',
    ],
    phaseAlerts: [
      {
        atElapsedSeconds: 0,
        label: 'Départ Marche Inclinée 12% · 5 km/h',
        cue: 'Lâchez les poignées, buste fier et regard droit devant.',
      },
      {
        atElapsedSeconds: 180,
        label: 'Mi-parcours (3 min restantes)',
        cue: 'Gardez la cadence à 5 km/h, respirez par le nez et poussez dans les talons !',
      },
      {
        atElapsedSeconds: 300,
        label: 'Sprint final (Dernière minute !)',
        cue: 'Plus que 60 secondes à 12% de pente, ne lâchez rien !',
      },
    ],
  },
  {
    id: 'finisher-stairmaster-burn-5m',
    name: 'StairMaster Brûle-Cuisses (5 min)',
    category: 'cardio',
    categoryLabel: 'Cardio & Brûle-graisse',
    durationLabel: '5 min',
    totalDurationSeconds: 300,
    executionMode: 'countdown',
    summary: 'Escalier mécanique non-stop à rythme soutenu (alternance pas simples rapides et marches 2 par 2).',
    instructions: [
      'Montez sur le StairMaster à un niveau soutenu (Niv. 8 à 11).',
      'Minutes 1 à 2 : Pas réguliers dynamiques sans s’appuyer sur les rampes.',
      'Minutes 2 à 4 : Montez les marches 2 par 2 en ancrant tout le talon pour brûler les fessiers.',
      'Minute 5 : Sprint final à cadence maximale !',
    ],
    phaseAlerts: [
      {
        atElapsedSeconds: 0,
        label: 'Minutes 1-2 : Cadence soutenue (Niv. 8-9)',
        cue: 'Buste légèrement penché en avant, mains libres ou simple effleurement.',
      },
      {
        atElapsedSeconds: 120,
        label: 'Minutes 3-4 : Marches 2 par 2 (Focus Fessiers)',
        cue: 'Enjambez une marche sur deux en poussant fort dans le talon !',
      },
      {
        atElapsedSeconds: 240,
        label: 'Minute 5 : Rush Final (Niv. 10-12)',
        cue: '60 secondes à fond pour terminer la séance en beauté !',
      },
    ],
  },
  {
    id: 'finisher-pyramide-sprint-4m',
    name: 'Pyramide Sprint (4 min)',
    category: 'cardio',
    categoryLabel: 'Cardio & Brûle-graisse',
    durationLabel: '4 min',
    totalDurationSeconds: 240,
    executionMode: 'interval',
    summary: 'Rameur ou Assault Bike (10s sprint/10s repos, 20s/20s, 30s/30s, puis redescente).',
    instructions: [
      'Installez-vous sur un Rameur Concept2, un Assault Bike ou un Vélo spinning.',
      'Enchaînez la pyramide montante (10s/10s → 20s/20s → 30s/30s → 30s/30s) puis redescendez (20s/20s → 10s/10s).',
      'Chaque phase Effort doit être réalisée à 95-100% d’intensité explosive.',
    ],
    intervals: [
      {
        label: 'Palier 1 — Sprint Explosif (10s)',
        type: 'effort',
        durationSeconds: 10,
        cue: 'Sprint maximal dès la première seconde !',
      },
      {
        label: 'Palier 1 — Récupération (10s)',
        type: 'rest',
        durationSeconds: 10,
        cue: 'Ralentissez tout doux, respirez.',
      },
      {
        label: 'Palier 2 — Sprint Soutenu (20s)',
        type: 'effort',
        durationSeconds: 20,
        cue: '20 secondes à fond, cadence maximale !',
      },
      {
        label: 'Palier 2 — Récupération (20s)',
        type: 'rest',
        durationSeconds: 20,
        cue: 'Calmez le souffle avant le sommet de la pyramide.',
      },
      {
        label: 'Sommet 1 — Sprint Long (30s)',
        type: 'effort',
        durationSeconds: 30,
        cue: '30 secondes de puissance pure, tenez le rythme !',
      },
      {
        label: 'Sommet 1 — Récupération (30s)',
        type: 'rest',
        durationSeconds: 30,
        cue: 'Inspirez profondément par le nez.',
      },
      {
        label: 'Sommet 2 — Sprint Long (30s)',
        type: 'effort',
        durationSeconds: 30,
        cue: 'Deuxième passage de 30s, attaquez la redescente !',
      },
      {
        label: 'Sommet 2 — Récupération (30s)',
        type: 'rest',
        durationSeconds: 30,
        cue: 'Superbe ! Il ne reste que la redescente.',
      },
      {
        label: 'Redescente — Sprint (20s)',
        type: 'effort',
        durationSeconds: 20,
        cue: '20 secondes explosives !',
      },
      {
        label: 'Redescente — Récupération (20s)',
        type: 'rest',
        durationSeconds: 20,
        cue: 'Préparez-vous pour les 10 dernières secondes.',
      },
      {
        label: 'Sprint Final All-Out (10s)',
        type: 'effort',
        durationSeconds: 10,
        cue: 'VIDEZ TOUT LE RÉSERVOIR SUR 10 SECONDES !',
      },
      {
        label: 'Retour au calme (10s)',
        type: 'rest',
        durationSeconds: 10,
        cue: 'Bravo, pyramide terminée !',
      },
    ],
  },
  {
    id: 'finisher-drop-set-mecanique',
    name: 'Drop-Set Mécanique',
    category: 'pump',
    categoryLabel: 'Pump & Congestion',
    durationLabel: '3-4 min',
    totalDurationSeconds: 180,
    executionMode: 'stopwatch',
    summary: '2 séries à l’échec total avec charge légère sur le dernier exercice effectué (1 min de repos entre les deux).',
    instructions: [
      'Conservez le dernier exercice de votre séance et baissez la charge de 30 à 40%.',
      'Série 1 : Allez jusqu’à l’échec musculaire complet avec un tempo contrôlé (brûlure maximale).',
      'Prenez exactement 60 secondes de repos.',
      'Série 2 : Repartez jusqu’à l’échec total pour gorger le muscle de sang (congestion maximale).',
    ],
    targetSets: 2,
    restBetweenSetsSeconds: 60,
  },
  {
    id: 'finisher-challenge-100-reps',
    name: 'Challenge 100 Reps',
    category: 'pump',
    categoryLabel: 'Pump & Congestion',
    durationLabel: 'Time Cap 5 min',
    totalDurationSeconds: 300,
    executionMode: 'stopwatch',
    summary:
      'Choisir 1 exercice léger/poids du corps (squats, fentes, pompes, élévations) et valider 100 répétitions le plus vite possible.',
    instructions: [
      'Sélectionnez votre mouvement cible (ex: Hip Abductions, Glute Bridges, Squats poids du corps, Élévations latérales légères ou Kickbacks).',
      'Lancez le chronomètre et validez 100 répétitions au total le plus vite possible.',
      'Vous pouvez prendre des micro-pauses de 5 secondes (Rest-Pause) dès que ça brûle, mais ne lâchez rien avant 100 !',
      'Appuyez sur "Terminé" dès la 100e répétition pour enregistrer votre record de temps.',
    ],
    targetReps: 100,
    selectableExercises: [
      'Glute Bridges au sol',
      'Abductions avec bande élastique',
      'Squats poids du corps',
      'Élévations latérales (haltères légers)',
      'Fentes alternées dynamiques',
      'Pushdowns Triceps à la corde',
    ],
  },
]

export const CARDIO_FINISHER_IDEAS: string[] = [
  '15 min Marche inclinée 12-5-30 (12% pente, 5 km/h)',
  '12 min StairMaster fessiers tempo régulier (sans se tenir)',
  '10 min Rameur fractionné 30s sprint / 30s récup',
  '15 min Vélo elliptique pyramide résistances',
  '20 min Marche inclinée brûle-graisse (pente 8-10%, 5.2 km/h)',
  '12 min HIIT Vélo : 20s sprint max / 40s souple',
  '10 min Corde à sauter / Jumping Jacks (45s effort / 15s repos)',
  '15 min Escalier (StairMaster) pas croisés & kickbacks',
]

export const ABS_FINISHER_IDEAS: string[] = [
  'Circuit Gainage Global & Obliques 7 min (Planche + Commando)',
  'Stomach Vacuum (5 x 20s) + Deadbug contrôlé (3 x 12)',
  'Hollow Body Hold & Crunchs contrôlés (3 x 15 reps)',
  'Relevés de bassin au sol & Chandelles (3 x 12 reps)',
  'Circuit Pilates Core : Deadbug, Bird-Dog & Planche latérale',
  'Russian Twists avec disque 5kg & Planche lestée 45s',
  'Crunch poulie haute à genoux (3 x 15) + Gainage 60s',
]

export const ABS_FINISHER_OPTIONS: string[] = [
  'Circuit Abdos Debout avec Charge (3 tours) (14 min · Gainage debout, Obliques, Transverse & Ceinture 360° (sans s’allonger))',
  'Circuit Abdos Complet & Planche Lestée 60s (3 tours) (16 min · Bas des abdos, Grand droit, Obliques & Planche lestée sur le dos)',
  'Circuit Over-Unders, Cocoon & Plate Hollow Hold (3 tours) (15 min · Endurance abdominale (Séries de 20), Dead Bugs lestés & Hollow Hold au max)',
  'Circuit Abdos Lestés & Bridge Knee Drives (3 tours) (14 min · Force abdominale avec haltère, Gainage pelvien & Obliques (Séries de 12))',
  'Circuit Global 360° : Abdos Complets & Gainage (14 min · Transverse + Grand Droit + Obliques + Gainage statique et dynamique)',
  'Circuit Sablier & Ceinture Gainée Totale (12 min · Transverse profond (Vacuum) + Taille fine + Gainage anti-rotation)',
  'Circuit Full Core Athlétique & Définition (12 min · Haut et bas des abdos + Gainage fonctionnel)',
  'Circuit Transverse Profond & Ventre Ultra-Plat (10 min · Transverse profond & décompression)',
  'Stomach Vacuum (5 x 20s) + Planche active 60s',
]

/** Options de finisher cardio proposées dans le planning. */
export const CARDIO_FINISHER_OPTIONS: string[] = [
  ...CARDIO_SESSIONS.map((e) => `${e.name.replace(/^\d+\.\s*/, '')} (${e.machine} · ${e.durationMinutes} min)`),
  'Marche inclinée Débutant : Inclinaison 6 · Vitesse 4,5 · 20 min',
  'Marche inclinée Intermédiaire : Inclinaison 10 · Vitesse 4,5 · 30 min',
  'Marche inclinée Confirmée 12-5-30 : Inclinaison 12 · Vitesse 5 · 30 min',
]

/** Finishers de l'app d'origine, par type. */
export const LEGACY_FINISHERS: Record<string, { name: string; minutes: number; description: string }[]> = {
  abdos: [
    {
      name: '30/15 Tabata Core',
      minutes: 4,
      description: '30 s d’effort / 15 s de repos : crunch, planche, russian twist, leg raises.',
    },
    {
      name: 'Planche lestée 60 s',
      minutes: 3,
      description: '3 × 60 s de planche, 30 s de repos.',
    },
    {
      name: 'Challenge 100 reps abdos',
      minutes: 5,
      description: '100 reps à répartir : crunch, flutter kicks, russian twist.',
    },
  ],
  cardio: [
    {
      name: '12-5-30 Express (5 à 8 min)',
      minutes: 6,
      description: 'Tapis de course à 12 % d’inclinaison, vitesse 5 km/h en marche active sans se tenir aux poignées.',
    },
    {
      name: 'StairMaster Brûle-Cuisses (5 min)',
      minutes: 5,
      description: 'Escalier mécanique non-stop à rythme soutenu (alternance pas simples rapides et marches 2 par 2).',
    },
    {
      name: 'Pyramide Sprint (4 min)',
      minutes: 4,
      description: 'Rameur ou Assault Bike (10 s sprint / 10 s repos, 20 s / 20 s, 30 s / 30 s, puis redescente).',
    },
  ],
  pump: [
    {
      name: 'Challenge 100 reps',
      minutes: 5,
      description: '100 reps sur ton dernier exercice avec une charge légère, pauses courtes autorisées.',
    },
    {
      name: 'Drop-set mécanique',
      minutes: 4,
      description: '3 séries de 20 reps en baissant la charge sans pause.',
    },
    {
      name: 'Finisher sans pause (3 min)',
      minutes: 3,
      description: 'Enchaîne 3 minutes sans t’arrêter sur un exercice d’isolation.',
    },
  ],
}
