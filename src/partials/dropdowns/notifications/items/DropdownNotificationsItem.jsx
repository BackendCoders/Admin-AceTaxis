/** @format */

import { Link } from 'react-router-dom';
import { KeenIcon } from '@/components';

const DropdownNotificationsItem = ({ notification, markAsRead }) => {
	const { id, dateTimeStamp, message, event, status } = notification;

	// Extract user and document type from the message
	const extractDetails = (msg) => {
		const driverMatch = msg.match(/Driver '(.+?)'/);
		const driverName = driverMatch ? driverMatch[1] : 'Unknown Driver';

		// Extract Booking Number
		const bookingMatch = msg.match(/Booking #:\s*(\d+)/);
		const bookingNumber = bookingMatch ? bookingMatch[1] : 'N/A';

		let heading = 'Notification';
		if (event === 3) heading = 'New Booking Request';
		else if (event === 4) heading = 'Amendment Request';
		else if (event === 5) heading = 'Cancellation Request';
		else if (event === 1)
			heading = (
				<>
					<span className='text-blue-600'>{driverName}</span> Rejected{' '}
					<span className='text-red-600'>Booking #{bookingNumber}</span>
				</>
			);
		else if (event === 2)
			heading = (
				<>
					<span className='text-blue-600'>{driverName}</span> Didn&apos;t
					Respond (Timeout) for{' '}
					<span className='text-red-600'>Booking #{bookingNumber}</span>
				</>
			);

		return { driverName, bookingNumber, heading };
	};

	const { heading } = extractDetails(message);

	return (
		<div className='flex gap-3 px-5 py-2 border-b border-gray-200'>
			<div className='relative shrink-0 mt-0.5'>
				<KeenIcon
					icon='notification-on'
					className='size-6 text-primary'
				/>
			</div>

			<div className='flex flex-col gap-2 w-full'>
				<div className='text-sm font-bold text-gray-900'>{heading}</div>
				{/* <div className='text-sm font-medium text-gray-900'>
					<Link
						to='#'
						className='hover:text-primary-active font-semibold'
					>
						{userName}
					</Link>{' '}
					{event === 2 ? '' : 'uploaded a new document: '}
					<span className='text-primary'>{docType}</span>
				</div> */}
				<div className='text-xs text-gray-500'>
					{new Date(dateTimeStamp).toLocaleString('en-gb')}
				</div>
				{/* <div className='text-xs text-gray-600'>
					{(event === 3 || event === 4 || event === 5) && <span>{msg}</span>}
				</div> */}

				{/* Extract and render document link */}
				<div className='flex gap-3 mt-2'>
					{/* View Document Button (if docPath exists) */}
					{/* {docPath && (
						<a
							href={docPath}
							target='_blank'
							rel='noopener noreferrer'
							className='btn btn-sm btn-primary'
						>
							View Document
						</a>
					)} */}

					{(event === 3 || event === 4 || event === 5) && (
						<Link
							to={`${event === 3 ? '/bookings/web-booking' : '/bookings/amend-booking'}`}
						>
							<button className='btn btn-sm btn-primary'>View Bookings</button>
						</Link>
					)}

					{/* Mark as Read Button (if unread) */}
					{status === 0 && (
						<button
							onClick={() => markAsRead(id)}
							className='btn btn-sm btn-secondary'
						>
							Mark as Read
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export { DropdownNotificationsItem };
