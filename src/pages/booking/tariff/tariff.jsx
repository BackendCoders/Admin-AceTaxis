/**
 * eslint-disable prettier/prettier
 *
 * @format
 */

import { useEffect, useMemo, useState } from 'react';
import {
	DataGrid,
	DataGridColumnHeader,
	// useDataGrid,
} from '@/components';
import { Input } from '@/components/ui/input';
import {
	getTariffConfig,
	setTariffConfig,
} from '../../../service/operations/settingsApi';
import toast from 'react-hot-toast';

const Tariff = () => {
	const [tariffData, setTariffData] = useState([]);

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

	const handleUpdateTariffs = async () => {
		try {
			console.log('updated tariff data', tariffData);
			const response = await setTariffConfig(tariffData);
			if (response.status === 'success') {
				toast.success('Tariff Updated Successfully');
			} else {
				toast.error('Unable to update Tariff');
				console.error('Failed to update Tariff Data:', response.message);
			}
		} catch (error) {
			console.log(error);
			toast.error('Unable to update Tariff');
			console.error('Failed to update Tariff Data:', error.message);
		}
	};

	useEffect(() => {
		async function getTariff() {
			try {
				const response = await getTariffConfig();
				if (response.status === 'success') {
					const tariffArray = Object.keys(response)
						.filter((key) => key !== 'status')
						.map((key) => response[key]);
					setTariffData(tariffArray);
				} else {
					toast.error('Unable to fetch Tariff Data');
					console.error('Failed to fetch Tariff Data:', response.message);
				}
			} catch (error) {
				console.log(error);
			}
		}

		getTariff();
	}, []);

	return (
		<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
			<h2 className='text-xl leading-none font-medium text-gray-900 mb-8'>
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
