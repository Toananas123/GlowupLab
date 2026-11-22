// Porté depuis l'app d'origine.
import { MUSCLE_GROUPS } from '../../data/exercises'
import { GEAR } from '../../data/guides'
import type { Exercise, GearItem } from '../../types'

export function equipmentMeta(e?: string): { label: string; badgeClass: string } {
  switch (e) {
    case `dumbbell`:
      return {
        label: `Poids libres`,
        badgeClass: `bg-[#F8A5F8] text-[#3B0726] border border-[#F8A5F8]/40 font-bold`,
      }
    case `barbell`:
      return {
        label: `Barre libre`,
        badgeClass: `bg-amber-100 text-amber-900 border border-amber-200 font-semibold`,
      }
    case `machine`:
      return {
        label: `Machine guidée`,
        badgeClass: `bg-[#F2EFE9] text-[#141414] border border-[#E6E2D8] font-semibold`,
      }
    case `cable`:
      return {
        label: `Poulie`,
        badgeClass: `bg-sky-100 text-sky-900 border border-sky-200 font-semibold`,
      }
    case `bodyweight`:
      return {
        label: `Poids du corps`,
        badgeClass: `bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold`,
      }
    case `cardio_machine`:
      return {
        label: `Machine cardio`,
        badgeClass: `bg-rose-100 text-rose-900 border border-rose-200 font-semibold`,
      }
    default:
      return {
        label: `Matériel`,
        badgeClass: `bg-neutral-100 text-neutral-800 border border-neutral-200 font-semibold`,
      }
  }
}

