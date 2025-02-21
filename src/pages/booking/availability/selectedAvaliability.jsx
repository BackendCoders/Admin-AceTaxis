/**
 * eslint-disable prettier/prettier
 *
 * @format
 */
import { KeenIcon } from '@/components';
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
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvailability } from '../../../service/operations/availabilityApi';
import toast from 'react-hot-toast';
import { refreshAvailability } from '../../../slices/availabilitySlice';
import { format } from 'date-fns';

const SelectedAvailabilityTable = ({ selectedDriver, selectedDate }) => {
	const dispatch = useDispatch();
	const { availability } = useSelector((state) => state.availability);

	const handleDelete = async (driver) => {
		try {
			const response = await deleteAvailability(driver?.userId);
			if (response.status === 'success') {
				toast.success('Driver Availability deleted successfully');
				dispatch(
					refreshAvailability(
						selectedDriver,
						format(new Date(selectedDate), "yyyy-MM-dd'T'00:00:00'Z'")
					)
				);
			} else {
				toast.error('Failed to delete driver Availability');
			}
		} catch (error) {
			console.error('Error deleting driver Availability:', error);
			toast.error('Error deleting driver Availability');
		}
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
				accessorKey: 'type',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Type'
						filter={<ColumnInputFilter column={column} />}
						column={column}
						className={` justify-center`}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<div className={`p-2 rounded-md text-center text-white `}>
						{row.original.driver}
					</div>
				),
				meta: { headerClassName: 'w-20 text-center' },
			},
			{
				accessorKey: 'driver',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Driver '
						filter={<ColumnInputFilter column={column} />}
						column={column}
						className={` justify-center`}
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<div className={`p-2 rounded-md text-center text-gray-700`}>
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
					<div className={`p-2 rounded-md text-center text-gray-700`}>
						{row.original.details}
					</div>
				),
				meta: { headerClassName: 'min-w-[180px] text-center' },
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
							onClick={() => handleDelete(row?.original)}
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
			data={availability}
			rowSelection={true}
			onRowSelectionChange={handleRowSelection}
			pagination={{ size: 5 }}
			sorting={[{ id: 'driver', desc: false }]}
			toolbar={<Toolbar />}
			layout={{ card: true }}
		/>
	);
};

export { SelectedAvailabilityTable };
