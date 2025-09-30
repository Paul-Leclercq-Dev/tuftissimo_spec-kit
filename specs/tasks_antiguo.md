# Backlog exécutable – Tuftissimo

---

## Phase 1 — Initialisation & Structure

### 1.1 Initialiser le monorepo
**But** : Préparer la structure du projet (apps/web, apps/api, packages)
- Créer le dossier racine et sous-dossiers apps/web, apps/api, packages
- Fichiers : package.json workspace, README.md, .gitignore
- Commande : 
  ```shell
  # À la racine
  npm init -y
  mkdir -p apps/web apps/api packages
  echo 'node_modules/' > .gitignore
  ```

**STOP : Valider structure dossier monorepo**

### 1.2 Configurer le gestionnaire de workspace (pnpm, npm workspaces, ou yarn)
**But** : Faciliter le partage de paquets et dépendances multi-apps
- Éditer package.json (ajouter "workspaces").
- Fichiers : package.json
- Commande : (exemple npm workspaces)
  ```json
  "workspaces": ["apps/*", "packages/*"]
  ```

**STOP : Valider configuration workspace**

### 1.3 Initialiser le dépot Git & docs de base
**But** : Préparer le versioning et la documentation initiale
- Commandes :
  ```shell
  git init
  touch README.md
  git add . && git commit -m "chore: initial commit"
  ```

**STOP : Valider dispo Git & README**

### 1.4 Setup CI/CD Github Actions & scripts de base
**But** : Ajout scripts dev/build/test/lint + workflow github de base
- Fichiers à créer/éditer : .github/workflows/ci.yml, scripts dans package.json
- Commande : 
  ```shell
  # Exemple (à ajuster plus tard, vérification version simple)
  mkdir -p .github/workflows
  echo 'name: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3' > .github/workflows/ci.yml
  npm set-script dev "echo dev stub"
  npm set-script build "echo build stub"
  npm set-script lint "echo lint stub"
  npm set-script test "echo test stub"
  ```

**STOP : Valider scripts/npm + pipeline initial**

---

## Phase 2 — Modélisation & Backend

### 2.1 Scaffold API NestJS + setup PostgreSQL/Prisma
**But** : Créer l’API avec NestJS, brancher Prisma/PostgreSQL
- Commandes :
  ```shell
  cd apps/api
  npx @nestjs/cli new .
  npm install @prisma/client prisma
  npx prisma init
  # Configurer connexion PostgreSQL (ou SQLite pour dev)
  ```
- Fichiers : apps/api/src/*, apps/api/prisma/schema.prisma

**STOP : Validation scaffold API & DB connectée**

### 2.2 Définir le data model Prisma (produit, commande, admin, commande sur mesure, etc)
**But** : Avoir le schéma minimal en place
- Fichier : apps/api/prisma/schema.prisma
- Commande : 
  ```shell
  # Éditer schema.prisma puis
  npx prisma migrate dev --name init
  npx prisma generate
  ```

**STOP : Validation schema initial & migration OK**

### 2.3 Exposer routes REST basiques dans NestJS
**But** : Routes GET/POST pour produit, commande, admin-login, sur-mesure, contact
- Fichiers : apps/api/src/modules/...
- Commandes :
  ```shell
  # Générer des modules/controllers/services NestJS
  npx nest g module produits
  npx nest g controller produits
  ...
  ```
  (Répéter pour chaque ressource)

**STOP : Valider endpoints/test requêtes basiques**

### 2.4 Setup sécurité/api : Zod, validation DTO, rate limiting
**But** : API robuste, validation, protections de base
- Fichiers : apps/api/src/main.ts, middlewares, DTO

**STOP : Valider API sécurisée/validante**

## Phase 3 — Frontend Web & Accessibilité

### 3.1 Scaffold web Next.js, App Router, TypeScript strict
**But** : Démarrer l’app web avec base perf/accès/ui
- Commande :
  ```shell
  cd apps/web
  npx create-next-app@latest .
  npm install tailwindcss @shadcn/ui
  npx tailwindcss init -p
  # Configurer strict true dans tsconfig.json
  ```
- Fichiers : apps/web/*

**STOP : Valider app web Next.js bootée**

### 3.2 I18n ES/FR + structure pages : accueil, catalogue, produit, panier, paiement, sur-mesure, contact
**But** : Arborescence pages + traduction et routage prêt
- Fichiers : apps/web/src/pages, apps/web/public/locales/*

**STOP : Valider routes/pages/i18n**

### 3.3 Accessibilité et SEO (métas, OpenGraph, ARIA, focus visibles)
**But** : Conformité WCAG AA

**STOP : Audit accessibilité et SEO pages**

---

## Phase 4 — Panier & Paiement

### 4.1 Implémenter gestion de panier côté client (puis serveur si besoin)
**But** : Ajouter produits, modifier quantités, persister panier
- Fichiers : apps/web/src/context ou stores, composants panier

**STOP : Valider logique panier**

### 4.2 Intégration Stripe Checkout (frontend + backend), TVA, frais fixes livraison
**But** : Paiement sécurisé, conformité prix/EU
- Fichiers : apps/web/src/pages/payment, apps/api/src/modules/stripe

**STOP : Valider paiement test**

---

## Phase 5 — Sur-mesure & Email

### 5.1 Formulaire sur-mesure avec upload image Cloudinary
**But** : Demandes personnalisées (PNG/JPG max 5 Mo)

**STOP : Valider soumission sur-mesure**

### 5.2 Traitement manuel : email à l’artisan (Resend), devis manuel, paiement ultérieur Stripe

**STOP : Valider circuit email sur-mesure**

---

## Phase 6 — Backoffice Admin 

### 6.1 Auth admin (email/mot de passe), session sécurisée, accès unique
**But** : Limitation accès backoffice sécurisé

**STOP : Valider auth admin protégée**

### 6.2 Dashboard admin : CRUD produits, gestion commandes, Markdown CMS

**STOP : Valider fonctionnalités admin**

---

## Phase 7 — Observabilité, RGPD, Hébergement

### 7.1 Setup Sentry (logs web/api), logs structurés
**But** : Observabilité prod

**STOP : Valider logs Sentry**

### 7.2 Mise en place bannière cookies et gestion RGPD
**But** : RGPD base, conservation/clean DB commandes 2 ans

**STOP : Valider conformité RGPD**

### 7.3 Dockerisation, déploiement sur Scaleway, Traefik, SSL, nom de domaine
**But** : Être prêt prod/staging
- Fichiers : Dockerfile apps, docker-compose.yml, traefik labels, config DNS
- Commandes : build/push docker, config serveurs

**STOP : Valider infra & accès prod**

---

## FIN — Validation générale, UAT et mise en production

