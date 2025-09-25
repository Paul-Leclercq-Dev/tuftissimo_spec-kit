# Projet Boutique de Tapis Tufting – Tuftissimo

## Objectifs
- Vendre des tapis faits main
- Afficher un catalogue produit
- Expliquer le process de tufting
- Permettre commandes sur mesure
- Paiement en ligne sécurisé
- Contact facile

## Principes non négociables
- Qualité code : TypeScript strict, ESLint + Prettier + tests, commits conventionnels
- Accessibilité : WCAG AA (focus visible, contrastes, ARIA)
- i18n : ES (par défaut) + FR
- UI : Next.js App Router + Tailwind CSS + shadcn/ui; design simple, mobile-first
- Backend : NestJS, REST + OpenAPI, Prisma ORM
- Base de données : PostgreSQL (SQLite en dev)
- Paiements : Stripe (Checkout + Webhooks, SCA)
- Médias : Cloudinary
- Emails : Resend
- Sécurité : OWASP ASVS L1, secrets chiffrés, rate limiting API, validation Zod/DTO
- Observabilité : logs structurés, erreurs capturées (Sentry en prod)
- Performance : Core Web Vitals "good", API p95 < 250ms
- SEO : métas, sitemap.xml, robots.txt, OpenGraph
- DX : npm scripts, Makefile optionnel, hot reload
- CI/CD : GitHub Actions
- Docker : multi-stage, docker-compose, labels Traefik SSL

## Hors-scope initial
- Marketplace multi-vendeurs
- CRM avancé
- Internationalisation > ES/FR

## Gouvernance
- La constitution prévaut sur tout
- Toute modification doit être documentée et validée
- Version : 1.0 | Ratified : 2025-09-24
