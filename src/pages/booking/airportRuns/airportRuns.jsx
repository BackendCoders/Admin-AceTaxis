/** @format */

import { useEffect, useMemo, useState } from 'react';
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { cn } from '@/lib/utils';
// import { KeenIcon } from '@/components';
import { Tablejourney } from './tablejourney';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAirportRuns } from '../../../slices/bookingSlice';
import {
	DataGrid,
	DataGridColumnHeader,
	// useDataGrid,
	// DataGridRowSelectAll,
	// DataGridRowSelect,
} from '@/components';
import { Input } from '@/components/ui/input';

const airportData = {
	'Last 1 Month': [
		{
			driver: '1 - ACE TAXIS',
			date: '18/01/25',
			pickup: 'Heathrow Airport Terminal 2',
			drop: 'Langham Oak Ltd, Langham House, Langham, Gillingham, Dorset',
			price: '£245.00',
		},
		{
			driver: '2 - Kate Hall',
			date: '13/12/24',
			pickup: 'The Clock House, Compton Abbas, Shaftesbury, Dorset',
			drop: 'Heathrow Airport Terminal 3',
			price: '£285.00',
		},
		{
			driver: '3 - Bex Sims',
			date: '13/10/24',
			pickup: '15 Stourcastle, Sturminster Newton, Dorset',
			drop: 'Bristol Airport',
			price: '£146.00',
		},
	],
	'Last 3 Months': [
		{
			driver: '4 - Paul Barber',
			date: '12/01/25',
			pickup: 'Holland Farm, South Brewham, Bruton, Somerset',
			drop: 'Heathrow Airport Terminal 5',
			price: '£215.00',
		},
		{
			driver: '5 - Mark Phillips',
			date: '23/01/25',
			pickup: 'Heathrow Airport Terminal 5',
			drop: '26 Barnaby Mead, Gillingham, Dorset',
			price: '£225.00',
		},
		{
			driver: '6 - Rob Holton',
			date: '22/01/25',
			pickup: '20 Bayfields, Gillingham, Dorset',
			drop: 'Heathrow Airport Terminal 3',
			price: '£215.00',
		},
	],
	'Last 6 Months': [
		{
			driver: '7 - Caroline Stimson',
			date: '09/12/24',
			pickup: 'Blackberry Farm, Hartgrove, Shaftesbury, Dorset',
			drop: 'Heathrow Airport Terminal 5',
			price: '£245.00',
		},
		{
			driver: '8 - Peter Farrell',
			date: '13/09/24',
			pickup: 'Heathrow Airport Terminal 5',
			drop: 'Langham House, Langham, Gillingham, Dorset',
			price: '£245.00',
		},
		{
			driver: '9 - Alan Waistell',
			date: '04/01/25',
			pickup: 'Bristol Airport',
			drop: 'Peakes Farm, Sedgehill, Shaftesbury, Dorset',
			price: '£155.00',
		},
	],
	'Last 12 Months': [
		{
			driver: '10 - James Owen',
			date: '26/01/25',
			pickup: 'Heathrow Airport Terminal 4',
			drop: 'Port Regis',
			price: '£200.00',
		},
		{
			driver: '11 - Richard Elgar',
			date: '09/01/25',
			pickup: 'Gatwick Airport South Terminal',
			drop: 'The Bridge House, Little Stream, Child Okeford, Blandford Forum, Dorset',
			price: '£325.00',
		},
	],
};

