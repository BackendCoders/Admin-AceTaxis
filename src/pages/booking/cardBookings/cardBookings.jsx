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

// Function to create booking data
function createBooking(id, date, driver, pickup, passenger, status, payment) {
	return {
		id,
		date,
		driver,
		pickup,
		passenger,
		status,
		payment,
		details: {
			bookedBy: 'ACE TAXIS',
			details: 'x 3 trips, pos 18 people. Should be about an hour',
			lastUpdatedBy: 'ACE TAXIS',
			lastUpdatedOn: '',
			scope: 'Card',
			mileage: 0,
			duration: 26,
			chargeFromBase: true,
		},
	};
}

// Sample Data
const bookings = [
	createBooking(
		82685,
		'08/08/2025 23:30:00',
		5,
		'Pythouse Kitchen Gardens',
		'Sophie Price',
		'Pending',
		'677ba9e8-14e0-aca1-894f-d5f37640191b'
	),
	createBooking(
		88451,
		'29/01/2025 13:00:00',
		2,
		'6 Barrowlea, Stalbridge. Sturminster Newton, Dorset',
		'Olly',
		'Pending',
		'6799fcfd-c1fc-a15b-8be2-250fe9b3a14f'
	),
	createBooking(
		88203,
		'26/01/2025 00:03:00',
		18,
		'Red Lion',
		'Ashley',
		'Pending',
		'67957c40-e62a-aad9-a10b-b08331d9933c'
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
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					<Typography className='dark:text-cyan-400 text-blue-400'>
						{row.id}
					</Typography>
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.date}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.driver}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.pickup}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.passenger}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.status}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					<Typography variant='body2'>{row.payment}</Typography>
				</TableCell>
				<TableCell>
					<IconButton size='small'>
						<EmailOutlined className='text-blue-400 dark:text-cyan-400' />
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					colSpan={9}
					style={{ paddingBottom: 0, paddingTop: 0 }}
				>
					<Collapse
						in={open}
						timeout='auto'
						unmountOnExit
					>
						<Box
							margin={1}
							className='border border-gray-400 rounded p-4 bg-gray-100 dark:bg-[#14151A] text-[#14151A] dark:text-gray-500'
						>
							<Typography
								variant='h6'
								gutterBottom
								className='text-blue-400 dark:text-cyan-400'
							>
								Booking #: {row.id}
							</Typography>
							<Box
								display='flex'
								justifyContent='space-between'
							>
								<Box>
									<Typography variant='body2'>
										<strong>Booked By:</strong> {row.details.bookedBy}
									</Typography>
									<Typography variant='body2'>
										<strong>Details:</strong> {row.details.details}
									</Typography>
									<Typography variant='body2'>
										<strong>Last Updated By:</strong>{' '}
										{row.details.lastUpdatedBy}
									</Typography>
									<Typography variant='body2'>
										<strong>Last Updated On:</strong>{' '}
										{row.details.lastUpdatedOn}
									</Typography>
								</Box>
								<Box>
									<Typography variant='body2'>
										<strong>Scope:</strong> {row.details.scope}
									</Typography>
									<Typography variant='body2'>
										<strong>Mileage:</strong> {row.details.mileage}
									</Typography>
									<Typography variant='body2'>
										<strong>Duration:</strong> {row.details.duration}
									</Typography>
									<Typography variant='body2'>
										<strong>Charge From Base:</strong>{' '}
										{row.details.chargeFromBase ? 'True' : 'False'}
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
function CardBookings() {
	const [search, setSearch] = useState('');
	const [date, setDate] = useState(new Date());
	const filterDriver = '';

	const filteredBookings = bookings.filter(
		(b) =>
			(b.passenger.toLowerCase().includes(search.toLowerCase()) ||
				search === '') &&
			(b.driver.toString() === filterDriver || filterDriver === '')
	);

	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Typography
					variant='h5'
					fontWeight='medium'
					mb={2}
					className='text-xl leading-none text-gray-900 '
				>
					Card Bookings
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
							placeholder='Search Booking'
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
									Driver #
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Pickup
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Passenger
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Status
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Payment #
								</TableCell>
								<TableCell className='text-[#14151A] dark:text-gray-700'>
									Reminder
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

export { CardBookings };
