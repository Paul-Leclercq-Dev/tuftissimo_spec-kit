# Plan de Projet – Tuftissimo

> **Version**: 2025-09-30 · **Portée**: MVP e-commerce artisanal (Next.js + NestJS/Prisma) · **Langues**: ES/FR

## 1. Initialisation & Structure
- Mise en place du **monorepo PNPM** (`apps/web`, `apps/api`, `packages`)
- Scripts racine: `dev`, `build`, `test`, `lint` · ESLint/Prettier communs
- **CI/CD GitHub Actions** (install PNPM, build web+api, lint, tests)

---

## 2. Modélisation & Backend
- **Modèles Prisma**: `User`, `Product`, `Order`, `OrderItem`, `Contact`, `Admin` (ENV-only MVP), `CustomOrder`
- **Prisma**: migrations versionnées, seed de données produit, Prisma Studio
- **API NestJS** (REST):
  - Config générale: Validation (DTO), OpenAPI (Swagger), sécurité (Helmet/rate limit), logs
  - Modules REST: `products`, `orders`, `custom-orders`, `contact`, **`auth` admin & user**
  - **Base paiements**: Stripe (Checkout + webhooks) — à activer en Phase 4
  - **Emails**: Resend (transactionnels & sur-mesure) — Phase 4/5
- **DB**: PostgreSQL (prod) · SQLite/Postgres (dev) · Docker/Compose & Traefik (local)
- **Auth admin**: JWT en **cookie httpOnly** (option Bearer), guard `JwtAuthGuard`, endpoint miroir `/admin/me`
- **Auth user** (préparée pour Phase 8): signup/login/logout en cookie httpOnly, endpoint miroir `/user/me`
- **Spécificité “guest vs account”**: `Order.userId` **nullable** + champ `email` obligatoire; `Contact.userId` optionnel. Possibilité de **créer un compte après commande** et de **rattacher** les commandes via email.

---

### 2.5 User & Auth (backend) — **déplacé depuis la phase 8**
- **Modèle Prisma `User`** : `email @unique`, `passwordHash`, `createdAt`.
- **Auth utilisateur** : `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `GET /user/me` (JWT en **cookie httpOnly** ; support Bearer en option).
- **Sécurité** : hash `argon2`/`bcrypt`, `ValidationPipe`, CORS `credentials: true`.

### 2.6 Liaisons `User` ↔ `Order` / `Contact` (backend)
- `Order.userId?` **nullable** pour support **guest checkout** ; champ `email` **obligatoire** si guest.
- `Contact.userId?` optionnel + `email`.
- Services `orders`/`contact` : acceptent **user connecté** OU **guest** ; prêts pour Stripe & Resend.

## 3. Frontend Web & Accessibilité
- App **Next.js (App Router)** + TypeScript strict
- **i18n ES/FR**, routing structuré, Tailwind CSS + shadcn/ui, conformité **WCAG AA**
- Pages: Accueil, Catalogue (filtres), Produit, Panier, Paiement, Sur‑mesure, Processus tufting, Contact, **Espace utilisateur** (compte/suivi)
- Formulaires: validation, **upload Cloudinary** (sur‑mesure), anti‑spam (honeypot/captcha simple)
- SEO: OpenGraph, sitemap, robots, métadonnées localisées

---

## 4. Panier & Paiement
- Panier: local d’abord, puis persistance côté serveur
- Calculs: **TVA 21 %**, livraison **ES 5 € / FR 10 €** (MVP)
- Stripe Checkout: création session, retours succès/échec, **webhooks** pour statuts (`paid`, `failed`, `preparing/shipped`)
- Emails transactionnels (Resend) + confirmations visuelles

---

## 5. Commande sur mesure & Email
- Page dédiée, formulaire avancé, **upload PNG/JPG ≤ 5 Mo**
- Flux: réception → **email direct à l’artisan** pour devis → paiement Stripe **distinct** ultérieur

---

## 6. Backoffice admin
- Authentification admin (email + mot de passe hashé en ENV pour MVP; passage DB plus tard)
- Dashboard: CRUD produits, gestion commandes (statut simple), consultation sur‑mesure
- CMS léger **Markdown** dans le repo (contenus éditoriaux)
- Sécurité: rate‑limit, logging, sessions sécurisées, **secrets chiffrés**

---

## 7. Observabilité, RGPD, Hébergement
- Sentry web/api, **logs structurés**, métriques perf API (p95), Core Web Vitals
- RGPD: bannière cookies simple, conservation commandes 2 ans, cookies httpOnly/secure en prod
- Déploiement Docker/Compose (Scaleway), domaine `tuftissimo.com` via **Traefik SSL**

---

## 8. Hors scope MVP
- Marketplace multi‑vendeurs, CRM avancé, variations & promos, suivi colis, autres langues

---

## Étapes suggérées
1. Monorepo, scaffold Next/Nest, scripts de base, **CI** minimal
2. **Prisma & Backend** : modèle de données (incl. **User**), migrations, seed, génération client
3. **API REST** : produits/commandes, intégration Stripe (base), Resend setup, **auth admin** + **auth user** (signup/login/logout, `/user/me`), liaisons `User↔Order/Contact` (guest support)
4. **Frontend** : catalogue, fiches produits, panier, paiement, i18n, responsive — **tests & accessibilité** ; **Espace utilisateur** (historique, réclamations)
5. **Sur‑mesure** : formulaire + Cloudinary + email (Resend)
6. **Admin** : dashboard, CMS Markdown, durcissement sécurité
7. **Hébergement** : Docker dev/prod, Traefik, SSL, logs, RGPD, SEO/perf

---

## Notes de conception (spécificités ajoutées)
- **Cookies**: httpOnly; `secure=true` en prod; CORS `credentials: true` si front ≠ API
- **Orders**: calculs prix isolés en fonctions pures (TVA/frais) → testables; état `paid/failed/preparing/shipped`
- **Webhooks Stripe**: endpoint signé; idempotence; mise à jour de la commande en DB
- **Contacts**: stockés avec `userId?` + `email`; utilisent Resend (accusé de réception)
- **Swagger**: publier l’OpenAPI pour intégration front & QA
- **.env.example**: fournir exemples clés (JWT, DB, Stripe, Resend, Cloudinary)


---

## STOP gates & Definition of Done (ajustés)
- **P2.5/2.6 (backend user & liaisons)** : tests e2e **signup/login/logout** + **`/user/me`** ; création **commande user** et **commande guest** OK ; Studio montre `userId` rempli si connecté, sinon `null` avec `email`.
- **P3 (frontend)** : espace utilisateur affiche l’historique ; requêtes avec cookies httpOnly ; A11y ≥ 90.
- **P4 (paiement)** : Stripe test vert ; webhooks marquent la commande `paid/failed`; calculs TTC corrects.

