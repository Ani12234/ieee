import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
    react(),
    visualizer({
      filename: './stats.html',
      open: true,
      brotliSize: true,
    }),
    ViteImageOptimizer({
      png: {
        quality: 75,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 75,
      },
    }),
  ],
})
