/**
 * Catalog data model + seed content.
 *
 * This is the single source of truth for the public catalog AND the initial
 * state of the admin panel. The admin panel edits a localStorage copy layered
 * on top of this seed (see `src/lib/store.ts`); "Export" from the admin panel
 * produces a JSON payload the developer can paste back here to make edits
 * permanent / version-controlled.
 *
 * Category names/descriptions are resolved via i18n keys (see fr.json →
 * catalog.categories) so category chrome stays translatable. Individual
 * product copy is stored inline here because it is business data, not UI, and
 * is the thing the admin panel manages.
 */

export type CategoryId = 'gaz' | 'pieces' | 'outillage' | 'consommables'

export interface Category {
  id: CategoryId
  /** i18n key under `catalog.categories.<id>` */
  i18nKey: CategoryId
  /** lucide-style icon name resolved in ProductIcon */
  icon: 'cylinder' | 'compressor' | 'gauge' | 'wrench'
  accent: 'frost' | 'steel' | 'sun'
}

export interface Product {
  id: string
  categoryId: CategoryId
  name: string
  description: string
  /** e.g. ["1 kg", "3 kg", "13,6 kg"] */
  formats: string[]
  /** optional short spec highlights */
  specs?: string[]
  /** optional badge, e.g. "Nouveau", "Populaire", "Éco R32" */
  badge?: string
  featured?: boolean
}

export const CATEGORIES: Category[] = [
  { id: 'gaz', i18nKey: 'gaz', icon: 'cylinder', accent: 'frost' },
  { id: 'pieces', i18nKey: 'pieces', icon: 'compressor', accent: 'steel' },
  { id: 'outillage', i18nKey: 'outillage', icon: 'gauge', accent: 'sun' },
  { id: 'consommables', i18nKey: 'consommables', icon: 'wrench', accent: 'frost' },
]

