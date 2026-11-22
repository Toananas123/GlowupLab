// Données reprises de l'app d'origine.
import type { GearItem } from '../types'
export const WARMUPS: Record<string, { warmup: string[]; cooldown?: string[]; [k: string]: unknown }> = {
  "lower-body": {
    "warmup": [
      "3 min de marche inclinée ou vélo pour monter la température corporelle",
      "Rotations articulaires des hanches et des chevilles (10 de chaque côté)",
      "15 Squats au poids du corps avec pause de 2 sec en bas",
      "10 Fentes avant alternées avec ouverture de hanche",
      "2 séries légères de montée en charge sur le premier exercice"
    ],
    "cooldown": [
      "Étirement du grand fessier au sol (figure en 4) - 45s par côté",
      "Étirement des ischio-jambiers assis jambe tendue - 45s",
      "Étirement des quadriceps debout en ramenant le talon à la fesse - 45s",
      "Respiration ventrale apaisante 2 minutes"
    ]
  },
  "glutes": {
    "warmup": [
      "Activation à l’élastique : 20 pas de crabe latéraux",
      "20 Ponts fessiers au sol au poids du corps avec contraction 2s au sommet",
      "15 Clamshells par côté pour réveiller le moyen fessier",
      "Montée progressive en charge sur le Hip Thrust"
    ],
    "cooldown": [
      "Étirement du pigeon au sol pour ouvrir les fessiers en profondeur - 60s par côté",
      "Posture de l’enfant (Child pose) bras étirés vers l’avant - 1 min",
      "Automassage ou relâchement des hanches"
    ]
  },
  "back": {
    "warmup": [
      "Chat-Chameau (Cat-Cow) à 4 pattes pour délier la colonne - 10 répétitions",
      "Dislocations d’épaules au manche à balai ou élastique - 12 répétitions",
      "Band Pull-Apart (écarté élastique à hauteur de poitrine) - 15 répétitions",
      "1 série légère de tirage vertical à 40% de la charge"
    ],
    "cooldown": [
      "Étirement du grand dorsal suspendue à une barre ou en tenant un montant - 45s",
      "Posture du sphinx pour soulager les lombaires - 45s",
      "Enroulement des épaules vers l’arrière et respiration"
    ]
  },
  "pecs": {
    "warmup": [
      "Moulinets d’épaules et ouverture dynamique de la cage thoracique - 15 répétitions",
      "Rotations externes à l’élastique pour chauffer la coiffe des rotateurs - 15 par bras",
      "10 Pompes inclinées mains sur banc en contrôlant la descente",
      "1 série légère à 50% sur le premier développé"
    ],
    "cooldown": [
      "Étirement des pectoraux bras appuyé contre un montant de porte - 45s par côté",
      "Ouverture thoracique mains croisées dans le dos - 45s",
      "Relâchement des épaules et des triceps"
    ]
  },
  "arms": {
    "warmup": [
      "Moulinets de bras avant et arrière - 15 répétitions",
      "Rotations de poignets et étirements doux des avant-bras",
      "Rotations externes à l’élastique pour la coiffe des rotateurs - 15 par bras",
      "Élévations latérales avec poids de 1 ou 2 kg pour chauffer les deltoïdes"
    ],
    "cooldown": [
      "Étirement des triceps bras plié derrière la tête - 45s par bras",
      "Étirement de la poitrine et de l’avant de l’épaule contre un mur - 45s par côté",
      "Relâchement des trapèzes"
    ]
  },
  "abs": {
    "warmup": [
      "Bascule du bassin au sol (antéversion / rétroversion) - 10 répétitions",
      "Planche douce sur les genoux - 30 secondes",
      "Mobilisation de la cage thoracique par grandes inspirations"
    ],
    "cooldown": [
      "Posture du cobra doux (extension abdominale sans forcer sur les lombaires) - 45s",
      "Torsion douce au sol genoux sur le côté - 45s par côté"
    ]
  },
  "cardio": {
    "warmup": [
      "3 minutes à allure très modérée sur la machine choisie",
      "Mobilisation des chevilles, genoux et épaules",
      "2 accélérations progressives de 15 secondes pour préparer le coeur"
    ],
    "cooldown": [
      "3 minutes de marche lente de retour au calme (rythme cardiaque < 100 bpm)",
      "Étirement des mollets contre un mur - 45s par jambe",
      "Hydratation abondante à petites gorgées"
    ]
  }
}

