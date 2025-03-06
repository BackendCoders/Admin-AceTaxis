/** @format */

import { DataGrid, KeenIcon } from '@/components';
import { toast } from 'sonner';
import { useState, useMemo, useEffect } from 'react';

import { useSelector } from 'react-redux';
import isLightColor from '../../../../../utils/isLight';
import { DayEarning } from './DriverDaysEarning';

const EntryCallout = () => {
	const { driverWeeksEarnings } = useSelector((state) => state.dashboard);
	const [searchQuery, setSearchQuery] = useState('');
	const [tableData, setTableData] = useState([]);
	console.log(driverWeeksEarnings);

	useEffect(() => {
		if (driverWeeksEarnings) {
			setTableData(driverWeeksEarnings);
		}
	}, [driverWeeksEarnings]);

	const columns = useMemo(
		() => [
			{
				accessorKey: 'identifier',
				header: 'Driver',
				enableSorting: true,
				cell: (info) => {
					const rowData = info.row.original;
					const bgColor = rowData.colourCode || '#ffffff'; // Default to white if color is missing

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor, // ✅ Apply background color dynamically
								color: isLightColor(bgColor) ? 'black' : 'white', // ✅ Ensure readable text
							}}
						>
							{info.getValue()}
						</div>
					);
				},
				meta: { headerClassName: 'min-w-[120px]' },
			},
			{
				accessorKey: 'jobsCount',
				header: 'Jobs',
				enableSorting: true,
				cell: ({ row, getValue }) => {
					const bgColor = row.original?.colourCode || '#ffffff';
					const textColor = isLightColor(bgColor) ? 'black' : 'white';

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor,
								color: textColor,
							}}
						>
							{getValue()}
						</div>
					);
				},
				meta: { headerClassName: 'w-12' },
			},
			{
				accessorKey: 'cashEarned',
				header: 'Cash',
				enableSorting: true,
				cell: ({ row, getValue }) => {
					const bgColor = row.original?.colourCode || '#ffffff';
					const textColor = isLightColor(bgColor) ? 'black' : 'white';

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor,
								color: textColor,
							}}
						>
							£{getValue()?.toFixed(2)}
						</div>
					);
				},
				// cell: (info) => (
				// 	<div className='flex items-center gap-1'>
				// 		<span>{info.getValue()}</span>
				// 	</div>
				// ),
				meta: { headerClassName: 'min-w-[80px]' },
			},
			{
				accessorKey: 'accEarned',
				header: 'Acc',
				enableSorting: true,
				cell: ({ row, getValue }) => {
					const bgColor = row.original?.colourCode || '#ffffff';
					const textColor = isLightColor(bgColor) ? 'black' : 'white';

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor,
								color: textColor,
							}}
						>
							£{getValue()?.toFixed(2)}
						</div>
					);
				},
				// cell: (info) => (
				// 	<div className='flex items-center gap-1'>
				// 		<span>£{info.getValue()?.toFixed(2)}</span>
				// 	</div>
				// ),
				meta: { headerClassName: 'w-12' },
			},
			{
				accessorKey: 'rankEarned',
				header: 'Rank',
				enableSorting: true,
				cell: ({ row, getValue }) => {
					const bgColor = row.original?.colourCode || '#ffffff';
					const textColor = isLightColor(bgColor) ? 'black' : 'white';

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor,
								color: textColor,
							}}
						>
							£{getValue()?.toFixed(2)}
						</div>
					);
				},
				// cell: (info) => (
				// 	<div className='flex items-center gap-1'>
				// 		<span>£{info.getValue()?.toFixed(2)}</span>
				// 	</div>
				// ),
				meta: { headerClassName: 'w-12' },
			},
			{
				accessorKey: 'commissionCash',
				header: 'Cash Comms',
				enableSorting: true,
				cell: ({ row, getValue }) => {
					const bgColor = row.original?.colourCode || '#ffffff';
					const textColor = isLightColor(bgColor) ? 'black' : 'white';

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor,
								color: textColor,
							}}
						>
							£{getValue()?.toFixed(2)}
						</div>
					);
				},
				// cell: (info) => (
				// 	<div className='flex items-center gap-1'>
				// 		<span>£{info.getValue()?.toFixed(2)}</span>
				// 	</div>
				// ),
				meta: { headerClassName: 'w-12' },
			},
			{
				accessorKey: 'commissionRank',
				header: 'Rank Comms',
				enableSorting: true,
				cell: ({ row, getValue }) => {
					const bgColor = row.original?.colourCode || '#ffffff';
					const textColor = isLightColor(bgColor) ? 'black' : 'white';

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor,
								color: textColor,
							}}
						>
							£{getValue()?.toFixed(2)}
						</div>
					);
				},
				// cell: (info) => (
				// 	<div className='flex items-center gap-1'>
				// 		<span>£{info.getValue()?.toFixed(2)}</span>
				// 	</div>
				// ),
				meta: { headerClassName: 'w-12' },
			},
			{
				accessorKey: 'takeHome',
				header: 'Total',
				enableSorting: true,
				cell: ({ row, getValue }) => {
					const bgColor = row.original?.colourCode || '#ffffff';
					const textColor = isLightColor(bgColor) ? 'black' : 'white';

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor,
								color: textColor,
							}}
						>
							£{getValue()?.toFixed(2)}
						</div>
					);
				},
				// cell: (info) => (
				// 	<div className='flex items-center gap-1'>
				// 		<span>£{info.getValue()?.toFixed(2)}</span>
				// 	</div>
				// ),
				meta: { headerClassName: 'w-12' },
			},
			{
				accessorKey: 'commission',
				header: 'Total Comms',
				enableSorting: true,
				cell: ({ row, getValue }) => {
					const bgColor = row.original?.colourCode || '#ffffff';
					const textColor = isLightColor(bgColor) ? 'black' : 'white';

					return (
						<div
							className='p-1 rounded text-center font-semibold'
							style={{
								backgroundColor: bgColor,
								color: textColor,
							}}
						>
							£{getValue()?.toFixed(2)}
						</div>
					);
				},
				// cell: (info) => (
				// 	<div className='flex items-center gap-1'>
				// 		<span>£{info.getValue()?.toFixed(2)}</span>
				// 	</div>
				// ),
				meta: { headerClassName: 'w-12' },
			},
		],
		[]
	);

	const totalSum =
		tableData?.reduce((acc, curr) => acc + (curr.takeHome || 0), 0) || 0;
	const totalCommsSum =
		tableData?.reduce((acc, curr) => acc + (curr.commission || 0), 0) || 0;

	// ✅ Filter Data Based on Search Query
	const filteredData = tableData.filter((driver) =>
		driver.fullname.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleRowSelection = (state) => {
		const selectedRowIds = Object.keys(state);
		if (selectedRowIds.length > 0) {
			toast(`Total ${selectedRowIds.length} are selected.`, {
				description: `Selected row IDs: ${selectedRowIds}`,
				action: {
					label: 'Undo',
					onClick: () => console.log('Undo'),
				},
			});
		}
	};

	const Toolbar = ({ setSearchQuery }) => {
		const [inputValue, setInputValue] = useState(searchQuery);
		const handleKeyDown = (e) => {
			if (e.key === 'Enter') {
				setSearchQuery(inputValue);
			}
		};
		const handleChange = (event) => {
			setInputValue(event.target.value);
		};
		return (
			<div className='card-header border-b-0 px-5'>
				<h3 className='card-title'>Weeks Totals</h3>
				<div className='input input-sm max-w-48'>
					<KeenIcon icon='magnifier' />
					<input
						type='text'
						placeholder='Search Driver'
						value={inputValue}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
		);
	};

	return (
		<>
			<DayEarning />

			<DataGrid
				columns={columns}
				data={filteredData}
				rowSelection={true}
				onRowSelectionChange={handleRowSelection}
				pagination={{
					size: 5,
				}}
				toolbar={<Toolbar setSearchQuery={setSearchQuery} />}
				layout={{
					card: true,
				}}
				rowClassName={(row) =>
					`bg-[${row.original.colourCode}] text-${isLightColor(row.original.colourCode) ? 'black' : 'white'}`
				}
			/>
			<div className='flex justify-end items-center mt-4 p-4 bg-gray-100 rounded-lg'>
				<div className='font-bold text-lg text-gray-800 flex gap-4'>
					<span>Total Earnings:</span>
					<div className='flex items-center gap-1'>
						<span>£{totalSum.toFixed(2)}</span>
					</div>
					<span>Total Commissions:</span>
					<div className='flex items-center gap-1'>
						<span>£{totalCommsSum.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</>
	);
};
export { EntryCallout };
