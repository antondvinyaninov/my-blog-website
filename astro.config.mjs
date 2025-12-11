// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Раскомментируйте и замените на ваш репозиторий после создания на GitHub
  // site: 'https://YOUR_USERNAME.github.io',
  // base: '/REPO_NAME',
  
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    port: 4321
  }
});