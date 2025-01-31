/** @format */
import { useState } from 'react';
// import { IoChevronUpSharp } from 'react-icons/io5';
// import { IoChevronDownSharp } from 'react-icons/io5';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components';

const CancelByRange = () => {
	const [driverNumber, setDriverNumber] = useState(0);
	const [date, setDate] = useState(new Date());

	return (
		<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
			{/* Header Section */}
			<h2 className='text-xl font-semibold text-gray-900 dark:text-gray-800'>
				Cancel Bookings By Date Range
			</h2>

			{/* Filter Inputs */}
			<div className='flex flex-wrap items-center gap-4 mt-4'>
				{/* Driver Number Selection */}
				<div className='flex flex-col'>
					{/* Account Number Label */}
					<label className='text-gray-800 dark:text-gray-300 text-sm font-medium mb-1'>
						Account Number
					</label>

					{/* Editable Input Box */}
					<input
						type='number'
						name='driverNumber'
						value={driverNumber}
						onChange={(e) => setDriverNumber(e.target.value)}
						className='input border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-44 text-sm font-semibold text-gray-600 dark:text-gray-800'
						placeholder='Enter Number'
					/>
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

						{/* Cancel Jobs Button */}
						<div className='flex justify-end'>
							<button
								type='submit'
								className='bg-green-700 hover:bg-green-900 text-sm text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all'
							>
								CANCEL JOBS
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { CancelByRange };