export const FOOT_PLACEMENT_GUIDE = [
  {
    "id": "high-center",
    "title": "1. Pieds hauts au centre",
    "focus": "Fessiers & Ischio-jambiers",
    "description": "En plaçant les pieds vers le sommet du plateau, l’angle de flexion de hanche augmente considérablement, reportant la majeure partie de la tension mécanique sur les fessiers et l’arrière des cuisses.",
    "recommendation": "Idéal pour le développement du galbe fessier. Poussez principalement avec vos talons."
  },
  {
    "id": "high-wide",
    "title": "2. Pieds hauts écartés (Large)",
    "focus": "Grand fessier & Adducteurs profonds",
    "description": "Pieds au sommet du plateau, écartés au-delà des épaules avec pointes ouvertes à 35°. Maximise l’étirement du grand fessier à la descente et active les adducteurs.",
    "recommendation": "Gardez les genoux bien ouverts dans l’alignement des pointes de pieds à chaque rep."
  },
  {
    "id": "high-narrow",
    "title": "3. Pieds hauts serrés (Étroit)",
    "focus": "Haut des fessiers & Ischios externes",
    "description": "Pieds placés haut et rapprochés (largeur de bassin). Favorise l’étirement fessier supérieur tout en sollicitant le chef long des ischios.",
    "recommendation": "Assurez-vous que vos lombaires restent solidement calées au dossier en bas de mouvement."
  },
  {
    "id": "standard-center",
    "title": "4. Pieds au milieu (Neutre)",
    "focus": "Quadriceps & Fessiers (Équilibre)",
    "description": "Position biomécanique standard, pieds largeur des épaules au centre du plateau. Répartition harmonieuse entre la face avant et la face arrière de la cuisse.",
    "recommendation": "Parfaite pour travailler la puissance générale des jambes avec des charges progressives."
  },
  {
    "id": "low-center",
    "title": "5. Pieds bas au centre",
    "focus": "Quadriceps complets",
    "description": "Une position basse accentue la flexion du genou et maximise l’étirement des quadriceps. Nécessite une bonne mobilité de cheville.",
    "recommendation": "Idéal pour sculpter l’avant des cuisses. Gardez les talons en contact constant avec le plateau."
  },
  {
    "id": "low-narrow",
    "title": "6. Pieds bas serrés",
    "focus": "Vaste externe (Galbe galbé extérieur)",
    "description": "Position basse avec pieds espacés de 10 à 15 cm. Focalise le recrutement sur la portion externe du quadriceps pour accentuer le dessin de la cuisse.",
    "recommendation": "Descendez de manière très contrôlée sans rebond."
  },
  {
    "id": "low-wide",
    "title": "7. Pieds bas écartés",
    "focus": "Vaste interne (Médial) & Adducteurs",
    "description": "Pieds bas et espacés au-delà des épaules, pointes vers l’extérieur. Sollicite fortement le vaste interne (« goutte d’eau » au-dessus du genou) et les adducteurs.",
    "recommendation": "Conservez toujours un micro-fléchissement en fin de poussée."
  }
] as const

