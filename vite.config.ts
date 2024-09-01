import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 使用 proxy 实例
      '/api': {
        // target: 'http://10.43.92.52:5275', // 公司
        target: 'http://localhost:5275', // 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/'),
      },
    }
  }
});
