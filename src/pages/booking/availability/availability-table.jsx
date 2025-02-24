/**
 * eslint-disable prettier/prettier
 *
 * @format
 */

import { useMemo, useState } from 'react';
import {
	DataGrid,
	DataGridColumnHeader,
	// useDataGrid,
	// DataGridRowSelectAll,
	// DataGridRowSelect,
} from '@/components';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useSelector } from 'react-redux';
import isLightColor from '../../../utils/isLight';

const AvailabilityTable = () => {
	const { allAvailability } = useSelector((state) => state.availability);

	console.log('availability', allAvailability);

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
						className={`p-2 rounded-md text-center`}
						style={{
							backgroundColor: row.original?.colorCode,
							color: isLightColor(row.original?.colorCode) ? 'black' : 'white',
						}}
					>
						{row.original.userId}
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
					<div className={`p-2 rounded-md text-center text-gray-700`}>
						{row.original.fullName}
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
					<div className={`p-2 rounded-md text-center text-gray-700`}>
						{row.original.availableHours}
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
		const [searchInput, setSearchInput] = useState('');
		return (
			<div className='card-header flex-wrap gap-2 border-b-0 px-5'>
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
			data={allAvailability[0]}
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
