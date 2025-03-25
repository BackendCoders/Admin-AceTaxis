/** @format */

import '@/components/keenicons/assets/styles.css';
import './styles/globals.css';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './App'; // Changed to default import
import { setupAxios } from './auth';
import { ProvidersWrapper } from './providers';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { Toaster } from 'react-hot-toast';

/**
 * Inject interceptors for axios.
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios);

const store = configureStore({
  reducer: rootReducer,
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js', { scope: '/' })
    .then((registration) => {
      console.log('Service Worker Registered:', registration);
    })
    .catch((err) => {
      console.error('Service Worker Registration Failed:', err);
    });
} else {
  console.warn('Service Worker not supported in this browser.');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvidersWrapper>
      <Provider store={store}>
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </Provider>
    </ProvidersWrapper>
  </React.StrictMode>
);