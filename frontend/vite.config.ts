import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    {
      name: 'fix-wasm-namespace-bug',
      renderChunk(code, chunk) {
        if (code.includes('__wbg_set_wasm(wasm);')) {
          console.log(`[fix-wasm-namespace-bug] Patched __wbg_set_wasm in ${chunk.fileName}`);
          return code.replace('__wbg_set_wasm(wasm);', '__wbg_set_wasm(__vite__wasmModule);');
        }
        return null;
      }
    }
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'midnight-ledger': ['@midnight-ntwrk/ledger-v8'],
          'midnight-onchain': ['@midnight-ntwrk/onchain-runtime-v3']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['@midnight-ntwrk/ledger-v8'],
  },
});
