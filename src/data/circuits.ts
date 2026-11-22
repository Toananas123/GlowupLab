// Données reprises de l'app d'origine.
import type { AbsCircuit, CardioSession, FinisherPreset } from '../types'
export const ABS_CIRCUITS: AbsCircuit[] = [
  {
    "id": "abs-standing-weighted",
    "name": "1. Circuit Abdos Debout avec Charge (3 tours)",
    "focus": "Gainage debout, Obliques, Transverse & Ceinture 360° (sans s’allonger)",
    "durationMinutes": 14,
    "exercises": [
      {
        "name": "Overhead Marches (avec charge lourde)",
        "position": "Debout, disque ou haltère lourd tenu bras tendus au-dessus de la tête, montez haut chaque genou en gardant le buste gainé.",
        "reps": "3 x 10 reps (charge lourde)"
      },
      {
        "name": "Around the Body (avec charge lourde)",
        "position": "Debout, passez la charge lourde en cercle autour de votre taille d’une main à l’autre sans bouger le bassin.",
        "reps": "3 x 10 reps (charge lourde)"
      },
      {
        "name": "Around the Head / Halo (avec charge légère)",
        "position": "Debout, faites tourner un disque léger autour de votre tête en gardant les côtes abaissées et le ventre rentré.",
        "reps": "3 x 10 reps (charge légère)"
      },
      {
        "name": "Diagonal Plate Chops (avec charge légère)",
        "position": "Mouvement de bûcheron diagonal de l’épaule vers la hanche opposée en contractant les obliques.",
        "reps": "3 x 10 reps de chaque côté (charge légère)"
      },
      {
        "name": "Oblique Bends (avec charge lourde)",
        "position": "Debout, charge lourde dans une seule main, inclinez le buste sur le côté puis remontez à la force de l’oblique.",
        "reps": "3 x 10 reps de chaque côté (charge lourde)"
      }
    ]
  },
  {
    "id": "abs-flutter-weighted-plank",
    "name": "2. Circuit Abdos Complet & Planche Lestée 60s (3 tours)",
    "focus": "Bas des abdos, Grand droit, Obliques & Planche lestée sur le dos",
    "durationMinutes": 16,
    "exercises": [
      {
        "name": "Flutter Kicks",
        "position": "Allongée sur le dos, lombaires plaquées, petits battements verticaux rapides des jambes tendues.",
        "reps": "3 x 10 reps"
      },
      {
        "name": "Scissor Kicks",
        "position": "Sur le dos, croisez alternativement une jambe au-dessus de l’autre au ras du sol.",
        "reps": "3 x 10 reps"
      },
      {
        "name": "In and Out",
        "position": "En équilibre sur les fessiers, ramenez les genoux vers la poitrine puis retendez les jambes sans toucher le sol.",
        "reps": "3 x 10 reps"
      },
      {
        "name": "Leg Raises au-dessus d'un haltère",
        "position": "Assise au sol, passez les deux jambes tendues par-dessus un haltère posé debout.",
        "reps": "3 x 10 reps"
      },
      {
        "name": "Leg Lift",
        "position": "Allongée sur le dos, montez les deux jambes tendues à 90° puis freinez la descente.",
        "reps": "3 x 10 reps"
      },
      {
        "name": "Toe Touches",
        "position": "Jambes tendues vers le plafond, décollez les épaules pour toucher vos pointes de pieds.",
        "reps": "3 x 10 reps"
      },
      {
        "name": "Crunches with a Pause at the Top",
        "position": "Crunch abdominal en marquant une pause contractée de 2 secondes en haut de chaque répétition.",
        "reps": "3 x 10 reps"
      },
      {
        "name": "Russian Twist avec haltère",
        "position": "Assise buste incliné à 45°, pivotez les épaules d’un côté à l’autre avec un haltère.",
        "reps": "3 x 10 reps"
      },
      {
        "name": "Planche avec charge sur le dos",
        "position": "Gainage sur les avant-bras avec un disque posé sur le bas du dos / bassin.",
        "reps": "3 x 60 sec"
      }
    ]
  },
  {
    "id": "abs-over-unders-cocoon",
    "name": "3. Circuit Over-Unders, Cocoon & Plate Hollow Hold (3 tours)",
    "focus": "Endurance abdominale (Séries de 20), Dead Bugs lestés & Hollow Hold au max",
    "durationMinutes": 15,
    "exercises": [
      {
        "name": "Over Unders (10 Clockwise + 10 Anti-Clockwise)",
        "position": "Sur le dos, cercles croisés des jambes tendues : 10 dans le sens horaire et 10 dans le sens anti-horaire.",
        "reps": "3 x 20 reps (10 + 10)"
      },
      {
        "name": "Scissor Kicks",
        "position": "Sur le dos, grands ciseaux horizontaux dynamiques en gardant le bas du dos collé au tapis.",
        "reps": "3 x 20 reps"
      },
      {
        "name": "Side to Side Leg Raises",
        "position": "Sur le dos, montez et descendez les jambes jointes d’un côté puis de l’autre en arc-en-ciel.",
        "reps": "3 x 20 reps"
      },
      {
        "name": "Cocoon Passes",
        "position": "Enroulement complet en passant un poids ou ballon des mains aux chevilles puis des chevilles aux mains.",
        "reps": "3 x 20 reps"
      },
      {
        "name": "Dead Bugs avec charge",
        "position": "Sur le dos, tenez un poids bras tendus vers le plafond tout en tendant alternativement chaque jambe.",
        "reps": "3 x 20 reps"
      },
      {
        "name": "Plate Hollow Hold",
        "position": "Gainage en position cuillère (Hollow Body) en tenant un disque bras tendus le plus longtemps possible.",
        "reps": "3 x Max (As Long As You Can)"
      }
    ]
  },
  {
    "id": "abs-weighted-kneel-bridge",
    "name": "4. Circuit Abdos Lestés & Bridge Knee Drives (3 tours)",
    "focus": "Force abdominale avec haltère, Gainage pelvien & Obliques (Séries de 12)",
    "durationMinutes": 14,
    "exercises": [
      {
        "name": "Weighted Toe Touches",
        "position": "Jambes tendues à la verticale, montez un haltère ou disque vers vos orteils en décollant haut les omoplates.",
        "reps": "3 x 12 reps"
      },
      {
        "name": "Bridge Knee Drives",
        "position": "En pont fessier haut, ramenez un genou vers la poitrine sans laisser tomber le bassin.",
        "reps": "3 x 12 reps de chaque côté"
      },
      {
        "name": "Dumbbell Kneel to Stand",
        "position": "Haltère tenu contre la poitrine, passez de la position à genoux à debout en gardant le tronc verrouillé.",
        "reps": "3 x 12 reps"
      },
      {
        "name": "Weighted Russian Twists",
        "position": "Rotations du buste assise avec haltère en contrôlant chaque fin de course.",
        "reps": "3 x 12 reps"
      },
      {
        "name": "Crunches",
        "position": "Crunchs classiques maîtrisés en expirant tout l’air au sommet.",
        "reps": "3 x 12 reps"
      }
    ]
  },
  {
    "id": "abs-global-360-gainage",
    "name": "5. Circuit Global 360° : Abdos Complets & Gainage",
    "focus": "Transverse + Grand Droit + Obliques + Gainage statique et dynamique",
    "durationMinutes": 14,
    "exercises": [
      {
        "name": "Deadbug contrôlé lombaires plaquées",
        "position": "Sur le dos, bras verticaux et jambes à 90°. Tendez bras et jambe opposée en rasant le sol sans cambrer.",
        "reps": "16 répétitions lentes"
      },
      {
        "name": "Planche commando dynamique",
        "position": "Démarrez en planche sur les coudes. Montez sur la paume droite puis gauche, puis redescendez sans balancer le bassin.",
        "reps": "10 montées"
      },
      {
        "name": "Russian Twists avec genoux verrouillés",
        "position": "Assise en équilibre sur les fessiers, pieds à 10 cm du sol, buste penché à 45°. Tournez les épaules de droite à gauche.",
        "reps": "20 rotations"
      },
      {
        "name": "Planche latérale avec élévation de jambe",
        "position": "En appui sur l’avant-bras, hanche bien haute alignée avec les pieds. Décollez la jambe supérieure.",
        "reps": "30s par côté"
      },
      {
        "name": "Hollow Body Hold final",
        "position": "Sur le dos, formez une cuillère bras tendus derrière la tête et jambes jointes tendues à 20 cm.",
        "reps": "40 secondes"
      }
    ]
  },
  {
    "id": "abs-sablier-ceinture",
    "name": "6. Circuit Sablier & Ceinture Gainée Totale",
    "focus": "Transverse profond (Vacuum) + Taille fine + Gainage anti-rotation",
    "durationMinutes": 12,
    "exercises": [
      {
        "name": "Stomach Vacuum à quatre pattes",
        "position": "À genoux, dos plat. Videz l’air et aspirez le nombril vers la colonne pendant 10 secondes.",
        "reps": "5 répétitions de 10s"
      },
      {
        "name": "Planche Superman avec maintien",
        "position": "À plat ventre, décollez simultanément poitrine et cuisses en tendant les bras devant vous.",
        "reps": "10 répétitions de 3s"
      },
      {
        "name": "Mountain Climbers croisés lents",
        "position": "En planche haute sur les mains. Amenez le genou droit vers le coude gauche en contractant l’oblique.",
        "reps": "16 répétitions"
      },
      {
        "name": "Planche ventrale classique active",
        "position": "Sur les coudes, serrez les fessiers et tirez les coudes vers les orteils pour une tension maximale.",
        "reps": "45 secondes"
      }
    ]
  },
  {
    "id": "abs-athletic-core",
    "name": "7. Circuit Full Core Athlétique & Définition",
    "focus": "Haut et bas des abdos + Gainage fonctionnel",
    "durationMinutes": 12,
    "exercises": [
      {
        "name": "Reverse Crunch sur tapis",
        "position": "Sur le dos, enroulez le bassin vers la poitrine pour décoller les fesses du sol sans élan.",
        "reps": "15 répétitions"
      },
      {
        "name": "Planche haute tape-épaule",
        "position": "Position pompe haute, pieds écartés largeur tapis. Touchez l’épaule opposée sans bouger les hanches.",
        "reps": "20 touches"
      },
      {
        "name": "Flutter Kicks battements ras du sol",
        "position": "Sur le dos, tête décollée regard nombril, battements de jambes tendues à 15 cm du sol.",
        "reps": "35 secondes"
      },
      {
        "name": "Gainage latéral statique",
        "position": "Sur le coude, corps droit comme une flèche, hanche haute.",
        "reps": "35s par côté"
      }
    ]
  },
  {
    "id": "abs-vacuum-transverse",
    "name": "8. Circuit Transverse Profond & Ventre Ultra-Plat",
    "focus": "Transverse profond & décompression",
    "durationMinutes": 10,
    "exercises": [
      {
        "name": "Stomach Vacuum assis ou 4 pattes",
        "position": "Videz tout l’air et avalez le nombril sous la cage thoracique.",
        "reps": "5 cycles de 12s"
      },
      {
        "name": "Deadbug tempo lent",
        "position": "Lombaires écrasées au sol, mouvement fluide et contrôlé.",
        "reps": "12 répétitions"
      },
      {
        "name": "Hollow Body Hold",
        "position": "Allongée sur le dos en cuillère tendue.",
        "reps": "3 x 30s"
      }
    ]
  }
]

