# Spécifications Fonctionnelles – Projet Tuftissimo

## 1. Présentation Générale
Tuftissimo est une boutique en ligne d’artisanat dédiée à la vente de tapis faits main via un site accessible, moderne et sécurisé. Le site propose un catalogue avec filtres, la commande sur mesure, le paiement en ligne, et un backoffice de gestion.

---

## 2. Fonctionnalités Principales

### 2.1. Page d’accueil
- Présentation de la marque et des valeurs de l’artisanat tufting.
- Mise en avant d’une sélection de tapis récemment ajoutés (4 à 6 produits dynamiques).
- Images issues de Cloudinary optimisées.
- Call-to-actions principaux :
  - Accéder au catalogue
  - Commander un tapis sur mesure
  - Contacter l’artisan

### 2.2. Catalogue produits
- Liste paginée de tous les tapis disponibles à la vente.
- Affichage : image principale, nom, prix, stock, badges éventuels (« Nouveau », « Épuisé »...).
- Filtres utilisateur :
  - Catégorie/style (moderne, classique, abstrait…)
  - Taille (petit, moyen, grand / filtre par dimensions)
  - Couleur dominante ou palette (via tags)
- Recherche texte intégrale sur le nom ou la description.
- Affichage responsive grid (mobile/tablette/desktop)

### 2.3. Page produit
- Photos galerie (Cloudinary, plusieurs images)
- Description détaillée, dimensions, matières, conseils d’entretien
- État du stock, prix TTC, délais de livraison estimés
- Bouton « Ajouter au panier » (disabled si stock = 0)
- Composant de partage social (OpenGraph/meta)

### 2.4. Panier
- Affichage des produits sélectionnés : image, nom, prix unitaire, quantité modifiable, total partiel
- Calcul automatique du total TTC, ajout TVA, frais de livraison (fixe ou estimatif selon destination)
- Option de suppression d’un produit, vider le panier
- CTA vers paiement sécurisé

### 2.5. Paiement
- Intégration Stripe Checkout pour le paiement sécurisé
- Gestion multidevise (paramétrage Stripe si besoin)
- Confirmation visuelle à l’issue du paiement (succès/échec)
- Webhook Stripe pour mise à jour état commande : payé/échoué/expédié
- Envoi email transactionnel de confirmation (via Resend)

### 2.6. Commandes sur mesure
- Page FAQ/explication du service personnalisé
- Formulaire dédié :
  - Champs libres (dimensions, couleurs, texte additionnel)
  - Upload photo ou inspiration (Cloudinary)
  - Envoi de l’ensemble par email à l’artisan (Resend)
  - Affichage d’un message de confirmation de réception

### 2.7. Processus de tufting
- Page pédagogique décrivant chaque étape du tufting artisanal
- Texte structuré, images étape par étape, mini-vidéo éventuellement
- Valorisation de l’aspect fait main et des outils utilisés

### 2.8. Page contact
- Formulaire Nom, Email, Message
- Validation anti-spam (honeypot, captcha simple si besoin)
- Traitement de l’envoi par Resend avec accusé de réception à l’utilisateur
- Informations légales et coordonnées physiques de contact

### 2.9. Internationalisation
- Langues disponibles : Espagnol (par défaut) + Français
- Détection auto (préférences navigateur), possibilité de switch manuel
- Trad implémentée via fichiers clé:valeur JSON (Next.js + i18n)
- Meta et emails transactionnels localisés

### 2.10. Backoffice administrateur
- Accès protégé par login avec gestion secure session/jwt
- Dashboard admin simple :
  - Ajout, édition, suppression de produits (nom, description, images, stock, prix, catégories…)
  - Gestion commandes : liste/export, mise à jour statut (reçue, payée, expédiée)
  - Consultation des demandes sur mesure reçues
- Restriction d’accès aux admins enregistrés

### 2.11. Accessibilité & SEO
- Design conforme WCAG AA (contrastes, navigation clavier, ARIA labels, focus visibles)
- Métadonnées complètes (OpenGraph, titre, description, Twitter card...) par page
- Génération automatique sitemap.xml et robots.txt
- URLs propres et localisées

### 2.12. Observabilité & Sécurité
- Tous logs structurés, erreurs capturées et envoyées à Sentry (prod)
- Taux de disponibilité et latence des API mesurés (p95 < 250ms)
- Score Core Web Vitals “good” visé pour pages publiques (LCP < 2.5s)
- Validation entrées utilisateurs (Zod/DTO)
- Protection web : secrets chiffrés, rate limiting sur APIs publiques, sanitation

## 3. Parcours Utilisateur Synthétiques
- Découverte > Navigation catalogue > Sélection produit > Ajout panier > Paiement > Confirmation
- Découverte > Commande sur mesure > Envoi formulaire > Réponse email
- Découverte > Contact > Soumission formulaire > Confirmation
- Admin > Login > Ajout/Nouvel article > Suivi commandes

## 4. Exigences Techniques Complémentaires
- Toutes les images hébergées/optimisées sur Cloudinary
- Paiements Stripe (Checkout + webhooks/SCA)
- Emails transactionnels par Resend
- Backend NestJS avec Prisma, PostgreSQL (SQLite dev)
- Frontend Next.js App Router, Tailwind CSS, shadcn/ui
- Dockerisé (multi-stage build, docker-compose, Traefik SSL dev/prod)
- Outils dev : TypeScript strict, ESLint, Prettier, tests unitaires/intégration, commits conventionnels
- Scripts npm (dev/build/test/lint/format/db), makefile optionnel
- CI/cd sur Github Actions (lint, test, build)

## 5. Hors-scope initial
- Marketplace multi-vendeurs
- CRM complexe
- Internationalisation supplémentaire (hors ES/FR)

---

_Version : 1.0 | Date de rédaction : 2025-09-24_