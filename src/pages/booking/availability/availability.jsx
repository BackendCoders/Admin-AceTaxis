/** @format */

import { useState } from 'react';
import { AvailabilityTable } from './availability-table';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components';

const Availability = () => {
	const [selectedOption, setSelectedOption] = useState('Custom');
	const [date, setDate] = useState(new Date());

	const availabilityData = [
		{ type: 'Available', driver: 1, details: '07:30 - 09:15 (AM SR)' },
		{ type: 'Available', driver: 1, details: '14:30 - 16:15 (PM SR)' },
	];

	return (
		<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
			{/* Header Section */}
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold'>Availability</h2>
				<select className='border p-2 rounded-md'>
					<option>All</option>
				</select>
			</div>

			{/* Date & Unavailable Button */}
			<div className='flex justify-between items-center mt-4'>
				<Popover>
					<PopoverTrigger asChild>
						<button
							id='date'
							className={cn(
								'input data-[state=open]:border-primary',
								!date && 'text-muted-foreground'
							)}
							style={{ width: '13rem' }}
						>
							<KeenIcon
								icon='calendar'
								className='-ms-0.5'
							/>
							{date ? format(date, 'LLL dd, y') : <span>Pick a date</span>}
						</button>
					</PopoverTrigger>
					<PopoverContent
						className='w-auto p-0'
						align='start'
					>
						<Calendar
							initialFocus
							mode='single' // Single date selection
							defaultMonth={date}
							selected={date}
							onSelect={setDate}
							numberOfMonths={1}
						/>
					</PopoverContent>
				</Popover>
				<button
					className='bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium tracking-wide 
  hover:bg-red-600 transition-all duration-300'
				>
					UNAVAILABLE (ALL DAY)
				</button>
			</div>

			{/* Swap Buttons */}
			<div className='grid grid-cols-4 gap-2 mt-4 border border-gray-300 dark:border-gray-200 rounded-md overflow-hidden'>
				{['Custom', 'SR AM Only', 'SR PM Only', 'SR Only'].map((option) => (
					<button
						key={option}
						onClick={() => setSelectedOption(option)}
						className={`relative text-center py-2 text-sm font-medium transition-all duration-300
        ${
					selectedOption === option
						? 'text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
						: 'text-gray-700 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
				}`}
					>
						{option}

						{/* Active Tab - Blue Underline */}
						{selectedOption === option && (
							<div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 dark:bg-blue-400 transition-all duration-300'></div>
						)}
					</button>
				))}
			</div>

			{/* Availability Section */}
			<div className='mt-6 p-4 text-gray rounded-md'>
				<h3 className='font-semibold flex items-center justify-center'>
					📅 AVAILABILITY
				</h3>
			</div>

			{/* Conditionally Show Form or Table */}
			{selectedOption === 'Custom' ? (
				// Custom Option: Show Form
				<div className='p-4 mt-2 border rounded-md shadow-md'>
					<p className='font-medium'>MY AVAILABILITY: 28/01/25</p>

					{/* Time Inputs */}
					<div className='grid grid-cols-2 gap-4 mt-3'>
						{/* From Time Input */}
						<div className='flex flex-col'>
							<label className='text-gray-900 dark:text-gray-600 text-sm font-medium mb-1'>
								From
							</label>
							<input
								type='time'
								className='border border-gray-400 dark:border-gray-200 p-2 rounded-md w-full 
      text-gray-500 dark:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-transparent'
							/>
						</div>

						{/* To Time Input */}
						<div className='flex flex-col'>
							<label className='text-gray-900 dark:text-gray-600 text-sm font-medium mb-1'>
								To
							</label>
							<input
								type='time'
								className='border border-gray-400 dark:border-gray-200 p-2 rounded-md w-full 
      text-gray-500 dark:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-transparent'
							/>
						</div>
					</div>

					{/* Note Input */}
					<div className='mt-3'>
						<label className='text-gray-900 dark:text-gray-600 text-sm font-medium mb-1'>
							Note
						</label>
						<textarea
							className='border border-gray-400 dark:border-gray-200 p-2 mt-1 w-full rounded-md
      text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-transparent'
							placeholder='e.g., Locals Only..'
						></textarea>
					</div>

					{/* Buttons */}
					<div className='flex justify-between mt-4 gap-4'>
						<button
							className='bg-green-700 text-white px-6 py-2 rounded-lg w-full text-sm font-semibold tracking-wide
      hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300'
						>
							ADD AVAILABLE HOURS
						</button>
						<button
							className='bg-red-700 text-white px-6 py-2 rounded-lg w-full text-sm font-semibold tracking-wide
      hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-300'
						>
							ADD UNAVAILABLE HOURS
						</button>
					</div>

					{/* Availability Table */}
					<div className='mt-4'>
						<table className='w-full border-collapse border border-gray-300 shadow-md'>
							<thead>
								<tr className='shadow-md text-gray-900'>
									<th className='p-3 border'>Type</th>
									<th className='p-3 border'>Driver #</th>
									<th className='p-3 border'>Details</th>
									<th className='p-3 border'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{availabilityData.map((item, index) => (
									<tr
										key={index}
										className='text-gray-900'
									>
										<td className='p-3 border text-center'>{item.type}</td>
										<td className='p-3 border text-center'>{item.driver}</td>
										<td className='p-3 border text-center'>{item.details}</td>
										<td className='p-3 border text-center'>
											<button className='text-red-500'>🗑️</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				// Table for other options
				<div className='overflow-x-auto'>
					<p className='font-medium'>MY AVAILABILITY: 28/01/25</p>
					<table className='w-full border-collapse border border-gray-300'>
						<thead>
							<tr className='bg-gray-200 text-gray-900'>
								<th className='p-3 border'>Type</th>
								<th className='p-3 border'>Driver #</th>
								<th className='p-3 border'>Details</th>
								<th className='p-3 border'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{availabilityData.map((item, index) => (
								<tr
									key={index}
									className=' text-gray-900'
								>
									<td className='p-3 border text-center'>{item.type}</td>
									<td className='p-3 border text-center'>{item.driver}</td>
									<td className='p-3 border text-center'>{item.details}</td>
									<td className='p-3 border text-center'>
										<button className='text-red-500'>🗑️</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* No Availability Message */}
			<div className='mt-4 mb-5 p-4 bg-blue-100  text-blue-800 rounded-md text-center'>
				ℹ️ No Availability
			</div>

			{/* Table */}
			<AvailabilityTable />
		</div>
	);
};

export { Availability };
