/** @format */

import { useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const applicationServerPublicKey = 'YOUR_PUBLIC_VAPID_KEY_HERE'; // Replace with your VAPID public key

// Utility to convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

export const useNotifications = () => {
	const requestPermissionAndSubscribe = useCallback(async () => {
		// Check if notifications are supported
		if (!('Notification' in window)) {
			toast.error('This browser does not support notifications.');
			return;
		}

		try {
			// Request permission
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') {
				toast.error('Notification permission denied.');
				return;
			}

			// Get service worker registration
			const registration = await navigator.serviceWorker.ready;

			// Check if already subscribed
			const existingSubscription =
				await registration.pushManager.getSubscription();
			if (existingSubscription) {
				toast.success('Notifications already enabled!');
				return;
			}

			// Subscribe to push notifications
			const subscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(applicationServerPublicKey),
			});

			// Send subscription to backend
			await axios.post(
				`${import.meta.env.VITE_BASE_URL}/api/subscribe`,
				subscription,
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			toast.success('Notifications enabled successfully!');
		} catch (error) {
			console.error('Failed to enable notifications:', error);
			toast.error('Failed to enable notifications. Please try again.');
		}
	}, []);

	return { requestPermissionAndSubscribe };
};
