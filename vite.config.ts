import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [viteSingleFile()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    minify: 'esbuild',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
})
