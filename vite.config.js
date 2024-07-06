import { resolve } from 'path';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig({
    root: resolve(__dirname, './'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    publicDir: resolve(__dirname, 'static'),
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
        extensions: ['.ts', '.js', '.json', '.jsx', '.mjs'],
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@import "@/path/to/your/variables";`
                additionalData: `@import "@/variables.scss";`,
            },
        },
    },
});
