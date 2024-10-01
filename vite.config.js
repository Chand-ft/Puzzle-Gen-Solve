import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://numberwordgenerator20240927020628.azurewebsites.net', // External API base URL
        changeOrigin: true, // Make sure the origin header is correctly set
        secure: true, // Ensure HTTPS is handled properly
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove the `/api` prefix when forwarding the request
      },
    },
  },
});
