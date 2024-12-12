import { radixThemePreset } from 'radix-themes-tw';
import type { Config } from 'tailwindcss';

export default {
  presets: [radixThemePreset],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
} satisfies Config;
