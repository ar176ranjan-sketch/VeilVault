import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

// Force Rollup to include WASM bindings by importing for side-effects
import '@midnight-ntwrk/ledger-v8';
import '@midnight-ntwrk/onchain-runtime-v3';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
