/** @format */


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeenIcon } from '@/components';

const BookingDispatch = () => {
	// Handle the empty state

	const [url, setUrl] = useState('https://devacetaxisdorset.vercel.app/'); // Default URL
	
		return (
			<div className="">
				<iframe
					src={url}
					title="Booking Dispatch Iframe"
					className="w-full max-w-8xl h-[850px] border border-gray-300 rounded-lg shadow-lg"
				></iframe>
			</div>
		);
	}


export { BookingDispatch };

