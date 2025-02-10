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
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
	DataGrid,
	DataGridColumnHeader,
	// useDataGrid,
	// DataGridRowSelectAll,
	// DataGridRowSelect,
} from '@/components';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import {
	refreshWebBookings,
	setWebBooking,
} from '../../../slices/webBookingSlice';
import { AcceptWebBooking } from './acceptWebBooking';
import { RejectWebBooking } from './rejectWebBooking';
function NewBooking() {
	const dispatch = useDispatch();
	const [acceptModal, setAcceptModal] = useState(false);
	const [rejectModal, setRejectModal] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [date, setDate] = useState(new Date());
	const { webBookings } = useSelector((state) => state.webBooking);

	console.log(webBookings);

	useEffect(() => {
		dispatch(refreshWebBookings());
	}, [dispatch]);

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
					<span className={`font-medium ${row.original.color}`}>
						{new Date(
							row.original.pickupDateTime?.split('T')[0]
						)?.toLocaleDateString('en-GB')}{' '}
						{row.original.pickupDateTime?.split('T')[1].split('.')[0]}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
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
					<span className={`font-medium ${row.original.color}`}>
						{row?.original?.pickupAddress}, {row?.original?.pickupPostCode}
					</span>
				),
				meta: { headerClassName: 'min-w-[200px]' },
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
					<span className={`font-medium ${row.original.color}`}>
						{row.original.destinationAddress},{' '}
						{row.original.destinationPostCode}
					</span>
				),
				meta: { headerClassName: 'min-w-[200px]' },
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
			{
				accessorKey: 'phoneNumber',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Phone Number'
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={row.original.color}>{row.original.phoneNumber}</span>
				),
				meta: { headerClassName: 'min-w-[80px]' },
			},

			{
				accessorKey: 'action',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Action'
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<div className='w-full flex justify-start items-center gap-2'>
						{!row?.accepted && (
							<button
								className='btn btn-sm btn-success px-4 py-4'
								onClick={() => {
									setAcceptModal(true);
									dispatch(setWebBooking(row.original));
								}}
							>
								Accept
							</button>
						)}
						{!row?.accepted && (
							<button
								className='btn btn-sm btn-danger px-4 py-4'
								onClick={() => {
									setRejectModal(true);
									dispatch(setWebBooking(row.original));
								}}
							>
								Reject
							</button>
						)}
					</div>
				),
				meta: { headerClassName: 'min-w-[80px]' },
			},
		],
		[]
	);

	const handleCloseAcceptModal = () => {
		setAcceptModal(false);
	};

	const handleCloseRejectModal = () => {
		setRejectModal(false);
	};

	const handleRowSelection = (state) => {
		const selectedRowIds = Object.keys(state);
		if (selectedRowIds.length > 0) {
			alert(`Selected Drivers: ${selectedRowIds.join(', ')}`);
		}
	};
	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>
							Showing {`${webBookings?.length}`} Web Jobs{' '}
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
									<div className='flex'>
										<label
											className='input input-sm'
											style={{ height: '40px' }}
										>
											<KeenIcon icon='magnifier' />
											<input
												type='text'
												placeholder='Search Jobs'
												value={searchInput}
												onChange={(e) => setSearchInput(e.target.value)}
											/>
										</label>
									</div>
									<div className='flex flex-wrap items-center gap-2.5'>
										<Popover>
											<PopoverTrigger asChild>
												<button
													id='date'
													className={cn(
														'input data-[state=open]:border-primary',
														!date && 'text-muted-foreground'
													)}
													style={{ width: '13rem' }}
												>
													<KeenIcon
														icon='calendar'
														className='-ms-0.5'
													/>
													{date ? (
														format(date, 'LLL dd, y')
													) : (
														<span>Pick a date</span>
													)}
												</button>
											</PopoverTrigger>
											<PopoverContent
												className='w-auto p-0'
												align='start'
											>
												<Calendar
													initialFocus
													mode='single' // Single date selection
													defaultMonth={date}
													selected={date}
													onSelect={setDate}
													numberOfMonths={1}
												/>
											</PopoverContent>
										</Popover>

										<Select defaultValue='all'>
											<SelectTrigger
												className='w-28'
												size='sm'
												style={{ height: '40px' }}
											>
												<SelectValue placeholder='Select' />
											</SelectTrigger>
											<SelectContent className='w-32'>
												<SelectItem value='all'>All</SelectItem>
												<SelectItem value='cash'>Cash</SelectItem>
												<SelectItem value='card'>Card</SelectItem>
												<SelectItem value='account'>Account</SelectItem>
												<SelectItem value='rank'>Rank</SelectItem>
											</SelectContent>
										</Select>

										<button
											className='btn btn-sm btn-outline btn-primary'
											style={{ height: '40px' }}
										>
											<KeenIcon icon='magnifier' /> Search
										</button>
									</div>
								</div>
							</div>
							<div className='card-body'>
								<DataGrid
									columns={columns}
									data={webBookings}
									rowSelection={true}
									onRowSelectionChange={handleRowSelection}
									pagination={{ size: 10 }}
									sorting={[{ id: 'driver', desc: false }]}
									layout={{ card: true }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{acceptModal && (
				<AcceptWebBooking
					open={acceptModal}
					onOpenChange={handleCloseAcceptModal}
				/>
			)}
			{rejectModal && (
				<RejectWebBooking
					open={rejectModal}
					onOpenChange={handleCloseRejectModal}
				/>
			)}
		</Fragment>
	);
}

export { NewBooking };
