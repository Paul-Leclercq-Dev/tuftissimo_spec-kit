# Tuftissimo — Journal d’implémentation & Guide MVP

**Version :** 0.4 · **Date :** 2025-09-29 (Europe/Madrid)

## 🎯 Objectif
Ce document consolide **tout ce que nous avons fait** (monorepo, Prisma, seed, API Nest, Auth JWT), **pourquoi** nous l’avons fait, et **comment** tester/faire évoluer l’application. Il sert de **source de vérité** pour poursuivre le MVP de Tuftissimo.

---

## 🧭 Contexte & Architecture
- **Monorepo PNPM** : `apps/web` (Next/React), `apps/api` (NestJS/Prisma), `packages/*` (lib partagées).
- **Outils** : TypeScript strict, ESLint/Prettier, tests (Jest/Vitest), Prisma (ORM), Stripe/Resend (à venir), Docker (à venir), CI GitHub Actions (à compléter).
- **DB** : PostgreSQL (prod) / SQLite ou Postgres local (dev). Prisma pour migrations, génération client, Studio et seed.

**Raisons des choix**
- **Prisma** : DX forte (typage, migrations, Studio), rapidité de build du MVP.
- **NestJS** : structure modulaire, DI, sécurité, guards interposables, standard pour API TS.
- **JWT** : stateless, simple à déployer ; **cookie httpOnly** privilégié pour l’admin (mitigation XSS).

---

Détail par phase (faites)
Phase 1 — Initialisation & Structure (détaillée)

But : préparer un socle monorepo prêt pour itérer vite.

Arborescence : apps/web, apps/api, packages.

Fichiers clés

