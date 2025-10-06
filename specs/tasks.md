# Backlog exécutable – Tuftissimo (v2)

> **Rôle** : fil conducteur **exécutable** (Étapes → Commandes → Vérifs → Rollback) · **PM**: Paul · **TZ**: Europe/Madrid

---

## Phase 1 — Initialisation & Structure

### 1.1 Initialiser le monorepo (PNPM)
**But** : Préparer la structure `apps/web`, `apps/api`, `packages`.
- **Commandes**
  ```bash
  mkdir -p apps/web apps/api packages
  pnpm init -y
  printf 'packages:\n  - "apps/*"\n  - "packages/*"\n' > pnpm-workspace.yaml
  printf 'node_modules/\n.pnpm-store/\n.env\n' > .gitignore
  ```
- **Vérifs** : `pnpm -v` ok ; `pnpm install` crée `pnpm-lock.yaml` ; arborescence présente.
- **Rollback** : `git reset --hard && git clean -fd`.

**STOP : Valider structure dossier monorepo**

---

### 1.2 Configurer le workspace PNPM
**But** : Partage de deps multi-apps.
- **Fichiers** : `pnpm-workspace.yaml` (cf. 1.1), `package.json` racine (scripts orchestreurs).
- **Commandes**
  ```bash
  # scripts racine conseillés
  pnpm pkg set scripts.dev="pnpm -C apps/web dev & pnpm -C apps/api start:dev"
  pnpm pkg set scripts.build="pnpm -r build"
  pnpm pkg set scripts.lint="pnpm -r lint"
  pnpm pkg set scripts.test="pnpm -r test || true"
  ```
- **Vérifs** : `pnpm dev` lance 2 process (web+api) ; pas d’erreur importer manifest.

**STOP : Valider configuration workspace**

---

### 1.3 Init Git & docs de base
**But** : Versioning + docs.
- **Commandes**
  ```bash
  git init
  :> README.md
  git add . && git commit -m "chore: init monorepo"
  ```
- **Vérifs** : dépôt propre ; `README.md` existe.

**STOP : Valider dispo Git & README**

---

### 1.4 CI/CD GitHub Actions & scripts de base
**But** : Pipeline minimal (install, build, lint, test).
- **Fichier** : `.github/workflows/ci.yml`
  ```yaml
  name: ci
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v4
          with: { version: 9 }
        - uses: actions/setup-node@v4
          with: { node-version: 20, cache: 'pnpm' }
        - run: pnpm install --frozen-lockfile
        - run: pnpm -C apps/web build
        - run: pnpm -C apps/api build
        - run: pnpm -C apps/web lint
        - run: pnpm -C apps/api lint
        - run: pnpm -C apps/api test -- --ci --passWithNoTests
  ```
- **Vérifs** : pipeline vert sur PR.

**STOP : Valider scripts/npm + pipeline initial**

---

## Phase 2 — Modélisation & Backend

### 2.1 Scaffold API NestJS + setup Prisma
**But** : Créer l’API Nest + Prisma.
- **Commandes**
  ```bash
  pnpm dlx @nestjs/cli new apps/api --package-manager pnpm
  pnpm -C apps/api add @prisma/client
  pnpm -C apps/api add -D prisma tsx typescript @nestjs/config
  pnpm -C apps/api exec prisma init --datasource-provider postgresql
  ```
- **Fichiers** : `apps/api/src/**`, `apps/api/prisma/schema.prisma`, `apps/api/.env` (DATABASE_URL).
- **Vérifs** : `pnpm -C apps/api prisma generate` ok.

**STOP : Validation scaffold API & DB connectée**

---

### 2.2 Modèle Prisma initial + migrations + seed Product
**But** : Schéma minimal + données réalistes.
- **Commandes**
  ```bash
  # éditer schema.prisma (Product minimal)
  pnpm -C apps/api prisma migrate dev --name init
  pnpm -C apps/api prisma generate
  # seed
  mkdir -p apps/api/prisma/seed
  # ajouter prisma.seed dans package.json (tsx)
  pnpm -C apps/api pkg set prisma.seed="tsx prisma/seed/index.ts"
  pnpm -C apps/api run prisma:seed --filter "prisma db seed"
  ```
- **Vérifs** : Prisma Studio montre 3 produits ; endpoints à venir les lisent.

**STOP : Validation schema initial & migration OK**

---

### 2.3 Endpoints REST basiques (Products + Auth admin)
**But** : CRUD `products` + login admin opérationnels.
- **Commandes**
  ```bash
  # modules produits + auth
  pnpm -C apps/api exec nest g module modules/products
  pnpm -C apps/api exec nest g controller modules/products --no-spec
  pnpm -C apps/api exec nest g service modules/products --no-spec
  pnpm -C apps/api add @nestjs/jwt @nestjs/passport passport passport-jwt cookie-parser bcryptjs
  ```
