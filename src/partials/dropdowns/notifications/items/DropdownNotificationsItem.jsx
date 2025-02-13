/** @format */

import { Link } from 'react-router-dom';
import { KeenIcon } from '@/components';

const DropdownNotificationsItem = ({ notification, markAsRead }) => {
	const { id, dateTimeStamp, message, event, status } = notification;

	// Extract user and document type from the message
	const extractDetails = (msg) => {
		if (event === 2)
			return {
				userName: 'Web Booking',
				docType: '',
				docPath: '',
				msg: message,
			};
		const regex =
			/New Document Upload From '(.+?)'\s+Doc Type: (.+?)\s+Path: <a href="(.+?)"/;
		const match = msg.match(regex);

		if (match) {
			return {
				userName: match[1],
				docType: match[2],
				docPath: match[3],
			};
		}
		return { userName: 'Unknown', docType: 'Unknown', docPath: '', msg: '' };
	};

	const { userName, docType, docPath, msg } = extractDetails(message);

	return (
		<div className='flex gap-3 px-5 py-2 border-b border-gray-200'>
			<div className='relative shrink-0 mt-0.5'>
				<KeenIcon
					icon='notification-on'
					className='size-6 text-primary'
				/>
			</div>

			<div className='flex flex-col gap-2 w-full'>
				<div className='text-sm font-medium text-gray-900'>
					<Link
						to='#'
						className='hover:text-primary-active font-semibold'
					>
						{userName}
					</Link>{' '}
					{event === 2 ? '' : 'uploaded a new document: '}
					<span className='text-primary'>{docType}</span>
				</div>
				<div className='text-xs text-gray-500'>
					{new Date(dateTimeStamp).toLocaleString()}
				</div>
				<div className='text-xs text-gray-600'>
					{event === 2 && <span>{msg}</span>}
				</div>

				{/* Extract and render document link */}
				<div className='flex gap-3 mt-2'>
					{/* View Document Button (if docPath exists) */}
					{docPath && (
						<a
							href={docPath}
							target='_blank'
							rel='noopener noreferrer'
							className='btn btn-sm btn-primary'
						>
							View Document
						</a>
					)}

					{event === 2 && (
						<Link to='/bookings/web-booking'>
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
