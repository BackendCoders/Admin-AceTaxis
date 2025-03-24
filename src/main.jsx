/** @format */

import '@/components/keenicons/assets/styles.css';
import './styles/globals.css';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { setupAxios } from './auth';
import { ProvidersWrapper } from './providers';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { Toaster } from 'react-hot-toast';

/**
 * Inject interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios);
const store = configureStore({
	reducer: rootReducer,
});

// Register service worker only
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) =>
				console.log('Service Worker registered:', registration)
			)
			.catch((error) =>
				console.error('Service Worker registration failed:', error)
			);
	});
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ProvidersWrapper>
			<Provider store={store}>
				<App />
				<Toaster />
			</Provider>
		</ProvidersWrapper>
	</React.StrictMode>
);
