import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CATEGORIES, type CategoryId, type Product } from '@/data/catalog'
import { useProducts } from '@/hooks/useProducts'
import {
  upsertProduct,
  deleteProduct,
  resetProducts,
  exportProducts,
  importProducts,
} from '@/lib/store'

const EMPTY: Product = {
  id: '',
  categoryId: 'gaz',
  name: '',
  description: '',
  formats: [],
  specs: [],
  badge: '',
  featured: false,
}

export function ProductsManager() {
  const { t } = useTranslation()
  const products = useProducts()
  const [editing, setEditing] = useState<Product | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [importOpen, setImportOpen] = useState(false)

  const grouped = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      cat,
      items: products.filter((p) => p.categoryId === cat.id),
    }))
  }, [products])

  function startNew() {
    setEditing({ ...EMPTY, id: `produit-${Date.now()}` })
    setIsNew(true)
  }
  function startEdit(p: Product) {
    setEditing({ ...p, specs: p.specs ?? [], badge: p.badge ?? '' })
    setIsNew(false)
  }
  function onDelete(p: Product) {
    if (confirm(`Supprimer « ${p.name} » ? Cette action est réversible via « Réinitialiser ».`)) {
      deleteProduct(p.id)
    }
  }
  function onExport() {
    const blob = new Blob([exportProducts()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cooltrade-catalogue.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  function onReset() {
    if (confirm('Réinitialiser le catalogue aux données par défaut ? Vos modifications locales seront perdues.')) {
      resetProducts()
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-steel-900">Catalogue</h1>
          <p className="mt-1 text-sm text-steel-500">
            {products.length} produit{products.length > 1 ? 's' : ''} · {CATEGORIES.length} catégories
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setImportOpen(true)} className="btn-outline text-sm">
            Importer
          </button>
          <button onClick={onExport} className="btn-outline text-sm">
            Exporter le catalogue
          </button>
          <button onClick={onReset} className="btn-ghost text-sm text-sun-700">
            Réinitialiser
          </button>
          <button onClick={startNew} className="btn-primary text-sm">
            + Ajouter un produit
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {grouped.map(({ cat, items }) => (
          <div key={cat.id}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-steel-500">
              {t(`catalog.categories.${cat.i18nKey}.name`)}{' '}
              <span className="text-steel-400">({items.length})</span>
            </h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-steel-200 bg-white">
              {items.length === 0 ? (
                <p className="p-4 text-sm text-steel-400">Aucun produit.</p>
              ) : (
                items.map((p, i) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between gap-4 p-4 ${
                      i > 0 ? 'border-t border-steel-100' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-steel-900">{p.name}</span>
                        {p.badge && (
                          <span className="rounded bg-sun-100 px-1.5 py-0.5 text-xs font-semibold text-sun-800">
                            {p.badge}
                          </span>
                        )}
                        {p.featured && (
                          <span className="rounded bg-frost-100 px-1.5 py-0.5 text-xs font-semibold text-frost-700">
                            Vedette
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-sm text-steel-500">{p.description}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => startEdit(p)}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-steel-600 hover:bg-steel-100"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => onDelete(p)}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-sun-700 hover:bg-sun-50"
                      >
                        Suppr.
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <ProductEditor
          product={editing}
          isNew={isNew}
          onClose={() => setEditing(null)}
          onSave={(p) => {
            upsertProduct(p)
            setEditing(null)
          }}
        />
      )}

      {importOpen && <ImportDialog onClose={() => setImportOpen(false)} />}
    </div>
  )
}

function ProductEditor({
  product,
  isNew,
  onClose,
  onSave,
}: {
  product: Product
  isNew: boolean
  onClose: () => void
  onSave: (p: Product) => void
}) {
  const { t } = useTranslation()
  const [form, setForm] = useState<Product>(product)
  const [formatsText, setFormatsText] = useState(product.formats.join(', '))
  const [specsText, setSpecsText] = useState((product.specs ?? []).join(', '))

  function save() {
    if (!form.name.trim() || !form.id.trim()) {
      alert('Le nom et l’identifiant sont obligatoires.')
      return
    }
    onSave({
      ...form,
      formats: formatsText.split(',').map((s) => s.trim()).filter(Boolean),
      specs: specsText.split(',').map((s) => s.trim()).filter(Boolean),
      badge: form.badge?.trim() || undefined,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-steel-950/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-steel-100 bg-white px-6 py-4">
          <h2 className="font-bold text-steel-900">
            {isNew ? 'Nouveau produit' : 'Modifier le produit'}
          </h2>
          <button onClick={onClose} className="btn-ghost p-2">
            ✕
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <label className="field-label">Nom du produit *</label>
            <input
              className="field-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Catégorie</label>
              <select
                className="field-input"
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value as CategoryId })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {t(`catalog.categories.${c.i18nKey}.name`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Identifiant *</label>
              <input
                className="field-input font-mono text-xs"
                value={form.id}
                disabled={!isNew}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="field-label">Description</label>
            <textarea
              className="field-input resize-y"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div>
            <label className="field-label">Formats disponibles</label>
            <input
              className="field-input"
              placeholder="1 kg, 3 kg, 13,6 kg"
              value={formatsText}
              onChange={(e) => setFormatsText(e.target.value)}
            />
            <p className="mt-1 text-xs text-steel-400">Séparés par des virgules.</p>
          </div>

          <div>
            <label className="field-label">Points techniques (specs)</label>
            <input
              className="field-input"
              placeholder="GWP réduit, Bouteille rechargeable"
              value={specsText}
              onChange={(e) => setSpecsText(e.target.value)}
            />
            <p className="mt-1 text-xs text-steel-400">Séparés par des virgules.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Badge (optionnel)</label>
              <input
                className="field-input"
                placeholder="Éco R32, Populaire…"
                value={form.badge ?? ''}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              />
            </div>
            <label className="flex cursor-pointer items-end gap-2 pb-2.5">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-steel-300 text-frost-600"
                checked={!!form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <span className="text-sm text-steel-700">Produit vedette</span>
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-2 border-t border-steel-100 bg-white px-6 py-4">
          <button onClick={onClose} className="btn-outline text-sm">
            Annuler
          </button>
          <button onClick={save} className="btn-primary text-sm">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

function ImportDialog({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  function doImport() {
    const res = importProducts(text)
    if (res.ok) onClose()
    else setError(res.error || 'Import invalide.')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-steel-900">Importer un catalogue (JSON)</h2>
        <p className="mt-1 text-sm text-steel-500">
          Collez le contenu d'un fichier de catalogue exporté.
        </p>
        <textarea
          className="field-input mt-4 h-48 resize-none font-mono text-xs"
          placeholder='[ { "id": "...", "categoryId": "gaz", ... } ]'
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setError(null)
          }}
        />
        {error && <p className="mt-2 text-sm text-sun-700">{error}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="btn-outline text-sm">
            Annuler
          </button>
          <button onClick={doImport} className="btn-primary text-sm">
            Importer
          </button>
        </div>
      </div>
    </div>
  )
}