export const CARDIO_SESSIONS: CardioSession[] = [
  {
    "id": "cardio-marche-inclinee-debutant",
    "name": "1. Marche Inclinée — Débutant (Pente 6 · Vitesse 4,5 · 20 min)",
    "machine": "Tapis de course",
    "durationMinutes": 20,
    "intensity": "Douce",
    "description": "Idéal pour démarrer ou en finisher : inclinaison 6%, vitesse 4,5 km/h pendant 20 minutes sans se tenir aux rampes.",
    "intervals": [
      {
        "time": "00:00 - 02:00",
        "instruction": "Mise en route progressive : Pente 3%, Vitesse 4,0 km/h"
      },
      {
        "time": "02:00 - 18:00",
        "instruction": "Bloc principal Débutant : Inclinaison 6% — Vitesse 4,5 km/h (posture droite, bras actifs)"
      },
      {
        "time": "18:00 - 20:00",
        "instruction": "Retour au calme : Pente 1%, Vitesse 3,8 km/h"
      }
    ]
  },
  {
    "id": "cardio-marche-inclinee-intermediaire",
    "name": "2. Marche Inclinée — Intermédiaire (Pente 10 · Vitesse 4,5 · 30 min)",
    "machine": "Tapis de course",
    "durationMinutes": 30,
    "intensity": "Modérée",
    "description": "Brûleur de graisses ciblé : inclinaison 10%, vitesse 4,5 km/h pendant 30 minutes continues.",
    "intervals": [
      {
        "time": "00:00 - 03:00",
        "instruction": "Échauffement : Pente 5%, Vitesse 4,2 km/h"
      },
      {
        "time": "03:00 - 27:00",
        "instruction": "Bloc principal Intermédiaire : Inclinaison 10% — Vitesse 4,5 km/h (poussez bien par les talons)"
      },
      {
        "time": "27:00 - 30:00",
        "instruction": "Retour au calme : Pente 2%, Vitesse 4,0 km/h"
      }
    ]
  },
  {
    "id": "cardio-marche-inclinee-confirmee",
    "name": "3. Marche Inclinée — Confirmée 12-5-30 (Pente 12 · Vitesse 5 · 30 min)",
    "machine": "Tapis de course",
    "durationMinutes": 30,
    "intensity": "Intense",
    "description": "Niveau confirmé : inclinaison 12%, vitesse 5,0 km/h pendant 30 minutes pour un engagement maximal des fessiers et du cardio.",
    "intervals": [
      {
        "time": "00:00 - 03:00",
        "instruction": "Échauffement : Pente 6%, Vitesse 4,5 km/h"
      },
      {
        "time": "03:00 - 27:00",
        "instruction": "Bloc principal Confirmé : Inclinaison 12% — Vitesse 5,0 km/h sans toucher la console"
      },
      {
        "time": "27:00 - 30:00",
        "instruction": "Retour au calme : Pente 2%, Vitesse 4,0 km/h"
      }
    ]
  },
  {
    "id": "cardio-stairmaster",
    "name": "4. StairMaster Booty Burner Ladder",
    "machine": "StairMaster / Escalier",
    "durationMinutes": 20,
    "intensity": "Intense",
    "description": "Montée progressive par échelons pour tonifier le galbe fessier sans choc.",
    "intervals": [
      {
        "time": "00:00 - 03:00",
        "instruction": "Échauffement niveau 5, pas réguliers en poussant par les talons"
      },
      {
        "time": "03:00 - 08:00",
        "instruction": "Niveau 8, pas enjambés 2 par 2 avec buste incliné vers l’avant"
      },
      {
        "time": "08:00 - 14:00",
        "instruction": "6 tours de (45s sprint niveau 11 / 45s récupération niveau 6)"
      },
      {
        "time": "14:00 - 18:00",
        "instruction": "Pas croisés latéraux niveau 7 (2 min côté droit / 2 min côté gauche)"
      },
      {
        "time": "18:00 - 20:00",
        "instruction": "Retour au calme niveau 4 et respiration profonde"
      }
    ]
  },
  {
    "id": "cardio-rower",
    "name": "5. Rameur Concept2 Puissance & Intervalles 500m",
    "machine": "Rameur Concept 2",
    "durationMinutes": 20,
    "intensity": "Intense",
    "description": "Engagement de 85% des muscles du corps avec intervalles fractionnés.",
    "intervals": [
      {
        "time": "00:00 - 04:00",
        "instruction": "Échauffement fluide à 20-22 coups/min, résistance 4"
      },
      {
        "time": "04:00 - 16:00",
        "instruction": "5 séries de 500m à cadence soutenue (28 cpm) avec 1 min de rame douce entre chaque"
      },
      {
        "time": "16:00 - 20:00",
        "instruction": "Décrassage souple à 18 cpm et étirements"
      }
    ]
  },
  {
    "id": "cardio-elliptical-pyramid",
    "name": "6. Pyramide à l'Elliptique (Résistance & Inclinaison)",
    "machine": "Vélo elliptique",
    "durationMinutes": 25,
    "intensity": "Intense",
    "description": "Montée progressive par paliers de résistance puis redescente en marche arrière.",
    "intervals": [
      {
        "time": "00:00 - 04:00",
        "instruction": "Échauffement résistance niveau 5, cadence 60 rpm"
      },
      {
        "time": "04:00 - 07:00",
        "instruction": "Palier 1 : Résistance 8 (allure modérée)"
      },
      {
        "time": "07:00 - 10:00",
        "instruction": "Palier 2 : Résistance 11 (allure soutenue)"
      },
      {
        "time": "10:00 - 13:00",
        "instruction": "Sommet : Résistance 14 (effort maximal)"
      },
      {
        "time": "13:00 - 17:00",
        "instruction": "Pédalage en arrière résistance 9 pour solliciter ischios et fessiers"
      },
      {
        "time": "17:00 - 22:00",
        "instruction": "Alternance 30s sprint avant / 30s sprint arrière résistance 10"
      },
      {
        "time": "22:00 - 25:00",
        "instruction": "Retour au calme niveau 4"
      }
    ]
  },
  {
    "id": "cardio-treadmill-hiit-fractionne",
    "name": "7. Fractionné HIIT au Tapis de Course (Sprints)",
    "machine": "Tapis de course",
    "durationMinutes": 20,
    "intensity": "HIIT",
    "description": "Alternance explosive de sprints intenses et de marche de récupération.",
    "intervals": [
      {
        "time": "00:00 - 04:00",
        "instruction": "Jogging léger d’échauffement à 7.5 - 8.5 km/h"
      },
      {
        "time": "04:00 - 16:00",
        "instruction": "8 x (30 secondes sprint à 12 - 14 km/h / 60 secondes marche active à 5 km/h)"
      },
      {
        "time": "16:00 - 20:00",
        "instruction": "Marche lente 4 km/h de récupération cardiaque"
      }
    ]
  },
  {
    "id": "cardio-hill-walk",
    "name": "8. Marche en Côte Pyramide Pente (6% → 10% → 15%)",
    "machine": "Tapis de course en côte",
    "durationMinutes": 25,
    "intensity": "Intense",
    "description": "Simulation d’ascension de colline avec variation progressive de la pente de 6% à 15%.",
    "intervals": [
      {
        "time": "00:00 - 05:00",
        "instruction": "Pente 6%, vitesse 4.5 km/h échauffement"
      },
      {
        "time": "05:00 - 10:00",
        "instruction": "Pente 10%, vitesse 4.8 km/h en poussant bien sur les talons"
      },
      {
        "time": "10:00 - 15:00",
        "instruction": "Pente 13%, vitesse 4.6 km/h grands pas engagés"
      },
      {
        "time": "15:00 - 20:00",
        "instruction": "Pente 15% (pente maximale), vitesse 4.2 km/h"
      },
      {
        "time": "20:00 - 25:00",
        "instruction": "Pente 3%, vitesse 4.0 km/h retour au calme"
      }
    ]
  },
  {
    "id": "cardio-airbike",
    "name": "9. AirBike Tabata Express 15 Minutes",
    "machine": "AirBike / Assault Bike",
    "durationMinutes": 15,
    "intensity": "HIIT",
    "description": "La résistance par air s’ajuste à votre puissance : coordination bras et jambes.",
    "intervals": [
      {
        "time": "00:00 - 03:00",
        "instruction": "Pédalage régulier souple"
      },
      {
        "time": "03:00 - 11:00",
        "instruction": "Tabata 8 tours de (20s sprint maximal / 10s repos complet)"
      },
      {
        "time": "11:00 - 15:00",
        "instruction": "Pédalage doux de récupération"
      }
    ]
  },
  {
    "id": "cardio-rpm",
    "name": "10. Vélo RPM Danseuse & Cadence",
    "machine": "Vélo de biking / RPM",
    "durationMinutes": 24,
    "intensity": "Intense",
    "description": "Simulation de côtes en danseuse (debout) et sprints assis.",
    "intervals": [
      {
        "time": "00:00 - 04:00",
        "instruction": "Cadence 90 rpm résistance modérée"
      },
      {
        "time": "04:00 - 14:00",
        "instruction": "5 x (1 min debout forte résistance 65 rpm / 1 min assis 90 rpm)"
      },
      {
        "time": "14:00 - 20:00",
        "instruction": "3 accélérations assises de 30s à cadence > 105 rpm"
      },
      {
        "time": "20:00 - 24:00",
        "instruction": "Décrassage souple"
      }
    ]
  },
  {
    "id": "cardio-hyrox",
    "name": "11. Circuit Hyrox Mixte (SkiErg & Tapis)",
    "machine": "SkiErg + Tapis + Poids de corps",
    "durationMinutes": 24,
    "intensity": "Intense",
    "description": "Inspiré des épreuves Hyrox pour une endurance athlétique et tonique.",
    "intervals": [
      {
        "time": "Bloc 1",
        "instruction": "500m SkiErg régulier + 20 Fentes marchées"
      },
      {
        "time": "Bloc 2",
        "instruction": "400m Course modérée sur tapis + 15 Squats sautés ou rapides"
      },
      {
        "time": "Bloc 3",
        "instruction": "500m SkiErg cadence soutenue + 40s Planche de gainage"
      },
      {
        "time": "Bloc 4",
        "instruction": "400m Marche en pente 10% retour au calme"
      }
    ]
  }
]