export const SEED_PRODUCTS: Product[] = [
  // --- Gaz réfrigérants ----------------------------------------------------
  {
    id: 'gaz-r32',
    categoryId: 'gaz',
    name: 'Gaz réfrigérant R32',
    description:
      "Fluide de nouvelle génération à faible impact climatique, référence pour les climatiseurs récents. La solution recommandée pour la transition écologique.",
    formats: ['3 kg', '5,3 kg', '9 kg'],
    specs: ['GWP réduit', 'Bouteille rechargeable', 'Étiquetage conforme'],
    badge: 'Éco R32',
    featured: true,
  },
  {
    id: 'gaz-r410a',
    categoryId: 'gaz',
    name: 'Gaz réfrigérant R410A',
    description:
      "Fluide de référence pour la majorité des systèmes de climatisation split et multisplit en service. Bouteilles d'origine.",
    formats: ['1 kg', '3 kg', '11,3 kg'],
    specs: ['Haute pression', 'Bouteille d’origine'],
    featured: true,
  },
  {
    id: 'gaz-r134a',
    categoryId: 'gaz',
    name: 'Gaz réfrigérant R134a',
    description:
      "Fluide polyvalent pour le froid commercial, les vitrines réfrigérées et certaines applications automobiles.",
    formats: ['1 kg', '3 kg', '13,6 kg'],
    specs: ['Froid commercial', 'Usage polyvalent'],
    featured: true,
  },
  {
    id: 'gaz-r22',
    categoryId: 'gaz',
    name: 'Gaz réfrigérant R22 (stock résiduel)',
    description:
      "Disponible en stock résiduel pour la maintenance des installations anciennes. Nous vous conseillons sur les alternatives de remplacement.",
    formats: ['13,6 kg'],
    specs: ['Maintenance parc existant', 'Stock limité'],
  },
  // --- Pièces détachées ----------------------------------------------------
  {
    id: 'piece-compresseur',
    categoryId: 'pieces',
    name: 'Compresseurs',
    description:
      "Compresseurs rotatifs et scroll pour climatiseurs et systèmes de réfrigération. Plusieurs puissances et références disponibles.",
    formats: ['Rotatif', 'Scroll', 'Diverses puissances'],
    featured: true,
  },
  {
    id: 'piece-condenseur',
    categoryId: 'pieces',
    name: 'Condenseurs & évaporateurs',
    description:
      "Batteries de condensation et d'évaporation pour remise en état d'unités intérieures et extérieures.",
    formats: ['Unités intérieures', 'Unités extérieures'],
  },
  {
    id: 'piece-filtre',
    categoryId: 'pieces',
    name: 'Filtres déshydrateurs',
    description:
      "Filtres déshydrateurs pour protéger le circuit de l'humidité et des impuretés. Différents diamètres.",
    formats: ['À braser', 'À visser', 'Divers diamètres'],
  },
  {
    id: 'piece-detendeur',
    categoryId: 'pieces',
    name: 'Détendeurs & vannes',
    description:
      "Détendeurs thermostatiques et vannes d'expansion pour un réglage précis du circuit frigorifique.",
    formats: ['Thermostatique', 'Électronique'],
  },
  {
    id: 'piece-ventilateur',
    categoryId: 'pieces',
    name: 'Moteurs & ventilateurs',
    description:
      "Moteurs de ventilateur, hélices et turbines pour unités intérieures et extérieures.",
    formats: ['Axial', 'Centrifuge', 'Diverses tensions'],
  },
  // --- Outillage professionnel ---------------------------------------------
  {
    id: 'outil-manifold',
    categoryId: 'outillage',
    name: 'Manifolds & jeux de manomètres',
    description:
      "Manifolds 2 et 4 voies pour la charge, le tirage au vide et le contrôle des pressions. Compatibles fluides récents.",
    formats: ['2 voies', '4 voies', 'Numérique'],
    featured: true,
  },
  {
    id: 'outil-pompe',
    categoryId: 'outillage',
    name: 'Pompes à vide',
    description:
      "Pompes à vide simple et double étage pour un tirage au vide efficace avant la mise en service.",
    formats: ['Simple étage', 'Double étage'],
    featured: true,
  },
  {
    id: 'outil-detecteur',
    categoryId: 'outillage',
    name: 'Détecteurs de fuite',
    description:
      "Détecteurs électroniques de fuite de gaz réfrigérant pour un diagnostic rapide et fiable.",
    formats: ['Électronique', 'Multi-gaz'],
  },
  {
    id: 'outil-station',
    categoryId: 'outillage',
    name: 'Stations de récupération',
    description:
      "Stations de récupération de fluides pour intervenir dans le respect de l'environnement et de la réglementation.",
    formats: ['Portable'],
  },
  {
    id: 'outil-balance',
    categoryId: 'outillage',
    name: 'Balances de charge',
    description:
      "Balances électroniques de précision pour une charge exacte en fluide frigorigène.",
    formats: ['Électronique', 'Précision 5 g'],
  },
  // --- Consommables & installation -----------------------------------------
  {
    id: 'conso-brasure',
    categoryId: 'consommables',
    name: 'Baguettes de brasure & flux',
    description:
      "Baguettes de brasure argent et flux pour des raccords étanches et durables sur cuivre.",
    formats: ['Argent 2 %', 'Argent 5 %', 'Flux'],
    featured: true,
  },
  {
    id: 'conso-cuivre',
    categoryId: 'consommables',
    name: 'Tubes cuivre & isolation',
    description:
      "Tube cuivre frigorifique et isolant pour la liaison des installations. Différents diamètres.",
    formats: ['Couronne', 'Barre', 'Divers diamètres'],
  },
  {
    id: 'conso-support',
    categoryId: 'consommables',
    name: 'Supports & fixations',
    description:
      "Supports muraux, consoles et fixations pour la pose d'unités intérieures et extérieures.",
    formats: ['Consoles', 'Supports muraux'],
  },
  {
    id: 'conso-kit',
    categoryId: 'consommables',
    name: "Kits d'installation",
    description:
      "Kits de pose complets pour installer rapidement un split : liaison, évacuation, fixations.",
    formats: ['Kit 3 m', 'Kit 5 m'],
  },
]
