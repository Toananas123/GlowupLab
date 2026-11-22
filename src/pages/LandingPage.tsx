import { ArrowRight, Check, Clock, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { Logo } from '../components/Logo'
import { AuthModal, type AuthMode } from '../features/auth/AuthModal'

type Demo = 'workout' | 'planning' | 'progress'
const TABS: { id: Demo; label: string }[] = [
  { id: 'workout', label: 'Mode Séance' },
  { id: 'planning', label: 'Planning 7j' },
  { id: 'progress', label: 'Suivi & PR' },
]

const WEEK: { day: string; activity: string; detail: string; icon: IconName; rest?: boolean }[] = [
  { day: 'Lundi', activity: 'Focus Fessiers', detail: '4 exercices · 50 min', icon: 'kettlebell' },
  { day: 'Mardi', activity: 'Pilates & Core', detail: 'Mobilité · 35 min', icon: 'stretch' },
  { day: 'Mercredi', activity: 'Dos & Posture', detail: '4 exercices · 45 min', icon: 'dumbbell' },
  { day: 'Jeudi', activity: 'Récupération', detail: 'Marche & Eau', icon: 'water', rest: true },
  { day: 'Vendredi', activity: 'Bas du corps', detail: 'Presse · 55 min', icon: 'weightlifter' },
  { day: 'Samedi', activity: 'Cardio 12-3-30', detail: 'Tapis · 30 min', icon: 'runner' },
  { day: 'Dimanche', activity: 'Repos complet', detail: 'Recharge', icon: 'stretch', rest: true },
]

const PRS = [
  { name: 'Hip Thrust à la barre', start: '70 kg × 10', current: '90 kg × 10', gain: '+20 kg' },
  { name: 'Presse à cuisses inclinée', start: '100 kg × 12', current: '130 kg × 12', gain: '+30 kg' },
  { name: 'Tirage vertical poitrine', start: '35 kg × 10', current: '45 kg × 10', gain: '+10 kg' },
]

const FEATURES: { title: string; text: string; icon: IconName }[] = [
  { title: 'Suivi de Séance & Chrono Intégré', text: 'Valide tes séries en un geste, ajuste tes charges avec les boutons rapides et lance automatiquement ton temps de repos entre chaque série.', icon: 'stopwatch' },
  { title: 'Planning 7 Jours & Séances Sur-Mesure', text: 'Organise ta semaine en quelques secondes ou utilise « Propose-moi une séance » pour générer un entraînement adapté à ton temps et ton matériel.', icon: 'calendar' },
  { title: 'Exercices Guidés & Réglages Mémorisés', text: 'Consulte les consignes de posture, le guide interactif des pieds à la presse et sauvegarde tes réglages de siège ou de poulie sur chaque machine.', icon: 'dumbbell' },
  { title: 'Suivi des Charges & Mensurations', text: 'Retrouve automatiquement ta dernière performance sous chaque exercice pour progresser d’une séance à l’autre et suis tes records personnels.', icon: 'trophy' },
]

export function LandingPage() {
  const [mode, setMode] = useState<AuthMode | null>(null)
  const [tab, setTab] = useState<Demo>('workout')
  const [auto, setAuto] = useState(true)
  const [sets, setSets] = useState([{ id: 1, weight: 80, reps: 10, done: true }, { id: 2, weight: 85, reps: 10, done: true }, { id: 3, weight: 85, reps: 10, done: false }])

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setTab((c) => TABS[(TABS.findIndex((x) => x.id === c) + 1) % TABS.length].id), 3200)
    return () => clearInterval(t)
  }, [auto])

  const pick = (id: Demo) => { setAuto(false); setTab(id) }
  const toggleSet = (id: number) => { setAuto(false); setSets((s) => s.map((x) => (x.id === id ? { ...x, done: !x.done } : x))) }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-ink">
      <div className="relative">
        <img src="/hero-glow.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo size={40} />
          <button onClick={() => setMode('signin')} className="flex items-center gap-2 rounded-full bg-[#831843] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#831843]/25">
            <Icon name="user" className="size-4" /> Mon compte
          </button>
        </header>
        <section className="relative mx-auto max-w-4xl px-5 pt-10 pb-14 text-center sm:pt-16">
          <h1 className="font-display text-[2.6rem] leading-[1.05] font-extrabold tracking-tight sm:text-7xl">
            Planifie. Entraîne-toi. <span className="bg-gradient-to-r from-pink to-[#831843] bg-clip-text text-transparent italic">Progresse.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">Toute ta routine au même endroit : prépare ta semaine, valide tes séries en un geste et suis l’évolution de tes charges sans effort.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => setMode('signup')} className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink to-[#831843] px-7 py-3.5 font-semibold text-white shadow-lg shadow-pink/30 transition hover:brightness-110">
              Démarrer gratuitement <ArrowRight size={18} />
            </button>
            <button onClick={() => setMode('signin')} className="rounded-full border border-blush-line bg-surface/80 px-7 py-3.5 font-semibold backdrop-blur hover:bg-surface">J’ai déjà un compte</button>
          </div>
        </section>
      </div>

      {/* Démo interactive */}
      <section className="mx-auto max-w-5xl px-5">
        <div className="mb-4 flex justify-center">
          <div role="tablist" className="inline-flex rounded-full border border-line bg-surface p-1 shadow-sm">
            {TABS.map((t) => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => pick(t.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${tab === t.id ? 'bg-[#831843] text-white' : 'text-muted hover:bg-soft-2 hover:text-plum'}`}>{t.label}</button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-line bg-surface p-4 shadow-xl shadow-[#831843]/5 sm:p-7">
          {tab === 'workout' && (
            <div className="animate-fade-up">
              <DemoHeader icon="weightlifter" eyebrow="Séance en direct" title="Focus Fessiers & Galbe"
                right={<div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="flex items-center gap-1 rounded-full bg-soft px-3 py-1.5 text-plum"><Clock size={13} /> Repos · 01:15</span>
                  <span className="rounded-full bg-blush px-3 py-1.5 text-plum">{sets.filter((s) => s.done).length}/{sets.length} séries</span>
                </div>} />
              <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                <div className="rounded-3xl bg-soft-2 p-4">
                  <p className="text-[11px] font-bold tracking-wider text-pink uppercase">Exercice 1 sur 4</p>
                  <h4 className="mt-1 text-lg font-bold">Hip Thrust à la barre</h4>
                  <p className="text-sm text-muted">Dernière performance : <strong className="text-plum">80 kg × 10</strong> · Banc bas, pause 1s en haut</p>
                  <div className="mt-3 space-y-2">
                    {sets.map((s, i) => (
                      <button key={s.id} onClick={() => toggleSet(s.id)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${s.done ? 'border-pink-2 bg-blush/80' : 'border-blush-line bg-surface hover:border-pink-2'}`}>
                        <span className="font-semibold text-muted">Série {i + 1}</span>
                        <span className="font-bold">{s.weight} kg <span className="text-pink">×</span> {s.reps} reps</span>
                        <span className={`grid size-7 place-items-center rounded-full ${s.done ? 'bg-[#831843] text-white' : 'border border-blush-line bg-soft-2 text-plum/40'}`}><Check size={14} /></span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-center text-xs text-muted">Touche une série pour tester la validation en direct</p>
                </div>
                <div className="space-y-3">
                  <DemoNext tag="Exercice suivant" meta="4 × 12 reps" title="Presse à cuisses inclinée" text="Réglage mémorisé : Siège cran 3 · Pieds hauts écartés" />
                  <DemoNext tag="Exercice 3" meta="3 × 10 / jambe" title="Fentes bulgares aux haltères" text="Dernière charge : 14 kg par main" />
                  <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-[#831843] to-pink p-4 text-white">
                    <div><p className="text-[11px] font-bold tracking-wider uppercase opacity-80">Finisher Cardio</p><p className="text-sm font-semibold">Marche inclinée · Inclinaison 10 · 15 min</p></div>
                    <Icon name="runner" className="size-7" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'planning' && (
            <div className="animate-fade-up">
              <DemoHeader icon="calendar" eyebrow="Organisation hebdomadaire" title="Ma semaine d’entraînement sur 7 jours"
                right={<span className="rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-plum">4 séances · 1 cardio · 2 repos</span>} />
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
                {WEEK.map((d) => (
                  <div key={d.day} className={`rounded-2xl border p-3 ${d.rest ? 'border-blush-line/60 bg-[#fff9fc] text-muted' : 'border-blush-line bg-gradient-to-b from-soft-2 to-surface'}`}>
                    <div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold">{d.day}</span><Icon name={d.icon} className="size-4 text-pink" /></div>
                    <p className="text-sm font-semibold leading-tight">{d.activity}</p>
                    <p className="text-[11px] text-muted">{d.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'progress' && (
            <div className="animate-fade-up">
              <DemoHeader icon="trophy" eyebrow="Surcharge progressive" title="Records personnels & évolution des mensurations"
                right={<span className="rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-plum">Progression constante sur 8 semaines</span>} />
              <div className="grid gap-3 sm:grid-cols-3">
                {PRS.map((p) => (
                  <div key={p.name} className="rounded-3xl border border-blush-line bg-soft-2 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-pink uppercase"><TrendingUp size={13} /> Record battu</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">{p.gain}</span>
                    </div>
                    <h4 className="font-bold">{p.name}</h4>
                    <div className="mt-2 flex justify-between text-xs"><span className="text-muted">Départ : {p.start}</span><span className="font-bold text-plum">Actuel : {p.current}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="mb-8 text-center font-display text-3xl font-bold sm:text-4xl">L’essentiel pour tes séances, <span className="text-pink">sans le superflu.</span></h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-3xl border border-line bg-surface p-5">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-soft text-plum"><Icon name={f.icon} className="size-6" /></div>
              <div><h3 className="font-bold">{f.title}</h3><p className="mt-1 text-sm text-muted">{f.text}</p></div>
            </div>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-[#3b0726] text-white">
          <img src="/cta-training.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3b0726] via-[#3b0726]/80 to-transparent" />
          <div className="relative flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div><h3 className="font-display text-2xl font-bold sm:text-3xl">Prête pour ta prochaine séance ?</h3><p className="mt-1 text-blush-line">Accès gratuit, sans publicité, sur téléphone et ordinateur.</p></div>
            <button onClick={() => setMode('signup')} className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#831843]">Créer mon compte <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <footer className="flex items-center justify-center gap-2 border-t border-line py-6 text-sm text-muted">
        <Logo size={24} /> Discipline · Posture · Progression
      </footer>

      {mode && <AuthModal initialMode={mode} onClose={() => setMode(null)} />}
    </div>
  )
}

function DemoHeader({ icon, eyebrow, title, right }: { icon: IconName; eyebrow: string; title: string; right: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-soft text-plum"><Icon name={icon} className="size-5" /></span>
        <div><p className="text-[11px] font-bold tracking-wider text-pink uppercase">{eyebrow}</p><h3 className="font-bold sm:text-lg">{title}</h3></div>
      </div>
      {right}
    </div>
  )
}

function DemoNext({ tag, meta, title, text }: { tag: string; meta: string; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-4">
      <div className="mb-1 flex justify-between text-[11px] font-bold tracking-wider uppercase"><span className="text-pink">{tag}</span><span className="text-muted">{meta}</span></div>
      <h5 className="font-semibold">{title}</h5>
      <p className="text-xs text-muted">{text}</p>
    </div>
  )
}
