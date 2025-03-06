/** @format */
import { Fragment, useEffect, useMemo, useState } from 'react';
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
import toast from 'react-hot-toast';
import {
	refreshDriversExpenses,
	setDriverExpenses,
} from '../../../slices/driverSlice';

const DriverExpenses = () => {
	const dispatch = useDispatch();
	const {
		driverExpenses: { data, total },
		loading,
	} = useSelector((state) => state.driver);
	const [driverNumber, setDriverNumber] = useState(0);
	const [dateRange, setDateRange] = useState({
		from: new Date(), // December 28, 2024
		to: new Date(), // January 28, 2025
	});

	const handleSearch = async () => {
		if (!driverNumber?.trim()) {
			toast.error('Please enter a Driver Id');
			dispatch(setDriverExpenses({})); // Reset table if input is empty
			return;
		}
		const payload = {
			userId: Number(driverNumber),
			from: format(new Date(dateRange?.from), 'yyyy-MM-dd'),
			to: format(new Date(dateRange?.to), 'yyyy-MM-dd'),
		};
		dispatch(refreshDriversExpenses(payload));
	};

	useEffect(() => {
		return () => {
			dispatch(setDriverExpenses({})); // Clear table data
		};
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
				accessorKey: 'date',
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
						{row.original.date
							? new Date(row.original.date).toLocaleDateString('en-GB') +
								' ' +
								row.original.date.split('T')[1]?.split('.')[0]?.slice(0, 5)
							: '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'description',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'>Description</span>
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.description ? row.original.description : '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[200px]' },
			},
			{
				accessorKey: 'category',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'>Category</span>
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.category ? row.original.category : '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[200px]' },
			},
			{
				accessorKey: 'amount',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'>Amount</span>
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.amount ? row.original.amount : '-'}
					</span>
				),
				meta: { headerClassName: 'min-w-[80px]' },
			},

			{
				accessorKey: 'userId',
				header: ({ column }) => (
					<DataGridColumnHeader
						title=<span className='font-bold'>Driver #</span>
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
							{data?.length > 0
								? `Showing £ ${total?.toFixed(2)} Total Driver Expense for Driver #: ${driverNumber}`
								: 'Search for Driver Expense'}
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
											className='input input-sm w-36'
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
											<PopoverTrigger
												asChild
												className='h-10'
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
								{data?.length > 0 ? (
									<DataGrid
										columns={columns}
										data={data}
										rowSelection={true}
										onRowSelectionChange={handleRowSelection}
										pagination={{ size: 10 }}
										sorting={[{ id: 'date', desc: false }]}
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

export { DriverExpenses };
