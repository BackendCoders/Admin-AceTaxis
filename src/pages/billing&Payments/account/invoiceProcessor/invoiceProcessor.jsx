/** @format */
import { useState, Fragment, useEffect } from 'react';
import {
	Box,
	// Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from '@mui/material';
import {
	KeyboardArrowDown,
	KeyboardArrowUp,
	// EmailOutlined,
} from '@mui/icons-material';
import { format } from 'date-fns';
// import { Container } from '@/components/container';
// import {
// 	Select,
// 	SelectTrigger,
// 	SelectContent,
// 	SelectItem,
// 	SelectValue,
// } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { KeenIcon } from '@/components';
import { cn } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAllDrivers } from '../../../../slices/driverSlice';

// Function to create booking data
function createBooking(
	id,
	date,
	accNumber,
	driverNumber,
	pickup,
	destination,
	passenger,
	hasVias,
	waiting,
	waitingCharge,
	actualMiles,
	driverFare,
	journeyCharge,
	parking,
	total
) {
	return {
		id,
		date,
		accNumber,
		driverNumber,
		pickup,
		destination,
		passenger,
		hasVias,
		waiting,
		waitingCharge,
		actualMiles,
		driverFare,
		journeyCharge,
		parking,
		total,
	};
}

// Sample Data
const bookings = [
	createBooking(
		22991,
		'29/01/2025 09:00:00',
		9006,
		28,
		'Flat 3. Fox Court. Bath Road. Sturminster Newton, DT10 1FW',
		'Thorngrove Garden Centre, SP8 4RE',
		'Alex Gorman',
		false,
		0,
		'£0.00',
		0.0,
		25,
		30,
		0,
		'£30.00'
	),
	createBooking(
		59186,
		'29/01/2025 16:00:00',
		9006,
		30,
		'Thorngrove Garden Centre, SP8 4RE',
		'Flat 3. Fox Court. Bath Road. Sturminster Newton, DT10 1FW',
		'Alex Gorman',
		false,
		0,
		'£0.00',
		0.0,
		25,
		30,
		0,
		'£30.00'
	),
];

// Collapsible Row Component
function Row({ row }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow className='bg-white dark:bg-[#14151A] hover:bg-gray-100'>
				<TableCell>
					<IconButton
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUp className='text-[#14151A] dark:text-gray-700' />
						) : (
							<KeyboardArrowDown className='text-[#14151A] dark:text-gray-700' />
						)}
					</IconButton>
				</TableCell>
				<TableCell className='text-blue-400 dark:text-cyan-400'>
					{row.id}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.date}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.accNumber}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.driverNumber}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.pickup}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.destination}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.passenger}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.hasVias ? 'True' : 'False'}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.waiting}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.waitingCharge}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.actualMiles}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.driverFare}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.journeyCharge}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.parking}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700 font-semibold'>
					{row.total}
				</TableCell>
			</TableRow>
		</>
	);
}

// Main Component
function InvoiceProcessor() {
	const dispatch = useDispatch();
	const { drivers } = useSelector((state) => state.driver);
	const [selectedDriver, setSelectedDriver] = useState(0);
	const [search, setSearch] = useState('');
	// const [date, setDate] = useState(new Date());
	const filterDriver = '';

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

	const filteredBookings = bookings.filter((b) => {
		const passengerMatch =
			b.passenger && typeof b.passenger === 'string'
				? b.passenger.toLowerCase().includes(search.toLowerCase())
				: false;

		const driverMatch =
			b.driver !== undefined && b.driver !== null
				? String(b.driver) === filterDriver
				: false;

		return (
			(passengerMatch || search === '') && (driverMatch || filterDriver === '')
		);
	});

	useEffect(() => {
		dispatch(refreshAllDrivers());
	}, [dispatch]);

	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Typography
					variant='h5'
					fontWeight='medium'
					mb={2}
					className='text-xl leading-none text-gray-900'
				>
					Account Job Processor
				</Typography>

				{/* Filters */}
				<Box
					display='flex'
					gap={2}
					alignItems='center'
					mb={2}
				>
					<div className='input input-sm max-w-48 h-10'>
						<KeenIcon icon='magnifier' />
						<input
							type='text'
							placeholder='Search Invoice'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>

					<Select
						value={selectedDriver}
						onValueChange={(value) => setSelectedDriver(value)}
					>
						<SelectTrigger
							className=' w-32 hover:shadow-lg'
							size='sm'
							style={{ height: '40px' }}
						>
							<SelectValue placeholder='Select' />
						</SelectTrigger>
						<SelectContent className='w-36'>
							<SelectItem value={0}>All</SelectItem>
							{drivers?.length > 0 &&
								drivers?.map((driver) => (
									<>
										<SelectItem value={driver?.id}>
											{driver?.fullName}
										</SelectItem>
									</>
								))}
						</SelectContent>
					</Select>

					<div className='flex flex-col'>
						<DateRangePicker
							dateRange={dateRange}
							setDateRange={setDateRange}
						/>
					</div>

					<div className='flex items-center gap-2'>
						<label className='switch switch-sm'>
							<span className='switch-label'>Auto Email Invoices</span>
							<input
								type='checkbox'
								value='1'
								name='check'
								defaultChecked
								readOnly
							/>
						</label>
					</div>

					<button className='btn btn-primary flex justify-center'>
						SHOW JOBS
					</button>
				</Box>

				{/* Table */}
				<TableContainer
					component={Paper}
					className='shadow-none bg-white dark:bg-[#14151A]'
				>
					<Table className='text-[#14151A] dark:text-gray-100'>
						<TableHead
							className='bg-gray-100 dark:bg-[#14151A]'
							sx={{
								'& .MuiTableCell-root': {
									borderBottom: '1px solid #464852',
								},
							}}
						>
							<TableRow>
								<TableCell />
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									#
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Date
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Acc #
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Driver #
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Pickup
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Destination
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Passenger
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Has Vias
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Waiting
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Waiting Charge
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Actual Miles
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Driver £
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Journey Charge
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Parking
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700 font-semibold'>
									Total
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody
							sx={{
								'& .MuiTableCell-root': {
									borderBottom: '1px solid #464852',
								},
							}}
						>
							{filteredBookings.map((row) => (
								<Row
									key={row.id}
									row={row}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Fragment>
	);
}

export { InvoiceProcessor };
