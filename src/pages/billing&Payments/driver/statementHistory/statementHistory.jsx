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
import { Input } from '@/components/ui/input';
import { refreshAllDrivers } from '../../../../slices/driverSlice';
import { useDispatch, useSelector } from 'react-redux';
function StatementHistory() {
	const dispatch = useDispatch();
	const { drivers } = useSelector((state) => state.driver);
	const [selectedDriver, setSelectedDriver] = useState(0);
	const [searchInput, setSearchInput] = useState('');
	const [date, setDate] = useState({
		from: new Date(),
		to: addDays(new Date(), 20),
	});
	const driversData = useMemo(
		() => [
			{
				driver: 10,
				name: 'Alan Waistell',
				details: '00:00 - 23:59',
				color: 'bg-yellow-500',
			},
			{
				driver: 13,
				name: 'Lee Harrison',
				details: '00:00 - 23:59',
				color: 'bg-blue-300',
			},
			{
				driver: 30,
				name: 'Richard Elgar',
				details: '07:30 - 17:30',
				color: 'bg-red-400',
			},
			{
				driver: 16,
				name: 'James Owen',
				details: '07:00 - 17:00 (+/-)',
				color: 'bg-gray-700 text-white font-bold',
			},
			{
				driver: 14,
				name: 'Andrew James',
				details: '07:30 - 17:30',
				color: 'bg-green-500',
			},
			{
				driver: 4,
				name: 'Paul Barber',
				details: '07:00 - 18:00',
				color: 'bg-green-400',
			},
			{
				driver: 12,
				name: 'Chris Gray',
				details: '07:00 - 16:00',
				color: 'bg-blue-700 text-white font-bold',
			},
			{
				driver: 5,
				name: 'Mark Phillips',
				details: '07:00 - 16:30',
				color: 'bg-pink-500',
			},
			{
				driver: 11,
				name: 'Nigel Reynolds',
				details: '07:00 - 17:00',
				color: 'bg-gray-400',
			},
			{
				driver: 2,
				name: 'Kate Hall',
				details: '07:00 - 22:30',
				color: 'bg-purple-400',
			},
			{
				driver: 8,
				name: 'Peter Farrell',
				details: '08:20 - 10:00',
				color: 'bg-purple-200',
			},
			{
				driver: 7,
				name: 'Caroline Stimson',
				details: '11:00 - 17:00',
				color: 'bg-red-200',
			},
			{
				driver: 6,
				name: 'Rob Holton',
				details: '07:00 - 22:00',
				color: 'bg-blue-400',
			},
			{
				driver: 31,
				name: 'Bill Wood',
				details: '16:00 - 17:00',
				color: 'bg-red-300',
			},
			{
				driver: 26,
				name: 'Charles Farnham',
				details: '07:00 - 17:00 (all routes)',
				color: 'bg-blue-800 text-white font-bold',
			},
			{
				driver: 18,
				name: 'Jean Williams',
				details: '07:30 - 09:15 (AM SR)',
				color: 'bg-yellow-400',
			},
		],
		[]
	);

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
				accessorKey: 'userId',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='User Id'
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
				accessorKey: 'cash',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Cash'
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
				accessorKey: 'account',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Account'
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
				accessorKey: 'rank',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Rank'
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
				accessorKey: 'comms',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Comms'
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
				accessorKey: 'grossTotal',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Gross Total'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.grossTotal}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'netTotal',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Net Total'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.netTotal}
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

	useEffect(() => {
		dispatch(refreshAllDrivers());
	}, [dispatch]);

	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>Showing {'16'} History </ToolbarDescription>
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
									</div>
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
									data={driversData}
									rowSelection={true}
									onRowSelectionChange={handleRowSelection}
									pagination={{ size: 10 }}
									sorting={[{ id: 'userId', desc: false }]}
									layout={{ card: true }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export { StatementHistory };
