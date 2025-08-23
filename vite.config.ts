import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content.ts')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    lib: {
      entry: resolve(__dirname, 'src/content.ts'),
      formats: ['iife'],
      name: 'ContentScript'
    }
  },
  define: {
    'process.env': {}
  }
})