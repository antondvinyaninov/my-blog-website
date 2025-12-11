// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://antondvinyaninov.github.io',
  // Убираем base, так как это главный репозиторий
  
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    port: 4321
  }
});