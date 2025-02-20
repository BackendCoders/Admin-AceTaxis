/** @format */

import { useState, useMemo, Fragment } from 'react';
import { DataGrid } from '@/components';
import {
	Toolbar,
	ToolbarDescription,
	ToolbarHeading,
	ToolbarPageTitle,
} from '@/partials/toolbar';
// import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components/keenicons';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAvailabilityReport } from '../../../slices/availabilitySlice';
import toast from 'react-hot-toast';

const AvailabilityReport = () => {
	const dispatch = useDispatch();
	const { availableHoursByDay, weekDay, weekEnd, week, month, loading } =
		useSelector((state) => state.availability);
	const [selectedTab, setSelectedTab] = useState('dayHours');
	const [driverNumber, setDriverNumber] = useState(0);
	const [dateRange, setDateRange] = useState({
		from: new Date(), // December 28, 2024
		to: new Date(), // January 28, 2025
	});

	const handleSearch = async () => {
		if (!driverNumber?.trim()) {
			toast.error('Please enter a Driver ID');
			return;
		}
		const payload = {
			userId: Number(driverNumber),
			startDate: format(new Date(dateRange?.from), 'yyyy-MM-dd'),
			endDate: format(new Date(dateRange?.to), 'yyyy-MM-dd'),
		};
		dispatch(refreshAvailabilityReport(payload));
	};

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	// ✅ Data grouped by selected tab
	const dataByTab = useMemo(() => {
		const dataset = {
			dayHours: availableHoursByDay,
			monthHours: month,
			weekHours: week,
			weekdayHours: weekDay,
			weekendHours: weekEnd,
		};

		return dataset[selectedTab] || [];
	}, [month, selectedTab, week, weekDay, weekEnd, availableHoursByDay]);

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const weekDayNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	// ✅ Dynamic column headers based on selected tab
	const columns = useMemo(() => {
		if (selectedTab === 'dayHours') {
			return [
				{ accessorKey: 'userId', header: 'USER ID' },
				{ accessorKey: 'date', header: 'DATE' },
				{ accessorKey: 'hoursAvailable', header: 'HOURS AVAILABLE' },
			];
		} else if (selectedTab === 'monthHours') {
			return [
				{ accessorKey: 'userId', header: 'USER ID' },
				{ accessorKey: 'month', header: 'MONTH' },
				{ accessorKey: 'totalHours', header: 'TOTAL HOURS' },
			];
		} else if (selectedTab === 'weekHours') {
			return [
				{ accessorKey: 'userId', header: 'USER ID' },
				{ accessorKey: 'week', header: 'WEEK #' },
				{ accessorKey: 'totalHours', header: 'TOTAL HOURS' },
			];
		} else if (selectedTab === 'weekdayHours') {
			return [
				{ accessorKey: 'userId', header: 'USER ID' },
				{ accessorKey: 'day', header: 'WEEK DAY' },
				{ accessorKey: 'totalHours', header: 'TOTAL HOURS' },
			];
		} else if (selectedTab === 'weekendHours') {
			return [
				{ accessorKey: 'userId', header: 'USER ID' },
				{ accessorKey: 'weekendDay', header: 'WEEKEND DAY' },
				{ accessorKey: 'totalHours', header: 'TOTAL HOURS' },
			];
		}
		return [];
	}, [selectedTab]);

	const formattedDataByTab = useMemo(() => {
		if (selectedTab === 'dayHours') {
			return dataByTab.map((item) => ({
				userId: item.userId,
				date: new Date(item.date).toLocaleDateString('en-GB'), // Convert date
				hoursAvailable: item.hoursAvailable,
			}));
		} else if (selectedTab === 'monthHours') {
			return dataByTab.map((item) => ({
				userId: item.userId,
				month: monthNames[item.month],
				totalHours: item.totalHours,
			}));
		} else if (selectedTab === 'weekHours') {
			return dataByTab.map((item) => ({
				userId: item.userId,
				week: item.week,
				totalHours: item.totalHours,
			}));
		} else if (selectedTab === 'weekdayHours') {
			return dataByTab.map((item) => ({
				userId: item.userId,
				day: weekDayNames[item.day],
				totalHours: item.totalHours,
			}));
		} else if (selectedTab === 'weekendHours') {
			return dataByTab.map((item) => ({
				userId: item.userId,
				weekendDay: weekDayNames[item.weekendDay],
				totalHours: item.totalHours,
			}));
		}
		return [];
	}, [dataByTab, selectedTab]);

	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				{/* Header Section */}
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>Showing Availability Report</ToolbarDescription>
					</ToolbarHeading>
				</Toolbar>
			</div>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<div className='flex flex-col items-stretch gap-5 lg:gap-7.5'>
					<div className='flex flex-wrap items-center gap-5 justify-between'>
						<div className='card card-grid min-w-full'>
							<div className='card-header flex-wrap gap-2'>
								<div className='flex flex-wrap gap-2 lg:gap-5'>
									<div className='flex flex-wrap gap-2 w-full justify-start items-center'>
										<label
											className='input input-sm w-36'
											style={{ height: '36px' }}
										>
											<KeenIcon icon='magnifier' />
											<input
												type='number'
												placeholder='Search Driver Id'
												value={driverNumber}
												onChange={(e) => setDriverNumber(e.target.value)}
											/>
										</label>

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

										<button
											className='btn btn-sm btn-outline btn-primary'
											style={{ height: '36px' }}
											onClick={handleSearch}
											disabled={loading}
										>
											<KeenIcon icon='magnifier' />{' '}
											{loading ? 'Searching...' : 'Search'}
										</button>
									</div>
								</div>
							</div>
							<div className='card-body'>
								{/* Tabs - Centered */}
								<div className='mt-6 flex justify-center gap-6'>
									{[
										{
											id: 'dayHours',
											label: '📌 DAY HOURS',
											color: 'bg-cyan-400',
										},
										{
											id: 'monthHours',
											label: '📌 MONTH HOURS',
											color: 'bg-green-400',
										},
										{
											id: 'weekHours',
											label: '🔧 WEEK# HOURS',
											color: 'bg-yellow-400',
										},
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
											className={`relative px-5 pb-2 flex items-center gap-2 text-sm font-medium transition-all duration-300 ${selectedTab === tab.id ? 'text-blue-500' : 'text-gray-600'}`}
										>
											{tab.label}
											<span
												className={`w-2 h-2 rounded-full ${tab.color}`}
											></span>
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
											data={formattedDataByTab}
											pagination={{ size: 10 }}
											sorting={[{ id: 'driver', desc: false }]}
											layout={{ card: true }}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export { AvailabilityReport };