export const FINISHERS: FinisherPreset[] = [
  {
    "id": "finisher-tabata-core-30-15",
    "name": "30/15 Tabata Core (4 min)",
    "category": "abs",
    "categoryLabel": "Abdos & Gainage",
    "durationLabel": "4 min",
    "totalDurationSeconds": 240,
    "executionMode": "interval",
    "summary": "4 tours de [30s Hollow Rock ou Gainage / 15s repos + 30s Crunchs ou Relevés de bassin / 15s repos].",
    "instructions": [
      "Alternez 30 secondes d’effort intense et 15 secondes de récupération pendant 4 tours complets.",
      "Exercice A : Hollow Rock (position cuillère) ou Gainage ventral.",
      "Exercice B : Crunchs contrôlés ou Relevés de bassin au sol.",
      "Gardez le nombril aspiré et les lombaires plaquées au tapis sur les exercices sur le dos."
    ],
    "intervals": [
      {
        "label": "Tour 1/4 — Hollow Rock ou Gainage",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Aspirez le nombril et verrouillez la sangle abdominale !"
      },
      {
        "label": "Tour 1/4 — Repos rapide",
        "type": "rest",
        "durationSeconds": 15,
        "cue": "Respirez profondément, préparez-vous pour les Crunchs / Relevés de bassin."
      },
      {
        "label": "Tour 1/4 — Crunchs ou Relevés de bassin",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Expirez à chaque contraction, décollez le bassin sans élan."
      },
      {
        "label": "Tour 1/4 — Repos",
        "type": "rest",
        "durationSeconds": 15,
        "cue": "Soufflez, prochain tour en gainage !"
      },
      {
        "label": "Tour 2/4 — Hollow Rock ou Gainage",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Aspirez le nombril et verrouillez la sangle abdominale !"
      },
      {
        "label": "Tour 2/4 — Repos rapide",
        "type": "rest",
        "durationSeconds": 15,
        "cue": "Respirez profondément, préparez-vous pour les Crunchs / Relevés de bassin."
      },
      {
        "label": "Tour 2/4 — Crunchs ou Relevés de bassin",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Expirez à chaque contraction, décollez le bassin sans élan."
      },
      {
        "label": "Tour 2/4 — Repos",
        "type": "rest",
        "durationSeconds": 15,
        "cue": "Soufflez, prochain tour en gainage !"
      },
      {
        "label": "Tour 3/4 — Hollow Rock ou Gainage",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Aspirez le nombril et verrouillez la sangle abdominale !"
      },
      {
        "label": "Tour 3/4 — Repos rapide",
        "type": "rest",
        "durationSeconds": 15,
        "cue": "Respirez profondément, préparez-vous pour les Crunchs / Relevés de bassin."
      },
      {
        "label": "Tour 3/4 — Crunchs ou Relevés de bassin",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Expirez à chaque contraction, décollez le bassin sans élan."
      },
      {
        "label": "Tour 3/4 — Repos",
        "type": "rest",
        "durationSeconds": 15,
        "cue": "Soufflez, prochain tour en gainage !"
      },
      {
        "label": "Tour 4/4 — Hollow Rock ou Gainage",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Aspirez le nombril et verrouillez la sangle abdominale !"
      },
      {
        "label": "Tour 4/4 — Repos rapide",
        "type": "rest",
        "durationSeconds": 15,
        "cue": "Respirez profondément, préparez-vous pour les Crunchs / Relevés de bassin."
      },
      {
        "label": "Tour 4/4 — Crunchs ou Relevés de bassin",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Expirez à chaque contraction, décollez le bassin sans élan."
      },
      {
        "label": "Récupération finale",
        "type": "rest",
        "durationSeconds": 15,
        "cue": "Dernières secondes avant la victoire !"
      }
    ]
  },
  {
    "id": "finisher-plank-no-pause-3m",
    "name": "Plank Finisher sans pause (3 min)",
    "category": "abs",
    "categoryLabel": "Abdos & Gainage",
    "durationLabel": "3 min",
    "totalDurationSeconds": 180,
    "executionMode": "countdown",
    "summary": "1 min gainage ventral + 1 min latéral droit (pulsations) + 1 min latéral gauche sans poser les genoux.",
    "instructions": [
      "0:00 à 1:00 — Gainage ventral sur les avant-bras, fessiers et abdos contractés.",
      "1:00 à 2:00 — Pivotez directement en gainage latéral DROIT avec petites pulsations de hanche.",
      "2:00 à 3:00 — Pivotez en gainage latéral GAUCHE avec pulsations sans jamais poser les genoux au sol !"
    ],
    "phaseAlerts": [
      {
        "atElapsedSeconds": 0,
        "label": "Phase 1/3 : Gainage Ventral (60s)",
        "cue": "Corps aligné, coudes sous les épaules, serrez les fessiers !"
      },
      {
        "atElapsedSeconds": 60,
        "label": "Phase 2/3 : Gainage Latéral DROIT + Pulsations (60s)",
        "cue": "PIVOT ! Passez sur le côté droit sans poser les genoux et pulsez la hanche vers le plafond."
      },
      {
        "atElapsedSeconds": 120,
        "label": "Phase 3/3 : Gainage Latéral GAUCHE + Pulsations (60s)",
        "cue": "DERNIÈRE MINUTE ! Pivotez côté gauche, tenez bon jusqu’au bout !"
      }
    ]
  },
  {
    "id": "finisher-cardio-12-5-30-express",
    "name": "12-5-30 Express (5 à 8 min)",
    "category": "cardio",
    "categoryLabel": "Cardio & Brûle-graisse",
    "durationLabel": "6 min",
    "totalDurationSeconds": 360,
    "executionMode": "countdown",
    "summary": "Tapis de course à 12% d’inclinaison, vitesse 5 km/h en marche active sans se tenir aux poignées.",
    "instructions": [
      "Réglez immédiatement votre tapis de course sur Inclinaison 12% et Vitesse 5,0 km/h.",
      "Ne vous tenez PAS aux poignées : balancez les bras naturellement pour engager le gainage et les fessiers.",
      "Poussez fort dans les talons à chaque pas pour recruter toute la chaîne postérieure."
    ],
    "phaseAlerts": [
      {
        "atElapsedSeconds": 0,
        "label": "Départ Marche Inclinée 12% · 5 km/h",
        "cue": "Lâchez les poignées, buste fier et regard droit devant."
      },
      {
        "atElapsedSeconds": 180,
        "label": "Mi-parcours (3 min restantes)",
        "cue": "Gardez la cadence à 5 km/h, respirez par le nez et poussez dans les talons !"
      },
      {
        "atElapsedSeconds": 300,
        "label": "Sprint final (Dernière minute !)",
        "cue": "Plus que 60 secondes à 12% de pente, ne lâchez rien !"
      }
    ]
  },
  {
    "id": "finisher-stairmaster-burn-5m",
    "name": "StairMaster Brûle-Cuisses (5 min)",
    "category": "cardio",
    "categoryLabel": "Cardio & Brûle-graisse",
    "durationLabel": "5 min",
    "totalDurationSeconds": 300,
    "executionMode": "countdown",
    "summary": "Escalier mécanique non-stop à rythme soutenu (alternance pas simples rapides et marches 2 par 2).",
    "instructions": [
      "Montez sur le StairMaster à un niveau soutenu (Niv. 8 à 11).",
      "Minutes 1 à 2 : Pas réguliers dynamiques sans s’appuyer sur les rampes.",
      "Minutes 2 à 4 : Montez les marches 2 par 2 en ancrant tout le talon pour brûler les fessiers.",
      "Minute 5 : Sprint final à cadence maximale !"
    ],
    "phaseAlerts": [
      {
        "atElapsedSeconds": 0,
        "label": "Minutes 1-2 : Cadence soutenue (Niv. 8-9)",
        "cue": "Buste légèrement penché en avant, mains libres ou simple effleurement."
      },
      {
        "atElapsedSeconds": 120,
        "label": "Minutes 3-4 : Marches 2 par 2 (Focus Fessiers)",
        "cue": "Enjambez une marche sur deux en poussant fort dans le talon !"
      },
      {
        "atElapsedSeconds": 240,
        "label": "Minute 5 : Rush Final (Niv. 10-12)",
        "cue": "60 secondes à fond pour terminer la séance en beauté !"
      }
    ]
  },
  {
    "id": "finisher-pyramide-sprint-4m",
    "name": "Pyramide Sprint (4 min)",
    "category": "cardio",
    "categoryLabel": "Cardio & Brûle-graisse",
    "durationLabel": "4 min",
    "totalDurationSeconds": 240,
    "executionMode": "interval",
    "summary": "Rameur ou Assault Bike (10s sprint/10s repos, 20s/20s, 30s/30s, puis redescente).",
    "instructions": [
      "Installez-vous sur un Rameur Concept2, un Assault Bike ou un Vélo spinning.",
      "Enchaînez la pyramide montante (10s/10s → 20s/20s → 30s/30s → 30s/30s) puis redescendez (20s/20s → 10s/10s).",
      "Chaque phase Effort doit être réalisée à 95-100% d’intensité explosive."
    ],
    "intervals": [
      {
        "label": "Palier 1 — Sprint Explosif (10s)",
        "type": "effort",
        "durationSeconds": 10,
        "cue": "Sprint maximal dès la première seconde !"
      },
      {
        "label": "Palier 1 — Récupération (10s)",
        "type": "rest",
        "durationSeconds": 10,
        "cue": "Ralentissez tout doux, respirez."
      },
      {
        "label": "Palier 2 — Sprint Soutenu (20s)",
        "type": "effort",
        "durationSeconds": 20,
        "cue": "20 secondes à fond, cadence maximale !"
      },
      {
        "label": "Palier 2 — Récupération (20s)",
        "type": "rest",
        "durationSeconds": 20,
        "cue": "Calmez le souffle avant le sommet de la pyramide."
      },
      {
        "label": "Sommet 1 — Sprint Long (30s)",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "30 secondes de puissance pure, tenez le rythme !"
      },
      {
        "label": "Sommet 1 — Récupération (30s)",
        "type": "rest",
        "durationSeconds": 30,
        "cue": "Inspirez profondément par le nez."
      },
      {
        "label": "Sommet 2 — Sprint Long (30s)",
        "type": "effort",
        "durationSeconds": 30,
        "cue": "Deuxième passage de 30s, attaquez la redescente !"
      },
      {
        "label": "Sommet 2 — Récupération (30s)",
        "type": "rest",
        "durationSeconds": 30,
        "cue": "Superbe ! Il ne reste que la redescente."
      },
      {
        "label": "Redescente — Sprint (20s)",
        "type": "effort",
        "durationSeconds": 20,
        "cue": "20 secondes explosives !"
      },
      {
        "label": "Redescente — Récupération (20s)",
        "type": "rest",
        "durationSeconds": 20,
        "cue": "Préparez-vous pour les 10 dernières secondes."
      },
      {
        "label": "Sprint Final All-Out (10s)",
        "type": "effort",
        "durationSeconds": 10,
        "cue": "VIDEZ TOUT LE RÉSERVOIR SUR 10 SECONDES !"
      },
      {
        "label": "Retour au calme (10s)",
        "type": "rest",
        "durationSeconds": 10,
        "cue": "Bravo, pyramide terminée !"
      }
    ]
  },
  {
    "id": "finisher-drop-set-mecanique",
    "name": "Drop-Set Mécanique",
    "category": "pump",
    "categoryLabel": "Pump & Congestion",
    "durationLabel": "3-4 min",
    "totalDurationSeconds": 180,
    "executionMode": "stopwatch",
    "summary": "2 séries à l’échec total avec charge légère sur le dernier exercice effectué (1 min de repos entre les deux).",
    "instructions": [
      "Conservez le dernier exercice de votre séance et baissez la charge de 30 à 40%.",
      "Série 1 : Allez jusqu’à l’échec musculaire complet avec un tempo contrôlé (brûlure maximale).",
      "Prenez exactement 60 secondes de repos.",
      "Série 2 : Repartez jusqu’à l’échec total pour gorger le muscle de sang (congestion maximale)."
    ],
    "targetSets": 2,
    "restBetweenSetsSeconds": 60
  },
  {
    "id": "finisher-challenge-100-reps",
    "name": "Challenge 100 Reps",
    "category": "pump",
    "categoryLabel": "Pump & Congestion",
    "durationLabel": "Time Cap 5 min",
    "totalDurationSeconds": 300,
    "executionMode": "stopwatch",
    "summary": "Choisir 1 exercice léger/poids du corps (squats, fentes, pompes, élévations) et valider 100 répétitions le plus vite possible.",
    "instructions": [
      "Sélectionnez votre mouvement cible (ex: Hip Abductions, Glute Bridges, Squats poids du corps, Élévations latérales légères ou Kickbacks).",
      "Lancez le chronomètre et validez 100 répétitions au total le plus vite possible.",
      "Vous pouvez prendre des micro-pauses de 5 secondes (Rest-Pause) dès que ça brûle, mais ne lâchez rien avant 100 !",
      "Appuyez sur \"Terminé\" dès la 100e répétition pour enregistrer votre record de temps."
    ],
    "targetReps": 100,
    "selectableExercises": [
      "Glute Bridges au sol",
      "Abductions avec bande élastique",
      "Squats poids du corps",
      "Élévations latérales (haltères légers)",
      "Fentes alternées dynamiques",
      "Pushdowns Triceps à la corde"
    ]
  }
]

