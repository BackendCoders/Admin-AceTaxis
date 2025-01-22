/** @format */

import { Navigate, Route, Routes } from 'react-router';
import {
	Login,
	ResetPassword,
	ResetPasswordChange,
	ResetPasswordChanged,
	ResetPasswordCheckEmail,
	ResetPasswordEnterEmail,
	Signup,
	TwoFactorAuth,
} from './pages/jwt';
import { AuthLayout } from '@/layouts/auth';
import { CheckEmail } from '@/auth/pages/jwt';
const AuthPage = () => (
	<Routes>
		<Route element={<AuthLayout />}>
			<Route
				path='/classic/login'
				element={<Login />}
			/>
			<Route
				path='/classic/signup'
				element={<Signup />}
			/>
			<Route
				path='/classic/2fa'
				element={<TwoFactorAuth />}
			/>
			<Route
				path='/classic/check-email'
				element={<CheckEmail />}
			/>
			<Route
				path='/classic/reset-password'
				element={<ResetPassword />}
			/>
			<Route
				path='/classic/reset-password/enter-email'
				element={<ResetPasswordEnterEmail />}
			/>
			<Route
				path='/classic/reset-password/check-email'
				element={<ResetPasswordCheckEmail />}
			/>
			<Route
				path='/classic/reset-password/change'
				element={<ResetPasswordChange />}
			/>
			<Route
				path='/classic/reset-password/changed'
				element={<ResetPasswordChanged />}
			/>
			<Route
				path='*'
				element={<Navigate to='/error/404' />}
			/>
		</Route>
	</Routes>
);
export { AuthPage };
