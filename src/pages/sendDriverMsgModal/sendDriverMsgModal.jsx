/** @format */
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
import { rejectWebBookings } from '../../service/operations/webBookingsApi';
import { useDispatch, useSelector } from 'react-redux';
import { refreshWebBookings } from '../../slices/webBookingSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { refreshDrivers } from '../../slices/dashboardSlice';

function SendDriverMsgModal({ open, onOpenChange }) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { isDirectMsgModal, drivers } = useSelector((state) => state.dashboard);
	const { webBooking } = useSelector((state) => state.webBooking);
	console.log('drivers', drivers);

	const addLocalSchema = Yup.object().shape({
		byName: Yup.string().required('Name is required'), // Changed from email to username
		reason: Yup.string().required('Reason is required'),
	});

	const initialValues = {
		id: webBooking?.id,
		byName:
			user?.fullName ||
			JSON.parse(localStorage?.getItem('userData'))?.fullName ||
			'',
		reason: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: addLocalSchema,
		onSubmit: async (values, { setSubmitting }) => {
			console.log('Submitted Values:', values);
			const payload = {
				id: webBooking?.id,
				byName: values.byName,
				reason: values.reason,
			};
			const response = await rejectWebBookings(payload);
			if (response.status === 'success') {
				toast.success('Booking accepted Successfully');
				await dispatch(refreshWebBookings());
				setSubmitting(false);
				onOpenChange(); // Reset Formik's submitting state
			}
		},
	});

	useEffect(() => {
		if (isDirectMsgModal) {
			dispatch(refreshDrivers());
		}
	}, [dispatch, isDirectMsgModal]);

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				className={`${isDirectMsgModal ? 'max-w-[700px]' : 'max-w-[500px]'} `}
			>
				<DialogHeader className='border-0'>
					<DialogTitle></DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<DialogBody className='flex flex-col items-center pt-0 pb-4'>
					<h3 className='text-lg font-medium text-gray-900 text-center mb-3'>
						{isDirectMsgModal
							? 'Send Message to Selected Drivers'
							: 'Send Message to All Drivers'}
					</h3>

					<div className='flex justify-center items-start w-full'>
						{isDirectMsgModal && (
							<div className='flex-col w-[50%]'>
								<h4 className='text-sm font-medium text-gray-900 text-start mb-3'>
									Select Driver(s)
								</h4>
								<div>Hello</div>
								<div>Hello</div>
								<div>Hello</div>
								<div>Hello</div>
							</div>
						)}
						<form
							onSubmit={formik.handleSubmit}
							className={`${isDirectMsgModal ? 'w-[50%]' : 'w-full'}`}
						>
							<div className='flex flex-col gap-1 pb-2'>
								<label className='form-label text-gray-900'>Message</label>
								<label className=''>
									<textarea
										placeholder='Enter message'
										autoComplete='off'
										{...formik.getFieldProps('message')}
										className={clsx(
											'form-control textarea text-2sm text-gray-600 font-normal',
											{
												'is-invalid':
													formik.touched.message && formik.errors.message,
											}
										)}
									/>
								</label>
								{formik.touched.message && formik.errors.message && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.message}
									</span>
								)}
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
					</div>
				</DialogBody>
			</DialogContent>
		</Dialog>
	);
}

export { SendDriverMsgModal };
