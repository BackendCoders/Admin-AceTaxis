/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { KeenIcon } from '@/components';

const NewBooking = ({ items = [] }) => {
	// Handle the empty state
	if (!items.length) {
		return (
			<div className="text-center text-gray-500">
				New Booking
			</div>
		);
	}

	// Render a single item
	const renderItem = (item, index) => (
		<div key={index} className="card p-5 lg:px-7 lg:py-6">
			<div className="flex flex-col gap-2.5">
				{/* Icon */}
				<KeenIcon
					icon={item.icon || 'default-icon'}
					className="text-2xl text-primary mb-1.5"
				/>

				{/* Title and Description */}
				<div className="flex flex-col gap-3">
					<h3 className="text-base font-medium leading-none text-gray-900">
						{item.title || 'Default Title'}
					</h3>
					<div className="text-2sm text-gray-700 leading-5">
						{item.description || 'Default description'}
					</div>
				</div>

				{/* Sub Links */}
				<div className="flex items-center flex-wrap">
					{item.sub?.map((link, subIndex) => (
						<React.Fragment key={subIndex}>
							<Link
								to={link.path || '#'}
								className="text-2sm font-medium text-primary hover:text-primary mb-1"
							>
								{link.title || 'Default Link'}
							</Link>
							{/* Divider */}
							{subIndex < item.sub.length - 1 && (
								<span className="h-3.5 border-s border-s-gray-300 mx-2 mb-1"></span>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);

	// Render the grid of items
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
			{items.map((item, index) => renderItem(item, index))}
		</div>
	);
};

export { NewBooking };
