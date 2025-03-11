import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "", // 👈 Asegúrate de que esto esté vacío o con "./" si sigue fallando
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  server: {
    host: true
  }
});
