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
import clsx from 'clsx';
function EditLocalPoi({ open, onOpenChange }) {
	const addLocalSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'), // Changed from email to username
		address: Yup.string().required('Address is required'),
		postcode: Yup.string().required('Postcode is required'),
		type: Yup.string().required('Type is required'),
	});

	const initialValues = {
		name: '',
		address: '',
		postcode: '',
		type: '1', // Placeholder username
	};

	const formik = useFormik({
		initialValues,
		validationSchema: addLocalSchema,
		onSubmit: async (values, { setSubmitting }) => {
			console.log('Submitted Values:', values);
			setSubmitting(false);
			onOpenChange(); // Reset Formik's submitting state
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
						Edit Local POI
					</h3>

					<form onSubmit={formik.handleSubmit}>
						<div className='flex flex-col gap-1 pb-2'>
							<label className='form-label text-gray-900'>Name</label>
							<label className='input'>
								<input
									placeholder='Enter name'
									autoComplete='off'
									{...formik.getFieldProps('name')}
									className={clsx('form-control', {
										'is-invalid': formik.touched.name && formik.errors.name,
									})}
								/>
							</label>
							{formik.touched.name && formik.errors.name && (
								<span
									role='alert'
									className='text-danger text-xs mt-1'
								>
									{formik.errors.name}
								</span>
							)}
						</div>
						<div className='flex flex-col gap-1 pb-2'>
							<label className='form-label text-gray-900'>Address</label>
							<label className='input'>
								<input
									placeholder='Enter address'
									autoComplete='off'
									{...formik.getFieldProps('address')}
									className={clsx('form-control', {
										'is-invalid':
											formik.touched.address && formik.errors.address,
									})}
								/>
							</label>
							{formik.touched.address && formik.errors.address && (
								<span
									role='alert'
									className='text-danger text-xs mt-1'
								>
									{formik.errors.address}
								</span>
							)}
						</div>

						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2'>
								<label className='form-label text-gray-900'>Postcode</label>
								<label className='input'>
									<input
										placeholder='Enter postcode'
										autoComplete='off'
										{...formik.getFieldProps('postcode')}
										className={clsx('form-control', {
											'is-invalid':
												formik.touched.postcode && formik.errors.postcode,
										})}
									/>
								</label>
								{formik.touched.postcode && formik.errors.postcode && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.postcode}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-1 pb-2'>
								<label className='form-label text-gray-900'>Type</label>

								<Select
									defaultValue='1'
									value={formik.values.type}
									onValueChange={(value) => formik.setFieldValue('type', value)}
								>
									<SelectTrigger className=' w-52'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='1'>Not Set</SelectItem>
										<SelectItem value='2'>Train Station</SelectItem>
										<SelectItem value='3'>Super Market</SelectItem>
									</SelectContent>
								</Select>
								{formik.touched.type && formik.errors.type && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.type}
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

export { EditLocalPoi };