export const CARDIO_FINISHER_IDEAS: string[] = [
  "15 min Marche inclinée 12-5-30 (12% pente, 5 km/h)",
  "12 min StairMaster fessiers tempo régulier (sans se tenir)",
  "10 min Rameur fractionné 30s sprint / 30s récup",
  "15 min Vélo elliptique pyramide résistances",
  "20 min Marche inclinée brûle-graisse (pente 8-10%, 5.2 km/h)",
  "12 min HIIT Vélo : 20s sprint max / 40s souple",
  "10 min Corde à sauter / Jumping Jacks (45s effort / 15s repos)",
  "15 min Escalier (StairMaster) pas croisés & kickbacks"
]

export const ABS_FINISHER_IDEAS: string[] = [
  "Circuit Gainage Global & Obliques 7 min (Planche + Commando)",
  "Stomach Vacuum (5 x 20s) + Deadbug contrôlé (3 x 12)",
  "Hollow Body Hold & Crunchs contrôlés (3 x 15 reps)",
  "Relevés de bassin au sol & Chandelles (3 x 12 reps)",
  "Circuit Pilates Core : Deadbug, Bird-Dog & Planche latérale",
  "Russian Twists avec disque 5kg & Planche lestée 45s",
  "Crunch poulie haute à genoux (3 x 15) + Gainage 60s"
]

