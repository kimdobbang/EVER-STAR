// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Store } from './store/Store';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={Store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
serviceWorkerRegistration.register();
