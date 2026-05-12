import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  
  // Development server settings (only used with npm run dev)
  server: {
    host: '0.0.0.0',
    port: 1122,
    open: true,
  },
  
  // Production build settings
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to true if you want source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  
  // Base URL for your site (important for deployment)
  base: '/', // Change if deploying to a subdirectory like '/my-app/'
});