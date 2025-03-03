/** @format */

import { Fragment, useEffect, useMemo, useState } from 'react';
import {
	Toolbar,
	ToolbarDescription,
	ToolbarHeading,
	ToolbarPageTitle,
} from '@/partials/toolbar';
import { KeenIcon } from '@/components';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
// import { Container } from '@/components/container';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import {
	DataGrid,
	DataGridColumnHeader,
	// useDataGrid,
	// DataGridRowSelectAll,
	// DataGridRowSelect,
} from '@/components';
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
} from '@mui/material';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAllAccounts } from '../../../../slices/accountSlice';
// import { accountPostOrUnpostJobs } from '../../../../service/operations/billing&Payment';
// import toast from 'react-hot-toast';
import { refreshInvoiceHistory } from '../../../../slices/billingSlice';
import MoneyIcon from '@mui/icons-material/Money';
import {
	Download,
	KeyboardArrowDown,
	KeyboardArrowUp,
	// EmailOutlined,
} from '@mui/icons-material';

function RowNotPriced({ row, invoiceHistory }) {
	const [open, setOpen] = useState(false);
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
						title='#'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`p-2 rounded-md`}>{row.original.userId}</span>
				),
				meta: { headerClassName: 'w-20' },
			},
			{
				accessorKey: 'date',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Date'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`p-2 rounded-md`}>{row.original.cash}</span>
				),
				meta: { headerClassName: 'w-20' },
			},
			{
				accessorKey: 'pickup',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Pickup'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.account}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'destination',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Destination'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.rank}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'passenger',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Passenger'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.comms}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'price',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Price'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						£{row.original.price.toFixed(2)}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'waiting',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Waiting'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						£{row.original.waiting.toFixed(2)}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'parking',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Parking'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						£{row.original.parking.toFixed(2)}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'total',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Total Ex'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						£{row.original.totalEx.toFixed(2)}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'totalIncome',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Total Inc'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						£{row.original.totalIncome.toFixed(2)}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
		],
		[]
	);
	const handleRowSelection = (state) => {
		const selectedRowIds = Object.keys(state);
		if (selectedRowIds.length > 0) {
			alert(`Selected Drivers: ${selectedRowIds.join(', ')}`);
		}
	};

	return (
		<>
			{/* Main Table Row */}
			<TableRow
				className={`${row?.coa ? ' bg-orange-500 hover:bg-orange-400' : 'bg-white dark:bg-[#14151A] hover:bg-gray-100'} `}
			>
				<TableCell>
					<IconButton
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUp
								className={`${row?.coa ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-gray-700'}`}
							/>
						) : (
							<KeyboardArrowDown
								className={`${row?.coa ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-gray-700'}`}
							/>
						)}
					</IconButton>
				</TableCell>
				<TableCell
					className={`${row?.coa ? 'text-blue-600 dark:text-white' : 'text-blue-500 dark:text-cyan-400'}  font-medium`}
				>
					{row.id}
				</TableCell>
				<TableCell
					className={`${row?.coa ? 'dark:text-white' : 'dark:text-gray-700'} text-gray-900`}
				>
					{row.accNumber}
				</TableCell>
				<TableCell
					className={`${row?.coa ? 'dark:text-white' : 'dark:text-gray-700'} text-gray-900`}
				>
					{row.date}
				</TableCell>
				<TableCell
					className={`${row?.coa ? 'dark:text-white' : 'dark:text-gray-700'} text-gray-900`}
				>
					£{row.net.toFixed(2)}
				</TableCell>
				<TableCell
					className={`${row?.coa ? 'dark:text-white' : 'dark:text-gray-700'} text-gray-900`}
				>
					£{row.vat.toFixed(2)}
				</TableCell>
				<TableCell
					className={`${row?.coa ? 'dark:text-white' : 'dark:text-gray-700'} text-gray-900 font-semibold`}
				>
					£{row.total.toFixed(2)}
				</TableCell>
				<TableCell>
					<IconButton
						size='small'
						// onClick={() => {
						// 	if (row.driverFare === 0) {
						// 		toast.error('Driver Price Should not be 0'); // Show error if price is 0
						// 	} else {
						// 		handlePostButton(row); // Post the job if valid
						// 	}
						// }}
					>
						<Download
							className={`${row?.coa ? `${row.postedForStatement ? 'text-red-500 dark:text-red-900' : 'text-blue-500 dark:text-white'}` : `${row.postedForStatement ? 'text-red-500 dark:text-red-600' : 'text-blue-500 dark:text-cyan-400'}`}  `}
						/>
					</IconButton>
				</TableCell>
				<TableCell
					className={`${row?.coa ? 'dark:text-white' : 'dark:text-gray-700'} text-gray-900 font-semibold`}
				>
					{row.paid}
				</TableCell>
				<TableCell>
					<IconButton size='small'>
						<MoneyIcon
							className={`${row?.coa ? 'text-blue-600 dark:text-white' : 'text-blue-500 dark:text-cyan-400'}  `}
						/>
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
							<DataGrid
								columns={columns}
								data={invoiceHistory}
								rowSelection={true}
								onRowSelectionChange={handleRowSelection}
								pagination={{ size: 10 }}
								sorting={[{ id: 'bookingId', desc: false }]}
								layout={{ card: true }}
							/>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

