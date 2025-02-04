/** @format */
import { useState } from 'react';

const MsgSettings = () => {
	// ✅ Messaging Config Sections (Follows Your Format)
	const messageSections = [
		{ title: 'DRIVER - ON ALLOCATE', stateKey: 'driverAllocate' },
		{ title: 'DRIVER - UN-ALLOCATE', stateKey: 'driverUnallocate' },
		{ title: 'DRIVER - ON AMEND BOOKING', stateKey: 'driverAmend' },
		{ title: 'DRIVER - ON CANCEL BOOKING', stateKey: 'driverCancel' },
		{ title: 'CUSTOMER - ON ALLOCATE', stateKey: 'customerAllocate' },
		{ title: 'CUSTOMER - UN-ALLOCATE', stateKey: 'customerUnallocate' },
		{ title: 'CUSTOMER - ON AMEND BOOKING', stateKey: 'customerAmend' },
		{ title: 'CUSTOMER - ON CANCEL BOOKING', stateKey: 'customerCancel' },
		{
			title: 'CUSTOMER - ON COMPLETE (Request Review)',
			stateKey: 'customerComplete',
		},
	];

	// ✅ State for message settings
	const [messageSettings, setMessageSettings] = useState(
		messageSections.reduce(
			(acc, section) => ({ ...acc, [section.stateKey]: 'WhatsApp' }),
			{}
		)
	);

	// ✅ Handle Selection Change
	const handleSelectionChange = (key, value) => {
		setMessageSettings((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className='px-4 md:px-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
			{/* ✅ Page Header */}
			<h3 className='text-lg md:text-xl font-semibold text-gray-700 mb-4'>
				Message Settings
			</h3>

			{/* ✅ Grid Layout for Sections */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{messageSections.map((section) => (
					<div
						key={section.stateKey}
						className='border rounded-lg p-2 md:p-4 shadow-sm'
					>
						{/* Section Title */}
						<span
							className={`px-2 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold text-white ${
								section.title.includes('CUSTOMER')
									? 'bg-red-800'
									: 'bg-blue-800'
							}`}
						>
							{section.title}
						</span>

						{/* Selection Box */}
						<div className='mt-4 p-2 md:p-4 border rounded-md'>
							{['None', 'WhatsApp', 'Text Message'].map((type) => (
								<label
									key={type}
									className='flex items-center gap-2 mt-2'
								>
									<input
										type='radio'
										name={section.stateKey}
										value={type}
										checked={messageSettings[section.stateKey] === type}
										onChange={(e) =>
											handleSelectionChange(section.stateKey, e.target.value)
										}
										className='radio'
									/>
									<span
										className={`${
											type === 'WhatsApp'
												? 'text-green-500'
												: type === 'Text Message'
													? 'text-blue-500'
													: 'text-gray-700'
										} font-medium text-xs md:text-sm`}
									>
										{type}
									</span>
								</label>
							))}
						</div>
					</div>
				))}
			</div>

			{/* ✅ Save Settings Button */}
			<div className='mt-6 flex justify-end'>
				<button className='bg-green-700 hover:bg-green-600 text-white px-4 md:px-6 py-2 rounded-md shadow-md transition-all text-xs md:text-sm'>
					SAVE SETTINGS
				</button>
			</div>
		</div>
	);
};

export { MsgSettings };
