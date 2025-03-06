/** @format */
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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

	console.log(lastJourney);

	const groupedJourneys = lastJourney?.reduce((acc, journey) => {
		if (!acc[journey.userId]) {
			acc[journey.userId] = {
				driver: journey.identifier, // "3 - Bex Sims"
				color: journey.color, // Background color
				journeys: [],
			};
		}
		acc[journey.userId].journeys.push({
			date: new Date(journey.date).toLocaleString('en-GB'), // Format date
			from: journey.pickup,
			to: journey.destin,
			price: journey.price.toFixed(2),
		});
		return acc;
	}, {});

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
							<th className='border border-gray-300 px-4 text-start py-2'>
								<span className='ms-6'>Date</span>
							</th>
							<th className='border border-gray-300 text-start px-4 py-2'>
								<span className=''>Journey</span>
							</th>
							<th className='border border-gray-300 text-start px-4 py-2 w-28 whitespace-nowrap'>
								<span className=''>Price (£)</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(groupedJourneys).map(([driverId, driver]) => (
							<React.Fragment key={driverId}>
								<tr
									className='bg-gray-100 cursor-pointer'
									onClick={() => toggleDriver(driverId)}
								>
									<td
										colSpan='3'
										className='border border-gray-300 px-4 py-2 font-semibold'
									>
										<span className='-ms-1'>
											{expandedDrivers[driverId] ? (
												<KeyboardArrowDownIcon />
											) : (
												<KeyboardArrowRightIcon />
											)}{' '}
											Driver #: {driver.driver}
										</span>
									</td>
								</tr>
								{expandedDrivers[driverId] &&
									driver.journeys.map((journey, index) => (
										<tr
											key={index}
											className='border-t'
										>
											<td className='border border-gray-300 px-4 py-2'>
												<span className='ms-6'>{journey.date}</span>
											</td>
											<td className='border border-gray-300 px-4 py-2'>
												{journey.from} → {journey.to}
											</td>
											<td className='border border-gray-300 px-4 py-2'>
												£{journey?.price}
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