export function diagramTypeFor(e: Exercise): { archetype: string; machineName: string; stationZone: string; keyAdjustments: string[] } {
  let t = `${e.id} ${e.name}`.toLowerCase()
  return t.includes(`presse`) || t.includes(`leg-press`) || e.machineSetup?.diagramType === `leg_press`
    ? {
        archetype: `leg_press`,
        machineName: `Presse à cuisses inclinée 45° / guidée`,
        stationZone: `Zone Jambes · Charge guidée ou disques`,
        keyAdjustments: [
          `Dossier incliné cran 2-3 (bassin plaqué)`,
          `Pieds placés sur le plateau selon la zone ciblée`,
          `Loquets de sécurité latéraux déverrouillés en haut`,
        ],
      }
    : t.includes(`hip thrust`) || t.includes(`hip-thrust`) || t.includes(`glute bridge`) || t.includes(`pont fessier`)
      ? {
          archetype: `hip_thrust`,
          machineName: e.equipment === `machine` ? `Machine Hip Thrust guidée à sangle` : `Banc de Hip Thrust & Barre capitonnée`,
          stationZone: `Zone Fessiers · Banc bas + Barre / Machine`,
          keyAdjustments: [
            `Haut du dos calé sous la pointe des omoplates`,
            `Mousse de protection ou sangle sur le pli de hanche`,
            `Pieds largeur d’épaules, tibias verticaux à 90° en haut`,
          ],
        }
      : t.includes(`abduction`) || t.includes(`adduction`) || t.includes(`abducteur`) || t.includes(`adducteur`)
        ? {
            archetype: `abduction_adduction`,
            machineName: `Machine Abduction / Adduction assise`,
            stationZone: `Zone Isolation Hanches & Fessiers`,
            keyAdjustments: [
              `Coussins pivotants orientés vers l’extérieur ou l’intérieur`,
              `Levier d’écartement réglé au maximum de ta souplesse`,
              `Poignées latérales maintenues pour stabiliser le bassin`,
            ],
          }
        : t.includes(`leg extension`) || t.includes(`leg curl`) || t.includes(`ischio`) || t.includes(`extension de jambe`)
          ? {
              archetype: `leg_extension_curl`,
              machineName: t.includes(`curl`) ? `Machine Leg Curl (Ischio-jambiers)` : `Machine Leg Extension (Quadriceps)`,
              stationZone: `Zone Machines Guidées Jambes`,
              keyAdjustments: [
                `Axe de rotation rouge aligné exactement avec le genou`,
                `Boudin mousse posé juste au-dessus des chevilles`,
                `Dossier avancé pour caler le creux poplité au bord du siège`,
              ],
            }
          : t.includes(`squat`) ||
              t.includes(`hack`) ||
              t.includes(`smith`) ||
              t.includes(`cadre guidé`) ||
              t.includes(`soulevé de terre`) ||
              t.includes(`deadlift`) ||
              t.includes(`rdl`) ||
              t.includes(`good morning`)
            ? {
                archetype: `hack_squat_rack`,
                machineName: e.equipment === `machine` ? `Hack Squat / Smith Machine guidée` : `Rack à Squat / Plateau Barre Olympique`,
                stationZone: `Zone Charges Libres & Racks`,
                keyAdjustments: [
                  `Hauteur des crochets réglée à hauteur des clavicules`,
                  `Barres de sécurité latérales ajustées sous le point bas`,
                  `Appui stable au sol, pieds ancrés à plat`,
                ],
              }
            : t.includes(`tirage vertical`) ||
                t.includes(`lat pulldown`) ||
                t.includes(`pull-down`) ||
                t.includes(`pullover`) ||
                t.includes(`triceps poulie haute`) ||
                t.includes(`face pull`) ||
                t.includes(`extension triceps`) ||
                e.machineSetup?.diagramType === `cable_high`
              ? {
                  archetype: `lat_pulldown_high_cable`,
                  machineName: `Station Poulie Haute / Tirage Vertical`,
                  stationZone: `Tour à poulies & Tirage Dos/Bras`,
                  keyAdjustments: [
                    `Boudins de maintien ajustés fermement sur le haut des cuisses`,
                    `Mousqueton fixé sur la poulie haute (barre, corde ou poignée)`,
                    `Goupille insérée dans la pile de poids correspondante`,
                  ],
                }
              : t.includes(`rowing assis`) ||
                  t.includes(`tirage horizontal`) ||
                  t.includes(`seated row`) ||
                  e.machineSetup?.diagramType === `seated_row`
                ? {
                    archetype: `seated_row`,
                    machineName: `Machine Tirage Horizontal / Rowing Assis`,
                    stationZone: `Zone Dos · Poulie basse avec cale-pieds`,
                    keyAdjustments: [
                      `Pieds calés sur les plateformes, genoux légèrement fléchis`,
                      `Poignée en V ou barre large attachée au câble horizontal`,
                      `Poitrine sortie, colonne neutre tout au long du tirage`,
                    ],
                  }
                : e.equipment === `cable` || e.machineSetup?.diagramType === `cable_low`
                  ? {
                      archetype: `low_cable_station`,
                      machineName: `Colonne à Poulie Réglable (Poulie Basse)`,
                      stationZone: `Station Câbles Vis-à-Vis`,
                      keyAdjustments: [
                        `Chariot de poulie descendu aux crans inférieurs (1 à 3)`,
                        `Sangle chevillère, corde ou poignée simple clipsée au mousqueton`,
                        `Un pas de recul pour mettre le câble sous tension dès le départ`,
                      ],
                    }
                  : e.equipment === `cardio_machine` || e.category === `cardio`
                    ? {
                        archetype: `cardio_station`,
                        machineName:
                          t.includes(`escalier`) || t.includes(`stair`)
                            ? `Escalier Mécanique (StairMaster)`
                            : t.includes(`rameur`)
                              ? `Rameur Concept2`
                              : t.includes(`vélo`) || t.includes(`bike`)
                                ? `Vélo Ergonomique`
                                : `Tapis de Course Incliné`,
                        stationZone: `Zone Cardio Training`,
                        keyAdjustments: [
                          `Console réglée (inclinaison, vitesse ou niveau de résistance)`,
                          `Buste grand et gainé sans s’écraser sur les poignées`,
                          `Fréquence cardiaque et allure régulières`,
                        ],
                      }
                    : e.equipment === `bodyweight` || e.category === `abs`
                      ? {
                          archetype: `mat_bodyweight`,
                          machineName: `Espace Tapis de Sol & Banc Fonctionnel`,
                          stationZone: `Zone Mobilité, Abdos & Poids du corps`,
                          keyAdjustments: [
                            `Tapis ergonomique antidérapant au sol`,
                            `Bassin en légère rétroversion (lombaires protégés)`,
                            `Respiration contrôlée sur chaque répétition`,
                          ],
                        }
                      : {
                          archetype: `dumbbell_bench`,
                          machineName: `Banc Multiposition & Rack Haltères`,
                          stationZone: `Zone Poids Libres & Bancs Inclinables`,
                          keyAdjustments: [
                            `Dossier du banc réglé (plat 0°, incliné 30°-45° ou vertical 85°)`,
                            `Pieds fermement ancrés au sol pour la stabilité`,
                            `Haltères pris au rack avec le dos droit`,
                          ],
                        }
}