export const ROUTINE_TEMPLATES = [
  {
    "id": "back_sculpt_order",
    "label": "Dos Dessiné sans l’Élargir (Ordre 1-2-3-4)",
    "desc": "1. Milieu du dos · 2. Grand dorsal · 3. Arrière d’épaule · 4. Lombaires (Back Extension)",
    "icon": "dumbbell"
  },
  {
    "id": "dos_pecs",
    "label": "Séance Dos / Pecs (Upper Body Antagoniste)",
    "desc": "Combo haut du corps : 2 exos Dos + 2 exos Pecs pour une posture sculptée",
    "icon": "dumbbell"
  },
  {
    "id": "pecs_bras",
    "label": "Séance Pecs / Bras (Buste Tonique & Bras Fermes)",
    "desc": "Combo Push & Galbe : 2 exos Pecs + 2 exos Bras & Épaules",
    "icon": "biceps"
  },
  {
    "id": "pecs",
    "label": "Focus Pecs & Maintien du Buste",
    "desc": "Développé incliné, Chest Press, Pec-Deck Butterfly & Poulie vis-à-vis",
    "icon": "dumbbell"
  },
  {
    "id": "glutes",
    "label": "Fessiers uniquement (Booty Focus)",
    "desc": "Hip thrust, kickback poulie, abduction & fentes bulgares",
    "icon": "kettlebell"
  },
  {
    "id": "lower",
    "label": "Bas du corps complet (Ordre 1-2-3-4)",
    "desc": "Polyarticulaire lourd, unilatéral, ischios/quads & isolation fessiers",
    "icon": "kettlebell"
  },
  {
    "id": "abs",
    "label": "Circuits Abdos & Gainage (8 circuits)",
    "desc": "Debout avec charge, Planche lestée 60s, Over-Unders, 360°, Vacuum...",
    "icon": "stretch"
  },
  {
    "id": "cardio",
    "label": "Circuits Cardio Guidés (11 séances)",
    "desc": "Marche inclinée 12-5-30, StairMaster, Rameur, Elliptique, HIIT...",
    "icon": "runner"
  },
  {
    "id": "posterior",
    "label": "Chaîne postérieure (Fessiers & Ischios)",
    "desc": "RDL haltères, hip thrust, leg curl assis & banc lombaires",
    "icon": "kettlebell"
  },
  {
    "id": "quads_adductors",
    "label": "Quads Sculpt & Adducteurs Fermes",
    "desc": "Presse à cuisses, machine adducteurs, leg extension & squat sumo",
    "icon": "kettlebell"
  },
  {
    "id": "arms",
    "label": "Épaules Galbées & Bras Toniques",
    "desc": "Élévations latérales, développé militaire, triceps corde & curl incliné",
    "icon": "biceps"
  },
  {
    "id": "fullbody",
    "label": "Full Body Glow & Tonique",
    "desc": "Séance complète 4 mouvements polyarticulaires majeurs",
    "icon": "weightlifter"
  }
] as const

export const GEAR: Record<string, GearItem> = {
  "ceinture": {
    "id": "ceinture",
    "name": "Ceinture de force / maintien lombaire",
    "shortLabel": "Ceinture de force",
    "icon": "🥋",
    "reason": "Squats, RDL lourds & charges axiales",
    "tip": "Stabilise la pression intra-abdominale et sécurise tes lombaires sur les charges de travail."
  },
  "sangle_cheville": {
    "id": "sangle_cheville",
    "name": "Sangle chevillère pour poulie",
    "shortLabel": "Sangle chevillère",
    "icon": "🔗",
    "reason": "Kickbacks fessiers & abductions à la poulie",
    "tip": "Évite de courir après une sangle en salle et garantit une attache confortable et hygiénique."
  },
  "gants_grip": {
    "id": "gants_grip",
    "name": "Gants de musculation ou sangles de tirage (Grip)",
    "shortLabel": "Gants / Sangles grip",
    "icon": "🧤",
    "reason": "RDL, soulevé de terre & tirages lourds",
    "tip": "Prévient la fatigue prématurée des avant-bras et protège les paumes pour soulever plus lourd."
  },
  "elastique": {
    "id": "elastique",
    "name": "Élastique de résistance (Bande d’activation)",
    "shortLabel": "Élastique de résistance",
    "icon": "🎗️",
    "reason": "Échauffement & activation fessiers / haut du corps",
    "tip": "Idéal pour réveiller les moyens fessiers ou la coiffe des rotateurs avant de charger."
  },
  "manchon_barre": {
    "id": "manchon_barre",
    "name": "Manchon mousse pour barre (Barbell Pad)",
    "shortLabel": "Manchon de hanche",
    "icon": "🛡️",
    "reason": "Hip Thrust à la barre olympique",
    "tip": "Protège les crêtes iliaques et le pubis pour pousser fort sans douleur osseuse."
  }
}

