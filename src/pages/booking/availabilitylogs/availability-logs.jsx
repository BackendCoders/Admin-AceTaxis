/** @format */
import { useState } from 'react';
import { IoChevronUpSharp } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components';

const AvailabilityLogs = () => {
	const [driverNumber, setDriverNumber] = useState(0);
	const [date, setDate] = useState(new Date());

	return (
		<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
			{/* Header Section */}
			<h2 className='text-lg font-semibold text-gray-900 dark:text-gray-700'>
				Change Log of Availability #: {driverNumber}
			</h2>

			{/* Filter Inputs */}
			<div className='flex flex-wrap items-center gap-4 mt-4'>
				{/* Driver Number Selection */}
				<div className='flex flex-col'>
					{/* Improved Label Styling */}
					<label className='text-gray-800 dark:text-gray-300 text-sm font-medium mb-1'>
						Driver Number
					</label>

					<div className='flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-2'>
						<span className='px-6 text-lg font-semibold text-gray-600 dark:text-gray-500'>
							{driverNumber}
						</span>

						{/* Buttons placed vertically */}
						<div className='flex flex-col'>
							<button
								className='px-3 py-0.5 rounded-t-md hover:bg-gray-200  transition-all'
								onClick={() => setDriverNumber(driverNumber + 1)}
							>
								<IoChevronUpSharp />
							</button>
							<button
								className='px-3 py-0.5 rounded-b-md hover:bg-gray-200  transition-all'
								onClick={() => setDriverNumber(Math.max(0, driverNumber - 1))}
							>
								<IoChevronDownSharp  />
							</button>
						</div>
					</div>
				</div>

				{/* Date Picker */}
				<div className='flex flex-col gap-1'>
					{/* Added Label for Date Picker */}
					<label
						htmlFor='date'
						className='text-gray-800 dark:text-gray-300 text-sm font-medium'
					>
						Date
					</label>

					<div className='flex items-center gap-2 relative'>
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
					</div>
				</div>
			</div>

			{/* No Availability Message */}
			<div className='mt-4 p-4 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md text-center text-sm font-medium'>
				ℹ️ No Availability
			</div>
		</div>
	);
};

export { AvailabilityLogs };
