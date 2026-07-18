# CoolTrade Sénégal — Site vitrine B2B

Site marketing / B2B pour **CoolTrade Sénégal**, entreprise d'import-distribution
basée à Dakar : gaz réfrigérants (R410A, R32, R134a), pièces détachées et
outillage professionnel pour les métiers du froid et de la climatisation.

Objectif du site : **construire la crédibilité auprès des professionnels et les
diriger vers WhatsApp / téléphone / dépôt** — pas de vente en ligne.

- **Langue :** Français (structure i18n en place pour ajouter l'anglais plus tard)
- **Stack :** React + TypeScript + Vite + Tailwind CSS + React Router + react-i18next
- **Déploiement :** site statique (Cloudflare Pages recommandé)
- **Panneau d'admin :** intégré, à `/admin`

---

## Démarrage

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

---

## ⚙️ À personnaliser avant la mise en ligne

Tout ce qui doit changer est centralisé — pas de « chercher-remplacer » dans le code.

### 1. Marque & coordonnées — `src/config/brand.ts`
- **Nom de l'entreprise** (`name`) — provisoire, en attente d'immatriculation APIX
- **Téléphone** (`phone`, `phoneDisplay`)
- **Numéro WhatsApp Business** (`whatsappNumber`) — format `wa.me`, chiffres uniquement (ex. `221771234567`)
- **E-mail, adresse du dépôt, horaires**
- **NINEA / RCCM** (footer, mentions légales)

### 2. Formulaires & admin — `src/config/site.ts`
- **`web3formsKey`** — clé gratuite depuis [web3forms.com](https://web3forms.com).
  Tant qu'elle n'est pas renseignée, les formulaires fonctionnent en **mode local**
  (les demandes sont enregistrées dans le navigateur et visibles dans l'admin, mais
  aucun e-mail n'est envoyé — un repli WhatsApp est proposé à l'utilisateur).
- **`adminPassword`** — ⚠️ **à changer avant le déploiement.**

### 3. Catalogue produits — `src/data/catalog.ts`
Données de départ des produits. Modifiables directement ici (permanent, versionné)
ou via le panneau d'admin (voir ci-dessous).

### 4. Contenu textuel — `src/i18n/locales/fr.json`
Tous les textes du site. Les éléments à confirmer sont marqués `[TODO: confirm]`
dans le code (adresse exacte, numéros, photos produits réelles, etc.).

---

## 🔐 Panneau d'administration (`/admin`)

Accessible à `votre-site.com/admin`, protégé par mot de passe (`src/config/site.ts`).

**Fonctionnalités :**
- **Tableau de bord** — vue d'ensemble (nombre de produits, demandes reçues, état des formulaires)
- **Catalogue** — ajouter / modifier / supprimer des produits, importer / exporter le catalogue en JSON
- **Demandes** — consulter les messages de contact et demandes de compte pro, export CSV

**Important — persistance :** l'admin enregistre les modifications dans le
**navigateur** (localStorage). C'est parfait pour un site statique et pour préparer
le contenu. Pour rendre les modifications **permanentes sur le site en ligne** :
1. Onglet **Catalogue → « Exporter le catalogue »** → télécharge un `.json`
2. Remplacer le contenu de `src/data/catalog.ts` (tableau `SEED_PRODUCTS`) par ce JSON
3. Rebuild + redeploy

> La couche de données est isolée dans `src/lib/store.ts`. Pour passer à une vraie
> base de données (Cloudflare D1, Supabase, API…), il suffit de réimplémenter ce
> module — aucune page ni composant à modifier. L'authentification devra alors
> passer côté serveur (le mot de passe client actuel n'est pas une vraie sécurité).

---

## 🌍 Internationalisation

Le site est **français d'abord**. L'ossature i18n (`react-i18next`) est en place :
pour ajouter l'anglais, créer `src/i18n/locales/en.json` avec la même structure de
clés que `fr.json`, puis l'enregistrer dans `src/i18n/index.ts`. Aucun changement
de code dans les pages.

---

## 🚀 Déploiement — Cloudflare Pages

1. Pousser le dépôt sur GitHub
2. Cloudflare Pages → *Create project* → connecter le dépôt
3. Réglages de build :
   - **Build command :** `npm run build`
   - **Output directory :** `dist`
4. Le fichier `public/_redirects` gère déjà le routage SPA (toutes les routes → `index.html`)

Fonctionne aussi sur Netlify, Vercel, ou tout hébergeur de statique.

---

## 📁 Structure

```
src/
├── config/         brand.ts (marque/contact), site.ts (nav, admin, form)
├── i18n/           configuration + locales/fr.json (tout le contenu texte)
├── data/           catalog.ts (modèle produits + données de départ)
├── lib/            store.ts (couche données), forms.ts (envoi formulaires)
├── hooks/          useProducts.ts
├── components/     Header, Footer, WhatsAppFloatingButton, ProductCategoryCard,
│                   TrustStrip, ContactForm, ProCreditForm, Layout, Icons…
├── pages/          Home, Catalog, Services, Pro, About, Contact, Legal, 404
└── admin/          AdminApp (auth + shell), Dashboard, ProductsManager, SubmissionsManager
```
