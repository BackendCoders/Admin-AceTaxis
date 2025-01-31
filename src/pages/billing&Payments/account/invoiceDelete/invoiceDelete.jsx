/** @format */

import { useState } from 'react';
import { IoChevronUpSharp, IoChevronDownSharp } from 'react-icons/io5';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components';

const InvoiceDelete= () => {
	

	return (
		<div className='px-6 py-4 ms-auto me-auto max-w-[1580px] w-full'>
			{/* Header Section */}
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-700'>
			Delete Invoice
			</h2>

			{/* Filter Inputs */}
			<div className='flex flex-wrap items-center gap-6 mt-4'>

			<div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Invoice Number</label>
          <input type="text" className="input" placeholder="Invoice Number" />
        </div>

				{/* Date Range Picker */}
				<div className='flex flex-col'>
					
				</div>

				<button className="btn btn-primary flex justify-center">CONTINUE</button>
			</div>
		</div>
	);
};

export { InvoiceDelete};
