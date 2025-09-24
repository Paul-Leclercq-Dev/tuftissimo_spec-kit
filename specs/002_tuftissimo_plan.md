# Plan de Projet – Tuftissimo

## 1. Initialisation & Structure
- Mise en place du monorepo (apps/web pour Next.js, apps/api pour NestJS, dossier packages pour composants partagés)
- Création des scripts de base (dev, build, test, lint) et configuration ESLint/Prettier
- Setup CI/CD avec GitHub Actions

## 2. Modélisation & Backend
- Définition du modèle de données avec Prisma : Produit, Commande, Utilisateur (admin), CommandeSurMesure, etc.
- Initialisation du projet NestJS :
  - Configuration REST, OpenAPI, sécurité, validation Zod/DTO, Stripe (base), Resend
  - Gestion des routes REST pour produits, paniers/commandes, sur-mesure, contact, auth admin
  - Intégration PostgreSQL (SQLite en dev), Docker/Docker-compose et Traefik pour le local

## 3. Frontend Web & Accessibilité
- Création du projet Next.js (App Router)
- Internationalisation ES/FR, structure de pages, routing
- Mise en place Tailwind CSS, shadcn/ui et respect WCAG AA
- Pages : Accueil, Catalogue (avec filtres), Produit, Panier, Paiement, Sur-mesure, Processus tufting, Contact
- Gestion des formulaires (validation, upload Cloudinary sur-mesure, antispam)
- Web : optimisation SEO (OpenGraph, sitemap, robots.txt, métas localisées)

## 4. Panier & Paiement
- Gestion du panier (local, puis serveur)
- Calculs automatiques : TVA 21 %, livraison (Espagne 5 €, France 10 €, pas d’autres pays MVP)
- Intégration Stripe Checkout, gestion des statuts commande via webhooks (payé, échoué, expédié/en préparation)
- Envoi d’emails transactionnels (Resend) et confirmation visuelle

## 5. Commande sur mesure & Email
- Page dédiée, formulaire avancé, upload (PNG/JPG max 5 Mo)
- Processus : reception → email direct à l’artisan pour devis → paiement Stripe distinct ultérieur

## 6. Backoffice admin
- Authentification admin (email/mot de passe), single user/rôle
- Dashboard admin : gestion produits, gestion commandes (statut simple, pas de suivi colis), consultation sur-mesure
- Gestion du contenu éditorial en Markdown dans le repo (CMS light)
- Sécurité (rate-limit, logging, sessions sécurisées, secrets chiffrés)

## 7. Observabilité, RGPD, Hébergement
- Intégration Sentry, logs structurés, mesures perf API (p95), Core Web Vitals
- RGPD : bannière cookie simple, conservation commande 2 ans
- Déploiement Docker/Compose sur Scaleway, domaine tuftissimo.com avec Traefik SSL

## 8. Hors scope MVP
- Marketplace multi-vendeurs, CRM avancé, variations & promos, suivi colis, autres langues

---

## Étapes suggérées
1. Monorepo, scaffold Next/Nest, base scripts, CI
2. Prisma : Modèle de données et initialisation DB
3. API REST produits/commandes, Stripe intégration, Resend setup
4. Frontend : Catalogues, fiches produits, panier, paiement, I18n, responsive – TESTS/ACCES
5. Commande sur mesure + upload/Cloudinary/email
6. Admin dashboard, markdown CMS, sécurité
7. Déploiement dockeré/dev/prod, logs, RGPD, SEO/perf
