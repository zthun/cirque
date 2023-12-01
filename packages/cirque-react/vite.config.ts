import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths()],
  server: {
    host: '0.0.0.0',
    strictPort: true
  }
});
