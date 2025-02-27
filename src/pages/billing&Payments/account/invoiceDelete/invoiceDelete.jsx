/** @format */

import { useState } from 'react';
import { deleteInvoice } from '../../../../service/operations/billing&Payment';
import toast from 'react-hot-toast';

const InvoiceDelete = () => {
	const [invoiceNo, setInvoiceNo] = useState('');

	const handleDelete = async () => {
		try {
			const response = await deleteInvoice(invoiceNo);
			if (response.status === 'success') {
				toast.success('Invoice deleted successfully');
				setInvoiceNo('');
			} else {
				toast.error('Failed to delete invoice');
				setInvoiceNo('');
			}
		} catch (error) {
			console.error('Error deleting invoice:', error);
			toast.error('Error deleting invoice');
		}
	};
	return (
		<div className='px-6 py-4 ms-auto me-auto max-w-[1580px] w-full'>
			{/* Header Section */}
			<h2 className='text-xl leading-none font-medium text-gray-900'>
				Delete Invoice
			</h2>

			{/* Filter Inputs */}
			<div className='flex flex-wrap items-center gap-6 mt-4'>
				<div className='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5'>
					<input
						type='text'
						className='input'
						placeholder='Invoice Number'
						value={invoiceNo}
						onChange={(e) => setInvoiceNo(+e.target.value)}
					/>
				</div>

				<button
					className='btn btn-primary flex justify-center'
					onClick={handleDelete}
				>
					CONTINUE
				</button>
			</div>
		</div>
	);
};

export { InvoiceDelete };
