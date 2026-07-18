import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { brand } from '@/config/brand'
import { Logo } from '@/components/Logo'
import { ProductsManager } from './ProductsManager'
import { SubmissionsManager } from './SubmissionsManager'
import { AdminDashboard } from './AdminDashboard'

const AUTH_KEY = 'cooltrade_admin_auth'

type View = 'dashboard' | 'products' | 'submissions'

/**
 * Admin panel — self-contained, client-side.
 *
 * IMPORTANT: the password gate is convenience-only. On a static host there is
 * no server to enforce auth, so this keeps the panel out of casual reach but is
 * NOT a security boundary. When wiring a real backend, move auth server-side
 * and treat this component as the UI shell only.
 */
export function AdminApp() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'ok',
  )

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />
  return <AdminShell onLogout={() => setAuthed(false)} />
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (password === site.adminPassword) {
      sessionStorage.setItem(AUTH_KEY, 'ok')
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <form onSubmit={submit} className="rounded-2xl bg-card p-7 shadow-2xl">
          <h1 className="text-lg font-bold text-ink">Panneau d'administration</h1>
          <p className="mt-1 text-sm text-ink-faint">
            Accès réservé. Entrez le mot de passe pour continuer.
          </p>
          <div className="mt-5">
            <label htmlFor="admin-pw" className="field-label">
              Mot de passe
            </label>
            <input
              id="admin-pw"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              className="field-input"
              placeholder="••••••••"
            />
            {error && (
              <p className="mt-1.5 text-xs text-rust">Mot de passe incorrect.</p>
            )}
          </div>
          <button type="submit" className="btn-blue mt-5 w-full">
            Se connecter
          </button>
          <Link
            to="/"
            className="mt-3 block text-center text-xs text-ink-faint hover:text-ink-soft"
          >
            ← Retour au site
          </Link>
        </form>
      </div>
    </div>
  )
}

function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<View>('dashboard')

  useEffect(() => {
    document.title = `Admin · ${brand.name}`
  }, [])

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    onLogout()
  }

  const navItems: { id: View; label: string }[] = [
    { id: 'dashboard', label: 'Tableau de bord' },
    { id: 'products', label: 'Catalogue' },
    { id: 'submissions', label: 'Demandes' },
  ]

  return (
    <div className="min-h-screen bg-card-2">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden rounded-full bg-line px-2.5 py-1 text-xs font-semibold text-ink-faint sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-ghost text-sm">
              Voir le site
            </Link>
            <button onClick={logout} className="btn-outline text-sm">
              Déconnexion
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="mx-auto max-w-6xl px-5">
          <nav className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  view === item.id
                    ? 'border-blue text-blue'
                    : 'border-transparent text-ink-faint hover:text-ink'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {view === 'dashboard' && <AdminDashboard onNavigate={setView} />}
        {view === 'products' && <ProductsManager />}
        {view === 'submissions' && <SubmissionsManager />}
      </main>
    </div>
  )
}