pnpm-workspace.yaml → déclare les workspaces (apps/*, packages/*) pour partager les deps et exécuter des scripts par scope.

package.json (racine) → orchestrateur :

dev : pnpm -C apps/web dev & pnpm -C apps/api start:dev (lance les 2 apps en parallèle).

build, lint, test → proxy vers chaque app.

README.md → intentions et structure ; sert de landing doc.

.gitignore → exclut node_modules/, artefacts, etc.

Pourquoi : PNPM + workspaces = install unique, cache, exécution ciblée.

Vérif : pnpm -C apps/api -v, pnpm -C apps/web -v ne doivent pas renvoyer d’erreur « importer manifest not found » (chaque app a son package.json).

Phase 2 — Modélisation & Backend
2.1 Scaffold API NestJS + Prisma

Créé : squelette Nest (src/main.ts, src/app.module.ts, dossiers modules/*).

Prisma : prisma/schema.prisma + .env (clé DATABASE_URL).

PrismaModule/Service (globaux) :

src/prisma/prisma.module.ts : exporte PrismaService globalement.

src/prisma/prisma.service.ts : ouvre/ferme la connexion DB ($connect/$disconnect).

Pourquoi : centraliser le client pour l’injecter dans les services (ex. ProductsService).

2.2 Schéma Prisma + Seed Product (3 items)

Schéma (attendu) Product : id, name, price, stock, description?, imageUrl?, tags? String[], category?, createdAt.

Migrations : prisma migrate dev --name init.

Seed : apps/api/prisma/seed/index.ts + hook "prisma": { "seed": "tsx prisma/seed/index.ts" }.

Script : pnpm -C apps/api run prisma:seed → remplit 3 produits.

Pourquoi : avoir des données réalistes pour tester l’API et les listes.

2.3 Exposition des routes REST — Products & Auth admin
Module products (CRUD complet, branché Prisma)

Fichiers

src/modules/products/dto/create-product.dto.ts → validation d’entrée (name, price, stock, etc.).

src/modules/products/dto/update-product.dto.ts → dérivé partiel de Create.

src/modules/products/products.service.ts → accès DB via PrismaService : findMany/get/create/update/delete (+ 404 si non trouvé).

src/modules/products/products.controller.ts → routes : GET /products, GET /products/:id, POST /products, PATCH /products/:id, DELETE /products/:id.

src/modules/products/products.module.ts → wiring service + controller.

Sécurité : écriture protégée par JwtAuthGuard (POST/PATCH/DELETE). Lecture publique (GET).

Auth admin (JWT + cookie httpOnly)

Fichiers

src/modules/auth/auth.module.ts → importe PassportModule + JwtModule.register({ secret, expiresIn }) ; fournit AuthService + JwtStrategy.

src/modules/auth/auth.service.ts → vérifie l’admin via ADMIN_EMAIL + ADMIN_PASSWORD_HASH (bcrypt) ; signe un JWT (email, role: 'admin').

src/modules/auth/auth.controller.ts → POST /auth/admin/login (ou /admin/login) : pose un cookie httpOnly access_token et renvoie { access_token } (pour Postman).

src/modules/auth/jwt.strategy.ts → lit le token depuis cookie ou Authorization Bearer ; vérifie la signature avec JWT_SECRET ; retourne { email, role } dans req.user.

src/modules/auth/jwt-auth.guard.ts → extends AuthGuard('jwt') ; à appliquer sur les routes à protéger.

src/admin/admin.controller.ts → GET /admin/me protégé : renvoie l’utilisateur courant pris dans req.user (mirror d’auth pour le front).

Support

src/main.ts → ValidationPipe global + cookie-parser (pour lire le cookie) + éventuel enableCors({ credentials:true, origin:[...front] }).

Pourquoi : MVP stateless sécurisé, simple à intégrer au front ; cookie httpOnly pour limiter le risque XSS.

🧩 À quoi sert chaque fichier (vue fichier par fichier)
Racine

pnpm-workspace.yaml : déclare les workspaces ; permet pnpm -r et pnpm -C <path>.

package.json : scripts d’orchestration (dev/build/lint/test) déclenchés à la racine.

README.md : guide d’entrée dans le repo.

apps/api — infrastructure

src/main.ts : bootstrap Nest ; ValidationPipe global (whitelist/transform) ; ajout cookie-parser ; enableCors si front ≠ API.

src/app.module.ts : importe les modules applicatifs : PrismaModule, ProductsModule, AuthModule, (et AdminController si contrôleur global).

src/prisma/prisma.module.ts : module global pour exposer PrismaService.

src/prisma/prisma.service.ts : client Prisma centralisé (connexion/cleanup).

apps/api — produits

src/modules/products/dto/create-product.dto.ts : schéma d’entrée pour créer ; sécurise/normalise les données.

src/modules/products/dto/update-product.dto.ts : mises à jour partielles typées.

src/modules/products/products.service.ts : logique d’accès aux données (DB) + erreurs NotFound.

src/modules/products/products.controller.ts : mapping HTTP → service.

src/modules/products/products.module.ts : encapsulation et export de la feature.

apps/api — auth

src/modules/auth/auth.module.ts : configuration JWT (secret + TTL), enregistrement de la strategy.

src/modules/auth/auth.service.ts : validation admin (bcrypt) + signature du JWT.

src/modules/auth/auth.controller.ts : endpoint de login (pose cookie + JSON { access_token }).

src/modules/auth/jwt.strategy.ts : extraction cookie/Authorization + vérification token.

src/modules/auth/jwt-auth.guard.ts : guard à appliquer sur les routes.

src/admin/admin.controller.ts : /admin/me protégé (retourne req.user).

apps/api — Prisma

prisma/schema.prisma : modèle de données (tables/relations). Source de vérité de la DB.

prisma/seed/index.ts : jeu de données initial (3 produits) pour tester rapidement.

### Pourquoi cookie httpOnly ?
- **XSS** : JS ne peut pas lire le cookie ; il est envoyé automatiquement par le navigateur.
- **Confort** front : pas besoin de gérer manuellement l’en-tête Authorization.

### Points d’attention
- **`secure`** : en dev HTTP, `secure=false`, sinon le cookie n’est pas posé.
- **CORS** : si front ≠ API → `credentials: true` + `origin` autorisé + `credentials: 'include'` côté front.
- **Strategy** : l’extractor doit lire **cookie** *et* **header** pour flexibilité.

---

## 🗃️ Prisma — Rappels pratiques
- **Schéma** : `apps/api/prisma/schema.prisma`. On y définit modèles, colonnes, relations.
- **Migrations** : `npx prisma migrate dev --name <name>` → applique SQL + versionne.
- **Client** : `npx prisma generate` → `@prisma/client` typé.
- **Studio** : `npx prisma studio` → UI DB.
- **Seed** : `prisma db seed` → exécute `prisma/seed/index.ts` (via `tsx`/`ts-node`).

### Typologie de relations (exemples)
- **1→N** : `User` → `Order[]` (clé étrangère dans Order).
- **N↔N** : `Order` ↔ `Product` via table pivot (implicite ou explicite si `quantity`).
- **1↔1** : `User` ↔ `Profile` unique.

---

## 🔌 Endpoints actuels (MVP)
- **Auth**
  - `POST /auth/admin/login` (ou `/admin/login`) → pose cookie + `{ access_token }`.
  - `GET /admin/me` (protégé) → renvoie l’admin courant (`req.user`).
- **Products**
  - `GET /products` (public)
  - `GET /products/:id` (public)
  - `POST /products` (**protégé JWT**)
  - `PATCH /products/:id` (**protégé JWT**)
  - `DELETE /products/:id` (**protégé JWT**)

> Futures ressources (squelettes/à venir) : `orders`, `custom-orders`, `contact`.

---

## 🔧 Environnement & secrets (DEV)
Créer/compléter `apps/api/.env` :
```dotenv
# Admin
ADMIN_EMAIL=admin@local
ADMIN_PASSWORD_HASH=$2a$10$...........................   # bcrypt du mot de passe

# JWT
JWT_SECRET=change_me_dev
JWT_EXPIRES_IN=12h

# DB
DATABASE_URL=postgresql://user:pass@localhost:5432/tuftissimo?schema=public
```

**Générer un hash bcrypt** :
```bash
node -e "console.log(require('bcryptjs').hashSync('changeme', 10))"
```

> **Prod** : secrets via variables d’env (pas de commit), cookies `secure=true`, SameSite adapté, rotation de secret si nécessaire.

---

## ▶️ Démarrage & tests
### Lancer l’API
```bash
pnpm -C apps/api prisma generate
pnpm -C apps/api prisma migrate dev
pnpm -C apps/api run prisma:seed   # si configuré
pnpm -C apps/api run start:dev
```

### Tester (Postman)
1) **Login** → `POST http://localhost:3000/auth/admin/login`  
   ↳ Vérifier **Set-Cookie: access_token=…**.
2) **Qui suis-je ?** → `GET http://localhost:3000/admin/me`  
   ↳ 200 avec `{ admin: { email, role } }`.
3) **CRUD Products**  
   - `GET /products`  
   - `POST /products` (protégé) : body JSON `{ name, price, stock, … }`.

### Tester (fetch navigateur)
```ts
await fetch('http://localhost:3000/auth/admin/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  credentials: 'include', body: JSON.stringify({ email, password })
});
const me = await fetch('http://localhost:3000/admin/me', { credentials: 'include' });
```

---

## 🛡️ Sécurité — état & suites
- **En place** : JWT + `JwtAuthGuard` sur routes d’écriture produits ; cookie httpOnly en dev (non `secure`).
- **À faire (prochaines itérations)** :
  - Guard **global** + décorateur `@Public()` (whitelist login).
  - **Rate limit** sur `/auth/admin/login` (throttler) + logs sécurité.
  - Passer l’admin en **DB** (user unique, hash en base) + `argon2`.
  - Option **logout** (`res.clearCookie('access_token')`).

---

## 🧪 Qualité & CI (à compléter)
- **CI minimale** (GitHub Actions) à ajouter : install PNPM, build API+Web, lint, tests.
- **Tests API** :
  - Unitaires (services Nest, DTO validation),
  - Intégration (e2e) : login → accès `/admin/me` → CRUD products avec token.

---

## 🗓️ Prochaines étapes proposées
1) **Orders** (phase 4.1/4.2 anticipée côté backend) :
   - Modèle Prisma `Order`, `OrderItem` (pivot explicite avec `quantity` et `unitPrice`).
   - Calculs : **TVA 21 %**, frais Livraison (**ES 5 €**, **FR 10 €**), total TTC.
   - Endpoints : créer commande, obtenir statut.
   - Plus tard : Stripe Checkout + webhooks.
2) **Resend** (phase 5) :
   - `custom-orders` + `contact` → persistance + emails transactionnels.
3) **Admin** :
   - Guard global + `@Public()` ; décorateur `@CurrentUser()` ; page Admin côté front.
4) **CI** : pipeline GitHub Actions **lint/test/build** ; caches PNPM/Turbo ; secrets.
5) **Docker dev** : Postgres + pgAdmin ; `.env.example` ; `docker-compose.dev.yml`.

---

## 🧰 Rollback rapides
```bash
# Annuler modifications auth
git checkout -- apps/api/src/modules/auth

# Annuler tout changement non committé
git reset --hard && git clean -fd
```

---

## 📒 Traçabilité (format standard)
**Step:** Phase 2 → 2.3 (Auth admin & Products CRUD)  
**Files changed:** `src/modules/auth/**/*`, `src/admin/admin.controller.ts`, `src/modules/products/**/*`, `src/main.ts`, `src/prisma/*`  
**Commands run:** `pnpm -C apps/api add @nestjs/jwt @nestjs/passport passport passport-jwt cookie-parser bcryptjs` ; Prisma `generate/migrate/seed`; `start:dev`  
**How to test:** Postman login → cookie → `/admin/me` → CRUD produits protégés  
**Git:**
```bash
git add apps/api/src
git commit -m "feat(step-2.3): admin login JWT + guard + /admin/me ; products CRUD"
git push origin main
```
**Status:** API fonctionnelle ; auth opérationnelle ; prête pour Orders/Emails/CI.

---

## ❓Questions ouvertes / Décisions à figer
- Route de login finale : `/auth/admin/login` vs `/admin/login` (cohérence front/back).
- Persistance admin en DB vs ENV (sécurité prod).
- Stratégie refresh token & rotation (nécessaire si sessions longues).
- Règles exactes de TVA/frais et devises Stripe.

> Dès validation de ces points, on enchaîne : **/specify → /plan → /implement** pour le module **Orders**.

