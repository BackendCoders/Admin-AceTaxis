/** @format */

import { useEffect } from 'react';

const BookingDispatch = () => {
	const url = import.meta.env.VITE_IFRAME_URL;
	const token = localStorage.getItem('authToken');
	const user = localStorage.getItem('user');

	useEffect(() => {
		const iframe = document.getElementById('bookingDispatch');

		// Check if iframe exists and send token once iframe loads
		if (iframe) {
			iframe.onload = () => {
				iframe.contentWindow.postMessage({ token, user }, url); // Send token to iframe
			};
		}
	}, [url, token, user]);

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
