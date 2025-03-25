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

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/firebase-messaging-sw.js')
		.then((registration) => {
			console.log('Service Worker Registered:', registration);
		})
		.catch((err) => {
			console.error('Service Worker Registration Failed:', err);
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
