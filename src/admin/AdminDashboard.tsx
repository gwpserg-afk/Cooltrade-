import { useEffect, useState } from 'react'
import { CATEGORIES } from '@/data/catalog'
import { getProducts, getSubmissions, hasCustomProducts, STORE_EVENT } from '@/lib/store'
import { web3formsConfigured } from '@/config/site'

export function AdminDashboard({
  onNavigate,
}: {
  onNavigate: (v: 'products' | 'submissions') => void
}) {
  const [, force] = useState(0)
  useEffect(() => {
    const refresh = () => force((n) => n + 1)
    window.addEventListener(STORE_EVENT, refresh)
    return () => window.removeEventListener(STORE_EVENT, refresh)
  }, [])

  const products = getProducts()
  const submissions = getSubmissions()
  const proRequests = submissions.filter((s) => s.type === 'pro-credit').length
  const contactRequests = submissions.filter((s) => s.type === 'contact').length

  const stats = [
    { label: 'Produits au catalogue', value: products.length, action: () => onNavigate('products') },
    { label: 'Catégories', value: CATEGORIES.length, action: () => onNavigate('products') },
    { label: 'Demandes de compte pro', value: proRequests, action: () => onNavigate('submissions') },
    { label: 'Messages de contact', value: contactRequests, action: () => onNavigate('submissions') },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Tableau de bord</h1>
      <p className="mt-1 text-sm text-ink-faint">
        Vue d'ensemble du contenu et des demandes reçues.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={s.action}
            className="rounded-2xl border border-line bg-card p-5 text-left transition-shadow hover:shadow-lg"
          >
            <div className="font-serif text-3xl font-bold text-ink">{s.value}</div>
            <div className="mt-1 text-sm text-ink-faint">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Status notes */}
      <div className="mt-8 space-y-3">
        <StatusRow
          ok={web3formsConfigured()}
          okText="Formulaires connectés à Web3Forms — les demandes arrivent par e-mail."
          warnText="Formulaires en mode local : les demandes sont enregistrées ici mais aucun e-mail n'est envoyé. Ajoutez une clé Web3Forms dans src/config/site.ts."
        />
        <StatusRow
          ok={hasCustomProducts()}
          okText="Catalogue personnalisé actif (modifications enregistrées dans ce navigateur)."
          warnText="Catalogue par défaut (données du code). Vos modifications seront enregistrées dès la première sauvegarde."
          neutral
        />
      </div>

      <div className="mt-8 rounded-2xl border border-blue/30 bg-blue/10 p-5 text-sm text-ink-soft">
        <p className="font-semibold text-ink">Comment ça marche</p>
        <p className="mt-2 leading-relaxed">
          Les modifications du catalogue sont enregistrées dans ce navigateur. Pour les rendre
          permanentes sur le site en ligne, utilisez le bouton <strong>« Exporter le catalogue »</strong>{' '}
          dans l'onglet Catalogue, puis transmettez le fichier JSON à votre développeur (il remplace{' '}
          <code className="rounded bg-card px-1 py-0.5 text-xs">src/data/catalog.ts</code>). C'est
          aussi le point de départ idéal pour brancher une vraie base de données plus tard.
        </p>
      </div>
    </div>
  )
}

function StatusRow({
  ok,
  okText,
  warnText,
  neutral,
}: {
  ok: boolean
  okText: string
  warnText: string
  neutral?: boolean
}) {
  const tone = ok
    ? 'border-blue/30 bg-blue/10 text-ink-soft'
    : neutral
      ? 'border-line bg-card text-ink-soft'
      : 'border-rust/30 bg-rust/10 text-rust'
  const dot = ok ? 'bg-blue' : neutral ? 'bg-ink-faint' : 'bg-rust'
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${tone}`}>
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <span>{ok ? okText : warnText}</span>
    </div>
  )
}
