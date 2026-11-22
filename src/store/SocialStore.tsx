// @ts-nocheck — store social porté depuis l'app d'origine (amies et fil simulés localement).
// TEMPORAIRE : remplacé par le vrai Club Supabase (tables profiles / friends / social).
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../features/auth/AuthProvider'
import { useWorkout } from './WorkoutStore'

const SOCIAL_STORAGE_PREFIX = 'glow_up_lab_social_v2_'
const SOCIAL_DOC_ID = 'social_state_v2'
const AVATAR_COLORS = ['#BE185D', '#781539', '#9D174D', '#DB2777', '#701A75', '#A21CAF']
const EMPTY_FRIENDS = [], EMPTY_REQUESTS = [], EMPTY_POSTS = [], EMPTY_DATES = []
const SocialContext = createContext(undefined)

function samplePostsForFriend(e) {
  let t = Date.now()
  return [
    {
      id: `post-friend-w1-${e.id}-${t}`,
      authorId: e.id,
      authorName: e.displayName,
      authorHandle: e.handle,
      authorAvatarColor: e.avatarColor,
      type: `workout`,
      createdAt: `Aujourd’hui · Séance validée`,
      workoutName: e.todayWorkoutName || `Dos Dessiné sans l’Élargir (Ordre 1-2-3-4)`,
      durationMinutes: 50,
      exercisesSummary: [
        {
          name: `Tirage horizontal prise large`,
          setsCount: 3,
          reps: `12`,
          topWeight: 32.5,
        },
        {
          name: `Tirage vertical poitrine`,
          setsCount: 3,
          reps: `10`,
          topWeight: 35,
        },
        {
          name: `Oiseau inversé (Pec Deck)`,
          setsCount: 3,
          reps: `15`,
          topWeight: 20,
        },
        {
          name: `Back Extension (Banc à lombaires)`,
          setsCount: 3,
          reps: `15`,
          topWeight: 10,
        },
      ],
      hideWeights: e.hideWeights,
      caption: `Séance du jour terminée par ${e.displayName} ! Ordre 1-2-3-4 respecté + 15 min de marche inclinée 12-5-30 en finisher 🔥`,
      reactions: {
        fire: [],
        muscle: [],
        flower: [],
        clap: [],
      },
      comments: [],
    },
    {
      id: `post-friend-w2-${e.id}-${t - 1e3}`,
      authorId: e.id,
      authorName: e.displayName,
      authorHandle: e.handle,
      authorAvatarColor: e.avatarColor,
      type: `workout`,
      createdAt: `Il y a 2 jours`,
      workoutName: `Leg Day Fessiers & Ischios (4 exos)`,
      durationMinutes: 55,
      exercisesSummary: [
        {
          name: `Hip Thrust à la barre`,
          setsCount: 4,
          reps: `10`,
          topWeight: 85,
        },
        {
          name: `Soulevé de terre roumain (RDL)`,
          setsCount: 3,
          reps: `10`,
          topWeight: 55,
        },
        {
          name: `Fentes bulgares aux haltères`,
          setsCount: 3,
          reps: `10`,
          topWeight: 14,
        },
        {
          name: `Kick-back fessiers à la poulie`,
          setsCount: 3,
          reps: `15`,
          topWeight: 17.5,
        },
      ],
      hideWeights: e.hideWeights,
      caption: `Grosse congestion sur le bas du corps aujourd’hui ! Qui s’entraîne demain ? 🌸💪`,
      reactions: {
        fire: [],
        muscle: [],
        flower: [],
        clap: [],
      },
      comments: [],
    },
    {
      id: `post-friend-pr-${e.id}-${t - 2e3}`,
      authorId: e.id,
      authorName: e.displayName,
      authorHandle: e.handle,
      authorAvatarColor: e.avatarColor,
      type: `pr`,
      createdAt: `Cette semaine`,
      prExerciseName: e.favoriteExercise || `Hip Thrust à la barre`,
      prWeight: 85,
      prReps: 10,
      hideWeights: e.hideWeights,
      caption: `Nouveau record personnel validé par ${e.displayName} sur son exercice favori ! 🏆✨`,
      reactions: {
        fire: [],
        muscle: [],
        flower: [],
        clap: [],
      },
      comments: [],
    },
  ]
}

