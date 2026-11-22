// Modèle de données — compatible avec les documents Firestore de l'app d'origine.

export type Category = 'lower-body' | 'back' | 'pecs' | 'arms' | 'abs' | 'cardio'
export type Equipment = 'barbell' | 'machine' | 'dumbbell' | 'cable' | 'bodyweight' | 'cardio_machine'

export interface MachineSetup {
  diagramType?: string
  seatSetting?: string
  footPosition?: string
  gripWidth?: string
  safetyCue?: string
}

export interface Exercise {
  id: string
  name: string
  category: Category | string
  specificMuscle?: string
  primaryMuscle?: string
  secondaryMuscles?: string[]
  equipment: Equipment | string
  description?: string
  startingPosition?: string
  steps?: string[]
  breathing?: string
  formTips?: string[]
  commonMistakes?: string[]
  avoidTips?: string[]
  defaultSets?: number
  defaultReps?: string
  defaultRestSeconds?: number
  hasFootPlacementGuide?: boolean
  machineSetup?: MachineSetup
  isCustom?: boolean
  userId?: string
  [key: string]: unknown
}

export interface MuscleGroup { id: string; label: string; category: string }

export interface WorkoutSet {
  id: string
  setNumber: number
  targetReps: number
  targetWeight: number
  actualReps?: number
  actualWeight?: number
  completed: boolean
  notes?: string
  [key: string]: unknown
}

export interface WorkoutExercise {
  id: string
  exerciseId: string
  exerciseName: string
  category?: string
  equipment?: string
  restSeconds?: number
  sets: WorkoutSet[]
  notes?: string
  [key: string]: unknown
}

export interface Routine {
  id: string
  name: string
  targetZone?: string
  description?: string
  isDefault?: boolean
  finisher?: string
  notes?: string
  exercises: WorkoutExercise[]
  userId?: string
  createdAt?: string
  [key: string]: unknown
}

export interface FinisherLog { [key: string]: unknown }

export interface Workout {
  id: string
  userId: string
  name: string
  date: string
  status: 'in_progress' | 'completed' | string
  exercises: WorkoutExercise[]
  finisher?: string
  finisherPresetId?: string
  finisherLog?: FinisherLog
  programId?: string
  programWeekNumber?: number
  programDayId?: string
  notes?: string
  rating?: number
  startedAt?: string
  completedAt?: string
  durationMinutes?: number
  updatedAt?: string
  [key: string]: unknown
}

export interface Measurement {
  id: string
  userId?: string
  date: string
  weight?: number
  waist?: number
  hips?: number
  thighs?: number
  arms?: number
  chest?: number
  notes?: string
  createdAt?: string
  [key: string]: unknown
}

export type DayStatus = 'planned' | 'completed' | 'rest' | string

export interface WeeklyPlanDay {
  dayOfWeek: number
  dayName: string
  date: string
  activity: string
  activities?: string[]
  workoutName?: string
  routineId?: string
  targetZone?: string
  finisherType?: string
  finisher?: string
  finisherPresetId?: string
  programId?: string
  programWeekNumber?: number
  programDayId?: string
  status: DayStatus
  notes?: string
  [key: string]: unknown
}

export interface ProgramDay {
  id: string
  dayNumber: number
  label: string
  isRest: boolean
  activityType?: string
  routineId?: string
  workoutTitle?: string
  targetZone?: string
  durationMinutes?: number
  finisherPresetId?: string
  [key: string]: unknown
}

export interface ProgramWeek { weekNumber: number; title: string; focusNote: string; days: ProgramDay[] }

export interface Program {
  id: string
  title: string
  subtitle: string
  objective: string
  objectiveLabel: string
  durationWeeks: number
  sessionsPerWeek: number
  level: string
  coverImage: string
  equipment: string[]
  description: string
  coachTips: string[]
  weeks: ProgramWeek[]
  isCustom?: boolean
  createdBy?: string
  createdAt?: string
  [key: string]: unknown
}

export interface ActiveProgram {
  programId: string
  programTitle: string
  objective: string
  objectiveLabel: string
  startDate: string
  preferredDays: number[]
  durationWeeks: number
  sessionsPerWeek: number
  totalSessionsPlanned: number
  completedSessionCount: number
  completedWorkoutIds: string[]
  currentWeek: number
  progressPercent: number
  totalVolumeKg: number
  initialMeasurements?: Partial<Measurement>
  isCompleted: boolean
  completedAt?: string
  updatedAt?: string
}

export interface ObjectiveMeta { label: string; shortLabel: string; badgeBg: string; badgeText: string; description: string }

export interface FinisherInterval { label: string; type: string; durationSeconds: number; cue: string }
export interface FinisherPreset {
  id: string
  name: string
  category: string
  categoryLabel: string
  durationLabel: string
  totalDurationSeconds?: number
  executionMode: string
  summary: string
  instructions: string[]
  intervals?: FinisherInterval[]
  phaseAlerts?: { atElapsedSeconds: number; label: string; cue: string }[]
  targetSets?: number
  restBetweenSetsSeconds?: number
  targetReps?: number
  selectableExercises?: string[]
}

export interface AbsCircuit { id: string; name: string; focus: string; durationMinutes: number; exercises: { name: string; position?: string; reps: string }[] }
export interface CardioSession { id: string; name: string; machine: string; durationMinutes: number; intensity: string; description: string; intervals?: { time: string; instruction: string }[] }

export interface ActivityTypeMeta { label: string; icon: string; colorClass: string; defaultSession?: string; defaultRoutineId?: string }

export interface WeekTemplate {
  id: string
  title: string
  subtitle: string
  badge: string
  days: Record<string, Partial<WeeklyPlanDay>>
}

export interface GearItem { id: string; name: string; shortLabel: string; icon: string; reason: string; tip: string }

export type ExerciseSettings = Record<string, Record<string, unknown>>

export interface PreviousPerformance { weight: number; reps: number; date: string }
export interface OverloadSuggestion {
  previousWeight: number
  previousReps: number
  previousDate: string
  suggestedWeight: number
  suggestedReps: number
  recommendationText: string
  weekLabel: string
}
export type PersonalRecords = Record<string, { maxWeight: number; reps: number; date: string }>
