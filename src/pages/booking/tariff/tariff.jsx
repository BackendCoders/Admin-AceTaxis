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
} from '@/components';
import { Input } from '@/components/ui/input';

const Tariff = () => {
	const [tariffData, setTariffData] = useState([
		{
			id: 1,
			name: 'Tariff 1 : Day Rate',
			description: 'Chargeable from 7am until 10pm.',
			initialCharge: 0,
			firstMileCharge: 4.4,
			additionalMileCharge: 2.8,
		},
		{
			id: 2,
			name: 'Tariff 2 : Day Rate',
			description:
				'Chargeable from 10pm until 7am and on Sundays and Bank Holidays except where tariff 3 applies.',
			initialCharge: 0,
			firstMileCharge: 6.6,
			additionalMileCharge: 4.2,
		},
		{
			id: 3,
			name: 'Tariff 3 : Day Rate',
			description:
				"Chargeable on Christmas Day, Boxing Day, New Year's Day. Plus from 6pm on Christmas Eve and New Year's Eve.",
			initialCharge: 0,
			firstMileCharge: 8.8,
			additionalMileCharge: 5.6,
		},
	]);

	const handleInputChange = (id, field, value) => {
		const updatedTariffs = tariffData.map((tariff) =>
			tariff.id === id ? { ...tariff, [field]: parseFloat(value) || 0 } : tariff
		);
		setTariffData(updatedTariffs);
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
				accessorKey: 'name',
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Tariff Name'
						filter={<ColumnInputFilter column={column} />}
						column={column}
						// className="justify-center"
					/>
				),
				enableSorting: true,
				cell: ({ row }) => <div className='p-2'>{row.original.name}</div>,
				meta: { headerClassName: 'w-40 text-center' },
			},
			{
				accessorKey: 'description',
				// header: "Description",
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Description'
						filter={<ColumnInputFilter column={column} />}
						column={column}
						// className="justify-center"
					/>
				),
				enableSorting: true,
				cell: ({ row }) => (
					<div className='p-2'>{row.original.description}</div>
				),
				meta: { headerClassName: 'w-60 text-left' },
			},
			{
				accessorKey: 'initialCharge',
				// header: "Initial Charge",
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Initial Charge'
						filter={<ColumnInputFilter column={column} />}
						column={column}
						// className="justify-center"
					/>
				),
				cell: ({ row }) => (
					<input
						type='number'
						className='w-16 text-center border rounded p-1 dark:bg-inherit dark:ring-inherit'
						value={row.original.initialCharge}
						onChange={(e) =>
							handleInputChange(
								row.original.id,
								'initialCharge',
								e.target.value
							)
						}
					/>
				),
				meta: { headerClassName: 'w-20 text-center' },
			},
			{
				accessorKey: 'firstMileCharge',
				// header: "First Mile Charge",
				header: ({ column }) => (
					<DataGridColumnHeader
						title='First Mile Charge'
						filter={<ColumnInputFilter column={column} />}
						column={column}
						// className="justify-center"
					/>
				),
				cell: ({ row }) => (
					<input
						type='number'
						className='w-16 text-center border rounded p-1 dark:bg-inherit dark:ring-inherit'
						value={row.original.firstMileCharge}
						onChange={(e) =>
							handleInputChange(
								row.original.id,
								'firstMileCharge',
								e.target.value
							)
						}
					/>
				),
				meta: { headerClassName: 'w-20 text-center' },
			},
			{
				accessorKey: 'additionalMileCharge',
				// header: "Additional Mile Charge",
				header: ({ column }) => (
					<DataGridColumnHeader
						title='Additional Mile Charge'
						filter={<ColumnInputFilter column={column} />}
						column={column}
						// className="justify-center"
					/>
				),
				cell: ({ row }) => (
					<input
						type='number'
						className='w-16 text-center border rounded p-1 dark:bg-inherit dark:ring-inherit'
						value={row.original.additionalMileCharge}
						onChange={(e) =>
							handleInputChange(
								row.original.id,
								'additionalMileCharge',
								e.target.value
							)
						}
					/>
				),
				meta: { headerClassName: 'w-20 text-center' },
			},
		],
		[tariffData]
	);

	const handleUpdateTariffs = () => {
		alert('Tariff updated successfully!');
	};

	return (
		<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
			<h2 className='text-2xl font-semibold text-gray-700 mb-8'>
				Tariff Configuration
			</h2>

			{/* Table */}
			<DataGrid
				columns={columns}
				data={tariffData}
				rowSelection={false}
				pagination={{ size: 5 }}
				sorting={[{ id: 'name', desc: false }]}
				layout={{ card: true }}
			/>

			{/* Update Button */}
			<div className='mt-4'>
				<button
					className='btn btn-sm btn-primary px-4 py-4'
					onClick={handleUpdateTariffs}
				>
					UPDATE TARIFF
				</button>
			</div>
		</div>
	);
};

export { Tariff };
