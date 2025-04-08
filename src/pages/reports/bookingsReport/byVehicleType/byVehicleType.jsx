/** @format */
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
import { addDays, format } from 'date-fns';
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
	refreshVehicleTypeCounts,
	setVehicleTypeCounts,
} from '../../../../slices/reportSlice';

function ByVehicleType() {
	const dispatch = useDispatch();
	const { vehicleTypesCounts } = useSelector((state) => state.reports);
	const [searchInput, setSearchInput] = useState('');
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState({
		from: new Date(),
		to: addDays(new Date(), 20),
	});
	const [tempRange, setTempRange] = useState(date);
	const [scope, setScope] = useState(3);
	console.log(vehicleTypesCounts);
	useEffect(() => {
		if (openDate) {
			setTempRange({ from: null, to: null });
		}
	}, [openDate]);

	const handleDateSelect = (range) => {
		setTempRange(range);
		if (range?.from && range?.to) {
			setDate(range);
			setOpenDate(false);
		}
	};
	// const handleClick = () => {
	// 	dispatch(
	// 		refreshBookingsByStatus(
	// 			format(new Date(date), "yyyy-MM-dd'T'00:00:00'Z'"),
	// 			scope,
	// 			status || ''
	// 		)
	// 	);
	// };

	useEffect(() => {
		// Agar status, scope ya date change hota hai to API call karega
		dispatch(
			refreshVehicleTypeCounts(
				format(new Date(date.from), "yyyy-MM-dd'T'00:00:00'Z'"),
				format(new Date(date.to), "yyyy-MM-dd'T'00:00:00'Z'"),
				scope
			)
		);
	}, [date, scope, dispatch]);

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

	const columns = useMemo(() => {
		let baseColumns = [
			{
				accessorKey: 'id',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'># id</span>
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`p-2 rounded-md`}>{row.original.id}</span>
				),
				meta: { headerClassName: 'w-20' },
			},
			{
				accessorKey: 'pickupDateTime',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'>Date</span>
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.pickupDateTime
							? new Date(row.original.pickupDateTime).toLocaleDateString(
									'en-GB'
								) +
								' ' +
								row.original.pickupDateTime
									.split('T')[1]
									?.split('.')[0]
									?.slice(0, 5)
							: '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'pickupAddress',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'>Pickup</span>
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.pickupAddress}, {row.original.pickupPostCode}
					</span>
				),
				meta: { headerClassName: 'min-w-[200px]' },
			},
			{
				accessorKey: 'destinationAddress',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'>Destination</span>
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
						title=<span className='font-bold'>Passenger</span>
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={row.original.color}>
						{row.original.passengerName}
					</span>
				),
				meta: { headerClassName: 'min-w-[80px]' },
			},
			{
				accessorKey: 'passengers',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'>Pax</span>
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={row.original.color}>{row.original.passengers}</span>
				),
				meta: { headerClassName: 'min-w-[80px]' },
			},
		];

		return baseColumns;
	}, []);

	const handleRowSelection = (state) => {
		const selectedRowIds = Object.keys(state);
		if (selectedRowIds.length > 0) {
			alert(`Selected Drivers: ${selectedRowIds.join(', ')}`);
		}
	};

	const filteredBookings = useMemo(() => {
		return vehicleTypesCounts.filter((booking) => {
			const search = searchInput.toLowerCase();
			return (
				booking.id?.toString().includes(search) || // Search by Booking ID
				booking.passengerName?.toLowerCase().includes(search) || // Search by Passenger Name
				booking.pickupAddress?.toLowerCase().includes(search) || // Search by Pickup Address
				booking.destinationAddress?.toLowerCase().includes(search) // Search by Destination
			);
		});
	}, [vehicleTypesCounts, searchInput]);

	useEffect(() => {
		return () => {
			dispatch(setVehicleTypeCounts([])); // Clear table data
		};
	}, [dispatch]);
	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>
							Showing {vehicleTypesCounts?.length} Report(s){' '}
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
											style={{ height: '40px', marginTop: '1rem' }}
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
										<div className='flex flex-col'>
											<label className='form-label'>Date Range</label>
											<Popover
												open={openDate}
												onOpenChange={setOpenDate}
											>
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
														selected={tempRange}
														onSelect={handleDateSelect}
														numberOfMonths={2}
													/>
												</PopoverContent>
											</Popover>
										</div>

										<div className='flex flex-col'>
											<label className='form-label'>Scope</label>
											<Select
												value={scope}
												onValueChange={(value) => setScope(value)}
											>
												<SelectTrigger
													className='w-28'
													size='sm'
													style={{ height: '40px' }}
												>
													<SelectValue placeholder='Select' />
												</SelectTrigger>
												<SelectContent className='w-32'>
													<SelectItem value={3}>All</SelectItem>
													<SelectItem value={0}>Cash</SelectItem>
													<SelectItem value={4}>Card</SelectItem>
													<SelectItem value={1}>Account</SelectItem>
													<SelectItem value={2}>Rank</SelectItem>
												</SelectContent>
											</Select>
										</div>

										{/* <button
							className='btn btn-sm btn-outline btn-primary'
							style={{ height: '40px' }}
							onClick={handleClick}
							disabled={loading}
						>
							<KeenIcon icon='magnifier' />{' '}
							{loading ? 'Searching...' : 'Search'}
						</button> */}
									</div>
								</div>
							</div>
							<div className='card-body'>
								{filteredBookings.length ? (
									<DataGrid
										columns={columns}
										data={filteredBookings}
										rowSelection={true}
										onRowSelectionChange={handleRowSelection}
										pagination={{ size: 10 }}
										sorting={[{ id: 'id', desc: false }]}
										layout={{ card: true }}
									/>
								) : (
									<div className='text-center py-10 text-gray-500'>
										No data found
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export { ByVehicleType };