export const ABS_FINISHER_OPTIONS: string[] = [
  "Circuit Abdos Debout avec Charge (3 tours) (14 min · Gainage debout, Obliques, Transverse & Ceinture 360° (sans s’allonger))",
  "Circuit Abdos Complet & Planche Lestée 60s (3 tours) (16 min · Bas des abdos, Grand droit, Obliques & Planche lestée sur le dos)",
  "Circuit Over-Unders, Cocoon & Plate Hollow Hold (3 tours) (15 min · Endurance abdominale (Séries de 20), Dead Bugs lestés & Hollow Hold au max)",
  "Circuit Abdos Lestés & Bridge Knee Drives (3 tours) (14 min · Force abdominale avec haltère, Gainage pelvien & Obliques (Séries de 12))",
  "Circuit Global 360° : Abdos Complets & Gainage (14 min · Transverse + Grand Droit + Obliques + Gainage statique et dynamique)",
  "Circuit Sablier & Ceinture Gainée Totale (12 min · Transverse profond (Vacuum) + Taille fine + Gainage anti-rotation)",
  "Circuit Full Core Athlétique & Définition (12 min · Haut et bas des abdos + Gainage fonctionnel)",
  "Circuit Transverse Profond & Ventre Ultra-Plat (10 min · Transverse profond & décompression)",
  "Stomach Vacuum (5 x 20s) + Planche active 60s"
]

/** Options de finisher cardio proposées dans le planning. */
export const CARDIO_FINISHER_OPTIONS: string[] = [
  ...CARDIO_SESSIONS.map((e) => `${e.name.replace(/^\d+\.\s*/, '')} (${e.machine} · ${e.durationMinutes} min)`),
  'Marche inclinée Débutant : Inclinaison 6 · Vitesse 4,5 · 20 min',
  'Marche inclinée Intermédiaire : Inclinaison 10 · Vitesse 4,5 · 30 min',
  'Marche inclinée Confirmée 12-5-30 : Inclinaison 12 · Vitesse 5 · 30 min',
]