export const SocialProvider = ({ children }) => {
  let { user, profile } = useAuth(),
    { workouts, createRoutine, customExercises } = useWorkout(),
    o = user?.uid || `guest`,
    s = useMemo(
      () =>
        `@${
          (profile?.displayName || user?.displayName || `glow.girl`)
            .toLowerCase()
            .normalize(`NFD`)
            .replace(/[\u0300-\u036f]/g, ``)
            .replace(/[^a-z0-9]/g, ``) || `glow.girl`
        }`,
      [profile?.displayName, user?.displayName],
    ),
    c = useMemo(() => `GLOW-${(user?.uid || `88G`).slice(0, 3).toUpperCase()}`, [user?.uid]),
    [l, u] = useState({
      handle: s,
      friendCode: c,
      avatarColor: `#781539`,
      bioStatus: `En plein Glow Up 🌸 4 exos par séance, zéro excuse !`,
      favoriteExercise: `Hip Thrust à la barre`,
      hideWeights: false,
      duoPartnerId: ``,
      duoStreakWeeks: 0,
    }),
    [d, f] = useState(EMPTY_FRIENDS),
    [p, m] = useState(EMPTY_REQUESTS),
    [h, g] = useState(EMPTY_POSTS),
    [v, y] = useState(EMPTY_DATES),
    [b, x] = useState({}),
    [S, C] = useState(12),
    [w, T] = useState(`Cagnotte Squad : Valider 12 séances à nous toutes cette semaine`),
    E = (e, t) => {
      if (e.length === 0) return t
      let n = [...t]
      for (let t of e) n.some((e) => e.authorId === t.id && e.type === `workout`) || (n = [...samplePostsForFriend(t), ...n])
      return n
    },
    D = async () => {
      let e = `${SOCIAL_STORAGE_PREFIX}${o}`,
        n = [],
        r = []
      try {
        let t = localStorage.getItem(e)
        if (t) {
          let e = JSON.parse(t)
          ;(e.mySocialProfile && u(e.mySocialProfile),
            Array.isArray(e.friends) && (n = e.friends),
            Array.isArray(e.friendRequests) && m(e.friendRequests),
            Array.isArray(e.feedPosts) && (r = e.feedPosts),
            Array.isArray(e.gymDates) && y(e.gymDates),
            e.pokedFriendIds && typeof e.pokedFriendIds == `object` && x(e.pokedFriendIds),
            e.challengeTarget && C(e.challengeTarget),
            e.challengeTitle && T(e.challengeTitle))
        }
      } catch {}
      let i = E(n, r)
      ;(f(n), g(i))
    }
  useEffect(() => {
    D()
  }, [o, user?.uid])
  let ee = async () => {
      await D()
    },
    O = async (e) => {
      let n = {
        mySocialProfile: e.mySocialProfile ?? l,
        friends: e.friends ?? d,
        friendRequests: e.friendRequests ?? p,
        feedPosts: e.feedPosts ?? h,
        gymDates: e.gymDates ?? v,
        pokedFriendIds: e.pokedFriendIds ?? b,
        challengeTarget: e.challengeTarget ?? S,
        challengeTitle: e.challengeTitle ?? w,
        updatedAt: new Date().toISOString(),
      }
      try {
        localStorage.setItem(`${SOCIAL_STORAGE_PREFIX}${o}`, JSON.stringify(n))
      } catch {}
    },
    te = async (e) => {
      let t = {
        ...l,
        ...e,
        handle: e.handle ? (e.handle.startsWith(`@`) ? e.handle : `@${e.handle}`) : l.handle,
      }
      ;(u(t),
        await O({
          mySocialProfile: t,
        }))
    },
    k = (e, t) => {
      let n = e.trim(),
        r = (t || ``).trim()
      if (!n && !r)
        return {
          success: false,
          message: `Entre un prénom/surnom, un @pseudo ou un code GLOW-XXX.`,
        }
      let i = (n || r).toLowerCase(),
        a = d.find(
          (e) =>
            e.handle.toLowerCase() === i ||
            e.friendCode.toLowerCase() === i ||
            e.displayName.toLowerCase() === i ||
            (r && e.displayName.toLowerCase() === r.toLowerCase()),
        )
      if (a)
        return {
          success: false,
          message: `${a.displayName} fait déjà partie de tes amies !`,
        }
      let o = p.find(
        (e) =>
          e.status === `pending` &&
          (e.fromUser.handle.toLowerCase() === i ||
            e.fromUser.friendCode.toLowerCase() === i ||
            e.fromUser.displayName.toLowerCase() === i),
      )
      if (o)
        return (
          re(o.id),
          {
            success: true,
            message: `${o.fromUser.displayName} t’avait déjà envoyé une demande : vous êtes maintenant amies !`,
          }
        )
      let s = r
      if (!s) {
        if (!n.startsWith(`@`) && !n.toUpperCase().startsWith(`GLOW-`)) s = n.charAt(0).toUpperCase() + n.slice(1)
        else {
          let e = n
            .replace(/^@/, ``)
            .replace(/^glow-/i, ``)
            .replace(/[._-]+/g, ` `)
            .trim()
          s = e
            ? e
                .split(` `)
                .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                .join(` `)
            : `Ma Gym Bestie`
        }
      }
      let c = (n.startsWith(`@`) ? n.slice(1) : s)
          .toLowerCase()
          .normalize(`NFD`)
          .replace(/[\u0300-\u036f]/g, ``)
          .replace(/[^a-z0-9.]/g, ``),
        m = n.startsWith(`@`) ? n.toLowerCase() : `@${c || `bestie`}`,
        _ = n.toUpperCase().startsWith(`GLOW-`)
          ? n.toUpperCase()
          : `GLOW-${Math.floor(10 + Math.random() * 89)}${s.charAt(0).toUpperCase()}`,
        v = AVATAR_COLORS[d.length % AVATAR_COLORS.length],
        y = {
          id: `friend-${Date.now()}`,
          displayName: s,
          handle: m,
          friendCode: _,
          avatarColor: v,
          bioStatus: `En plein Glow Up 💪 Séances Bas du corps, Dos & Pecs !`,
          favoriteExercise: `Hip Thrust à la barre`,
          weeklySessionsDone: 3,
          weeklySessionsTarget: 3,
          streakWeeks: 3,
          totalWorkouts: 18,
          hideWeights: false,
          badges: [`Binôme de choc`, `Reine du Leg Day`, `Dos Dessiné sans Élargir`],
          objectivesDoneCount: 3,
          todayActivity: `Séance Dos / Pecs`,
          todayWorkoutName: `Dos Dessiné sans l’Élargir (Ordre 1-2-3-4)`,
          isTrainingToday: true,
          weeklySchedule: [
            {
              dayOfWeek: 1,
              dayName: `Lundi`,
              activity: `Séance Bas du corps`,
              workoutName: `Leg Day Fessiers`,
              isTraining: true,
            },
            {
              dayOfWeek: 2,
              dayName: `Mardi`,
              activity: `Repos`,
              isTraining: false,
            },
            {
              dayOfWeek: 3,
              dayName: `Mercredi`,
              activity: `Séance Dos`,
              workoutName: `Dos Dessiné 1-2-3-4`,
              isTraining: true,
            },
            {
              dayOfWeek: 4,
              dayName: `Jeudi`,
              activity: `Repos`,
              isTraining: false,
            },
            {
              dayOfWeek: 5,
              dayName: `Vendredi`,
              activity: `Séance Fessiers`,
              workoutName: `Booty & Pecs/Bras`,
              isTraining: true,
            },
            {
              dayOfWeek: 6,
              dayName: `Samedi`,
              activity: `Cardio`,
              workoutName: `Marche 12-5-30`,
              isTraining: true,
            },
            {
              dayOfWeek: 0,
              dayName: `Dimanche`,
              activity: `Repos`,
              isTraining: false,
            },
          ],
          sharedRoutines: [
            {
              name: `Séance Dos Dessiné 1-2-3-4 (${s})`,
              targetZone: `back`,
              description: `La routine Dos complète dans l’ordre : 1. Milieu du dos, 2. Grand dorsal, 3. Arrière d’épaule, 4. Back extension.`,
              finisher: `Marche inclinée 12-5-30 (15 min)`,
              exercises: [
                {
                  id: `sr-${Date.now()}-1`,
                  exerciseId: `wide-grip-seated-cable-row`,
                  exerciseName: `Tirage horizontal prise large (Poulie basse)`,
                  category: `back`,
                  equipment: `cable`,
                  restSeconds: 75,
                  sets: [
                    {
                      id: `s1`,
                      setNumber: 1,
                      targetReps: 12,
                      targetWeight: 30,
                      completed: false,
                    },
                    {
                      id: `s2`,
                      setNumber: 2,
                      targetReps: 12,
                      targetWeight: 32.5,
                      completed: false,
                    },
                    {
                      id: `s3`,
                      setNumber: 3,
                      targetReps: 12,
                      targetWeight: 32.5,
                      completed: false,
                    },
                  ],
                },
                {
                  id: `sr-${Date.now()}-2`,
                  exerciseId: `lat-pulldown-wide`,
                  exerciseName: `Tirage vertical poitrine (Lat Pulldown)`,
                  category: `back`,
                  equipment: `cable`,
                  restSeconds: 75,
                  sets: [
                    {
                      id: `s4`,
                      setNumber: 1,
                      targetReps: 12,
                      targetWeight: 35,
                      completed: false,
                    },
                    {
                      id: `s5`,
                      setNumber: 2,
                      targetReps: 10,
                      targetWeight: 37.5,
                      completed: false,
                    },
                    {
                      id: `s6`,
                      setNumber: 3,
                      targetReps: 10,
                      targetWeight: 37.5,
                      completed: false,
                    },
                  ],
                },
                {
                  id: `sr-${Date.now()}-3`,
                  exerciseId: `reverse-pec-deck`,
                  exerciseName: `Oiseau inversé à la machine (Reverse Pec Deck)`,
                  category: `back`,
                  equipment: `machine`,
                  restSeconds: 60,
                  sets: [
                    {
                      id: `s7`,
                      setNumber: 1,
                      targetReps: 15,
                      targetWeight: 20,
                      completed: false,
                    },
                    {
                      id: `s8`,
                      setNumber: 2,
                      targetReps: 15,
                      targetWeight: 20,
                      completed: false,
                    },
                    {
                      id: `s9`,
                      setNumber: 3,
                      targetReps: 15,
                      targetWeight: 22.5,
                      completed: false,
                    },
                  ],
                },
                {
                  id: `sr-${Date.now()}-4`,
                  exerciseId: `hyperextensions-bench`,
                  exerciseName: `Back Extension (Banc à lombaires 45°)`,
                  category: `back`,
                  equipment: `bodyweight`,
                  restSeconds: 60,
                  sets: [
                    {
                      id: `s10`,
                      setNumber: 1,
                      targetReps: 15,
                      targetWeight: 10,
                      completed: false,
                    },
                    {
                      id: `s11`,
                      setNumber: 2,
                      targetReps: 15,
                      targetWeight: 10,
                      completed: false,
                    },
                    {
                      id: `s12`,
                      setNumber: 3,
                      targetReps: 15,
                      targetWeight: 10,
                      completed: false,
                    },
                  ],
                },
              ],
            },
            {
              name: `Leg Day Galbe & Tension (${s})`,
              targetZone: `lower-body`,
              description: `Séance bas du corps en 4 exercices dans l’ordre anatomique : étirement, contraction, unilatéral et isolation.`,
              finisher: `Marche inclinée 12% · 4,5 km/h · 15 min`,
              exercises: [
                {
                  id: `sr-${Date.now()}-5`,
                  exerciseId: `romanian-deadlift`,
                  exerciseName: `Soulevé de terre roumain (RDL)`,
                  category: `lower-body`,
                  equipment: `barbell`,
                  restSeconds: 120,
                  sets: [
                    {
                      id: `s13`,
                      setNumber: 1,
                      targetReps: 10,
                      targetWeight: 50,
                      completed: false,
                    },
                    {
                      id: `s14`,
                      setNumber: 2,
                      targetReps: 10,
                      targetWeight: 55,
                      completed: false,
                    },
                    {
                      id: `s15`,
                      setNumber: 3,
                      targetReps: 10,
                      targetWeight: 55,
                      completed: false,
                    },
                  ],
                },
                {
                  id: `sr-${Date.now()}-6`,
                  exerciseId: `hip-thrust-barbell`,
                  exerciseName: `Hip Thrust à la barre`,
                  category: `lower-body`,
                  equipment: `barbell`,
                  restSeconds: 120,
                  sets: [
                    {
                      id: `s16`,
                      setNumber: 1,
                      targetReps: 10,
                      targetWeight: 80,
                      completed: false,
                    },
                    {
                      id: `s17`,
                      setNumber: 2,
                      targetReps: 10,
                      targetWeight: 85,
                      completed: false,
                    },
                    {
                      id: `s18`,
                      setNumber: 3,
                      targetReps: 8,
                      targetWeight: 90,
                      completed: false,
                    },
                  ],
                },
                {
                  id: `sr-${Date.now()}-7`,
                  exerciseId: `bulgarian-split-squat`,
                  exerciseName: `Fentes bulgares aux haltères`,
                  category: `lower-body`,
                  equipment: `dumbbell`,
                  restSeconds: 90,
                  sets: [
                    {
                      id: `s19`,
                      setNumber: 1,
                      targetReps: 10,
                      targetWeight: 12,
                      completed: false,
                    },
                    {
                      id: `s20`,
                      setNumber: 2,
                      targetReps: 10,
                      targetWeight: 14,
                      completed: false,
                    },
                    {
                      id: `s21`,
                      setNumber: 3,
                      targetReps: 10,
                      targetWeight: 14,
                      completed: false,
                    },
                  ],
                },
                {
                  id: `sr-${Date.now()}-8`,
                  exerciseId: `cable-glute-kickback`,
                  exerciseName: `Kick-back fessiers à la poulie basse`,
                  category: `lower-body`,
                  equipment: `cable`,
                  restSeconds: 60,
                  sets: [
                    {
                      id: `s22`,
                      setNumber: 1,
                      targetReps: 15,
                      targetWeight: 15,
                      completed: false,
                    },
                    {
                      id: `s23`,
                      setNumber: 2,
                      targetReps: 15,
                      targetWeight: 15,
                      completed: false,
                    },
                    {
                      id: `s24`,
                      setNumber: 3,
                      targetReps: 15,
                      targetWeight: 17.5,
                      completed: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        b = samplePostsForFriend(y),
        x = [y, ...d],
        S = [...b, ...h],
        C = l.duoPartnerId
          ? l
          : {
              ...l,
              duoPartnerId: y.id,
              duoStreakWeeks: Math.max(1, l.duoStreakWeeks),
            }
      return (
        f(x),
        g(S),
        u(C),
        O({
          friends: x,
          feedPosts: S,
          mySocialProfile: C,
        }),
        {
          success: true,
          message: `${s} a été ajoutée à tes amies ! Ses séances sont maintenant visibles dans Fil & Activité 🌸`,
        }
      )
    },
    ne = (e, t, n, r, i) => {
      let a = t.trim()
      if (!a) return
      let o = n?.trim() ? (n.trim().startsWith(`@`) ? n.trim() : `@${n.trim()}`) : void 0,
        s = d.map((t) =>
          t.id === e
            ? {
                ...t,
                displayName: a,
                handle: o || t.handle,
                bioStatus: r === void 0 ? t.bioStatus : r.trim() || t.bioStatus,
                favoriteExercise: i === void 0 ? t.favoriteExercise : i.trim() || t.favoriteExercise,
              }
            : t,
        ),
        c = s.find((t) => t.id === e),
        l = h.map((t) => {
          let n =
              t.authorId === e
                ? {
                    ...t,
                    authorName: a,
                    authorHandle: c?.handle || t.authorHandle,
                  }
                : t,
            r = n.comments.map((t) =>
              t.authorId === e
                ? {
                    ...t,
                    authorName: a,
                    authorHandle: c?.handle || t.authorHandle,
                  }
                : t,
            )
          return {
            ...n,
            comments: r,
          }
        }),
        u = v.map((t) =>
          t.friendId === e
            ? {
                ...t,
                friendName: a,
                friendHandle: c?.handle || t.friendHandle,
              }
            : t,
        )
      ;(f(s),
        g(l),
        y(u),
        O({
          friends: s,
          feedPosts: l,
          gymDates: u,
        }))
    },
    re = (e) => {
      let t = p.find((t) => t.id === e)
      if (!t) return
      let n = p.filter((t) => t.id !== e),
        r = [t.fromUser, ...d.filter((e) => e.id !== t.fromUser.id)],
        i = [...samplePostsForFriend(t.fromUser), ...h],
        a = l.duoPartnerId
          ? l
          : {
              ...l,
              duoPartnerId: t.fromUser.id,
              duoStreakWeeks: Math.max(1, l.duoStreakWeeks),
            }
      ;(m(n),
        f(r),
        g(i),
        u(a),
        O({
          friendRequests: n,
          friends: r,
          feedPosts: i,
          mySocialProfile: a,
        }))
    },
    ie = (e) => {
      let t = p.filter((t) => t.id !== e)
      ;(m(t),
        O({
          friendRequests: t,
        }))
    },
    ae = (e) => {
      let t = d.filter((t) => t.id !== e),
        n = h.filter((t) => t.authorId !== e),
        r =
          l.duoPartnerId === e
            ? {
                ...l,
                duoPartnerId: t[0]?.id || ``,
                duoStreakWeeks: t.length > 0 ? l.duoStreakWeeks : 0,
              }
            : l
      ;(f(t),
        g(n),
        u(r),
        O({
          friends: t,
          feedPosts: n,
          mySocialProfile: r,
        }))
    },
    oe = (e, t) => {
      let n = o,
        r = h.map((r) => {
          if (r.id !== e) return r
          let i = r.reactions[t] || [],
            a = i.includes(n) ? i.filter((e) => e !== n) : [...i, n]
          return {
            ...r,
            reactions: {
              ...r.reactions,
              [t]: a,
            },
          }
        })
      ;(g(r),
        O({
          feedPosts: r,
        }))
    },
    se = (e, r) => {
      let i = r.trim()
      if (!i) return
      let a = profile?.displayName || user?.displayName || `Moi`,
        s = {
          id: `comment-${Date.now()}`,
          authorId: o,
          authorName: a,
          authorHandle: l.handle,
          authorAvatarColor: l.avatarColor,
          text: i,
          createdAt: `À l’instant`,
        },
        c = h.map((t) =>
          t.id === e
            ? {
                ...t,
                comments: [...t.comments, s],
              }
            : t,
        )
      ;(g(c),
        O({
          feedPosts: c,
        }))
    },
    A = (e, r) => {
      let i = profile?.displayName || user?.displayName || `Moi`,
        a = e.exercises.slice(0, 5).map((e) => {
          let t = e.sets.reduce((e, t) => {
              let n = t.actualWeight ?? t.targetWeight ?? 0
              return n > e ? n : e
            }, 0),
            n = e.sets[0]?.actualReps || e.sets[0]?.targetReps || 10
          return {
            name: e.exerciseName,
            setsCount: e.sets.length,
            reps: String(n),
            topWeight: t,
          }
        }),
        s = [
          {
            id: `post-${Date.now()}`,
            authorId: o,
            authorName: i,
            authorHandle: l.handle,
            authorAvatarColor: l.avatarColor,
            type: `workout`,
            createdAt: `À l’instant`,
            workoutName: e.name,
            durationMinutes: e.durationMinutes || 45,
            exercisesSummary: a,
            hideWeights: l.hideWeights,
            caption: r || `Séance ${e.name} validée ! ${e.exercises.length} exercices bouclés avec régularité ✨`,
            reactions: {
              fire: [],
              muscle: [],
              flower: [],
              clap: [],
            },
            comments: [],
          },
          ...h,
        ]
      ;(g(s),
        O({
          feedPosts: s,
        }))
    },
    ce = (e, r, i, a) => {
      let s = profile?.displayName || user?.displayName || `Moi`,
        c = [
          {
            id: `post-pr-${Date.now()}`,
            authorId: o,
            authorName: s,
            authorHandle: l.handle,
            authorAvatarColor: l.avatarColor,
            type: `pr`,
            createdAt: `À l’instant`,
            prExerciseName: e,
            prWeight: r,
            prReps: i,
            hideWeights: l.hideWeights,
            caption: a || `Nouveau record personnel sur ${e} ! La surcharge progressive paie 🔥`,
            reactions: {
              fire: [],
              muscle: [],
              flower: [],
              clap: [],
            },
            comments: [],
          },
          ...h,
        ]
      ;(g(c),
        O({
          feedPosts: c,
        }))
    },
    le = (e) => {
      let r = profile?.displayName || user?.displayName || `Moi`,
        i = [
          {
            id: `post-obj-${Date.now()}`,
            authorId: o,
            authorName: r,
            authorHandle: l.handle,
            authorAvatarColor: l.avatarColor,
            type: `objective`,
            createdAt: `À l’instant`,
            objectiveLabel: e,
            caption: `Objectif coché dans mon suivi : « ${e} » 🌸`,
            reactions: {
              fire: [],
              muscle: [],
              flower: [],
              clap: [],
            },
            comments: [],
          },
          ...h,
        ]
      ;(g(i),
        O({
          feedPosts: i,
        }))
    },
    ue = (e) => {
      let r = profile?.displayName || user?.displayName || `Moi`,
        i = {
          name: e.name,
          targetZone: e.targetZone,
          description: e.description,
          finisher: e.finisher,
          exercises: e.exercises.slice(0, 5),
        },
        a = [
          {
            id: `post-routine-${Date.now()}`,
            authorId: o,
            authorName: r,
            authorHandle: l.handle,
            authorAvatarColor: l.avatarColor,
            type: `routine_share`,
            createdAt: `À l’instant`,
            workoutName: e.name,
            sharedRoutine: i,
            caption: `Je vous partage ma routine « ${e.name} » ! Vous pouvez l’importer en 1 clic dans vos séances 🌸`,
            reactions: {
              fire: [],
              muscle: [],
              flower: [],
              clap: [],
            },
            comments: [],
          },
          ...h,
        ]
      ;(g(a),
        O({
          feedPosts: a,
        }))
    },
    de = (e) => {
      let r = d.find((t) => t.id === e)
      if (!r) return null
      try {
        typeof navigator < `u` && navigator.vibrate && navigator.vibrate([80, 40, 120])
      } catch {}
      let i = new Date().toLocaleTimeString(`fr-FR`, {
          hour: `2-digit`,
          minute: `2-digit`,
        }),
        a = {
          ...b,
          [e]: i,
        }
      x(a)
      let s = d.map((t) =>
        t.id === e
          ? {
              ...t,
              lastPokedAt: i,
            }
          : t,
      )
      f(s)
      let c = profile?.displayName || user?.displayName || `Moi`,
        u = [
          {
            id: `post-wizz-${Date.now()}`,
            authorId: o,
            authorName: c,
            authorHandle: l.handle,
            authorAvatarColor: l.avatarColor,
            type: `wizz`,
            createdAt: `Aujourd’hui à ${i}`,
            wizzTargetName: r.displayName,
            wizzTargetHandle: r.handle,
            caption: `⚡ WIZZ MOTIVATION envoyé à ${r.displayName} (${r.handle}) : « Prête à tout donner sur ta séance aujourd’hui ? Zéro excuse, on garde notre régularité ! 💪🌸 »`,
            reactions: {
              fire: [r.id],
              muscle: [],
              flower: [],
              clap: [],
            },
            comments: [
              {
                id: `comment-wizz-${Date.now()}`,
                authorId: r.id,
                authorName: r.displayName,
                authorHandle: r.handle,
                authorAvatarColor: r.avatarColor,
                text: `Wizz bien reçu !! J’attrape ma gourde et mes sangles, je file à la salle 🔥💪`,
                createdAt: `À l’instant`,
              },
            ],
          },
          ...h,
        ]
      return (
        g(u),
        O({
          friends: s,
          pokedFriendIds: a,
          feedPosts: u,
        }),
        {
          friendName: r.displayName,
          time: i,
        }
      )
    },
    fe = (e) => {
      let r = d.find((t) => t.id === e.friendId) || d[0],
        i = d,
        a = h
      if (!r && e.customFriendQuery?.trim()) {
        let t = e.customFriendQuery.trim(),
          n =
            t
              .replace(/^@/, ``)
              .replace(/^glow-/i, ``)
              .trim() || `Sarah`,
          o = n.charAt(0).toUpperCase() + n.slice(1),
          s = t.startsWith(`@`) ? t.toLowerCase() : `@${n.toLowerCase().replace(/[^a-z0-9]/g, ``)}.glow`,
          c = t.toUpperCase().startsWith(`GLOW-`)
            ? t.toUpperCase()
            : `GLOW-${Math.floor(10 + Math.random() * 89)}${o.charAt(0).toUpperCase()}`,
          l = {
            id: `friend-${Date.now()}`,
            displayName: o,
            handle: s,
            friendCode: c,
            avatarColor: `#BE185D`,
            bioStatus: `Prête à tout donner cette semaine 💪✨`,
            favoriteExercise: `Hip Thrust à la barre`,
            weeklySessionsDone: 2,
            weeklySessionsTarget: 3,
            streakWeeks: 2,
            totalWorkouts: 12,
            hideWeights: false,
            badges: [`Binôme de choc`],
            objectivesDoneCount: 2,
            todayActivity: e.workoutTheme || `Séance Bas du corps`,
            todayWorkoutName: e.workoutTheme || `Leg Day & Fessiers`,
            isTrainingToday: true,
            weeklySchedule: [
              {
                dayOfWeek: 1,
                dayName: `Lundi`,
                activity: `Séance Bas du corps`,
                workoutName: `Leg Day`,
                isTraining: true,
              },
              {
                dayOfWeek: 2,
                dayName: `Mardi`,
                activity: `Repos`,
                isTraining: false,
              },
              {
                dayOfWeek: 3,
                dayName: `Mercredi`,
                activity: `Séance Dos`,
                workoutName: `Dos & Pecs`,
                isTraining: true,
              },
              {
                dayOfWeek: 4,
                dayName: `Jeudi`,
                activity: `Repos`,
                isTraining: false,
              },
              {
                dayOfWeek: 5,
                dayName: `Vendredi`,
                activity: `Séance Fessiers`,
                workoutName: `Booty Sculpt`,
                isTraining: true,
              },
              {
                dayOfWeek: 6,
                dayName: `Samedi`,
                activity: `Repos`,
                isTraining: false,
              },
              {
                dayOfWeek: 0,
                dayName: `Dimanche`,
                activity: `Repos`,
                isTraining: false,
              },
            ],
            sharedRoutines: [],
          }
        ;((r = l), (i = [l, ...d]), (a = [...samplePostsForFriend(l), ...a]), f(i))
      }
      if (!r) return null
      let s = new Date().toLocaleTimeString(`fr-FR`, {
          hour: `2-digit`,
          minute: `2-digit`,
        }),
        c = {
          id: `gymdate-${Date.now()}`,
          friendId: r.id,
          friendName: r.displayName,
          friendHandle: r.handle,
          friendAvatarColor: r.avatarColor,
          dayOfWeek: e.dayOfWeek,
          dayLabel: e.dayLabel,
          timeSlot: e.timeSlot || `18h00`,
          workoutTheme: e.workoutTheme || `Leg Day & Fessiers (4 exos)`,
          locationNote: e.locationNote,
          direction: `outgoing`,
          status: `accepted`,
          createdAt: `Envoyée à ${s}`,
        },
        u = profile?.displayName || user?.displayName || `Moi`,
        p = {
          id: `post-gymdate-${Date.now()}`,
          authorId: o,
          authorName: u,
          authorHandle: l.handle,
          authorAvatarColor: l.avatarColor,
          type: `gym_date`,
          createdAt: `Aujourd’hui à ${s}`,
          gymDateSummary: {
            friendName: r.displayName,
            dayLabel: c.dayLabel,
            timeSlot: c.timeSlot,
            workoutTheme: c.workoutTheme,
            locationNote: c.locationNote,
          },
          caption: `📅 Invitation « On s’entraîne ensemble ? » envoyée à ${r.displayName} pour ${c.dayLabel} à ${c.timeSlot} (${c.workoutTheme}) !`,
          reactions: {
            fire: [r.id],
            muscle: [],
            flower: [],
            clap: [],
          },
          comments: [],
        },
        m = [c, ...v],
        _ = [p, ...a]
      return (
        y(m),
        g(_),
        O({
          friends: i,
          gymDates: m,
          feedPosts: _,
        }),
        c
      )
    },
    pe = (e, t) => {
      let n = v.map((n) =>
        n.id === e
          ? {
              ...n,
              status: t ? `accepted` : `declined`,
            }
          : n,
      )
      ;(y(n),
        O({
          gymDates: n,
        }))
    },
    me = (e) => {
      let t = v.filter((t) => t.id !== e)
      ;(y(t),
        O({
          gymDates: t,
        }))
    },
    he = async (e) =>
      await createRoutine({
        name: e.name,
        targetZone: e.targetZone || `lower-body`,
        description: e.description || `Séance partagée par une Gym Bestie`,
        finisher: e.finisher,
        exercises: e.exercises.slice(0, 5),
      }),
    ge = (e) => {
      let t = d.find((t) => t.id === e),
        n = {
          ...l,
          duoPartnerId: e,
          duoStreakWeeks: t ? Math.max(3, t.streakWeeks) : l.duoStreakWeeks,
        }
      ;(u(n),
        O({
          mySocialProfile: n,
        }))
    },
    _e = (e, t) => {
      let n = Math.max(3, Math.min(50, e)),
        r = t?.trim() || `Cagnotte Squad : Valider ${n} séances à nous toutes cette semaine`
      ;(C(n),
        T(r),
        O({
          challengeTarget: n,
          challengeTitle: r,
        }))
    },
    ve = useMemo(() => {
      let e = workouts.filter((e) => e.status === `completed`).length
      return Math.max(2, Math.min(5, e || 2))
    }, [workouts]),
    ye = useMemo(() => {
      let e = profile?.displayName || user?.displayName || `Moi`,
        r = [
          {
            userId: o,
            name: `${e} (Toi)`,
            avatarColor: l.avatarColor,
            sessionsCount: ve,
          },
          ...d.map((e) => ({
            userId: e.id,
            name: e.displayName,
            avatarColor: e.avatarColor,
            sessionsCount: e.weeklySessionsDone,
          })),
        ]
      return {
        id: `weekly-squad-challenge`,
        title: w,
        description: `Chaque séance terminée par toi ou tes amies fait monter la cagnotte commune de la semaine !`,
        targetSessions: S,
        weekLabel: `Semaine en cours`,
        contributions: r,
      }
    }, [profile?.displayName, user?.displayName, o, l.avatarColor, ve, d, w, S]),
    j = useMemo(() => {
      let e = h.reduce((e, t) => e + +!!Object.values(t.reactions).some((e) => e.includes(o)), 0),
        t = workouts.filter((e) => e.status === `completed`),
        n = t.some((e) => !!e.finisher),
        i = Object.keys(b).length > 0 || h.some((e) => e.type === `wizz`)
      return [
        {
          id: `badge-duo`,
          title: `Binôme de choc`,
          description: `Avoir une Gym Bestie en Duo Streak actif`,
          icon: `heart-pulse`,
          unlocked: !!l.duoPartnerId && d.length > 0,
          progressText: `${l.duoStreakWeeks} sem. en duo`,
        },
        {
          id: `badge-streak-4`,
          title: `4 semaines régulières`,
          description: `Maintenir son rythme d’entraînement 4 semaines de suite`,
          icon: `trophy`,
          unlocked: l.duoStreakWeeks >= 4 || workouts.length >= 1,
          progressText: `Régularité validée`,
        },
        {
          id: `badge-legday-queen`,
          title: `Reine du Leg Day`,
          description: `Structurer ses séances bas du corps en 4 exercices dans l’ordre (1-2-3-4)`,
          icon: `kettlebell`,
          unlocked: true,
          progressText: `Ordre Bas du corps maîtrisé`,
        },
        {
          id: `badge-back-sculpt`,
          title: `Dos Dessiné sans Élargir`,
          description: `Suivre l’ordre 1. Milieu du dos · 2. Grand dorsal · 3. Arrière d’épaule · 4. Lombaires`,
          icon: `dumbbell`,
          unlocked: true,
          progressText: `Guide Dos 1-2-3-4 débloqué`,
        },
        {
          id: `badge-pecs-upper`,
          title: `Pecs & Upper Queen`,
          description: `Intégrer les séances Dos/Pecs ou Pecs/Bras pour le maintien du buste`,
          icon: `biceps`,
          unlocked: true,
          progressText: `Combos Dos/Pecs & Pecs/Bras prêts`,
        },
        {
          id: `badge-supporter`,
          title: `Supportrice #1`,
          description: `Encourager ses amies avec des réactions ou commentaires dans le Club`,
          icon: `sparkle`,
          unlocked: e >= 1 || h.some((e) => e.comments.length > 0),
          progressText: `${Math.max(1, e)} encouragements`,
        },
        {
          id: `badge-wizz-master`,
          title: `Wizz Master ⚡`,
          description: `Envoyer un Wizz de motivation à une amie pour la booster avant sa séance`,
          icon: `sparkle`,
          unlocked: i,
          progressText: i ? `Boost envoyé !` : `Envoie ton 1er Wizz`,
        },
        {
          id: `badge-finisher-addict`,
          title: `Finisher Addict 🔥`,
          description: `Compléter une séance avec un circuit Abdos ou Cardio (12-5-30, StairMaster...)`,
          icon: `runner`,
          unlocked: n || workouts.length >= 1,
          progressText: `Circuits Abdos & Cardio actifs`,
        },
        {
          id: `badge-custom-creator`,
          title: `Créatrice d’Exos ✨`,
          description: `Créer son propre exercice avec fiche complète générée automatiquement`,
          icon: `sparkle`,
          unlocked: customExercises.length > 0,
          progressText: `${customExercises.length} exo(s) créé(s)`,
        },
        {
          id: `badge-squad`,
          title: `Squad au complet`,
          description: `Compter au moins 3 amies dans son cercle Glow Up Lab`,
          icon: `biceps`,
          unlocked: d.length >= 3,
          progressText: `${d.length}/3 amies`,
        },
        {
          id: `badge-pr`,
          title: `PR Breaker 🏆`,
          description: `Partager ou célébrer un record personnel de charge avec le Club`,
          icon: `weightlifter`,
          unlocked: h.some((e) => e.type === `pr`),
          progressText: `Surcharge progressive`,
        },
        {
          id: `badge-10-workouts`,
          title: `Club des 10 Séances`,
          description: `Valider 10 séances complètes dans son historique Glow Up Lab`,
          icon: `trophy`,
          unlocked: t.length >= 10,
          progressText: `${t.length}/10 séances`,
        },
      ]
    }, [h, o, l, d.length, workouts, b, customExercises.length])
  return (
    <SocialContext.Provider
      value={{
        mySocialProfile: l,
        updateMySocialProfile: te,
        friends: d,
        friendRequests: p,
        feedPosts: h,
        gymDates: v,
        collectiveChallenge: ye,
        badges: j,
        pokedFriendIds: b,
        sendFriendRequestByQuery: k,
        renameFriend: ne,
        acceptFriendRequest: re,
        declineFriendRequest: ie,
        removeFriend: ae,
        toggleReaction: oe,
        addComment: se,
        shareWorkoutToFeed: A,
        sharePRToFeed: ce,
        shareObjectiveToFeed: le,
        shareRoutineToClub: ue,
        pokeFriend: de,
        createGymDateInvite: fe,
        respondToGymDate: pe,
        deleteGymDateInvite: me,
        importSharedRoutine: he,
        setDuoPartner: ge,
        updateCollectiveChallengeTarget: _e,
        refreshSocialData: ee,
      }}
    >
      {children}
    </SocialContext.Provider>
  )
}

/** Typage minimal pour les écrans non portés (le store complet est en JS porté). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SocialState { friends: { id: string; displayName: string }[]; [key: string]: any }

export function useSocial(): SocialState {
  const ctx = useContext(SocialContext)
  if (!ctx) throw new Error('useSocial doit être utilisé dans <SocialProvider>')
  return ctx
}
