import { useEffect, useState } from 'react'
import { getProducts, STORE_EVENT } from '@/lib/store'
import type { Product } from '@/data/catalog'

/**
 * Reactive read of the catalog. Re-renders when the admin panel saves changes,
 * whether in this tab (custom event) or another (native storage event).
 */
export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>(getProducts)

  useEffect(() => {
    const refresh = () => setProducts(getProducts())
    window.addEventListener(STORE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(STORE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return products
}
