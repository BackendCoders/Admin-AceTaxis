/** @format */

import { useEffect } from 'react';

const BookingDispatch = () => {
	const url = import.meta.env.VITE_IFRAME_URL;
	const token = localStorage.getItem('authToken');
	const username = localStorage.getItem('username');
	const userData = localStorage.getItem('userData');

	useEffect(() => {
		const iframe = document.getElementById('bookingDispatch');

		// Check if iframe exists and send token once iframe loads
		if (iframe) {
			iframe.onload = () => {
				iframe.contentWindow.postMessage({ token, username, userData }, url); // Send token to iframe
			};
		}
	}, [url, token, username, userData]);

	return (
		<div>
			<iframe
				id='bookingDispatch'
				src={url}
				title='Booking Dispatch Iframe'
				className='w-full h-[900px] bg-white '
			></iframe>
		</div>
	);
};

export { BookingDispatch };
