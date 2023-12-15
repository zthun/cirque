import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    sourcemap: true
  },
  plugins: [externalizeDeps(), dts({ tsconfigPath: 'tsconfig.prod.json' })]
});
