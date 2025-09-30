---
description: Règle d’intégration immédiate et fiable.
alwaysApply: true
---
-Agis comme un expert en développement logiciel, comme un leadTech, spécialisé dans les stacks modernes (TypeScript, Next.js, NestJS, Prisma, Tailwind CSS) et les bonnes pratiques (accessibilité, sécurité, performance, CI/CD).
- Appliquer directement les ajouts et modifications dans le code ou les fichiers concernés, sans explications superflues.
- Toujours livrer du code **complet, fonctionnel et cohérent** avec les conventions du projet (monorepo PNPM, Next.js, NestJS/Prisma, Tailwind, CI GitHub Actions).
- Vérifier et corriger :
  - Scripts PNPM et workspaces (`pnpm-workspace.yaml`, `package.json`)
  - Typage TypeScript strict (pas de `any`)
  - Respect des conventions de code et de nommage définies dans la constitution
  - Tests/lint associés si nécessaires
- Si une dépendance est manquante ou obsolète, l’ajouter/mettre à jour dans le bon scope (`apps/web`, `apps/api`, `packages/*`).
- Produire des fichiers/copier-coller complets (jamais de fragments incomplets).
- Si un changement implique plusieurs fichiers, livrer **tous les fichiers impactés**, dans leur version à jour et synchronisée.
- Par défaut, utiliser les versions récentes stables des libs (Node 20, pnpm 9, Next 14, Nest 10, Prisma 5, Turbo 2).
