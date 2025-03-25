/** @format */

// Import necessary modules and components
import { useEffect, useState } from 'react'; // Hook for side effects like updating the DOM
import { BrowserRouter } from 'react-router-dom'; // Provides routing functionality for the app
import { useSettings } from '@/providers/SettingsProvider'; // Custom hook to access app settings
import { AppRouting } from '@/routing'; // Component that defines app routes
import { PathnameProvider } from '@/providers'; // Custom provider for managing the current pathname
import { getFirebaseToken, onForegroundMessage } from './firebase';
import toast from 'react-hot-toast';
// import { Toaster } from '@/components/ui/sonner'; // Toaster for displaying notifications/toasts
// import {
// 	getFirebaseToken,
// 	onForegroundMessage,
// } from './hooks/useNotifications';
// import toast from 'react-hot-toast';

// Import environment variable for the app's base URL
const { BASE_URL } = import.meta.env;

// Main App Component
const App = () => {
	// Destructure `settings` object from custom `useSettings` hook
	const { settings } = useSettings();
	const [notificationPermission, setNotificationPermission] = useState(
		Notification.permission
	);
	// Side effect to update the `themeMode` class on the root HTML element
	useEffect(() => {
		// Remove existing theme classes (light/dark) from the document
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.remove('light');

		// Add the current theme mode (light or dark) to the document
		document.documentElement.classList.add(settings.themeMode);
	}, [settings]); // Re-run the effect whenever `settings` changes

	useEffect(() => {
		// 🔔 Foreground Messages Listen Karega
		const unsubscribe = onForegroundMessage((payload) => {
			console.log('Foreground Notification:', payload);
			const { title, body } = payload.notification;
			toast(`${title}: ${body}`);
		});

		return () => unsubscribe();
	}, []);

	const requestPermission = async () => {
		const permission = await Notification.requestPermission();
		setNotificationPermission(permission);
		if (permission === 'granted') {
			await getFirebaseToken();
		} else {
			console.warn('Notification permission denied.');
		}
	};

	// Return the app's main structure
	return (
		<BrowserRouter
			basename={BASE_URL} // Sets the base URL for routing (useful for deploying to subdirectories)
			future={{
				v7_relativeSplatPath: true, // Enables React Router v7 experimental feature for relative splat matching
				v7_startTransition: true, // Enables React Router v7 experimental feature for start transitions
			}}
		>
			{notificationPermission === 'default' && (
				<button onClick={requestPermission}>Enable Notifications</button>
			)}
			{/* Custom provider for managing pathname state */}
			<PathnameProvider>
				{/* Handles app routing by rendering pages based on the URL */}
				<AppRouting />
			</PathnameProvider>

			{/* Toast notifications for showing alerts/messages */}
			{/* <Toaster /> */}
		</BrowserRouter>
	);
};

export { App }; // Export the App component for use in index.js or elsewhere
