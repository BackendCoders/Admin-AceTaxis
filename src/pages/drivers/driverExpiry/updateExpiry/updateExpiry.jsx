/** @format */
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import clsx from 'clsx';
import { updateDriverExpirys } from '../../../../service/operations/driverApi';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAllDriversExpiry } from '../../../../slices/driverSlice';
import toast from 'react-hot-toast';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { KeenIcon } from '@/components';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';
function UpdateDriverExpiry({ open, onOpenChange }) {
	const dispatch = useDispatch();
	const { driversExpiry } = useSelector((state) => state.driver);
	const [date, setDate] = useState(
		driversExpiry.expiryDate ? new Date(driversExpiry.expiryDate) : new Date()
	);

	const addLocalSchema = Yup.object().shape({
		docType: Yup.number().required('Document type is required'),
		expiryDate: Yup.date().required('Expiry date is required'),
	});

	const initialValues = {
		docType: driversExpiry.documentType || 0,
		expiryDate: driversExpiry.expiryDate || new Date().toISOString(),
	};

	const formik = useFormik({
		initialValues,
		validationSchema: addLocalSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const payload = {
					userId: driversExpiry?.userId || 0,
					docType: values.docType || 0,
					expiryDate: values.expiryDate || '2025-03-07T06:30:28.204Z',
				};
				const response = await updateDriverExpirys(payload);
				if (response.status === 'success') {
					console.log('Driver Expiry updated successfully');
					toast.success('Driver Expiry updated successfully');
					dispatch(refreshAllDriversExpiry());
					setSubmitting(false);
					onOpenChange(); // Reset Formik's submitting state
				} else {
					console.error('Failed to update driver expiry', response.error);
				}
			} catch (error) {
				console.error('Error updating driver expiry', error);
			}
		},
	});

	// ✅ Handle Date Change in Formik
	const handleDateChange = (selectedDate) => {
		if (selectedDate) {
			setDate(selectedDate);
			formik.setFieldValue('expiryDate', selectedDate.toISOString());
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='max-w-[500px]'>
				<DialogHeader className='border-0'>
					<DialogTitle></DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<DialogBody className='flex flex-col items-center pt-0 pb-4'>
					<h3 className='text-lg font-medium text-gray-900 text-center mb-3'>
						Edit Driver #{driversExpiry?.userId} Expiry
					</h3>

					<form
						onSubmit={formik.handleSubmit}
						className='w-full'
					>
						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2 w-[50%]'>
								<label className='form-label text-gray-900'>Expiry Date</label>

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
											{date ? (
												format(date, 'LLL dd, y')
											) : (
												<span>Pick a date</span>
											)}
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
											onSelect={handleDateChange}
											numberOfMonths={1}
										/>
									</PopoverContent>
								</Popover>
								{/* ✅ Show Formik Validation Error */}
								{formik.touched.expiryDate && formik.errors.expiryDate && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.expiryDate}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-1 pb-2 w-[50%]'>
								<label className='form-label text-gray-900'>
									Document Type
								</label>
								<Select
									value={formik.values.docType.toString()}
									disabled
									onValueChange={(value) =>
										formik.setFieldValue('docType', Number(value))
									}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='0'> Insurance</SelectItem>
										<SelectItem value='1'>MOT</SelectItem>
										<SelectItem value='2'>DBS</SelectItem>
										<SelectItem value='3'>Vehicle Badge</SelectItem>
										<SelectItem value='4'>Driver License</SelectItem>
										<SelectItem value='5'>Safe Guarding</SelectItem>
										<SelectItem value='6'>FirstAidCert</SelectItem>
										<SelectItem value='7'>Driver Photo</SelectItem>
									</SelectContent>
								</Select>
								{formik.touched.docType && formik.errors.docType && (
									<span
										color='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.docType}
									</span>
								)}
							</div>
						</div>

						<div className='flex justify-end mb-2 mt-2'>
							<button
								className='btn btn-light'
								onClick={() => onOpenChange()}
							>
								Cancel
							</button>
							<button
								className='btn btn-primary ml-2'
								type='submit'
							>
								Submit
							</button>
						</div>
					</form>
				</DialogBody>
			</DialogContent>
		</Dialog>
	);
}

export { UpdateDriverExpiry };
