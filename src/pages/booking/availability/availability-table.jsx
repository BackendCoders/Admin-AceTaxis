/**
 * eslint-disable prettier/prettier
 *
 * @format
 */

import { useMemo, useState } from 'react';
import {
	DataGrid,
	DataGridColumnHeader,
	useDataGrid,
	DataGridRowSelectAll,
	DataGridRowSelect,
} from '@/components';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const AvailabilityTable = () => {
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
				accessorKey: 'driver',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Driver #'
						filter={<ColumnInputFilter column={column} />}
						column={column}
                        className={` justify-center`}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<div
						className={`p-2 rounded-md text-center text-white ${row.original.color}`}
					>
						{row.original.driver}
					</div>
				),
				meta: { headerClassName: 'w-20 text-center' },
			},
			{
				accessorKey: 'name',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Full Name'
						filter={<ColumnInputFilter column={column} />}
						column={column}
                        className={` justify-center`}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<div
						className={`p-2 rounded-md text-center text-white ${row.original.color}`}
					>
						{row.original.name}
					</div>
				),
				meta: { headerClassName: 'min-w-[200px] text-center' },
			},
			{
				accessorKey: 'details',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Details'
						column={column}
                        className={` justify-center`}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<div
						className={`p-2 rounded-md text-center text-white ${row.original.color}`}
					>
						{row.original.details}
					</div>
				),
				meta: { headerClassName: 'min-w-[180px] text-center' },
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

	const Toolbar = () => {
		const { table } = useDataGrid();
		const [searchInput, setSearchInput] = useState('');
		return (
			<div className='card-header flex-wrap gap-2 border-b-0 px-5'>
				<h3 className='card-title font-medium text-sm'>
					Showing {driversData.length} Drivers
				</h3>
				<div className='flex flex-wrap gap-2 lg:gap-5'>
					<div className='flex'>
						<label className='input input-sm'>
							<input
								type='text'
								placeholder='Search drivers'
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
						</label>
					</div>
					<div className='flex flex-wrap gap-2.5'>
						<Select defaultValue='all'>
							<SelectTrigger
								className='w-28'
								size='sm'
							>
								<SelectValue placeholder='Filter' />
							</SelectTrigger>
							<SelectContent className='w-32'>
								<SelectItem value='all'>All</SelectItem>
								<SelectItem value='morning'>Morning Shift</SelectItem>
								<SelectItem value='evening'>Evening Shift</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		);
	};

	return (
		<DataGrid
			columns={columns}
			data={driversData}
			rowSelection={true}
			onRowSelectionChange={handleRowSelection}
			pagination={{ size: 5 }}
			sorting={[{ id: 'driver', desc: false }]}
			toolbar={<Toolbar />}
			layout={{ card: true }}
		/>
	);
};

export { AvailabilityTable };
