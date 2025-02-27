/** @format */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// const journeyData = [
// 	{
// 		driver: 'Kate Hall',
// 		driverId: 2,
// 		journeys: [
// 			{
// 				date: '04/08/2024 08:00:00',
// 				from: 'Holland Farm, South Brewham, Somerset',
// 				to: 'Heathrow Airport Terminal 5',
// 				price: 200.0,
// 			},
// 			{
// 				date: '19/08/2024 14:00:00',
// 				from: 'Farm Cottage, South Street, Wincanton, Somerset',
// 				to: 'Bristol Airport',
// 				price: 135.0,
// 			},
// 			{
// 				date: '20/08/2024 11:00:00',
// 				from: 'Thornhill house, Thornhill, Stalbridge, Sturminster Newton, Dorset',
// 				to: 'Heathrow Airport Terminal 5',
// 				price: 245.0,
// 			},
// 			{
// 				date: '09/09/2024 11:20:00',
// 				from: 'Greenfield Farmhouse West Knoyle, Warminster, Wiltshire',
// 				to: 'Bristol Airport',
// 				price: 126.0,
// 			},
// 		],
// 	},
// 	{
// 		driver: 'Alan Waistell',
// 		driverId: 10,
// 		journeys: [
// 			{
// 				date: '10/10/2024 09:00:00',
// 				from: 'Huntingford Coach, Huntingford, Gillingham, Dorset',
// 				to: 'Gatwick Airport North Terminal',
// 				price: 265.0,
// 			},
// 		],
// 	},
// 	{
// 		driver: 'Alan',
// 		driverId: 11,
// 		journeys: [
// 			{
// 				date: '10/10/2024 09:00:00',
// 				from: 'Huntingford Coach, Huntingford, Gillingham, Dorset',
// 				to: 'Gatwick Airport North Terminal',
// 				price: 265.0,
// 			},
// 		],
// 	},
// ];

const Tablejourney = () => {
	const [expandedDrivers, setExpandedDrivers] = useState({});
	const { lastJourney } = useSelector((state) => state.booking);

	const toggleDriver = (driverId) => {
		setExpandedDrivers((prev) => ({
			...prev,
			[driverId]: !prev[driverId],
		}));
	};

	return (
		<div className='container mx-auto mt-5'>
			<h2 className='text-xl font-bold mb-3'>Airport Journeys - 1 Month</h2>
			{lastJourney?.length > 0 ? (
				<table className='w-full border-collapse border border-gray-300'>
					<thead>
						<tr>
							<th className='border border-gray-300 px-4 py-2'>Date</th>
							<th className='border border-gray-300 px-4 py-2'>Journey</th>
							<th className='border border-gray-300 px-4 py-2'>Price (£)</th>
						</tr>
					</thead>
					<tbody>
						{lastJourney.map((driver) => (
							<React.Fragment key={driver.driverId}>
								<tr
									className='bg-gray-100 cursor-pointer'
									onClick={() => toggleDriver(driver.driverId)}
								>
									<td
										colSpan='3'
										className='border border-gray-300 px-4 py-2 font-semibold'
									>
										{expandedDrivers[driver.driverId] ? '▼' : '▶'} Driver #:{' '}
										{driver.driverId} - {driver.driver}
									</td>
								</tr>
								{expandedDrivers[driver.driverId] &&
									driver.journeys.map((journey, index) => (
										<tr
											key={index}
											className='border-t'
										>
											<td className='border border-gray-300 px-4 py-2'>
												{journey.date}
											</td>
											<td className='border border-gray-300 px-4 py-2'>
												{journey.from} → {journey.to}
											</td>
											<td className='border border-gray-300 px-4 py-2'>
												{journey.price.toFixed(2)}
											</td>
										</tr>
									))}
							</React.Fragment>
						))}
					</tbody>
				</table>
			) : (
				<div className='p-3 text-center text-gray-500 dark:text-gray-400'>
					No journeys available
				</div>
			)}
		</div>
	);
};

export { Tablejourney };
