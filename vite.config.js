import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: './src/',
  build: {
    outDir: '../build',
    emptyOutDir: true
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
        // Additional SCSS/Sass options
        // For example, you can specify the path to your global variables file here
        // If you have one, it could be like this:
        // additionalData: `@import "@/path/to/your/variables";`
      },
    },
  },
  plugins: [handlebars({
    partialDirectory: './src/partials',
    // context: {
    //   username: 'John Doe'
    // }
  })],
}) 


// import vue from '@vitejs/plugin-vue'
// import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// import { defineConfig } from 'vite'
// import { fileURLToPath, URL } from 'node:url'

// export default defineConfig({
  // plugins: [
  //   vue({
  //     template: {
  //       transformAssetUrls: {
  //           includeAbsolute: false,
  //       },
  //   },
  //   }),
  //   vuetify({
  //     autoImport: true,
  //   }),
  // ],
  // base: '',
  // define: { 'process.env': {} },
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   },
  //   extensions: [
  //     '.js',
  //     '.json',
  //     '.jsx',
  //     '.mjs',
  //     '.ts',
  //     '.tsx',
  //     '.vue',
  //   ],
  // },
  // server: {
  //   port: 3000,
  // },
// })

