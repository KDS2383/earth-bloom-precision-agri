// earth-bloom-precision-agri/src/main.tsx

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// --- START: CHANGES ---
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")!).render(
  // Wrap the entire App in BrowserRouter here
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// --- END: CHANGES ---