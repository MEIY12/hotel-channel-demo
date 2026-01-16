import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        luxury: {
          gold: '#C5A572',
          navy: '#1B2B3A',
          cream: '#F5F1E8',
        },
        corporate: {
          blue: '#2563EB',
          gray: '#6B7280',
          light: '#F3F4F6',
        },
        ota: {
          primary: '#15803d',
          accent: '#FEBB02',
          success: '#00AA6C',
        },
      },
    },
  },
  plugins: [],
}
export default config

