import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/supermercado/', // Ajuste conforme o nome do repositório 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
