import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    root: path.resolve(__dirname, 'frontend'),
    base: '/', 
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        enabled: true,
        reporter: ['text', 'html']
      }
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      rollupOptions: {
        input: {
          main: './index.html', // Path to index.html
          main_js: './src/main.js', // Path to main.js
          other_js: './src/main-spanish.js', // Path to main-spanish.js
        },
    }
  }
}
});