export function gearForExercise(e: Partial<Exercise>): GearItem[] {
  let t: GearItem[] = [],
    n = (e.id || ``).toLowerCase(),
    r = (e.name || ``).toLowerCase(),
    i = (e.equipment || ``).toLowerCase(),
    a = (e.category || ``).toLowerCase()
  ;(n.includes(`hip-thrust`) || r.includes(`hip thrust`)) &&
    (i === `barbell` || r.includes(`barre`) || n.includes(`barbell`)) &&
    t.push(GEAR.manchon_barre)
  let o =
      (r.includes(`squat`) && !r.includes(`goblet`) && !r.includes(`sissy`) && !r.includes(`bulgare`)) ||
      n.includes(`squat-barbell`) ||
      n.includes(`barbell-back-squat`) ||
      n.includes(`hack-squat`) ||
      n.includes(`smith-machine-squat`),
    s =
      r.includes(`soulevé de terre`) ||
      r.includes(`deadlift`) ||
      n.includes(`romanian-deadlift`) ||
      n.includes(`stiff-leg`) ||
      (n.includes(`rdl`) && !n.includes(`single-leg`))
  return (
    (o || s) && t.push(GEAR.ceinture),
    (n.includes(`kickback`) || r.includes(`kickback`) || n.includes(`abduction-cable`) || r.includes(`poulie basse`)) &&
      (i === `cable` || n.includes(`cable`) || r.includes(`poulie`)) &&
      t.push(GEAR.sangle_cheville),
    (s ||
      r.includes(`rdl`) ||
      n.includes(`rdl`) ||
      r.includes(`rowing`) ||
      n.includes(`row`) ||
      (a === `back` && (r.includes(`tirage`) || n.includes(`pulldown`) || n.includes(`pullups`)))) &&
      !t.some((e) => e.id === `gants_grip`) &&
      t.push(GEAR.gants_grip),
    (a === `arms` ||
      a === `back` ||
      r.includes(`élévation`) ||
      r.includes(`développé militaire`) ||
      n.includes(`lateral-raise`) ||
      r.includes(`glute bridge`) ||
      r.includes(`abduction`)) &&
      !t.some((e) => e.id === `elastique`) &&
      t.push(GEAR.elastique),
    t
  )
}

export function gearForExercises(
  e: { exerciseId?: string; id?: string; exerciseName?: string; name?: string; equipment?: string; category?: string }[],
): GearItem[] {
  let t = new Map<string, GearItem>()
  for (let n of e) {
    let e = gearForExercise({
      id: n.exerciseId || n.id,
      name: n.exerciseName || n.name,
      equipment: n.equipment,
      category: n.category,
    })
    for (let n of e) t.has(n.id) || t.set(n.id, n)
  }
  return Array.from(t.values())
}

