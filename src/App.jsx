/** @format */

// Import necessary modules and components
import { useCallback, useEffect } from 'react'; // Hook for side effects like updating the DOM
import { BrowserRouter } from 'react-router-dom'; // Provides routing functionality for the app
import { useSettings } from '@/providers/SettingsProvider'; // Custom hook to access app settings
import { AppRouting } from '@/routing'; // Component that defines app routes
import { PathnameProvider } from '@/providers'; // Custom provider for managing the current pathname
import { getFirebaseToken, onForegroundMessage } from './firebase';
import toast from 'react-hot-toast';

// Import environment variable for the app's base URL
const { BASE_URL } = import.meta.env;

// Main App Component
const App = () => {
	const { settings } = useSettings();

	// Side effect to update the `themeMode` class on the root HTML element
	useEffect(() => {
		// Remove existing theme classes (light/dark) from the document
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.remove('light');

		// Add the current theme mode (light or dark) to the document
		document.documentElement.classList.add(settings.themeMode);
	}, [settings]); // Re-run the effect whenever `settings` changes

	// Handle foreground notifications
	useEffect(() => {
		const unsubscribe = onForegroundMessage((payload) => {
			if (payload?.notification) {
				const { title, body } = payload.notification;
				toast(`🔔${title}: ${body}`);
			}
		});

		return () => unsubscribe && unsubscribe();
	}, []);

	// Request notification permission (memoized)
	const requestPermission = useCallback(async () => {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') await getFirebaseToken();
	}, []);

	useEffect(() => {
		requestPermission();
	}, []);

	// Return the app's main structure
	return (
		<BrowserRouter
			basename={BASE_URL} // Sets the base URL for routing (useful for deploying to subdirectories)
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
