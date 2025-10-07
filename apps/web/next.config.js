/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration du serveur de développement
  experimental: {
    // Active le turbopack pour un build plus rapide
    turbo: true,
  },
  // Configuration du serveur
  server: {
    port: 3001, // Port par défaut pour le frontend
  },
  // Configuration pour la production
  output: 'standalone',
}

module.exports = nextConfig