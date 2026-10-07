import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App';
import { markLoaded } from './utils/loadState';
import { initSmoothScroll } from './utils/smoothScroll';

initSmoothScroll();

document.fonts.ready.then(() => markLoaded('fonts'));
if (document.readyState === 'complete') markLoaded('window');
else window.addEventListener('load', () => markLoaded('window'), { once: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
