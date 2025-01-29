/** @format */

import { Fragment, useMemo, useState } from 'react';
import {
	Toolbar,
	ToolbarDescription,
	ToolbarHeading,
	ToolbarActions,
	ToolbarPageTitle,
} from '@/partials/toolbar';
import { KeenIcon } from '@/components';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
import { Container } from '@/components/container';
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { cn } from '@/lib/utils';
import {
	DataGrid,
	DataGridColumnHeader,
	// useDataGrid,
	// DataGridRowSelectAll,
	// DataGridRowSelect,
} from '@/components';
import { Input } from '@/components/ui/input';
import { AddLocalPoi } from '../addLocalPoi';
import { EditLocalPoi } from '../editLocalPoi';
import { useDispatch } from 'react-redux';
import { setLocalPOI } from '../../../slices/localPOISlice';
import { DeleteLocalPoi } from '../deleteLocalPoi';
function ListLocalPoi() {
	const dispatch = useDispatch();
	const [searchInput, setSearchInput] = useState('');
	const [createLocalPoiModal, setCreateLocalPoiModal] = useState(false);
	const [editLocalPoiModal, setEditLocalPoiModal] = useState(false);
	const [deleteLocalPoiModal, setDeleteLocalPoiModal] = useState(false);
	// const [date, setDate] = useState(new Date());
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
				accessorKey: 'name',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Name'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`p-2 rounded-md`}>{row.original.name}</span>
				),
				meta: { headerClassName: 'w-20' },
			},
			{
				accessorKey: 'postcode',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Postcode'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.postcode}
					</span>
				),
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'address',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Address'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.address}
					</span>
				),
				meta: { headerClassName: 'min-w-[80px]' },
			},
			{
				accessorKey: 'type',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Type'
						filter={<ColumnInputFilter column={column} />}
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<span className={`font-medium ${row.original.color}`}>
						{row.original.type}
					</span>
				),
				meta: { headerClassName: 'min-w-[200px]' },
			},
			{
				accessorKey: 'action',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Actions'
						column={column}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<div className='w-full flex justify-start items-center gap-2'>
						<button
							className='rounded-full px-2 py-2  w-8 h-8 flex justify-center items-center hover:bg-red-100 group'
							onClick={() => {
								dispatch(setLocalPOI(row));
								setEditLocalPoiModal(true);
							}}
						>
							<KeenIcon
								icon='pencil'
								className='group-hover:text-red-600'
							/>
						</button>
						<button
							className='rounded-full px-2 py-2  w-8 h-8 flex justify-center items-center hover:bg-red-100 group'
							onClick={() => {
								dispatch(setLocalPOI(row));
								setDeleteLocalPoiModal(true);
							}}
						>
							<KeenIcon
								icon='trash'
								className='group-hover:text-red-600'
							/>
						</button>
					</div>
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

	const handleClose = () => {
		if (createLocalPoiModal) {
			setCreateLocalPoiModal(false);
			return;
		}
		if (editLocalPoiModal) {
			setEditLocalPoiModal(false);
			return;
		}

		if (deleteLocalPoiModal) {
			setDeleteLocalPoiModal(false);
			return;
		}
	};

	return (
		<Fragment>
			<Container>
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>Showing {'23'} Local POIs </ToolbarDescription>
					</ToolbarHeading>
					<ToolbarActions>
						<button
							className='btn btn-sm btn-primary px-4 py-4'
							onClick={() => setCreateLocalPoiModal(true)}
						>
							Add New POI
						</button>
					</ToolbarActions>
				</Toolbar>
			</Container>
			<Container>
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
												placeholder='Search Local POIs'
												value={searchInput}
												onChange={(e) => setSearchInput(e.target.value)}
											/>
										</label>
									</div>
									{/* <div className='flex items-center gap-2.5'>
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
									</div> */}
								</div>
							</div>
							<div className='card-body'>
								<DataGrid
									columns={columns}
									data={driversData}
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
			</Container>
			{createLocalPoiModal && (
				<AddLocalPoi
					open={createLocalPoiModal}
					onOpenChange={handleClose}
				/>
			)}
			{editLocalPoiModal && (
				<EditLocalPoi
					open={editLocalPoiModal}
					onOpenChange={handleClose}
				/>
			)}
			{deleteLocalPoiModal && (
				<DeleteLocalPoi
					open={deleteLocalPoiModal}
					onOpenChange={handleClose}
				/>
			)}
		</Fragment>
	);
}

export { ListLocalPoi };
