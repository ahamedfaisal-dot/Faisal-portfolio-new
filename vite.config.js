import { defineConfig } from 'vite';
 
export default defineConfig({
  base: '/Faisal-portfolio-new/',
  publicDir: 'pics',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  server: {
    open: true,
  },
});
