/** @format */

import { useState } from 'react';
// import { IoChevronUpSharp, IoChevronDownSharp } from 'react-icons/io5';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components';
import { getVATOutputs } from '../../../service/operations/billing&Payment';
import toast from 'react-hot-toast';

const VatOutputs = () => {
	const [dateRange, setDateRange] = useState({
		from: new Date(), // January 31, 2025
		to: new Date(), // Same default date
	});

	const handleClick = async (e) => {
		e.preventDefault();

		if (!dateRange.from || !dateRange.to || dateRange.from > dateRange.to) {
			toast.error('Invalid date range selected.');
			return;
		}

		try {
			const payload = {
				start: format(dateRange.from, 'yyyy-MM-dd'),
				end: format(dateRange.to, 'yyyy-MM-dd'),
			};
			const response = await getVATOutputs(payload);
			if (response.status === 'success') {
				delete response.status;
				const csvString = Object.values(response).join('');

				// ✅ Create a Blob object with CSV data
				const blob = new Blob([csvString], { type: 'text/csv' });

				// ✅ Create a temporary download link
				const downloadLink = document.createElement('a');
				downloadLink.href = URL.createObjectURL(blob);
				downloadLink.setAttribute('download', 'VAT_Output.csv'); // Force download
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink); // Cleanup after download

				toast.success('CSV Created & Downloaded Successfully!');
			}
		} catch (error) {
			console.error('Failed to fetch VAT outputs:', error);
		}
		// do something when the button is clicked
	};

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
			<h2 className='text-xl leading-none font-medium text-gray-900 mb-2'>
				Calculate VAT on Commission
			</h2>
			<h5 className='flex items-center text-gray-700 text-sm font-normal mb-1'>
				Select date range to calculate VAT
			</h5>

			{/* Filter Inputs */}
			<div className='flex flex-wrap items-center gap-6 mt-4'>
				{/* Date Range Picker */}
				<div className='flex flex-col'>
					<DateRangePicker
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				</div>

				<button
					className='btn btn-primary flex justify-center'
					onClick={handleClick}
				>
					CREATE CSV FILE
				</button>
			</div>
		</div>
	);
};

export { VatOutputs };
