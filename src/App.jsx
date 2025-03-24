/** @format */

// Import necessary modules and components
import { useEffect } from 'react'; // Hook for side effects like updating the DOM
import { BrowserRouter } from 'react-router-dom'; // Provides routing functionality for the app
import { useSettings } from '@/providers/SettingsProvider'; // Custom hook to access app settings
import { AppRouting } from '@/routing'; // Component that defines app routes
import { PathnameProvider } from '@/providers'; // Custom provider for managing the current pathname
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
	// Side effect to update the `themeMode` class on the root HTML element
	useEffect(() => {
		// Remove existing theme classes (light/dark) from the document
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.remove('light');

		// Add the current theme mode (light or dark) to the document
		document.documentElement.classList.add(settings.themeMode);
	}, [settings]); // Re-run the effect whenever `settings` changes

	// useEffect(() => {
	// 	onForegroundMessage()
	// 		.then((payload) => {
	// 			console.log('Received foreground message: ', payload);
	// 			const {
	// 				notification: { title, body },
	// 			} = payload;
	// 			toast(`${title} - ${body}`);
	// 		})
	// 		.catch((err) =>
	// 			console.log(
	// 				'An error occured while retrieving foreground message. ',
	// 				err
	// 			)
	// 		);
	// }, []);

	// const handleGetFirebaseToken = () => {
	// 	getFirebaseToken()
	// 		.then((firebaseToken) => {
	// 			console.log('Firebase token: ', firebaseToken);
	// 			if (firebaseToken) {
	// 				console.log(firebaseToken);
	// 			}
	// 		})
	// 		.catch((err) =>
	// 			console.error('An error occured while retrieving firebase token. ', err)
	// 		);
	// };

	// useEffect(() => {
	// 	handleGetFirebaseToken();
	// }, []);

	// Return the app's main structure
	return (
		<BrowserRouter
			basename={BASE_URL} // Sets the base URL for routing (useful for deploying to subdirectories)
			future={{
				v7_relativeSplatPath: true, // Enables React Router v7 experimental feature for relative splat matching
				v7_startTransition: true, // Enables React Router v7 experimental feature for start transitions
			}}
		>
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
