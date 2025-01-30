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
import { KeenIcon } from '@/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useState } from 'react';
function RegisterDriver({ open, onOpenChange }) {
	const [showPassword, setShowPassword] = useState(false);
	const addLocalSchema = Yup.object().shape({
		userName: Yup.string().required('User Name is required'),
	});

	const initialValues = {
		userName: '',
		password: '',
		registrationNumber: '',
		fullName: '',
		email: '',
		phone: '',
		vehicleMake: '',
		vehicleModel: '',
		vehicleColor: '',
		role: 0,
		color: 0,
		vehicleType: 0,
		showAllBookings: false,
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

	const togglePassword = (event) => {
		event.preventDefault();
		setShowPassword(!showPassword);
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
						Register Driver
					</h3>

					<form
						onSubmit={formik.handleSubmit}
						className='w-full'
					>
						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2 w-[50%]'>
								<label className='form-label text-gray-900'>User Name</label>
								<label className='input'>
									<input
										placeholder='Enter user name'
										autoComplete='off'
										{...formik.getFieldProps('userName')}
										className={clsx('form-control', {
											'is-invalid':
												formik.touched.userName && formik.errors.userName,
										})}
									/>
								</label>
								{formik.touched.userName && formik.errors.userName && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.userName}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-1 pb-2 w-[50%]'>
								<label className='form-label text-gray-900'>Password</label>
								<label className='input'>
									<input
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter Password'
										autoComplete='off'
										{...formik.getFieldProps('password')}
										className={clsx(
											'form-control bg-transparent',
											{
												'is-invalid':
													formik.touched.password && formik.errors.password,
											},
											{
												'is-valid':
													formik.touched.password && !formik.errors.password,
											}
										)}
									/>
									<button
										className='btn btn-icon'
										onClick={togglePassword}
									>
										<KeenIcon
											icon='eye'
											className={clsx('text-gray-500', {
												hidden: showPassword,
											})}
										/>
										<KeenIcon
											icon='eye-slash'
											className={clsx('text-gray-500', {
												hidden: !showPassword,
											})}
										/>
									</button>
								</label>
								{formik.touched.password && formik.errors.password && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.password}
									</span>
								)}
							</div>
						</div>

						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2 w-full'>
								<label className='form-label text-gray-900'>
									Registration Number
								</label>
								<label className='input'>
									<input
										placeholder='Enter registration Number'
										autoComplete='off'
										{...formik.getFieldProps('registrationNumber')}
										className={clsx('form-control', {
											'is-invalid':
												formik.touched.registrationNumber &&
												formik.errors.registrationNumber,
										})}
									/>
								</label>
								{formik.touched.registrationNumber &&
									formik.errors.registrationNumber && (
										<span
											role='alert'
											className='text-danger text-xs mt-1'
										>
											{formik.errors.registrationNumber}
										</span>
									)}
							</div>
							<div className='flex flex-col gap-1 pb-2 w-full'>
								<label className='form-label text-gray-900'>Full Name</label>
								<label className='input'>
									<input
										placeholder='Enter fullName'
										autoComplete='off'
										{...formik.getFieldProps('fullName')}
										className={clsx('form-control', {
											'is-invalid':
												formik.touched.fullName && formik.errors.fullName,
										})}
									/>
								</label>
								{formik.touched.fullName && formik.errors.fullName && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.fullName}
									</span>
								)}
							</div>
						</div>

						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2 w-full'>
								<label className='form-label text-gray-900'>Email</label>
								<label className='input'>
									<input
										placeholder='Enter email'
										autoComplete='off'
										{...formik.getFieldProps('email')}
										className={clsx('form-control', {
											'is-invalid': formik.touched.email && formik.errors.email,
										})}
									/>
								</label>
								{formik.touched.email && formik.errors.email && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.email}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-1 pb-2 w-full'>
								<label className='form-label text-gray-900'>Phone</label>
								<label className='input'>
									<input
										placeholder='Enter phone'
										autoComplete='off'
										{...formik.getFieldProps('phone')}
										className={clsx('form-control', {
											'is-invalid': formik.touched.phone && formik.errors.phone,
										})}
									/>
								</label>

								{formik.touched.phone && formik.errors.phone && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.phone}
									</span>
								)}
							</div>
						</div>

						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2 w-[50%]'>
								<label className='form-label text-gray-900'>Role</label>
								<Select
									defaultValue='0'
									value={formik.values.role}
									onValueChange={(value) => formik.setFieldValue('role', value)}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='0'>Choose Role</SelectItem>
										<SelectItem value='1'>Admin</SelectItem>
										<SelectItem value='2'>User</SelectItem>
										<SelectItem value='3'>Driver</SelectItem>
										<SelectItem value='4'>Account</SelectItem>
									</SelectContent>
								</Select>
								{formik.touched.role && formik.errors.role && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.role}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-1 pb-2 w-[50%]'>
								<label className='form-label text-gray-900'>Color</label>
								<Select
									defaultValue='0'
									value={formik.values.color}
									onValueChange={(value) =>
										formik.setFieldValue('color', value)
									}
								>
									<SelectTrigger className=' w-full'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='0'>Choose Color</SelectItem>
										<SelectItem value='1'>Admin</SelectItem>
										<SelectItem value='2'>User</SelectItem>
										<SelectItem value='3'>Driver</SelectItem>
										<SelectItem value='4'>Account</SelectItem>
									</SelectContent>
								</Select>
								{formik.touched.color && formik.errors.color && (
									<span
										color='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.color}
									</span>
								)}
							</div>
						</div>

						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2 w-full'>
								<label className='form-label text-gray-900'>Vehicle Make</label>
								<label className='input'>
									<input
										placeholder='Enter vehicle make'
										autoComplete='off'
										{...formik.getFieldProps('vehicleMake')}
										className={clsx('form-control', {
											'is-invalid':
												formik.touched.vehicleMake && formik.errors.vehicleMake,
										})}
									/>
								</label>
								{formik.touched.vehicleMake && formik.errors.vehicleMake && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.vehicleMake}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-1 pb-2 w-full'>
								<label className='form-label text-gray-900'>
									Vehicle Model
								</label>
								<label className='input'>
									<input
										placeholder='Enter vehicle model'
										autoComplete='off'
										{...formik.getFieldProps('vehicleModel')}
										className={clsx('form-control', {
											'is-invalid':
												formik.touched.vehicleModel &&
												formik.errors.vehicleModel,
										})}
									/>
								</label>
								{formik.touched.vehicleModel && formik.errors.vehicleModel && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.vehicleModel}
									</span>
								)}
							</div>
						</div>

						<div className='w-full flex justify-center items-center gap-2'>
							<div className='flex flex-col gap-1 pb-2 w-[50%]'>
								<label className='form-label text-gray-900'>
									Vehicle Color
								</label>
								<label className='input'>
									<input
										placeholder='Enter vehicle color'
										autoComplete='off'
										{...formik.getFieldProps('vehicleColor')}
										className={clsx('form-control', {
											'is-invalid':
												formik.touched.vehicleColor &&
												formik.errors.vehicleColor,
										})}
									/>
								</label>

								{formik.touched.vehicleColor && formik.errors.vehicleColor && (
									<span
										role='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.vehicleColor}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-1 pb-2 w-[50%]'>
								<label className='form-label text-gray-900'>Vehicle Type</label>
								<Select
									defaultValue='0'
									value={formik.values.vehicleType}
									onValueChange={(value) =>
										formik.setFieldValue('vehicleType', value)
									}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='0'>Unknown</SelectItem>
										<SelectItem value='1'>Saloon</SelectItem>
										<SelectItem value='2'>Estate</SelectItem>
										<SelectItem value='3'>MPV</SelectItem>
										<SelectItem value='4'>MPVPlus</SelectItem>
										<SelectItem value='5'>SUV</SelectItem>
									</SelectContent>
								</Select>
								{formik.touched.vehicleType && formik.errors.vehicleType && (
									<span
										color='alert'
										className='text-danger text-xs mt-1'
									>
										{formik.errors.vehicleType}
									</span>
								)}
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<label className='switch'>
								<span className='switch-label'>Show All Bookings</span>
								<input
									type='checkbox'
									value='1'
									name='check'
									checked={formik.values.showAllBookings}
									// onChange={formik.setFieldValue(
									// 	'showAllBookings',
									// 	!formik.values.showAllBookings
									// )}
								/>
							</label>
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

export { RegisterDriver };