function InvoiceHistory() {
	const dispatch = useDispatch();
	const { accounts } = useSelector((state) => state.account);
	const { invoiceHistory, loading } = useSelector((state) => state.billing);
	const [selectedAccount, setSelectedAccount] = useState(0);
	const [date, setDate] = useState({
		from: new Date(),
		to: addDays(new Date(), 20),
	});

	const formattedBookings = (invoiceHistory || []).map((booking) => ({
		id: booking?.bookingId,
		date: booking?.date
			? new Date(booking?.date).toLocaleDateString('en-GB') +
				' ' +
				booking?.date?.split('T')[1]?.split('.')[0]?.slice(0, 5)
			: '-', // Ensure correct date format
		accNumber: booking?.accNo,
		driver: booking?.userId || '-',
		pickup: `${booking?.pickup}`,
		destination: `${booking?.destination}`,
		passenger: booking?.passenger || 'Unknown',
		hasVias: booking?.hasVias,
		coa: booking?.coa,
		waiting: booking?.waitingMinutes || 0,
		waitingCharge: booking?.waitingPriceDriver || 0,
		phoneNumber: booking?.phoneNumber || '',
		actualMiles: booking?.miles,
		driverFare: booking?.price || 0,
		parking: booking?.parkingCharge || 0,
		total: booking?.totalCost || 0,
		postedForStatement: booking?.postedForStatement,
		details: {
			details: booking?.details || '',
			vias: booking?.vias?.length
				? booking.vias
						.map((via) => `${via.address}, ${via.postCode}`)
						.join(' → ')
				: '',

			scope: booking?.scope === 4 ? 'Card' : 'Cash',
		},
	}));

	// const handlePostButton = async (row) => {
	// 	try {
	// 		const postJob = row?.driverFare > 0 && true;
	// 		const response = await accountPostOrUnpostJobs(postJob, row?.id);
	// 		if (response?.status === 'success') {
	// 			toast.success('Job posted successfully');
	// 			handleSearch();
	// 		} else {
	// 			toast.error('Failed to post job');
	// 		}
	// 	} catch (error) {
	// 		console.error('Failed to post job:', error);
	// 		toast.error('Failed to post job');
	// 	}
	// };

	const handleSearch = async () => {
		dispatch(
			refreshInvoiceHistory(
				format(new Date(date?.from), 'yyyy-MM-dd'),
				format(new Date(date?.to), 'yyyy-MM-dd'),
				selectedAccount
			)
		);
	};

	useEffect(() => {
		dispatch(refreshAllAccounts());
	}, [dispatch]);

	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>
							Showing {invoiceHistory?.length} Invoices{' '}
						</ToolbarDescription>
					</ToolbarHeading>
				</Toolbar>
			</div>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<div className='flex flex-col items-stretch gap-5 lg:gap-7.5'>
					<div className='flex flex-wrap items-center gap-5 justify-between'>
						<div className='card card-grid min-w-full'>
							<div className='card-header flex-wrap gap-2'>
								<div className='flex flex-wrap gap-2 lg:gap-5'>
									{/* <div className='flex'>
										<label
											className='input input-sm hover:shadow-lg'
											style={{ height: '40px' }}
										>
											<KeenIcon icon='magnifier' />
											<input
												type='text'
												placeholder='Search History'
												value={searchInput}
												onChange={(e) => setSearchInput(e.target.value)}
											/>
										</label>
									</div> */}
									<div className='flex flex-wrap items-center gap-2.5'>
										<Popover>
											<PopoverTrigger asChild>
												<button
													id='date'
													className={cn(
														'btn btn-sm btn-light data-[state=open]:bg-light-active',
														!date && 'text-gray-400'
													)}
													style={{ height: '40px' }}
												>
													<KeenIcon
														icon='calendar'
														className='me-0.5'
													/>
													{date?.from ? (
														date.to ? (
															<>
																{format(date.from, 'LLL dd, y')} -{' '}
																{format(date.to, 'LLL dd, y')}
															</>
														) : (
															format(date.from, 'LLL dd, y')
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
													initialFocus
													mode='range'
													defaultMonth={date?.from}
													selected={date}
													onSelect={setDate}
													numberOfMonths={2}
												/>
											</PopoverContent>
										</Popover>

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

										<button
											className='btn btn-sm btn-outline btn-primary'
											style={{ height: '40px' }}
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
													fontWeight: 'bold', // Ensures header text stands out
												},
											}}
										>
											<TableRow>
												<TableCell className='w-8' />{' '}
												{/* Empty Cell for Expand Button */}
												<TableCell className='text-gray-900 dark:text-gray-700'>
													Invoice #
												</TableCell>
												<TableCell className='text-gray-900 dark:text-gray-700'>
													Acc No.
												</TableCell>
												<TableCell className='text-gray-900 dark:text-gray-700'>
													Date
												</TableCell>
												<TableCell className='text-gray-900 dark:text-gray-700'>
													NET
												</TableCell>
												<TableCell className='text-gray-900 dark:text-gray-700'>
													VAT
												</TableCell>
												<TableCell className='text-gray-900 dark:text-gray-700'>
													Total
												</TableCell>
												<TableCell className='text-gray-900 dark:text-gray-700'>
													Download
												</TableCell>
												<TableCell className='text-gray-900 dark:text-gray-700'>
													Paid
												</TableCell>
												<TableCell className='text-gray-900 dark:text-gray-700'>
													Mark As Read
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
											{formattedBookings.map((row) => (
												<>
													<RowNotPriced
														key={row.id}
														row={row}
														invoiceHistory={invoiceHistory}
													/>
												</>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export { InvoiceHistory };
