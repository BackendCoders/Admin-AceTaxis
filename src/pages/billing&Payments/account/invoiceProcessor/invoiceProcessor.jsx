/** @format */
import { useState, Fragment, useEffect } from 'react';
import {
	// Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import {
	KeyboardArrowDown,
	KeyboardArrowUp,
	EmailOutlined,
} from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MoneyIcon from '@mui/icons-material/Money';

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
import { refreshAllAccounts } from '../../../../slices/accountSlice';
import { clearInvoice } from '../../../../service/operations/billing&Payment';
import toast from 'react-hot-toast';
import {
	Toolbar,
	ToolbarDescription,
	ToolbarHeading,
	ToolbarPageTitle,
} from '@/partials/toolbar';

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

	const handleCancel = async () => {
		try {
			const response = await clearInvoice(row?.id);
			if (response?.status === 'success') {
				toast.success('Invoice Cancellation Successful');
			}
		} catch (error) {
			console.error('Failed to cancel invoice:', error);
			toast.error('Failed to cancel invoice');
		}
	};

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
					<input
						type='number'
						className='w-16 text-center border rounded p-1 dark:bg-inherit dark:ring-inherit'
						value={row.waiting}
						// onChange={(e) =>
						// 	handleInputChange(
						// 		row.original.id,
						// 		'initialCharge',
						// 		e.target.value
						// 	)
						// }
					/>
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.waitingCharge}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					{row.actualMiles}
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					<input
						type='number'
						className='w-16 text-center border rounded p-1 dark:bg-inherit dark:ring-inherit'
						value={row.driverFare}
						// onChange={(e) =>
						// 	handleInputChange(
						// 		row.original.id,
						// 		'initialCharge',
						// 		e.target.value
						// 	)
						// }
					/>
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					<input
						type='number'
						className='w-16 text-center border rounded p-1 dark:bg-inherit dark:ring-inherit'
						value={row.journeyCharge}
						// onChange={(e) =>
						// 	handleInputChange(
						// 		row.original.id,
						// 		'initialCharge',
						// 		e.target.value
						// 	)
						// }
					/>
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700'>
					<input
						type='number'
						className='w-16 text-center border rounded p-1 dark:bg-inherit dark:ring-inherit'
						value={row.parking}
						// onChange={(e) =>
						// 	handleInputChange(
						// 		row.original.id,
						// 		'initialCharge',
						// 		e.target.value
						// 	)
						// }
					/>
				</TableCell>
				<TableCell className='text-[#14151A] dark:text-gray-700 font-semibold'>
					{row.total}
				</TableCell>
				<TableCell>
					<IconButton
						size='small'
						// onClick={() => setPriceBaseModal(true)}
					>
						<MoneyIcon className='text-blue-500 dark:text-cyan-400' />
					</IconButton>
				</TableCell>

				<TableCell>
					<IconButton size='small'>
						<EmailOutlined className='text-blue-500 dark:text-cyan-400' />
					</IconButton>
				</TableCell>

				<TableCell>
					<IconButton
						size='small'
						onClick={handleCancel}
					>
						<DeleteOutlinedIcon className='text-red-500 dark:text-red-600' />
					</IconButton>
				</TableCell>
			</TableRow>
		</>
	);
}

// Main Component
function InvoiceProcessor() {
	const dispatch = useDispatch();
	const { accounts } = useSelector((state) => state.account);
	const [selectedAccount, setSelectedAccount] = useState(0);
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
		dispatch(refreshAllAccounts());
	}, [dispatch]);

	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>Account Job Processor </ToolbarDescription>
					</ToolbarHeading>
				</Toolbar>

				<div className='ms-auto me-auto max-w-[1580px] w-full'>
					<div className='flex flex-col items-stretch gap-5 lg:gap-7.5'>
						<div className='flex flex-wrap items-center gap-5 justify-between'>
							<div className='card card-grid min-w-full'>
								<div className='card-header flex-wrap gap-2'>
									<div className='flex flex-wrap gap-2 lg:gap-5'>
										<div className='flex'>
											<label
												className='input input-sm hover:shadow-lg'
												style={{ height: '40px' }}
											>
												<KeenIcon icon='magnifier' />
												<input
													type='text'
													placeholder='Search Invoice'
													value={search}
													onChange={(e) => setSearch(e.target.value)}
												/>
											</label>
										</div>
										<div className='flex flex-wrap items-center gap-2.5'>
											<Select
												value={selectedAccount}
												onValueChange={(value) => setSelectedAccount(value)}
											>
												<SelectTrigger
													className='w-40 hover:shadow-lg'
													size='sm'
													style={{ height: '40px' }}
												>
													<SelectValue placeholder='Select' />
												</SelectTrigger>
												<SelectContent className='w-40'>
													<SelectItem value={0}>All</SelectItem>
													{accounts?.length > 0 &&
														accounts?.map((acc) => (
															<>
																<SelectItem value={acc?.accNo}>
																	{acc?.accNo} - {acc?.businessName}
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
												<label className='switch switch-sm flex-1 sm:flex-none'>
													<span className='switch-label'>
														Auto Email Invoices
													</span>
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
										</div>
									</div>
								</div>
								<div className='card-body'>
									<TableContainer
										component={Paper}
										className='shadow-none bg-white dark:bg-[#14151A] overflow-x-auto'
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
													<TableCell className='text-gray-900 dark:text-gray-700'>
														Price
													</TableCell>
													<TableCell className='text-gray-900 dark:text-gray-700'>
														Post
													</TableCell>
													<TableCell className='text-gray-900 dark:text-gray-700'>
														Cancel
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export { InvoiceProcessor };
