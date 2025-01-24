/** @format */


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeenIcon } from '@/components';

const BookingDispatch = () => {
	// Handle the empty state

	const [url, setUrl] = useState('https://devacetaxisdorset.vercel.app/'); // Default URL
	
		return (
			<div>
				<iframe
					src={url}
					title="Booking Dispatch Iframe"
					className="w-full h-[900px] bg-white "
				></iframe>
			</div>
		);
	}


export { BookingDispatch };

