import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Logo } from './components/Logo'
import { AuthProvider, useAuth } from './features/auth/AuthProvider'
import { NewPasswordModal } from './features/auth/NewPasswordModal'
import { demoMode, supabaseConfigured } from './lib/supabase'
import { LandingPage } from './pages/LandingPage'
import { SocialProvider } from './store/SocialStore'
import { WorkoutProvider } from './store/WorkoutStore'

// Chaque écran est chargé à la demande : le premier affichage reste léger.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page = <T extends Record<string, any>>(loader: () => Promise<T>, name: keyof T) =>
  lazy(() => loader().then((m) => ({ default: m[name] as React.ComponentType })))

const HomePage = page(() => import('./pages/HomePage'), 'HomePage')
const WorkoutsRoute = page(() => import('./pages/WorkoutRoutes'), 'WorkoutsRoute')
const ActiveWorkoutRoute = page(() => import('./pages/WorkoutRoutes'), 'ActiveWorkoutRoute')
const PlanningRoute = page(() => import('./pages/MoreRoutes'), 'PlanningRoute')
const ProgramsRoute = page(() => import('./pages/MoreRoutes'), 'ProgramsRoute')
const ProgressRoute = page(() => import('./pages/MoreRoutes'), 'ProgressRoute')
const MeasurementsRoute = page(() => import('./pages/MoreRoutes'), 'MeasurementsRoute')
const SocialPage = page(() => import('./features/social/SocialPage'), 'SocialPage')
const CyclePage = page(() => import('./features/cycle/CyclePage'), 'CyclePage')
const ExercisesRoute = page(() => import('./pages/ExercisesRoute'), 'ExercisesRoute')

function Splash() {
  return <div className="grid min-h-dvh place-items-center bg-bg"><Logo size={56} className="animate-pulse" /></div>
}

function Routed() {
  const { user, loading } = useAuth()
  if (loading) return <Splash />
  if (!user) return <Routes><Route path="*" element={<LandingPage />} /></Routes>
  return (
    <WorkoutProvider>
      <SocialProvider>
      <Suspense fallback={<Splash />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="programmes" element={<ProgramsRoute />} />
            <Route path="exercices" element={<ExercisesRoute />} />
            <Route path="seances" element={<WorkoutsRoute />} />
            <Route path="seance" element={<ActiveWorkoutRoute />} />
            <Route path="planning" element={<PlanningRoute />} />
            <Route path="suivi" element={<ProgressRoute />} />
            <Route path="suivi/mensurations" element={<MeasurementsRoute />} />
            <Route path="social" element={<SocialPage />} />
            <Route path="cycle" element={<CyclePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      </SocialProvider>
    </WorkoutProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {!supabaseConfigured && !demoMode && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">Supabase n'est pas configuré : renseigne SUPABASE_URL et SUPABASE_ANON_KEY (voir <code>.env.example</code>).</div>
      )}
      <AuthProvider><Routed /><NewPasswordModal /></AuthProvider>
    </BrowserRouter>
  )
}
