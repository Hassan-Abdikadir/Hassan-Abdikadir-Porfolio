import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  esbuild: {
    // Drop all debugging logs in production for maximum performance & cleanliness
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    reportCompressedSize: false,
    assetsInlineLimit: 4096, // Inline small assets (<4KB) to avoid HTTP request overhead
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          ui: ['react-toastify', 'react-icons', 'lucide-react'],
          telemetry: ['react-countup'],
        }
      }
    }
  }
})