const AirportRuns = () => {
	const dispatch = useDispatch();
	const { airportRuns } = useSelector((state) => state.booking);
	const [selectedOption, setSelectedOption] = useState('Last 1 Month');
	// const [date, setDate] = useState(new Date());

	console.log(airportRuns);

	const month =
		selectedOption === 'Last 1 Month'
			? 1
			: selectedOption === 'Last 3 Months'
				? 3
				: selectedOption === 'Last 6 Months'
					? 6
					: selectedOption === 'Last 12 Months'
						? 12
						: 0;

	const handleRowSelection = (state) => {
		const selectedRowIds = Object.keys(state);
		if (selectedRowIds.length > 0) {
			alert(`Selected Drivers: ${selectedRowIds.join(', ')}`);
		}
	};

	const ColumnInputFilter = ({ column }) => {
		return (
			<Input
				placeholder='Filter...'
				value={column.getFilterValue() ?? ''}
				onChange={(event) => column.setFilterValue(event.target.value)}
				className='h-9 w-full max-w-40'
			/>
		);
	};

	const columns = useMemo(
		() => [
			{
				accessorKey: 'bookingId',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='# id'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`p-2 rounded-md`}>{row?.original?.id}</span>
				),
				meta: { headerClassName: 'w-20' },
			},
			{
				accessorKey: 'pickUpDateTime',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Pickup Date/Time'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}></span>
				),
				meta: { headerClassName: 'min-w-[80px]' },
			},

			{
				accessorKey: 'pickupAddress',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Pickup Address'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}></span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'destinationAddress',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Destination Address'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}></span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'passengerName',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Passenger Name'
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={row.original.color}>
						{row?.original?.passengerName}
					</span>
				),
				meta: { headerClassName: 'w-18' },
			},
			{
				accessorKey: 'passenger',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Passenger'
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={row.original.color}>
						{row?.original?.passengers}
					</span>
				),
				meta: { headerClassName: 'w-18' },
			},
			// {
			// 	accessorKey: 'phoneNumber',
			// 	header: ({ column }) => (
			// 		<DataGridColumnHeader
			// 			title='Phone Number'
			// 			column={column}
			// 		/>
			// 	),
			// 	enableSorting: true,
			// 	cell: ({ row }) => (
			// 		<span className={row.original.color}>{row.original.phoneNumber}</span>
			// 	),
			// 	meta: { headerClassName: 'w-18' },
			// },
		],
		[]
	);

	useEffect(() => {
		dispatch(refreshAirportRuns(month));
	}, [dispatch, month]);

	return (
		<div className='max-w-[1580px] w-full mx-auto px-6 py-4'>
			{/* Header Section */}
			<div className='mb-4'>
				<h2 className='text-xl leading-none font-medium text-gray-900 '>
					Last Airport Journeys
				</h2>
				<h6 className='text-gray-600 dark:text-gray-600'>Select Period</h6>
			</div>

			{/* Date Picker */}
			{/* <div className='flex justify-between items-center mb-4'>
				<Popover>
					<PopoverTrigger asChild>
						<button className='input border-gray-300 bg-transparent w-48 py-2 px-3 rounded-md'>
							<KeenIcon
								icon='calendar'
								className='mr-2'
							/>
							{date ? format(date, 'LLL dd, y') : <span>Pick a date</span>}
						</button>
					</PopoverTrigger>
					<PopoverContent
						className='w-auto p-0 shadow-md'
						align='start'
					>
						<Calendar
							initialFocus
							mode='single'
							defaultMonth={date}
							selected={date}
							onSelect={setDate}
							numberOfMonths={1}
						/>
					</PopoverContent>
				</Popover>
			</div> */}

			{/* Tab Navigation */}
			<div className='flex border border-gray-300 dark:border-gray-300 rounded-md overflow-hidden'>
				{Object.keys(airportData).map((option) => (
					<button
						key={option}
						onClick={() => setSelectedOption(option)}
						className={`flex-1 py-2 text-center text-sm font-medium transition-all duration-300 ${
							selectedOption === option
								? 'text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
								: 'text-gray-700 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
						}`}
					>
						{option}
					</button>
				))}
			</div>

			{/* Table Section */}
			<div className='overflow-x-auto mt-6 border border-gray-200 dark:border-gray-200 rounded-md'>
				{airportData[selectedOption]?.length > 0 ? (
					<DataGrid
						columns={columns}
						data={airportData[selectedOption]}
						rowSelection={true}
						onRowSelectionChange={handleRowSelection}
						pagination={{ size: 10 }}
						sorting={[{ id: 'bookingId', desc: false }]}
						layout={{ card: true }}
					/>
				) : (
					<tr>
						<td
							colSpan='5'
							className='p-3 text-center text-gray-500 dark:text-gray-400'
						>
							No data available
						</td>
					</tr>
				)}
			</div>

			<Tablejourney />
		</div>
	);
};

export { AirportRuns };
