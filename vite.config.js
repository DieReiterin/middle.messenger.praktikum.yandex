import { resolve } from 'path';
import { defineConfig } from 'vite' 
import { fileURLToPath } from 'url';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'build'),
    // emptyOutDir: true
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/path/to/your/variables";`
      },
    },
  },
}) 