export const BACK_ORDER_GUIDE = [
  {
    "number": "1",
    "title": "1. MILIEU DU DOS",
    "subtitle": "choisis-en 1 ou 2 :",
    "rule": "Le point commun de tous ces exos, c’est que les coudes sont ouverts / hauts pour cibler le relief et le dessin du milieu du dos sans élargir la taille.",
    "exercises": [
      "tirage horizontal prise large",
      "rowing prise large (libre ou smith)",
      "face pull (visant le menton)"
    ],
    "badgeColor": "bg-[#781539] text-white"
  },
  {
    "number": "2",
    "title": "2. GRAND DORSAL",
    "subtitle": "choisis-en 1 :",
    "rule": "C’est ces exos qui vont donner de la largeur au dos : on n’en choisit qu’un seul dans la séance pour tonifier sans élargir !",
    "exercises": [
      "tirage vertical",
      "tirage horizontal prise serrée",
      "tractions",
      "pull-over",
      "tirage unilatéral",
      "tirage bûcheron"
    ],
    "badgeColor": "bg-[#9D174D] text-white"
  },
  {
    "number": "3",
    "title": "3. ARRIÈRE D’ÉPAULE",
    "subtitle": "choisis-en 1 :",
    "rule": "On enchaîne avec un exo pour l’arrière d’épaule afin de redresser la posture et dessiner le haut du dos.",
    "exercises": [
      "oiseau inversé (Reverse Pec Deck)",
      "élévations arrières",
      "facepull (viser le front)"
    ],
    "badgeColor": "bg-[#BE185D] text-white"
  },
  {
    "number": "4",
    "title": "4. LOMBAIRES",
    "subtitle": "le seul et l’unique :",
    "rule": "Pour les lombaires, c’est le Back Extension : le seul et l’unique mouvement en fin de séance pour galber le bas du dos et la chute de reins.",
    "exercises": [
      "BACK EXTENSION (Banc à lombaires 45°)"
    ],
    "badgeColor": "bg-[#EA3E8E] text-white"
  }
] as const

export const LEG_DAY_STEPS = [
  {
    "num": 1,
    "type": "1 ou 2 exercices d'étirement",
    "examples": "RDL, squat, leg press, fentes bulgares, step-ups",
    "tag": "Étirement sous tension"
  },
  {
    "num": 2,
    "type": "1 exercice de contraction",
    "examples": "hip thrust, KAS glute bridge, back extension",
    "tag": "Pic de contraction"
  },
  {
    "num": 3,
    "type": "1 exercice unilatéraux",
    "examples": "fentes (bulgares/marchées/ arrières...), single leg press, single leg RDL",
    "tag": "Équilibre & symétrie"
  },
  {
    "num": 4,
    "type": "1 ou 2 exercice d'isolation",
    "examples": "leg curl, leg extension, kick back, abductions",
    "tag": "Brûlure & finition"
  }
] as const

export const LEG_DAY_CATEGORIES = [
  {
    "id": 1,
    "name": "Étirement",
    "countLabel": "1 ou 2 exercices d'étirement",
    "examples": "RDL, squat, leg press, fentes bulgares, step-ups"
  },
  {
    "id": 2,
    "name": "Contraction",
    "countLabel": "1 exercice de contraction",
    "examples": "hip thrust, KAS glute bridge, back extension"
  },
  {
    "id": 3,
    "name": "Unilatéral",
    "countLabel": "1 exercice unilatéraux",
    "examples": "fentes (bulgares/marchées/ arrières...), single leg press, single leg RDL"
  },
  {
    "id": 4,
    "name": "Isolation",
    "countLabel": "1 ou 2 exercice d'isolation",
    "examples": "leg curl, leg extension, kick back, abductions"
  }
] as const
