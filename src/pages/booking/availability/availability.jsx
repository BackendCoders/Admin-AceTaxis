/** @format */

import { useEffect, useState } from 'react';
import { AvailabilityTable } from './availability-table';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from '@/components/ui/select';
import { CustomModal } from './customModal';
import { SelectedAvailabilityTable } from './selectedAvaliability';
import toast from 'react-hot-toast';
import { updateAvailability } from '../../../service/operations/availabilityApi';
import { useDispatch } from 'react-redux';
import { refreshAvailability } from '../../../slices/availabilitySlice';

const Availability = () => {
	const dispatch = useDispatch();
	const [selectedDriver, setSelectedDriver] = useState(0);
	const [isCustomModal, setIsCustomModal] = useState(false);
	const [date, setDate] = useState(new Date());

	const handleClose = () => {
		setIsCustomModal(false);
	};

	const handleClick = async (type) => {
		if (!selectedDriver) {
			toast.error('Please select a driver');
			return;
		}
		const payload = {
			userId: selectedDriver,
			date: format(new Date(date), "yyyy-MM-dd'T'00:00:00'Z'"),
			from: '',
			to: '',
			giveOrTake: false,
			type: 0,
			note: '',
		};

		if (type === 'srAmOnly') {
			payload.from = '07:30';
			payload.to = '09:15';
		} else if (type === 'srPmOnly') {
			payload.from = '14:30';
			payload.to = '16:15';
		} else if (type === 'srOnly') {
			// Send both AM and PM requests
			const srAmRequest = { ...payload, from: '07:30', to: '09:15' };
			const srPmRequest = { ...payload, from: '14:30', to: '16:15' };

			try {
				await Promise.all([
					updateAvailability(srAmRequest), // Send SR AM request
					updateAvailability(srPmRequest), // Send SR PM request
				]);
				dispatch(
					refreshAvailability(
						selectedDriver,
						format(new Date(date), "yyyy-MM-dd'T'00:00:00'Z'")
					)
				);
				toast.success('SR AM & PM Availability Set Successfully');
			} catch (error) {
				toast.error('Failed to update SR availability');
				console.error(error);
			}
			return;
		}

		try {
			const response = await updateAvailability(payload);
			if (response.status === 'success') {
				toast.success(
					`Availability updated for ${selectedDriver} successfully`
				);
				dispatch(
					refreshAvailability(
						selectedDriver,
						format(new Date(date), "yyyy-MM-dd'T'00:00:00'Z'")
					)
				);
			} else {
				toast.error('Failed to update availability');
			}
		} catch (error) {
			console.error('Error setting availability:', error);
			toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		dispatch(
			refreshAvailability(
				selectedDriver,
				format(new Date(date), "yyyy-MM-dd'T'00:00:00'Z'")
			)
		);
	}, [date, dispatch, selectedDriver]);

	return (
		<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1580px] w-full'>
			{/* Header Section */}
			<div className='flex justify-between items-center'>
				<h2 className='text-xl leading-none font-medium text-gray-900 '>
					Availability
				</h2>
			</div>

			{/* Date & Unavailable Button */}
			<div className='flex justify-start items-center mt-4 gap-3'>
				<Popover>
					<PopoverTrigger asChild>
						<button
							id='date'
							className={cn(
								'input data-[state=open]:border-primary',
								!date && 'text-muted-foreground'
							)}
							style={{ width: '13rem' }}
						>
							<KeenIcon
								icon='calendar'
								className='-ms-0.5'
							/>
							{date ? format(date, 'LLL dd, y') : <span>Pick a date</span>}
						</button>
					</PopoverTrigger>
					<PopoverContent
						className='w-auto p-0'
						align='start'
					>
						<Calendar
							initialFocus
							mode='single' // Single date selection
							defaultMonth={date}
							selected={date}
							onSelect={setDate}
							numberOfMonths={1}
						/>
					</PopoverContent>
				</Popover>
				<Select
					value={selectedDriver}
					onValueChange={(value) => setSelectedDriver(value)}
				>
					<SelectTrigger
						className='w-28 hover:shadow-lg'
						size='sm'
						style={{ height: '40px' }}
					>
						<SelectValue placeholder='Select' />
					</SelectTrigger>
					<SelectContent className='w-32'>
						<SelectItem value={0}>All</SelectItem>
						<SelectItem value={8}>Peter</SelectItem>
						<SelectItem value={15}>Cymen</SelectItem>
					</SelectContent>
				</Select>

				<button
					className='btn btn-primary'
					onClick={() => setIsCustomModal(true)}
					disabled={selectedDriver === 0}
				>
					Custom
				</button>
				<button
					className='btn btn-primary'
					onClick={() => handleClick('srAmOnly')}
					disabled={selectedDriver === 0}
				>
					SR AM Only
				</button>
				<button
					className='btn btn-primary'
					onClick={() => handleClick('srPmOnly')}
					disabled={selectedDriver === 0}
				>
					SR PM Only
				</button>
				<button
					className='btn btn-primary'
					onClick={() => handleClick('srOnly')}
					disabled={selectedDriver === 0}
				>
					SR Only
				</button>
				<button className='bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium tracking-wide hover:bg-red-600 transition-all duration-300'>
					UNAVAILABLE (ALL DAY)
				</button>
			</div>

			{/* Conditionally Show Form or Table */}

			{selectedDriver !== 0 && (
				<div className='overflow-x-auto mt-4'>
					<div className='mt-4 mb-5 p-4 rounded-md text-start'>
						Selected Drivers Availability
					</div>
					<SelectedAvailabilityTable
						selectedDate={date}
						selectedDriver={selectedDriver}
					/>
				</div>
			)}

			{/* No Availability Message */}
			<div className='mt-4 mb-5 p-4 rounded-md text-start'>
				All Drivers Availability
			</div>

			{/* Table */}
			<AvailabilityTable />

			{isCustomModal && (
				<CustomModal
					open={isCustomModal}
					onOpenChange={handleClose}
					selectedDate={date}
					selectedDriver={selectedDriver}
				/>
			)}
		</div>
	);
};

export { Availability };
