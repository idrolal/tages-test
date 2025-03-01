import { defineConfig, loadEnv } from 'vite';
import { URL, fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  
  const config = {
    base: 'tages-test',
    plugins: [vue()],
    server: {
      port: 3000,
    },
    preview: {
      port: 3001,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
  return config;
});
