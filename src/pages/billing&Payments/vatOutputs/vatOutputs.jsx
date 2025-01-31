/** @format */

import { useState } from 'react';
import { IoChevronUpSharp, IoChevronDownSharp } from 'react-icons/io5';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components';

const VatOutputs = () => {
	const [dateRange, setDateRange] = useState({
		from: new Date(2025, 0, 31), // January 31, 2025
		to: new Date(2025, 0, 31), // Same default date
	});

	const DateRangePicker = ({ dateRange, setDateRange }) => (
		<div className='flex flex-col'>

			<Popover>
				<PopoverTrigger asChild>
					<button
						className={cn(
							'flex items-center gap-2 border px-4 py-2 rounded-md  transition-all',
							!dateRange && 'text-gray-400'
						)}
					>
						<KeenIcon
							icon='calendar'
							className='text-gray-600'
						/>
						{dateRange?.from ? (
							dateRange.to ? (
								<>
									{format(dateRange.from, 'dd/MM/yyyy')} →{' '}
									{format(dateRange.to, 'dd/MM/yyyy')}
								</>
							) : (
								format(dateRange.from, 'dd/MM/yyyy')
							)
						) : (
							<span>Pick a date range</span>
						)}
					</button>
				</PopoverTrigger>

				<PopoverContent
					className='w-auto p-2 shadow-md rounded-lg'
					align='end'
				>
					<Calendar
						mode='range'
						selected={dateRange}
						onSelect={setDateRange}
						numberOfMonths={2}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
	return (
		<div className='px-6 py-4 ms-auto me-auto max-w-[1580px] w-full'>
			{/* Header Section */}
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-700'>
			Calculate VAT on Commission
			</h2>

			{/* Filter Inputs */}
			<div className='flex flex-wrap items-center gap-6 mt-4'>

				{/* Date Range Picker */}
				<div className='flex flex-col'>
					<label className='text-gray-800 dark:text-gray-300 text-sm font-medium mb-1'>
					Select date range to calculate VAT
					</label>

					<DateRangePicker
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				</div>

				<button className="btn btn-primary flex justify-center">CREATE CSV FILE</button>
			</div>
		</div>
	);
};

export { VatOutputs };
