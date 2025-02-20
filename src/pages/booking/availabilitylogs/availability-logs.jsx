/** @format */
import { Fragment, useMemo, useState } from 'react';
import {
	Toolbar,
	ToolbarDescription,
	ToolbarHeading,
	ToolbarPageTitle,
} from '@/partials/toolbar';
import {
	DataGrid,
	DataGridColumnHeader,
	// useDataGrid,
	// DataGridRowSelectAll,
	// DataGridRowSelect,
} from '@/components';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import {
	refreshAvailabilityLog,
	setAvailabilityLog,
} from '../../../slices/availabilitySlice';
import toast from 'react-hot-toast';

const AvailabilityLogs = () => {
	const dispatch = useDispatch();
	const { availabilityLog, loading } = useSelector(
		(state) => state.availability
	);
	const [driverNumber, setDriverNumber] = useState(0);
	const [date, setDate] = useState(new Date());

	const handleSearch = async () => {
		if (!driverNumber.trim()) {
			toast.error('Please enter a booking ID');
			dispatch(setAvailabilityLog([])); // Reset table if input is empty
			return;
		}
		console.log(new Date(date));
		dispatch(
			refreshAvailabilityLog(driverNumber, format(new Date(date), 'yyyy-MM-dd'))
		);
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
					<span className={`font-medium ${row.original.color}`}>
						{row.original.forDate
							? new Date(row.original.forDate).toLocaleDateString('en-GB') +
								' ' +
								row.original.forDate.split('T')[1]?.split('.')[0]?.slice(0, 5)
							: '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'theChange',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='The Change'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.theChange ? row.original.theChange : '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[200px]' },
			},
			{
				accessorKey: 'changedOn',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Changed On'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.changedOn
							? new Date(row.original.changedOn).toLocaleDateString('en-GB') +
								' ' +
								row.original.changedOn.split('T')[1]?.split('.')[0]?.slice(0, 5)
							: '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[200px]' },
			},
			{
				accessorKey: 'Changed by User',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Changed by User'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.changeBy ? row.original.changeBy : '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[80px]' },
			},

			{
				accessorKey: 'driver',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Driver #'
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={row.original.color}>
						{row.original.userId ? row.original.userId : '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[80px]' },
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
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>
							{availabilityLog.length > 0
								? `Showing ${availabilityLog.length} Availability Logs for Driver #: ${driverNumber}`
								: 'Search for Availability Log'}
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
									<div className='flex gap-2'>
										<label
											className='input input-sm'
											style={{ height: '40px' }}
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
											<PopoverTrigger asChild>
												<div className='relative'>
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
													{date && (
														<button
															onClick={(e) => {
																e.stopPropagation(); // Prevent closing popover
																setDate(undefined); // Clear date
															}}
															className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
														>
															<KeenIcon
																icon='cross-circle'
																className=''
															/>
														</button>
													)}
												</div>
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
								{availabilityLog.length > 0 ? (
									<DataGrid
										columns={columns}
										data={availabilityLog}
										rowSelection={true}
										onRowSelectionChange={handleRowSelection}
										pagination={{ size: 10 }}
										sorting={[{ id: 'driver', desc: false }]}
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
};

export { AvailabilityLogs };
