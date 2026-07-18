/**
 * Catalog data model + seed content.
 *
 * This is the single source of truth for the public catalog AND the initial
 * state of the admin panel. The admin panel edits a localStorage copy layered
 * on top of this seed (see `src/lib/store.ts`); "Export" from the admin panel
 * produces a JSON payload the developer can paste back here to make edits
 * permanent / version-controlled.
 *
 * Bilingual content: text fields typed `Localized` accept either a plain string
 * (French only) or a `{ fr, en }` pair. The public site resolves them with
 * `tx()` (see `src/lib/localize.ts`), always falling back to French. Category
 * chrome (names/descriptions) lives in the i18n locale files instead, since
 * categories are fixed UI, not admin-managed data.
 */

import type { Localized } from '@/lib/localize'

export type CategoryId = 'gaz' | 'pieces' | 'outillage' | 'consommables'

export interface Category {
  id: CategoryId
  /** i18n key under `catalog.categories.<id>` */
  i18nKey: CategoryId
  /** icon name resolved in ProductIcon */
  icon: 'cylinder' | 'compressor' | 'gauge' | 'wrench'
  accent: 'frost' | 'steel' | 'sun'
}

export interface Product {
  id: string
  categoryId: CategoryId
  name: Localized
  description: Localized
  /** Size/format labels — language-neutral (e.g. ["1 kg", "3 kg", "13,6 kg"]) */
  formats: string[]
  /** optional short spec highlights */
  specs?: Localized[]
  /** optional badge, e.g. "Nouveau", "Populaire", "Éco R32" */
  badge?: Localized
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
    name: { fr: 'Gaz réfrigérant R32', en: 'R32 Refrigerant Gas' },
    description: {
      fr: "Fluide de nouvelle génération à faible impact climatique, référence pour les climatiseurs récents. La solution recommandée pour la transition écologique.",
      en: 'Next-generation refrigerant with a low climate impact, the benchmark for modern air conditioners. The recommended choice for the environmental transition.',
    },
    formats: ['3 kg', '5,3 kg', '9 kg'],
    specs: [
      { fr: 'GWP réduit', en: 'Lower GWP' },
      { fr: 'Bouteille rechargeable', en: 'Refillable cylinder' },
      { fr: 'Étiquetage conforme', en: 'Compliant labelling' },
    ],
    badge: { fr: 'Éco R32', en: 'Eco R32' },
    featured: true,
  },
  {
    id: 'gaz-r410a',
    categoryId: 'gaz',
    name: { fr: 'Gaz réfrigérant R410A', en: 'R410A Refrigerant Gas' },
    description: {
      fr: "Fluide de référence pour la majorité des systèmes de climatisation split et multisplit en service. Bouteilles d'origine.",
      en: 'The reference refrigerant for most split and multi-split air-conditioning systems in service. Original cylinders.',
    },
    formats: ['1 kg', '3 kg', '11,3 kg'],
    specs: [
      { fr: 'Haute pression', en: 'High pressure' },
      { fr: "Bouteille d'origine", en: 'Original cylinder' },
    ],
    featured: true,
  },
  {
    id: 'gaz-r134a',
    categoryId: 'gaz',
    name: { fr: 'Gaz réfrigérant R134a', en: 'R134a Refrigerant Gas' },
    description: {
      fr: "Fluide polyvalent pour le froid commercial, les vitrines réfrigérées et certaines applications automobiles.",
      en: 'A versatile refrigerant for commercial refrigeration, refrigerated display cases and some automotive applications.',
    },
    formats: ['1 kg', '3 kg', '13,6 kg'],
    specs: [
      { fr: 'Froid commercial', en: 'Commercial refrigeration' },
      { fr: 'Usage polyvalent', en: 'Versatile use' },
    ],
    featured: true,
  },
  {
    id: 'gaz-r22',
    categoryId: 'gaz',
    name: { fr: 'Gaz réfrigérant R22 (stock résiduel)', en: 'R22 Refrigerant Gas (residual stock)' },
    description: {
      fr: "Disponible en stock résiduel pour la maintenance des installations anciennes. Nous vous conseillons sur les alternatives de remplacement.",
      en: 'Available as residual stock for maintaining older installations. We advise you on replacement alternatives.',
    },
    formats: ['13,6 kg'],
    specs: [
      { fr: 'Maintenance parc existant', en: 'Legacy fleet maintenance' },
      { fr: 'Stock limité', en: 'Limited stock' },
    ],
  },
  // --- Pièces détachées ----------------------------------------------------
  {
    id: 'piece-compresseur',
    categoryId: 'pieces',
    name: { fr: 'Compresseurs', en: 'Compressors' },
    description: {
      fr: "Compresseurs rotatifs et scroll pour climatiseurs et systèmes de réfrigération. Plusieurs puissances et références disponibles.",
      en: 'Rotary and scroll compressors for air conditioners and refrigeration systems. Multiple capacities and references available.',
    },
    formats: ['Rotatif', 'Scroll', 'Diverses puissances'],
    featured: true,
  },
  {
    id: 'piece-condenseur',
    categoryId: 'pieces',
    name: { fr: 'Condenseurs & évaporateurs', en: 'Condensers & evaporators' },
    description: {
      fr: "Batteries de condensation et d'évaporation pour remise en état d'unités intérieures et extérieures.",
      en: 'Condensing and evaporating coils for restoring indoor and outdoor units.',
    },
    formats: ['Unités intérieures', 'Unités extérieures'],
  },
  {
    id: 'piece-filtre',
    categoryId: 'pieces',
    name: { fr: 'Filtres déshydrateurs', en: 'Filter driers' },
    description: {
      fr: "Filtres déshydrateurs pour protéger le circuit de l'humidité et des impuretés. Différents diamètres.",
      en: 'Filter driers to protect the circuit from moisture and impurities. Various diameters.',
    },
    formats: ['À braser', 'À visser', 'Divers diamètres'],
  },
  {
    id: 'piece-detendeur',
    categoryId: 'pieces',
    name: { fr: 'Détendeurs & vannes', en: 'Expansion valves & valves' },
    description: {
      fr: "Détendeurs thermostatiques et vannes d'expansion pour un réglage précis du circuit frigorifique.",
      en: 'Thermostatic expansion valves for precise control of the refrigeration circuit.',
    },
    formats: ['Thermostatique', 'Électronique'],
  },
  {
    id: 'piece-ventilateur',
    categoryId: 'pieces',
    name: { fr: 'Moteurs & ventilateurs', en: 'Motors & fans' },
    description: {
      fr: "Moteurs de ventilateur, hélices et turbines pour unités intérieures et extérieures.",
      en: 'Fan motors, blades and turbines for indoor and outdoor units.',
    },
    formats: ['Axial', 'Centrifuge', 'Diverses tensions'],
  },
  // --- Outillage professionnel ---------------------------------------------
  {
    id: 'outil-manifold',
    categoryId: 'outillage',
    name: { fr: 'Manifolds & jeux de manomètres', en: 'Manifolds & gauge sets' },
    description: {
      fr: "Manifolds 2 et 4 voies pour la charge, le tirage au vide et le contrôle des pressions. Compatibles fluides récents.",
      en: '2- and 4-way manifolds for charging, vacuuming and pressure checks. Compatible with modern refrigerants.',
    },
    formats: ['2 voies', '4 voies', 'Numérique'],
    featured: true,
  },
  {
    id: 'outil-pompe',
    categoryId: 'outillage',
    name: { fr: 'Pompes à vide', en: 'Vacuum pumps' },
    description: {
      fr: "Pompes à vide simple et double étage pour un tirage au vide efficace avant la mise en service.",
      en: 'Single- and two-stage vacuum pumps for effective evacuation before commissioning.',
    },
    formats: ['Simple étage', 'Double étage'],
    featured: true,
  },
  {
    id: 'outil-detecteur',
    categoryId: 'outillage',
    name: { fr: 'Détecteurs de fuite', en: 'Leak detectors' },
    description: {
      fr: "Détecteurs électroniques de fuite de gaz réfrigérant pour un diagnostic rapide et fiable.",
      en: 'Electronic refrigerant leak detectors for fast, reliable diagnosis.',
    },
    formats: ['Électronique', 'Multi-gaz'],
  },
  {
    id: 'outil-station',
    categoryId: 'outillage',
    name: { fr: 'Stations de récupération', en: 'Recovery stations' },
    description: {
      fr: "Stations de récupération de fluides pour intervenir dans le respect de l'environnement et de la réglementation.",
      en: 'Refrigerant recovery stations for working in line with environmental and regulatory requirements.',
    },
    formats: ['Portable'],
  },
  {
    id: 'outil-balance',
    categoryId: 'outillage',
    name: { fr: 'Balances de charge', en: 'Charging scales' },
    description: {
      fr: "Balances électroniques de précision pour une charge exacte en fluide frigorigène.",
      en: 'Precision electronic scales for an exact refrigerant charge.',
    },
    formats: ['Électronique', 'Précision 5 g'],
  },
  // --- Consommables & installation -----------------------------------------
  {
    id: 'conso-brasure',
    categoryId: 'consommables',
    name: { fr: 'Baguettes de brasure & flux', en: 'Brazing rods & flux' },
    description: {
      fr: "Baguettes de brasure argent et flux pour des raccords étanches et durables sur cuivre.",
      en: 'Silver brazing rods and flux for leak-tight, durable copper joints.',
    },
    formats: ['Argent 2 %', 'Argent 5 %', 'Flux'],
    featured: true,
  },
  {
    id: 'conso-cuivre',
    categoryId: 'consommables',
    name: { fr: 'Tubes cuivre & isolation', en: 'Copper tubing & insulation' },
    description: {
      fr: "Tube cuivre frigorifique et isolant pour la liaison des installations. Différents diamètres.",
      en: 'Refrigeration-grade copper tubing and insulation for linking installations. Various diameters.',
    },
    formats: ['Couronne', 'Barre', 'Divers diamètres'],
  },
  {
    id: 'conso-support',
    categoryId: 'consommables',
    name: { fr: 'Supports & fixations', en: 'Brackets & fixings' },
    description: {
      fr: "Supports muraux, consoles et fixations pour la pose d'unités intérieures et extérieures.",
      en: 'Wall mounts, brackets and fixings for installing indoor and outdoor units.',
    },
    formats: ['Consoles', 'Supports muraux'],
  },
  {
    id: 'conso-kit',
    categoryId: 'consommables',
    name: { fr: "Kits d'installation", en: 'Installation kits' },
    description: {
      fr: "Kits de pose complets pour installer rapidement un split : liaison, évacuation, fixations.",
      en: 'Complete installation kits to fit a split system quickly: line set, drainage, fixings.',
    },
    formats: ['Kit 3 m', 'Kit 5 m'],
  },
]
