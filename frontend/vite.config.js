import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    root: './',
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        enabled: true,
        reporter: ['text', 'html']
      }
    },
    build: {
      outDir: '../dist', 
      rollupOptions: {
        input: {
          main: './index.html',
        },
    }
  }
}
});
