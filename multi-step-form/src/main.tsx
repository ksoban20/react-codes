import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import App from './App.tsx';
import { Dialog } from './components/Dialog.tsx';

import './assets/styles/style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Dialog />
      <App />
    </Provider>
  </React.StrictMode>
);
