/** @format */
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { acceptWebBookings } from '../../../../service/operations/webBookingsApi';
import { useSelector } from 'react-redux';
import { refreshWebBookings } from '../../../../slices/webBookingSlice';

function AcceptWebBooking({ open, onOpenChange }) {
	const { webBooking } = useSelector((state) => state.webBooking);

	console.log(webBooking);
	const addLocalSchema = Yup.object().shape({
		byName: Yup.string().required('Name is required'), // Changed from email to username
	});

	const initialValues = {
		byName: '',
		requiredTime: `${webBooking?.pickupDateTime?.split('T')[1].slice(0, 5)}`,
		price: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: addLocalSchema,
		onSubmit: async (values, { setSubmitting }) => {
			console.log('Submitted Values:', values);
			const payload = {
				id: webBooking?.id,
				byName: values.byName,
				requiredTime: values.requiredTime, // Changed from pickupDateTime to requiredTime
				price: values.price,
			};
			const response = await acceptWebBookings(payload);
			if (response.status === 'success') {
				await refreshWebBookings();
				setSubmitting(false);
				onOpenChange(); // Reset Formik's submitting state
			}
		},
	});
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
						Accept Web Booking {`${webBooking?.id}`}
					</h3>

					<form onSubmit={formik.handleSubmit}>
						<div className='flex flex-col gap-1 pb-2'>
							<label className='form-label text-gray-900'>By Name</label>
							<label className='input'>
								<input
									placeholder='Enter name'
									autoComplete='off'
									{...formik.getFieldProps('byName')}
									className={clsx('form-control', {
										'is-invalid': formik.touched.byName && formik.errors.byName,
									})}
								/>
							</label>
							{formik.touched.byName && formik.errors.byName && (
								<span
									role='alert'
									className='text-danger text-xs mt-1'
								>
									{formik.errors.name}
								</span>
							)}
						</div>

						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2'>
								<label className='form-label text-gray-900'>Time</label>
								<label className='input'>
									<input
										placeholder='Enter Time'
										autoComplete='off'
										{...formik.getFieldProps('requiredTime')}
										className={clsx('form-control', {
											'is-invalid':
												formik.touched.requiredTime &&
												formik.errors.requiredTime,
										})}
									/>
								</label>
								{formik.touched.requiredTime && formik.errors.requiredTime && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.requiredTime}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-1 pb-2'>
								<label className='form-label text-gray-900'>Price</label>
								<label className='input'>
									<input
										type='number'
										placeholder='Enter price'
										autoComplete='off'
										{...formik.getFieldProps('price')}
										className={clsx('form-control', {
											'is-invalid': formik.touched.price && formik.errors.price,
										})}
									/>
								</label>
								{formik.touched.price && formik.errors.price && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.price}
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

export { AcceptWebBooking };
