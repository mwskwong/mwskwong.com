import { radixThemePreset } from 'radix-themes-tw';
import { type Config } from 'tailwindcss';

const config = {
  presets: [radixThemePreset],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  experimental: {
    optimizeUniversalDefaults: true,
  },
} satisfies Config;

export default config;