- **Fichiers** :
  - `src/modules/products/**` (DTO, service Prisma, controller CRUD)
  - `src/modules/auth/**` (`JwtStrategy` cookie+Bearer, `JwtAuthGuard`, `AuthService` bcrypt hash, `AuthController`)
  - `src/admin/admin.controller.ts` → `GET /admin/me` (protégé)
  - `src/main.ts` → `ValidationPipe`, `cookie-parser`, `enableCors({ credentials:true, origin:[front] })`
- **ENV** : `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
- **Vérifs** :
  - `POST /auth/admin/login` → **Set-Cookie** + `{ access_token }`
  - `GET /admin/me` (cookie) → 200 avec `{ admin: { email, role } }`
  - CRUD `/products` : GET publics ; POST/PATCH/DELETE protégés.

**STOP : Valider endpoints/test requêtes basiques**

---

### 2.4 Durcissement API (validation & sécurité)
**But** : API robuste.
- **Tâches** : `class-validator`/DTO, `helmet`, rate-limit (throttler), logs.
- **Fichiers** : `src/main.ts` (pipes, helmet), module throttler, intercepteurs logs.
- **Vérifs** : erreurs 400 propres ; headers sécurité présents.

**STOP : Valider API sécurisée/validante**

---

### 2.5 User & Auth (backend) — **déplacé depuis ex-Phase 8**
**But** : Auth utilisateur en place tôt (impacte schéma & endpoints).
- **Commandes**
  ```bash
  pnpm -C apps/api exec nest g module modules/user
  pnpm -C apps/api exec nest g module modules/user-auth
  pnpm -C apps/api add argon2 # ou bcryptjs
  ```
- **Fichiers** :
  - Prisma : modèle `User { id, email @unique, passwordHash, createdAt }`
  - `src/modules/user-auth/**` : `POST /auth/signup|login|logout`, `GET /user/me` (JWT cookie)
  - DTO login/signup ; guards réutilisent la même `JwtStrategy` (payload `sub`, `email`, `role:user`)
- **ENV** : `JWT_SECRET`, `JWT_EXPIRES_IN` (déjà), + éventuellement mail de vérif (Resend) plus tard.
- **Vérifs** : e2e signup→`/user/me` ; cookie posé.

**STOP : Auth user fonctionnelle (cookie) + `/user/me`**

---

### 2.6 Liaisons User ↔ Order / Contact (guest inclus)
**But** : Support comptes **et** guest checkout dès le backend.
- **Commandes**
  ```bash
  # migration: ajouter userId? + email obligatoire dans Order/Contact
  pnpm -C apps/api prisma migrate dev --name link_user_order_contact
  pnpm -C apps/api prisma generate
  ```
- **Règles** :
  - Si **connecté** → `order.userId = currentUser.id` ; `contact.userId = user.id`.
  - Si **guest** → `userId = null` + `email` obligatoire (capturé au checkout/ formulaire).
- **Vérifs** : Studio montre `userId` rempli pour users, `null` pour guests.

**STOP : Relations validées (user & guest)**

---

### 2.7 Module Orders (calculs & création)
# AGENT — MEMORY UPDATE & TASK: Phase 2.7 (Tuftissimo)

## Contexte & vérité actuelle du projet
- DB: SQLite, Prisma.
- Modèle "commande 1-ligne" (PAS d’OrderItem, PAS de ProductVariant).
- `Product` conserve `priceCents?` (base) et `stock?`.
- `Order` stocke les choix client via enums: `material`, `size`, `backing`.
- `CustomOrder` sert au devis (pas de paiement en ligne), puis conversion éventuelle en `Order`.
- Montants en CENTIMES.
  - `priceCents` = **subtotal HT** (unitHT × quantity)
  - `totalCents = priceCents + taxCents + shippingCents`
  - TVA par défaut **21%** (mode "origin" Espagne)
  - Shipping: **ES = 500**, **FR = 1000**

## Schéma Prisma en vigueur (résumé)
- `Order`: champs clés `kind`, `status`, `productId?`, `material?`, `size?`, `backing?`, `customOrderId?`, `lineLabel`, `quantity`, `priceCents`(HT), `taxCents`, `shippingCents`, `totalCents`, `currency`, `email`, `address?`, `country?`, `userId?`.
- `CustomOrder`: préférences (materialCode?, sizeCode?, backing?), `quotedPriceCents?` (HT), lien 1–1 vers `Order` à la conversion.
- `Product`: `priceCents?`, `stock?`, `slug`, `name`, …

## Règles métier
- **Catalogue (standard)**: vente directe avec paiement en ligne.
  - `unitHT` se calcule à partir du `Product.priceCents` (base) et de modificateurs simples:
    - FACTEURS (provisoires, à externaliser):  
      - `MATERIAL_FACTOR = { COTTON_A: 1.0, COTTON_B: 1.1, WOOL_A: 1.25 }`
      - `SIZE_FACTOR     = { S: 1.0, M: 1.3, L: 1.6 }`
      - `BACKING_ADD_CTS = { ADHESIVE: 300, NON_ADHESIVE: 0 }`
  - `unitHT = base * MATERIAL_FACTOR[m] * SIZE_FACTOR[s] + BACKING_ADD_CTS[b]`
  - `subtotalHT = unitHT * quantity`
  - `taxCents = round(subtotalHT * 21%)`
  - `shippingCents = ES ? 500 : 1000`
  - `totalCents = subtotalHT + taxCents + shippingCents`
  - On **snapshote** tous les montants dans `Order`.

- **Custom (sur-mesure)**: pas de paiement en ligne.
  - Flux: `POST /custom-quotes` → chiffrage interne `quotedPriceCents` → `accept` → conversion en `Order` (offline).
  - À la conversion: `unitHT = quotedPriceCents`, calculs identiques, `kind='CUSTOM'`, `customOrderId` rempli.

## À FAIRE (Phase 2.7)

1) **Utilitaire de calcul**
   - Créer `apps/api/src/orders/compute-totals.ts`
   - Exporter `computeTotals(unitPriceCents: number, quantity: number, country: 'ES'|'FR', vatMode='origin')`
     - Par défaut: `vatRate=21`
     - Retour: `{ subtotalCents, taxCents, shippingCents, totalCents, vatRatePercent }`
   - Créer un fichier config `apps/api/src/orders/pricing.ts` avec les 3 tables de modificateurs ci-dessus.

2) **Endpoint Catalogue** — `POST /orders`
   - DTO minimal (validation):
     ```
     {
       kind: 'PRODUCT',
       productSlug: string,
       material: 'COTTON_A'|'COTTON_B'|'WOOL_A',
       size: 'S'|'M'|'L',
       backing: 'ADHESIVE'|'NON_ADHESIVE',
       quantity: number >=1,
       country: 'ES'|'FR',
       email: string,
       address?: string
     }
     ```
   - Service:
     - Charger le `product` via slug, vérifier presence `priceCents` (sinon 400).
     - Calculer `unitHT` via `pricing.ts`, puis `computeTotals`.
     - (Optionnel) décrémenter `Product.stock` en transaction si activé.
     - Créer `Order` (branche Prisma **checked** recommandée, via `connect`):
       - `kind='PRODUCT'`, `status='pending'`
       - `product: { connect: { id } }`
       - `material/size/backing` (enums)
       - `lineLabel = \`${product.name} — ${material}/${size}/${backing}\``
       - `quantity`
       - `priceCents=subtotalCents`, `taxCents`, `shippingCents`, `totalCents`, `currency='EUR'`
       - `email`, `address??`, `country`, `userId?`
     - Retourner `{ id, subtotalCents, taxCents, shippingCents, totalCents, currency: 'EUR' }`
   - (Stripe) créer la session checkout ici **ou** via un `POST /checkout/:orderId` séparé.

3) **Endpoints lecture**
   - `GET /orders/:id` → Order + champs clefs (`material/size/backing`, montants).
   - `GET /orders?user=me` (protégé) → filtres et pagination.

4) **Flux Custom**
   - Déjà en place côté modèle. S’assurer des routes:
     - `POST /custom-quotes` (création `CustomOrder`)
     - `PATCH /custom-quotes/:id/price` (set `quotedPriceCents`, `status='quoted'`)
     - `POST /custom-quotes/:id/accept` (conversion → `Order` sans Stripe)
   - Conversion: `priceCents=subtotalCents(quotedPriceCents×qty)`; mêmes calculs; `customOrderId` rempli.

5) **Tests**
   - Unit: `computeTotals` (ES/FR, arrondis, quantités).
   - E2E:
     - `POST /orders` (catalogue): crée un Order correct, totaux OK, enums stockés.
     - `GET /orders/:id` renvoie items/ligne + totaux.
     - `GET /orders?user=me` filtre par user connecté.
     - Custom: cycle quote → price → accept → création Order.

## Garde-fous techniques
- Ne mélange PAS `OrderCreateInput` et les `...Id` dans le même `data`.
- Validation DTO stricte (enums, quantity >= 1, email valide).
- Tous les montants en **centimes** (entiers).
- Journaliser `vatRatePercent` et `country` à la création.
- Pas d’OrderItem, pas de ProductVariant.

## Livrables attendus
- `compute-totals.ts`, `pricing.ts`
- DTO(s) + contrôleur + service `POST /orders`, `GET /orders/:id`, `GET /orders?user=me`
- Tests unitaires + E2E verts
- Migrations Prisma à jour (schéma enums sur Order/CustomOrder)

**STOP : Création d’une commande OK (user & guest)**

---

## Phase 3 — Frontend Web & Accessibilité

### 3.1 Scaffold React (App Router), TS strict
**But** : Démarrer le front proprement.
- **Commandes**
  ```bash
  pnpm create react-app@latest apps/web --ts --eslint
  pnpm -C apps/web add tailwindcss postcss autoprefixer @shadcn/ui
  pnpm -C apps/web exec tailwindcss init -p
  ```
- **Vérifs** : app démarre ; TS strict ; base Tailwind.

**STOP : Valider app web React bootée**

---

### 3.2 I18n ES/FR + pages
**But** : Pages : Accueil, Catalogue, Produit, Panier, Paiement, Sur‑mesure, Processus tufting, Contact, **Espace utilisateur**.
- **Fichiers** : arborescence pages, locales `public/locales/{es,fr}`.
- **Vérifs** : routes chargent ; switch langues OK.

**STOP : Valider routes/pages/i18n**

---

### 3.3 Accessibilité & SEO
**But** : WCAG AA ; OG/SEO techniques.
- **Vérifs** : Lighthouse A11y ≥ 90 ; OG tags, sitemap, robots générés.

**STOP : Audit accessibilité et SEO pages**

---

## Phase 4 — Panier & Paiement

### 4.1 Panier (client → serveur)
**But** : Ajouter/modifier/supprimer, persister.
- **Vérifs** : panier persiste ; synchro serveur optionnelle.

**STOP : Valider logique panier**

---

### 4.2 Stripe Checkout + webhooks + mail
**But** : Paiement sécurisé + statut commande.
- **Tâches** : créer session Checkout ; page success/cancel ; **webhooks** (idempotence) marquent `paid/failed` ; envoi email (Resend) confirmation.
- **ENV** : `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`.
- **Vérifs** : paiements test Stripe verts ; états mis à jour.

**STOP : Valider paiement test**

---

## Phase 5 — Sur-mesure & Email

### 5.1 Formulaire sur-mesure (Cloudinary)
**But** : Upload PNG/JPG ≤ 5 Mo + envoi.

**STOP : Valider soumission sur-mesure**

---

### 5.2 Traitement : email artisan (Resend) + devis ultérieur Stripe
**But** : Circuit email opérationnel.

**STOP : Valider circuit email sur-mesure**

---

## Phase 6 — Backoffice admin

### 6.1 Auth admin & accès
**But** : Limiter l’accès backoffice (JWT cookie, guard global optionnel).

**STOP : Valider auth admin protégée**

---

### 6.2 Dashboard admin
**But** : CRUD produits, gestion commandes, Markdown CMS.

**STOP : Valider fonctionnalités admin**

---

## Phase 7 — Observabilité, RGPD, Hébergement

### 7.1 Observabilité (Sentry, logs)
**But** : Logs structurés + Sentry web/api.

**STOP : Valider logs Sentry**

---

### 7.2 RGPD
**But** : Bannière cookies ; conservation commandes 2 ans ; cookies httpOnly/secure en prod.

**STOP : Valider conformité RGPD**

---

### 7.3 Hébergement (Docker/Scaleway/Traefik)
**But** : prod/staging prêts.
- **Fichiers** : Dockerfiles, `docker-compose.yml`, labels Traefik, DNS.

**STOP : Valider infra & accès prod**

---

## FIN — Validation générale, UAT, mise en production

---

## Annexes — ENV & Tests rapides

### ENV (API) — `.env.example`
```dotenv
# DB
DATABASE_URL=postgresql://user:pass@localhost:5432/tuftissimo?schema=public

# JWT
JWT_SECRET=change_me_dev
JWT_EXPIRES_IN=12h

# Admin (MVP)
ADMIN_EMAIL=admin@local
ADMIN_PASSWORD_HASH=$2a$10$........................................

# Stripe / Resend / Cloudinary (Phase 4/5)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
RESEND_API_KEY=re_xxx
CLOUDINARY_URL=cloudinary://<key>:<secret>@<cloud_name>
```

### Tests Postman (extraits)
1) `POST /auth/admin/login` → Set-Cookie + `{ access_token }`
2) `GET /admin/me` (cookie) → 200 `{ admin: ... }`
3) CRUD `/products` (401 sans token sur POST/PATCH/DELETE)
4) `POST /auth/signup` → cookie ; `GET /user/me` → 200
5) `POST /orders` → 201 (user & guest) ; `GET /orders?user=me` (protégé)

