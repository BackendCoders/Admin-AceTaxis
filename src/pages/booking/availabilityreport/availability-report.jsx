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
import { IoChevronUpSharp, IoChevronDownSharp } from 'react-icons/io5';

const AvailabilityReport = () => {
	const [selectedTab, setSelectedTab] = useState('monthHours');
	const [driverNumber, setDriverNumber] = useState(0);
	const [dateRange, setDateRange] = useState({
		from: new Date(2024, 11, 28), // December 28, 2024
		to: new Date(2025, 0, 28), // January 28, 2025
	});

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	const DateRangePicker = ({ dateRange, setDateRange }) => (
		<div className='flex flex-col'>
			<label className='form-label text-gray-900'>Date Range</label>
			<Popover>
				<PopoverTrigger asChild className='h-9'>
					<button
						className={cn(
							'btn btn-sm btn-light data-[state=open]:bg-light-active',
							!dateRange && 'text-gray-400'
						)}
					>
						<KeenIcon icon='calendar' className='me-0.5' />
						{dateRange?.from ? (
							dateRange.to ? (
								<>{format(dateRange.from, 'dd/MM/yyyy')} → {format(dateRange.to, 'dd/MM/yyyy')}</>
							) : (
								format(dateRange.from, 'dd/MM/yyyy')
							)
						) : (
							<span>Pick a date range</span>
						)}
					</button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='end'>
					<Calendar mode='range' selected={dateRange} onSelect={setDateRange} numberOfMonths={2} initialFocus />
				</PopoverContent>
			</Popover>
		</div>
	);

	// ✅ Data grouped by selected tab
	const dataByTab = useMemo(() => {
		const dataset = {
			monthHours: [
				{ driver: 1, month: 'February', totalHours: 50 },
				{ driver: 1, month: 'January', totalHours: 120 },
				{ driver: 2, month: 'February', totalHours: 44 },
				{ driver: 2, month: 'January', totalHours: 90 },
				{ driver: 3, month: 'March', totalHours: 60 },
				{ driver: 3, month: 'January', totalHours: 100 },
				{ driver: 4, month: 'February', totalHours: 110 },
				{ driver: 4, month: 'January', totalHours: 130 },
				{ driver: 5, month: 'February', totalHours: 90 },
				{ driver: 5, month: 'January', totalHours: 95 },
				{ driver: 6, month: 'March', totalHours: 78 },
				{ driver: 6, month: 'January', totalHours: 85 },
				{ driver: 7, month: 'February', totalHours: 65 },
				{ driver: 7, month: 'March', totalHours: 80 },
				{ driver: 8, month: 'January', totalHours: 124 },
				{ driver: 8, month: 'February', totalHours: 115 },
				{ driver: 9, month: 'January', totalHours: 55 },
				{ driver: 9, month: 'March', totalHours: 70 },
				{ driver: 10, month: 'January', totalHours: 140 },
				{ driver: 10, month: 'February', totalHours: 135 },
			],
			weekHours: [
				{ driver: 1, weekNumber: 6, totalHours: 30 },
				{ driver: 1, weekNumber: 5, totalHours: 35 },
				{ driver: 2, weekNumber: 6, totalHours: 20 },
				{ driver: 2, weekNumber: 5, totalHours: 28 },
				{ driver: 3, weekNumber: 5, totalHours: 25 },
				{ driver: 3, weekNumber: 4, totalHours: 38 },
				{ driver: 4, weekNumber: 5, totalHours: 40 },
				{ driver: 4, weekNumber: 4, totalHours: 45 },
				{ driver: 5, weekNumber: 4, totalHours: 32 },
				{ driver: 5, weekNumber: 3, totalHours: 27 },
				{ driver: 6, weekNumber: 4, totalHours: 45 },
				{ driver: 6, weekNumber: 3, totalHours: 42 },
				{ driver: 7, weekNumber: 3, totalHours: 26 },
				{ driver: 7, weekNumber: 2, totalHours: 33 },
				{ driver: 8, weekNumber: 3, totalHours: 55 },
				{ driver: 8, weekNumber: 2, totalHours: 50 },
				{ driver: 9, weekNumber: 2, totalHours: 48 },
				{ driver: 9, weekNumber: 1, totalHours: 60 },
				{ driver: 10, weekNumber: 2, totalHours: 60 },
				{ driver: 10, weekNumber: 1, totalHours: 62 },
			],
			weekdayHours: [
				{ driver: 1, dayOfWeek: 'Monday', totalHours: 10 },
				{ driver: 1, dayOfWeek: 'Tuesday', totalHours: 12 },
				{ driver: 2, dayOfWeek: 'Tuesday', totalHours: 15 },
				{ driver: 2, dayOfWeek: 'Thursday', totalHours: 18 },
				{ driver: 3, dayOfWeek: 'Wednesday', totalHours: 20 },
				{ driver: 3, dayOfWeek: 'Friday', totalHours: 22 },
				{ driver: 4, dayOfWeek: 'Thursday', totalHours: 25 },
				{ driver: 4, dayOfWeek: 'Saturday', totalHours: 28 },
				{ driver: 5, dayOfWeek: 'Friday', totalHours: 30 },
				{ driver: 5, dayOfWeek: 'Sunday', totalHours: 32 },
				{ driver: 6, dayOfWeek: 'Saturday', totalHours: 18 },
				{ driver: 6, dayOfWeek: 'Monday', totalHours: 22 },
				{ driver: 7, dayOfWeek: 'Sunday', totalHours: 22 },
				{ driver: 7, dayOfWeek: 'Tuesday', totalHours: 24 },
				{ driver: 8, dayOfWeek: 'Monday', totalHours: 27 },
				{ driver: 8, dayOfWeek: 'Thursday', totalHours: 30 },
				{ driver: 9, dayOfWeek: 'Tuesday', totalHours: 33 },
				{ driver: 9, dayOfWeek: 'Wednesday', totalHours: 36 },
				{ driver: 10, dayOfWeek: 'Wednesday', totalHours: 40 },
				{ driver: 10, dayOfWeek: 'Friday', totalHours: 42 },
			],
			weekendHours: [
				{ driver: 1, weekendDay: 'Saturday', totalHours: 18 },
				{ driver: 1, weekendDay: 'Sunday', totalHours: 22 },
				{ driver: 2, weekendDay: 'Saturday', totalHours: 31 },
				{ driver: 2, weekendDay: 'Sunday', totalHours: 35 },
				{ driver: 3, weekendDay: 'Sunday', totalHours: 20 },
				{ driver: 3, weekendDay: 'Saturday', totalHours: 25 },
				{ driver: 4, weekendDay: 'Sunday', totalHours: 25 },
				{ driver: 4, weekendDay: 'Saturday', totalHours: 28 },
				{ driver: 5, weekendDay: 'Saturday', totalHours: 22 },
				{ driver: 5, weekendDay: 'Sunday', totalHours: 30 },
				{ driver: 6, weekendDay: 'Sunday', totalHours: 26 },
				{ driver: 6, weekendDay: 'Saturday', totalHours: 32 },
				{ driver: 7, weekendDay: 'Saturday', totalHours: 28 },
				{ driver: 7, weekendDay: 'Sunday', totalHours: 33 },
				{ driver: 8, weekendDay: 'Sunday', totalHours: 30 },
				{ driver: 8, weekendDay: 'Saturday', totalHours: 35 },
				{ driver: 9, weekendDay: 'Saturday', totalHours: 35 },
				{ driver: 9, weekendDay: 'Sunday', totalHours: 38 },
				{ driver: 10, weekendDay: 'Sunday', totalHours: 40 },
				{ driver: 10, weekendDay: 'Saturday', totalHours: 45 },
			],
		};
	
		return dataset[selectedTab] || [];
	}, [selectedTab]);
	

	// ✅ Dynamic column headers based on selected tab
	const columns = useMemo(() => {
		if (dataByTab.length === 0) return [];

		return Object.keys(dataByTab[0]).map((key) => ({
			accessorKey: key,
			header: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
		}));
	}, [dataByTab]);

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
					<div className='flex items-center border rounded-md px-2 py-1'>
						<span className='px-4 text-xs font-medium'>{driverNumber}</span>
						<div className='flex flex-col'>
							<button className='px-2 hover:bg-gray-300' onClick={() => setDriverNumber(driverNumber + 1)}>
								<IoChevronUpSharp fontSize='14' />
							</button>
							<button className='px-2 hover:bg-gray-300' onClick={() => setDriverNumber(Math.max(0, driverNumber - 1))}>
								<IoChevronDownSharp fontSize='14' />
							</button>
						</div>
					</div>
				</div>

				{/* Date Range Picker */}
				<DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
			</div>

			{/* Tabs - Centered */}
			<div className='mt-6 flex justify-center gap-6'>
				{[
					{ id: 'monthHours', label: '📌 MONTH HOURS', color: 'bg-green-400' },
					{ id: 'weekHours', label: '🔧 WEEK# HOURS', color: 'bg-yellow-400' },
					{ id: 'weekdayHours', label: '⚙️ WEEKDAY HOURS', color: 'bg-blue-400' },
					{ id: 'weekendHours', label: '⏳ WEEKEND HOURS', color: 'bg-red-500' },
				].map((tab) => (
					<button key={tab.id} onClick={() => handleTabClick(tab.id)}
						className={`relative px-5 pb-2 flex items-center gap-2 text-sm font-medium transition-all duration-300
						${selectedTab === tab.id ? 'text-blue-500' : 'text-gray-600'}`}
					>
						{tab.label}
						<span className={`w-2 h-2 rounded-full ${tab.color}`}></span>
						{selectedTab === tab.id && (
							<div className='absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 rounded transition-all duration-300'></div>
						)}
					</button>
				))}
			</div>

			{/* Data Grid */}
			<div className='mt-6 flex justify-center'>
				<div className='w-[600px]'>
					<DataGrid
						columns={columns}
						data={driverNumber === 0 ? dataByTab : dataByTab.filter((d) => d.driver === driverNumber)}
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
