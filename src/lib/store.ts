/**
 * Client-side data store.
 *
 * A thin abstraction over localStorage so the whole app talks to *one* data
 * API. Today it persists in the browser; swapping in a real backend later means
 * reimplementing this module against an HTTP API — no page or component changes.
 *
 * Two concerns live here:
 *   1. Catalog products — the admin panel edits these; the public catalog reads
 *      them. Falls back to SEED_PRODUCTS when nothing has been saved.
 *   2. Form submissions — contact + pro-credit requests captured locally so the
 *      admin can review them even before a backend/email service is wired up.
 */

import { SEED_PRODUCTS, type Product } from '@/data/catalog'

const KEYS = {
  products: 'cooltrade_products_v1',
  submissions: 'cooltrade_submissions_v1',
} as const

// --- low-level helpers -----------------------------------------------------

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    // Notify same-tab listeners (the native `storage` event only fires cross-tab)
    window.dispatchEvent(new CustomEvent('cooltrade:store', { detail: { key } }))
  } catch (e) {
    console.error('Store write failed', e)
  }
}

// --- Products --------------------------------------------------------------

export function getProducts(): Product[] {
  return read<Product[]>(KEYS.products, SEED_PRODUCTS)
}

export function hasCustomProducts(): boolean {
  return localStorage.getItem(KEYS.products) !== null
}

export function saveProducts(products: Product[]): void {
  write(KEYS.products, products)
}

export function upsertProduct(product: Product): Product[] {
  const products = getProducts()
  const idx = products.findIndex((p) => p.id === product.id)
  if (idx >= 0) products[idx] = product
  else products.push(product)
  saveProducts(products)
  return products
}

export function deleteProduct(id: string): Product[] {
  const products = getProducts().filter((p) => p.id !== id)
  saveProducts(products)
  return products
}

/** Reset catalog back to the code-defined seed. */
export function resetProducts(): void {
  localStorage.removeItem(KEYS.products)
  window.dispatchEvent(new CustomEvent('cooltrade:store', { detail: { key: KEYS.products } }))
}

export function exportProducts(): string {
  return JSON.stringify(getProducts(), null, 2)
}

export function importProducts(json: string): { ok: boolean; error?: string } {
  try {
    const parsed = JSON.parse(json)
    if (!Array.isArray(parsed)) return { ok: false, error: 'Le JSON doit être une liste de produits.' }
    saveProducts(parsed as Product[])
    return { ok: true }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  }
}

// --- Submissions -----------------------------------------------------------

export type SubmissionType = 'contact' | 'pro-credit'

export interface Submission {
  id: string
  type: SubmissionType
  createdAt: string
  data: Record<string, string>
}

export function getSubmissions(): Submission[] {
  return read<Submission[]>(KEYS.submissions, [])
}

export function addSubmission(type: SubmissionType, data: Record<string, string>): Submission {
  const submission: Submission = {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    createdAt: new Date().toISOString(),
    data,
  }
  const all = getSubmissions()
  all.unshift(submission)
  write(KEYS.submissions, all)
  return submission
}

export function deleteSubmission(id: string): Submission[] {
  const all = getSubmissions().filter((s) => s.id !== id)
  write(KEYS.submissions, all)
  return all
}

export function exportSubmissionsCsv(): string {
  const all = getSubmissions()
  if (all.length === 0) return ''
  const keys = Array.from(
    all.reduce((set, s) => {
      Object.keys(s.data).forEach((k) => set.add(k))
      return set
    }, new Set<string>()),
  )
  const header = ['id', 'type', 'createdAt', ...keys]
  const escape = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`
  const rows = all.map((s) =>
    [s.id, s.type, s.createdAt, ...keys.map((k) => s.data[k] ?? '')].map(escape).join(','),
  )
  return [header.join(','), ...rows].join('\n')
}

export const STORE_EVENT = 'cooltrade:store'
