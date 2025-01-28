/** @format */
import { useState } from 'react';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const AvailabilityLogs = () => {
	const [driverNumber, setDriverNumber] = useState(0);

	return (
		<div className='p-6 md:px-10 lg:px-16 xl:px-20 shadow-md rounded-lg'>
			{/* Header Section */}
			<h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
				Change Log of Availability #: {driverNumber}
			</h2>

			{/* Filter Inputs */}
			<div className='flex flex-wrap items-center gap-4 mt-4'>
				{/* Driver Number Selection */}
				<div className='flex flex-col'>
					<label className='text-gray-800 dark:text-gray-200 text-sm font-medium'>
						Driver Number
					</label>
					<div className='flex items-center border rounded-md px-2 dark:bg-gray-800'>
						
						<span className='px-6 text-lg font-semibold'>{driverNumber}</span>
           {/* Buttons placed vertically */}
          <div className="flex flex-col">
            <button
              className="px-2 rounded-t-md transition-all"
              onClick={() => setDriverNumber(driverNumber + 1)}
            >
              <FaChevronUp />
            </button>
            <button
              className="px-2  rounded-b-md transition-all"
              onClick={() => setDriverNumber(Math.max(0, driverNumber - 1))}
            >
              <FaChevronDown />
            </button>
          </div>
					</div>
				</div>

				{/* Show Changes Button */}
				{/* <button className='bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md text-xs font-semibold flex items-center gap-2 shadow-md transition-all duration-200'>
					🔍 SHOW CHANGES
				</button> */}

				{/* Date Picker */}
				<div className='flex items-center gap-2 relative'>
					<span className='text-gray-700 dark:text-gray-300 text-sm'>📅</span>
					<input
						type='date'
						className='border p-2 rounded-md text-gray-800 dark:text-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>
			</div>

			{/* No Availability Message */}
			<div className='mt-4 p-4 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md text-center text-sm font-medium'>
				ℹ️ No Availability
			</div>
		</div>
	);
};

export { AvailabilityLogs };
