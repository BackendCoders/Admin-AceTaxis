/** @format */

self.addEventListener('push', (event) => {
	const data = event.data
		? event.data.json()
		: { title: 'Admin Alert', body: 'New update available!' };
	const options = {
		body: data.body,
		icon: '/icon.png', // Optional: Ensure this file exists in /public
		badge: '/badge.png', // Optional: Ensure this file exists in /public
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
	event.notification.close();
	// Use self.clients to access the Clients interface
	event.waitUntil(self.clients.openWindow('/'));
});
