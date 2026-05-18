import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Tailwind v4 : design tokens définis dans src/app/globals.css via @theme
  // Ce fichier gère uniquement les content paths, darkMode, et plugins futurs
}

export default config
