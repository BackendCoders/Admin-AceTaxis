/** @format */
import { useState, Fragment } from 'react';
import {
	Box,
	Collapse,
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
	EmailOutlined,
} from '@mui/icons-material';
import { format } from 'date-fns';
// import { Container } from '@/components/container';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { KeenIcon } from '@/components';

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
	driverPrice,
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
		driverPrice,
		parking,
		total,
	};
}

// Sample Data (Fully Matches Image)
const bookings = [
	createBooking(
		82629,
		'14/03/2024 15:10:00',
		10001,
		1,
		'Co-Operative Retail Services Ltd. Westbridge Park. Sherborne. Dorset, DT9 6AW',
		'Horizons, Sturminster, DT10 1DR',
		'Tomas Francis',
		false,
		0,
		'£0.00',
		0.0,
		41,
		0,
		'£41.00'
	),
	createBooking(
		82630,
		'14/03/2024 17:45:00',
		10001,
		1,
		'Horizons, Sturminster, DT10 1DR',
		'Co-Operative Retail Services Ltd. Westbridge Park. Sherborne. Dorset, DT9 6AW',
		'Tomas Francis',
		false,
		0,
		'£0.00',
		0.0,
		41,
		0,
		'£41.00'
	),
];

// Collapsible Row Component
function Row({ row }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Main Table Row */}
			<TableRow className='bg-white dark:bg-[#14151A] hover:bg-gray-100'>
				<TableCell>
					<IconButton
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUp className='text-gray-800 dark:text-gray-700' />
						) : (
							<KeyboardArrowDown className='text-gray-800 dark:text-gray-700' />
						)}
					</IconButton>
				</TableCell>
				<TableCell className='text-blue-500 dark:text-cyan-400 font-medium'>
					{row.id}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.date}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.accNumber}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.driverNumber}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.pickup}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.destination}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.passenger}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.hasVias ? 'Yes' : 'No'}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.waiting}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.waitingCharge}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.actualMiles}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.driverPrice}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700'>
					{row.parking}
				</TableCell>
				<TableCell className='text-gray-900 dark:text-gray-700 font-semibold'>
					{row.total}
				</TableCell>
				<TableCell>
					<span className='px-1 py-1 text-green-500 bg-green-50 border border-green-700 rounded-md text-sm font-semibold text-sm'>
						100
					</span>
				</TableCell>

				<TableCell>
					<IconButton size='small'>
						<EmailOutlined className='text-blue-500 dark:text-cyan-400' />
					</IconButton>
				</TableCell>
			</TableRow>

			{/* Collapsible Booking Details Row */}
			<TableRow>
				<TableCell
					colSpan={16}
					style={{ paddingBottom: 0, paddingTop: 0 }}
				>
					<Collapse
						in={open}
						timeout='auto'
						unmountOnExit
					>
						<Box
							margin={1}
							className='border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-gray-100 dark:bg-[#232427] text-gray-900 dark:text-gray-700'
						>
							<Typography
								variant='h6'
								className='text-blue-500 dark:text-cyan-400 font-semibold'
							>
								Booking #: {row.id}
							</Typography>
							<Box
								display='flex'
								justifyContent='space-between'
							>
								<Box>
									<Typography variant='body2'>
										<strong>Booked By:</strong> {row.details?.bookedBy ?? 'N/A'}
									</Typography>
									<Typography variant='body2'>
										<strong>Details:</strong> {row.details?.details ?? 'N/A'}
									</Typography>
									<Typography variant='body2'>
										<strong>Last Updated By:</strong>{' '}
										{row.details?.lastUpdatedBy ?? 'N/A'}
									</Typography>
									<Typography variant='body2'>
										<strong>Last Updated On:</strong>{' '}
										{row.details?.lastUpdatedOn ?? 'N/A'}
									</Typography>
								</Box>
								<Box>
									<Typography variant='body2'>
										<strong>Scope:</strong> {row.details?.scope ?? 'N/A'}
									</Typography>
									<Typography variant='body2'>
										<strong>Mileage:</strong> {row.details?.mileage ?? '0'}
									</Typography>
									<Typography variant='body2'>
										<strong>Duration:</strong> {row.details?.duration ?? '0'}{' '}
										mins
									</Typography>
									<Typography variant='body2'>
										<strong>Charge From Base:</strong>{' '}
										{row.details?.chargeFromBase ? 'Yes' : 'No'}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

// Main Component
function StateProcessing() {
	const [search, setSearch] = useState('');
	const [date, setDate] = useState(new Date());
	const filterDriver = '';

	const filteredBookings = bookings.filter((b) => {
		const passengerMatch =
			b.passenger && typeof b.passenger === 'string'
				? b.passenger.toLowerCase().includes(search.toLowerCase())
				: false;

		const driverMatch =
			b.driverNumber !== undefined && b.driverNumber !== null
				? String(b.driverNumber) === filterDriver
				: false;

		return (
			(passengerMatch || search === '') && (driverMatch || filterDriver === '')
		);
	});

	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Typography
					variant='h5'
					fontWeight='bold'
					mb={2}
				>
					Driver Job Processor
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
							placeholder='Search Statements'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>

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

					<Select defaultValue='all'>
						<SelectTrigger
							className='w-28 hover:shadow-lg'
							size='sm'
							style={{ height: '40px' }}
						>
							<SelectValue placeholder='Select' />
						</SelectTrigger>
						<SelectContent className='w-32'>
							<SelectItem value='all'>All</SelectItem>
							<SelectItem value='peter'>Peter</SelectItem>
							<SelectItem value='cymen'>Cymen</SelectItem>
							<SelectItem value='andrew'>Andrew</SelectItem>
							<SelectItem value='louis'>Louis</SelectItem>
						</SelectContent>
					</Select>

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
									fontWeight: 'bold', // Ensures header text stands out
								},
							}}
						>
							<TableRow>
								<TableCell className='w-8' />{' '}
								{/* Empty Cell for Expand Button */}
								<TableCell className='text-gray-900 dark:text-gray-700'>
									#
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Date
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Acc #
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Driver #
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Pickup
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Destination
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Passenger
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Has Vias
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Waiting
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Waiting Charge
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Actual Miles
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Driver Price
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Parking
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Total
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									£
								</TableCell>
								<TableCell className='text-gray-900 dark:text-gray-700'>
									Post
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

export { StateProcessing };
