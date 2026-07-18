import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CATEGORIES, type CategoryId, type Product } from '@/data/catalog'
import { useProducts } from '@/hooks/useProducts'
import { tx, toPair, fromPair, type Localized } from '@/lib/localize'
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
    setEditing({ ...p })
    setIsNew(false)
  }
  function onDelete(p: Product) {
    if (confirm(`Supprimer « ${tx(p.name, 'fr')} » ? Cette action est réversible via « Réinitialiser ».`)) {
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
          <h1 className="text-2xl font-bold text-ink">Catalogue</h1>
          <p className="mt-1 text-sm text-ink-faint">
            {products.length} produit{products.length > 1 ? 's' : ''} · {CATEGORIES.length} catégories · FR / EN
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setImportOpen(true)} className="btn-outline text-sm">
            Importer
          </button>
          <button onClick={onExport} className="btn-outline text-sm">
            Exporter le catalogue
          </button>
          <button onClick={onReset} className="btn-ghost text-sm text-rust">
            Réinitialiser
          </button>
          <button onClick={startNew} className="btn-blue text-sm">
            + Ajouter un produit
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {grouped.map(({ cat, items }) => (
          <div key={cat.id}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
              {t(`catalog.categories.${cat.i18nKey}.name`)}{' '}
              <span className="text-ink-faint">({items.length})</span>
            </h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-line bg-card">
              {items.length === 0 ? (
                <p className="p-4 text-sm text-ink-faint">Aucun produit.</p>
              ) : (
                items.map((p, i) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between gap-4 p-4 ${
                      i > 0 ? 'border-t border-line' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-ink">
                          {tx(p.name, 'fr')}
                        </span>
                        {p.badge && (
                          <span className="rounded bg-rust/15 px-1.5 py-0.5 text-xs font-semibold text-rust">
                            {tx(p.badge, 'fr')}
                          </span>
                        )}
                        {p.featured && (
                          <span className="rounded bg-blue/15 px-1.5 py-0.5 text-xs font-semibold text-blue">
                            Vedette
                          </span>
                        )}
                        {typeof p.name !== 'string' && p.name.en ? (
                          <span className="rounded bg-line px-1.5 py-0.5 text-xs font-semibold text-ink-faint">
                            EN ✓
                          </span>
                        ) : (
                          <span className="rounded bg-line px-1.5 py-0.5 text-xs font-semibold text-ink-faint">
                            EN —
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-sm text-ink-faint">
                        {tx(p.description, 'fr')}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => startEdit(p)}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-line"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => onDelete(p)}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-rust hover:bg-rust/10"
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

/** Zip two comma-separated lists (FR / EN) into a Localized[] for specs. */
function zipSpecs(frText: string, enText: string): Localized[] {
  const fr = frText.split(',').map((s) => s.trim()).filter(Boolean)
  const en = enText.split(',').map((s) => s.trim()).filter(Boolean)
  return fr.map((f, i) => fromPair({ fr: f, en: en[i] ?? '' }))
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
  const [id, setId] = useState(product.id)
  const [categoryId, setCategoryId] = useState<CategoryId>(product.categoryId)
  const [featured, setFeatured] = useState(!!product.featured)
  const [name, setName] = useState(toPair(product.name))
  const [description, setDescription] = useState(toPair(product.description))
  const [badge, setBadge] = useState(toPair(product.badge))
  const [formatsText, setFormatsText] = useState(product.formats.join(', '))
  const [specsFr, setSpecsFr] = useState(
    (product.specs ?? []).map((s) => toPair(s).fr).join(', '),
  )
  const [specsEn, setSpecsEn] = useState(
    (product.specs ?? []).map((s) => toPair(s).en).join(', '),
  )

  function save() {
    if (!name.fr.trim() || !id.trim()) {
      alert('Le nom (FR) et l’identifiant sont obligatoires.')
      return
    }
    const badgePair = badge.fr.trim() ? fromPair(badge) : undefined
    onSave({
      id: id.trim(),
      categoryId,
      featured,
      name: fromPair(name),
      description: fromPair(description),
      formats: formatsText.split(',').map((s) => s.trim()).filter(Boolean),
      specs: zipSpecs(specsFr, specsEn),
      badge: badgePair,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-lg overflow-y-auto bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-card px-6 py-4">
          <h2 className="font-bold text-ink">
            {isNew ? 'Nouveau produit' : 'Modifier le produit'}
          </h2>
          <button onClick={onClose} className="btn-ghost p-2">
            ✕
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Name FR/EN */}
          <BilingualField
            label="Nom du produit"
            required
            fr={name.fr}
            en={name.en}
            onFr={(v) => setName({ ...name, fr: v })}
            onEn={(v) => setName({ ...name, en: v })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Catégorie</label>
              <select
                className="field-input"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value as CategoryId)}
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
                value={id}
                disabled={!isNew}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>

          {/* Description FR/EN */}
          <BilingualField
            label="Description"
            multiline
            fr={description.fr}
            en={description.en}
            onFr={(v) => setDescription({ ...description, fr: v })}
            onEn={(v) => setDescription({ ...description, en: v })}
          />

          <div>
            <label className="field-label">Formats disponibles</label>
            <input
              className="field-input"
              placeholder="1 kg, 3 kg, 13,6 kg"
              value={formatsText}
              onChange={(e) => setFormatsText(e.target.value)}
            />
            <p className="mt-1 text-xs text-ink-faint">
              Séparés par des virgules. Communs aux deux langues (unités, formats).
            </p>
          </div>

          <div>
            <label className="field-label">Points techniques (specs)</label>
            <div className="space-y-2">
              <div>
                <span className="mb-1 inline-block rounded bg-blue/15 px-1.5 py-0.5 text-[10px] font-bold text-blue">
                  FR
                </span>
                <input
                  className="field-input"
                  placeholder="GWP réduit, Bouteille rechargeable"
                  value={specsFr}
                  onChange={(e) => setSpecsFr(e.target.value)}
                />
              </div>
              <div>
                <span className="mb-1 inline-block rounded bg-line px-1.5 py-0.5 text-[10px] font-bold text-ink-soft">
                  EN
                </span>
                <input
                  className="field-input"
                  placeholder="Lower GWP, Refillable cylinder"
                  value={specsEn}
                  onChange={(e) => setSpecsEn(e.target.value)}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-ink-faint">
              Séparés par des virgules, dans le même ordre FR/EN.
            </p>
          </div>

          {/* Badge FR/EN + featured */}
          <BilingualField
            label="Badge (optionnel)"
            fr={badge.fr}
            en={badge.en}
            onFr={(v) => setBadge({ ...badge, fr: v })}
            onEn={(v) => setBadge({ ...badge, en: v })}
            placeholderFr="Éco R32, Populaire…"
            placeholderEn="Eco R32, Popular…"
          />

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-line text-blue"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span className="text-sm text-ink-soft">Produit vedette (mis en avant)</span>
          </label>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-2 border-t border-line bg-card px-6 py-4">
          <button onClick={onClose} className="btn-outline text-sm">
            Annuler
          </button>
          <button onClick={save} className="btn-blue text-sm">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

function BilingualField({
  label,
  required,
  multiline,
  fr,
  en,
  onFr,
  onEn,
  placeholderFr,
  placeholderEn,
}: {
  label: string
  required?: boolean
  multiline?: boolean
  fr: string
  en: string
  onFr: (v: string) => void
  onEn: (v: string) => void
  placeholderFr?: string
  placeholderEn?: string
}) {
  return (
    <div>
      <label className="field-label">
        {label}
        {required && <span className="ml-0.5 text-rust">*</span>}
      </label>
      <div className="space-y-2">
        <div className="relative">
          <span className="absolute left-2 top-2.5 rounded bg-blue/15 px-1.5 py-0.5 text-[10px] font-bold text-blue">
            FR
          </span>
          {multiline ? (
            <textarea
              className="field-input resize-y pl-11"
              rows={3}
              value={fr}
              placeholder={placeholderFr}
              onChange={(e) => onFr(e.target.value)}
            />
          ) : (
            <input
              className="field-input pl-11"
              value={fr}
              placeholder={placeholderFr}
              onChange={(e) => onFr(e.target.value)}
            />
          )}
        </div>
        <div className="relative">
          <span className="absolute left-2 top-2.5 rounded bg-line px-1.5 py-0.5 text-[10px] font-bold text-ink-soft">
            EN
          </span>
          {multiline ? (
            <textarea
              className="field-input resize-y pl-11"
              rows={3}
              value={en}
              placeholder={placeholderEn}
              onChange={(e) => onEn(e.target.value)}
            />
          ) : (
            <input
              className="field-input pl-11"
              value={en}
              placeholder={placeholderEn}
              onChange={(e) => onEn(e.target.value)}
            />
          )}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-ink">Importer un catalogue (JSON)</h2>
        <p className="mt-1 text-sm text-ink-faint">
          Collez le contenu d'un fichier de catalogue exporté.
        </p>
        <textarea
          className="field-input mt-4 h-48 resize-none font-mono text-xs"
          placeholder='[ { "id": "...", "categoryId": "gaz", "name": { "fr": "...", "en": "..." } } ]'
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setError(null)
          }}
        />
        {error && <p className="mt-2 text-sm text-rust">{error}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="btn-outline text-sm">
            Annuler
          </button>
          <button onClick={doImport} className="btn-blue text-sm">
            Importer
          </button>
        </div>
      </div>
    </div>
  )
}
