import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '../view/layouts/AuthLayout';
import { Dashboard } from '../view/pages/Dashboard';
import { ConflictPage } from '../view/pages/Exceptions/conflict';
import { FormPage } from '../view/pages/Form';
import { Login } from '../view/pages/Login';

import { AuthGuard } from './AuthGuard';

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthGuard isPrivate={false} />}>
					<Route path="/" element={<FormPage />} />
					<Route element={<AuthLayout />}>
						<Route path="/login" element={<Login />} />
					</Route>
				</Route>

				<Route element={<AuthGuard isPrivate />}>
					<Route element={<AuthLayout />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

				<Route path="/conflict" element={<ConflictPage />} />
			</Routes>
		</BrowserRouter>
	);
}