/** Fiche technique générée automatiquement pour un exercice créé par l'utilisatrice. */
export function generateExerciseSheet(e: string, t: string, n: string, r?: string, i?: string) {
  let a = e.trim() || `Mon Exercice`,
    o = MUSCLE_GROUPS.find((e) => e.id === t) || MUSCLE_GROUPS[0],
    s = o.label.replace(/^\d+\.\s*/, ``),
    c =
      (
        {
          dumbbell: `aux haltères`,
          barbell: `à la barre / Smith Machine`,
          machine: `sur machine guidée`,
          cable: `à la poulie (câble)`,
          bodyweight: `au poids du corps`,
          cardio_machine: `sur machine cardio`,
        } as Record<string, string>
      )[n] || `avec contrôle`,
    l = `bench_flat`
  n === `cable`
    ? (l = o.category === `lower-body` ? `cable_low` : `cable_high`)
    : n === `machine`
      ? (l = o.category === `lower-body` ? `leg_press` : o.category === `back` ? `seated_row` : `bench_incline`)
      : n === `barbell`
        ? (l = t === `fessiers` ? `bench_flat` : `squat_rack`)
        : (n === `bodyweight` || n === `cardio_machine`) && (l = `standing_free`)
  let u = `Installe-toi de manière stable ${c}, les pieds bien ancrés au sol, la sangle abdominale engagée (côtes basses) et les épaules basses loin des oreilles.`
  o.category === `back`
    ? (u = `En position stable ${c}, buste fier, omoplates prêtes à coulisser sans hausser les trapèzes supérieurs, prise ferme centrée sur l'engagement de : ${s}.`)
    : o.category === `pecs`
      ? (u = `Installée ${c}, omoplates resserrées et abaissées contre le dossier ou le banc, légère cambrure naturelle, poignets alignés avec les avant-bras.`)
      : o.category === `lower-body` &&
        (u = `Pieds ancrés avec stabilité ${c}, bassin neutre, abdos gainés et regard fixe vers l'avant pour isoler ${s.toLowerCase()}.`)
  let d = [
      `Mise en place : Prends position pour « ${a} » (${c}) en vérifiant ton alignement articulaire et ton gainage abdominal.`,
      `Phase concentrique (Effort) : Initie le mouvement directement par la contraction de ${s.toLowerCase()} sans donner d'élan avec le reste du corps.`,
      `Contraction au sommet : Maintiens 1 seconde de contraction volontaire au pic du mouvement pour maximiser le recrutement musculaire.`,
      `Phase excentrique (Retour) : Redescends ou accompagne la charge sur 2 à 3 secondes en contrôlant toute l'amplitude et l'étirement.`,
    ],
    f =
      o.category === `cardio`
        ? `Respiration nasale ou régulière et rythmée tout au long de l’effort.`
        : `Inspire profondément sur la phase d’étirement (retour contrôlé) et expire franchement pendant la phase d’effort et de contraction.`,
    p = [
      i?.trim() ||
        `Concentre ton esprit sur la fibre de ${s.toLowerCase()} (connexion cerveau-muscle) plutôt que de chercher à mettre trop lourd.`,
      o.category === `back`
        ? `Tire avec la pointe des coudes en gardant la nuque longue pour dessiner le dos sans crisper les trapèzes.`
        : o.category === `pecs`
          ? `Garde la poitrine haute et les épaules plaquées en arrière tout au long de la série.`
          : `Maintiens un tempo régulier (2s montée, 1s contraction, 3s descente) sur chaque répétition.`,
    ],
    m = [
      `Utiliser un élan du buste ou tricher avec la vitesse au lieu de contrôler la charge.`,
      `Réduire l’amplitude de moitié ou relâcher la tension musculaire en bas du mouvement.`,
    ],
    h =
      o.category === `back`
        ? `Évite d’enrouler les épaules vers l’avant ou de hausser les épaules vers les oreilles.`
        : o.category === `lower-body`
          ? `Évite de cambrer excessivement le bas du dos : garde les côtes basses et le périnée/transverse engagés.`
          : `Ne verrouille pas brutalement tes articulations en fin de mouvement pour garder la tension dans le muscle.`,
    g = {
      diagramType: l,
      seatSetting:
        n === `machine` || n === `cable`
          ? `Règle la hauteur du siège ou de la poulie pour aligner parfaitement l'axe de tirage/poussée avec ${s.toLowerCase()}.`
          : `Ajuste ton banc ou ton espace au sol pour avoir une liberté de mouvement totale et sécurisée.`,
      footPosition:
        o.category === `lower-body`
          ? `Appui franc sur tout le pied (avec poussée principale par le talon et le milieu du pied), genoux alignés avec les orteils.`
          : `Pieds posés à plat au sol, largeur d’épaules, pour stabiliser parfaitement ton bassin.`,
      gripWidth:
        o.category === `lower-body`
          ? `Mains posées sur les poignées de maintien ou tenant fermement la charge près du centre de gravité.`
          : `Prise symétrique, poignets droits et solides dans le prolongement des avant-bras.`,
      safetyCue: h,
    }
  return {
    description: r?.trim() || `Exercice ciblé pour sculpter et renforcer ${s.toLowerCase()} (${c}) avec contrôle et précision.`,
    startingPosition: u,
    steps: d,
    breathing: f,
    formTips: p,
    commonMistakes: m,
    avoidTips: [h],
    machineSetup: g,
  }
}
