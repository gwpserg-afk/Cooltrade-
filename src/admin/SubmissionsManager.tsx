import { useEffect, useState } from 'react'
import {
  getSubmissions,
  deleteSubmission,
  exportSubmissionsCsv,
  STORE_EVENT,
  type Submission,
  type SubmissionType,
} from '@/lib/store'

const FIELD_LABELS: Record<string, string> = {
  name: 'Nom',
  company: 'Entreprise',
  phone: 'Téléphone',
  whatsapp: 'WhatsApp',
  email: 'E-mail',
  regNumber: 'RCCM / NINEA',
  volume: 'Volume mensuel',
  segment: 'Profil',
  message: 'Message',
}

const TYPE_LABELS: Record<SubmissionType, string> = {
  'pro-credit': 'Compte pro',
  contact: 'Contact',
}

export function SubmissionsManager() {
  const [items, setItems] = useState<Submission[]>(getSubmissions)
  const [filter, setFilter] = useState<'all' | SubmissionType>('all')

  useEffect(() => {
    const refresh = () => setItems(getSubmissions())
    window.addEventListener(STORE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(STORE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  const visible = filter === 'all' ? items : items.filter((s) => s.type === filter)

  function onDelete(id: string) {
    if (confirm('Supprimer cette demande ?')) setItems(deleteSubmission(id))
  }

  function onExportCsv() {
    const csv = exportSubmissionsCsv()
    if (!csv) return
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cooltrade-demandes.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const filters: { id: 'all' | SubmissionType; label: string }[] = [
    { id: 'all', label: 'Toutes' },
    { id: 'pro-credit', label: TYPE_LABELS['pro-credit'] },
    { id: 'contact', label: TYPE_LABELS.contact },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Demandes reçues</h1>
          <p className="mt-1 text-sm text-ink-faint">
            Messages de contact et demandes de compte professionnel.
          </p>
        </div>
        <button
          onClick={onExportCsv}
          className="btn-outline text-sm"
          disabled={items.length === 0}
        >
          Exporter en CSV
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              filter === f.id
                ? 'bg-ink text-white'
                : 'bg-line text-ink-soft hover:bg-line'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-card p-10 text-center">
          <p className="text-ink-faint">Aucune demande pour le moment.</p>
          <p className="mt-1 text-sm text-ink-faint">
            Les demandes envoyées via les formulaires du site apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {visible.map((s) => (
            <div key={s.id} className="rounded-2xl border border-line bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      s.type === 'pro-credit'
                        ? 'bg-rust/15 text-rust'
                        : 'bg-blue/15 text-blue'
                    }`}
                  >
                    {TYPE_LABELS[s.type]}
                  </span>
                  <span className="text-xs text-ink-faint">
                    {new Date(s.createdAt).toLocaleString('fr-FR')}
                  </span>
                </div>
                <button
                  onClick={() => onDelete(s.id)}
                  className="text-sm font-medium text-rust hover:underline"
                >
                  Suppr.
                </button>
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {Object.entries(s.data)
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className={k === 'message' ? 'sm:col-span-2' : ''}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                        {FIELD_LABELS[k] ?? k}
                      </dt>
                      <dd className="mt-0.5 text-sm text-ink">{v}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
