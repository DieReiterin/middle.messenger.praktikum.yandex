import { resolve } from 'path';
import { defineConfig } from 'vite'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'build'),
    // emptyOutDir: true
  },
  server: {
    port: 3000,
  },
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   },
  //   extensions: [
  //     '.js',
  //     '.json',
  //     '.jsx',
  //     '.mjs',
  //   ],
  // },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // additionalData: `@import "@/path/to/your/variables";`
  //     },
  //   },
  // },
  // plugins: [handlebars({
  //   reloadOnPartialChange: true,
  //   partialDirectory: [
  //     './src/components',
  //     './src/components/button', 
  //     './src/components/link', 
  //     './src/components/input-field', 
  //     './src/components/login-form', 
  //   ],
  //   helpers: {
  //     capitalize: (value) => value.toUpperCase(),
  //   },
  //   // context: {
  //   //   username: 'John Doe'
  //   // }
  // })],
}) 


