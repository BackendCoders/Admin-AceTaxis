/** @format */

const BookingDispatch = () => {
	const url = import.meta.env.VITE_IFRAME_URL;

	return (
		<div>
			<iframe
				src={url}
				title='Booking Dispatch Iframe'
				className='w-full h-[900px] bg-white '
			></iframe>
		</div>
	);
};

export { BookingDispatch };
