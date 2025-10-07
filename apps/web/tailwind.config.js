/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette de couleurs Tuftissimo
        tuft: {
          'primary': '#18534F',      // Vert foncé principal
          'secondary': '#226D68',    // Vert moyen
          'light': '#ECF8F6',        // Vert très clair (arrière-plans)
          'accent': '#FEEAA1',       // Jaune crème (accents)
          'gold': '#D6955B',         // Brun doré (détails)
        },
        // Alias pour faciliter l'usage
        primary: '#18534F',
        secondary: '#226D68',
      },
    },
  },
  plugins: [],
}