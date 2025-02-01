/** @format */

import { useState, useMemo } from 'react';
import { DataGrid, DataGridColumnHeader } from '@/components';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components/keenicons';
import { IoChevronUpSharp } from 'react-icons/io5';
import { IoChevronDownSharp } from 'react-icons/io5';

const AvailabilityReport = () => {
	const [selectedTab, setSelectedTab] = useState('monthHours');
	const [driverNumber, setDriverNumber] = useState(0);

	// ✅ Set default start & end dates
	const [dateRange, setDateRange] = useState({
		from: new Date(2024, 11, 28), // December 28, 2024
		to: new Date(2025, 0, 28), // January 28, 2025
	});

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	// ✅ Date Picker Component with Default Dates
	const DateRangePicker = ({ dateRange, setDateRange }) => (
		<div className='flex flex-col'>
			<label className='form-label text-gray-900'>Date Range</label>

			<Popover>
				<PopoverTrigger
					asChild
					className='h-9'
				>
					<button
						className={cn(
							'btn btn-sm btn-light data-[state=open]:bg-light-active',
							!dateRange && 'text-gray-400'
						)}
					>
						<KeenIcon
							icon='calendar'
							className='me-0.5'
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
					className='w-auto p-0'
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

	const driverData = useMemo(
		() => [
			{ driver: 1, month: 'January', totalHours: 4 },
			{ driver: 30, month: 'December', totalHours: 8 },
			{ driver: 7, month: 'December', totalHours: 10 },
			{ driver: 8, month: 'December', totalHours: 12 },
			{ driver: 13, month: 'December', totalHours: 13 },
			{ driver: 26, month: 'December', totalHours: 14 },
			{ driver: 2, month: 'December', totalHours: 16 },
			{ driver: 16, month: 'December', totalHours: 16 },
			{ driver: 12, month: 'December', totalHours: 16 },
			{ driver: 11, month: 'December', totalHours: 17 },
		],
		[]
	);

	const ColumnInputFilter = ({ column }) => (
		<Input
			placeholder='Filter...'
			value={column.getFilterValue() ?? ''}
			onChange={(e) => column.setFilterValue(e.target.value)}
			className='h-9 w-full max-w-40'
		/>
	);

	const columns = useMemo(
		() => [
			{
				accessorKey: 'driver',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Driver #'
						filter={<ColumnInputFilter column={column} />}
						column={column}
						className={` justify-center`}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span
						className={`p-2 rounded-md flex justify-center ${row.original.color}`}
					>
						{row.original.driver}
					</span>
				),
				meta: { headerClassName: 'w-20 text-center' },
			},
			{
				accessorKey: 'month',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Month'
						filter={<ColumnInputFilter column={column} />}
						column={column}
						className={` justify-center`}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span
						className={`font-medium flex justify-center ${row.original.color}`}
					>
						{row.original.month}
					</span>
				),
				meta: { headerClassName: 'w-40 text-center' },
			},
			{
				accessorKey: 'totalHours',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Total Available Hours'
						column={column}
						className={` justify-center`}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className='flex justify-center'>{row.original.totalHours}</span>
				),
				meta: { headerClassName: 'w-40 text-center' },
			},
		],
		[]
	);

	return (
		<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
			{/* Header Section */}
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-semibold dark:text-gray-700'>
					Driver Availability Report #: {driverNumber}
				</h2>
			</div>

			{/* Driver Selection and Date Picker */}
			<div className='flex items-center gap-4 mt-4'>
				{/* Driver Number */}
				<div className='flex flex-col'>
					<label className='form-label text-gray-900'>Driver Number</label>
					<div className='flex items-center border rounded-md px-2 py-1 dark:bg-[#1F212A] border-gray-300 dark:border-gray-300 hover:shadow-md'>
						<span className='px-4 text-xs font-medium'>{driverNumber}</span>
						{/* Buttons placed vertically */}
						<div className='flex flex-col'>
							<button
								className='px-2 dark:text-white rounded-t-md hover:bg-gray-300 transition-all'
								onClick={() => setDriverNumber(driverNumber + 1)}
							>
								<IoChevronUpSharp
									fontSize='14'
									className='dark:text-[#9A9CAE]'
								/>
							</button>
							<button
								className='px-2  dark:text-white rounded-b-md hover:bg-gray-300 transition-all'
								onClick={() => setDriverNumber(Math.max(0, driverNumber - 1))}
							>
								<IoChevronDownSharp
									fontSize='14'
									className='dark:text-[#9A9CAE]'
								/>
							</button>
						</div>
					</div>
				</div>

				{/* Date Range */}
				{/* ✅ Updated Date Range Picker */}
				<DateRangePicker
					dateRange={dateRange}
					setDateRange={setDateRange}
				/>
			</div>

			{/* Swap Buttons - Centered */}
			<div className='mt-6 flex justify-center gap-6 border-gray-300 dark:border-gray-200'>
				{[
					{ id: 'monthHours', label: '📌 MONTH HOURS', color: 'bg-green-400' },
					{ id: 'weekHours', label: '🔧 WEEK# HOURS', color: 'bg-yellow-400' },
					{
						id: 'weekdayHours',
						label: '⚙️ WEEKDAY HOURS',
						color: 'bg-blue-400',
					},
					{
						id: 'weekendHours',
						label: '⏳ WEEKEND HOURS',
						color: 'bg-red-500',
					},
				].map((tab) => (
					<button
						key={tab.id}
						onClick={() => handleTabClick(tab.id)}
						className={`relative px-5 pb-2 flex items-center gap-2 text-sm font-medium transition-all duration-300
                        ${
													selectedTab === tab.id
														? 'text-blue-500 dark:text-blue-400'
														: 'text-gray-600 dark:text-gray-700'
												}`}
					>
						{tab.label}

						{/* Circular Color Indicator */}
						<span className={`w-2 h-2 rounded-full ${tab.color}`}></span>

						{/* Active Tab - Blue Underline */}
						{selectedTab === tab.id && (
							<div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 dark:bg-blue-400 rounded transition-all duration-300'></div>
						)}
					</button>
				))}
			</div>

			{/* Data Grid Table - Limited Width & Centered */}
			<div className='mt-6 flex justify-center'>
				<div className='w-[600px]'>
					<DataGrid
						columns={columns}
						data={driverData.filter(
							(item) => driverNumber === 0 || item.driver === driverNumber
						)}
						pagination={{ size: 5 }}
						sorting={[{ id: 'driver', desc: false }]}
						layout={{ card: true }}
					/>
				</div>
			</div>
		</div>
	);
};

export { AvailabilityReport };
