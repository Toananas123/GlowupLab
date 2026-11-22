import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Logo } from './components/Logo'
import { AuthProvider, useAuth } from './features/auth/AuthProvider'
import { firebaseConfigured } from './lib/firebase'
import { LandingPage } from './pages/LandingPage'
import { Placeholder } from './pages/Placeholder'
import { WorkoutProvider } from './store/WorkoutStore'

// Chaque écran est chargé à la demande : le premier affichage reste léger.
const page = <T extends Record<string, React.ComponentType>>(loader: () => Promise<T>, name: keyof T) =>
  lazy(() => loader().then((m) => ({ default: m[name] as React.ComponentType })))

const HomePage = page(() => import('./pages/HomePage'), 'HomePage')
const WorkoutsRoute = page(() => import('./pages/WorkoutRoutes'), 'WorkoutsRoute')
const ActiveWorkoutRoute = page(() => import('./pages/WorkoutRoutes'), 'ActiveWorkoutRoute')
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
      <Suspense fallback={<Splash />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="programmes" element={<Placeholder title="Programmes" />} />
            <Route path="exercices" element={<ExercisesRoute />} />
            <Route path="seances" element={<WorkoutsRoute />} />
            <Route path="seance" element={<ActiveWorkoutRoute />} />
            <Route path="planning" element={<Placeholder title="Planning" />} />
            <Route path="suivi" element={<Placeholder title="Suivi" />} />
            <Route path="suivi/mensurations" element={<Placeholder title="Mensurations" />} />
            <Route path="social" element={<Placeholder title="Social & Amies" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </WorkoutProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {!firebaseConfigured && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">Firebase n'est pas configuré : copie <code>.env.example</code> en <code>.env</code>.</div>
      )}
      <AuthProvider><Routed /></AuthProvider>
    </BrowserRouter>
  )
}
