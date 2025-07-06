import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../app/hooks/useAuth';

interface IAuthGuardProps {
	isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: IAuthGuardProps) {
	const { signedIn } = useAuth();

	if (!signedIn && isPrivate) {
		return <Navigate to="/login" replace />;
	}

	if (signedIn && !isPrivate && window.location.pathname === '/') {
		return <Outlet />;
	}

	if (signedIn && !isPrivate) {
		return <Navigate to="/dashboard" replace />;
	}

	return <Outlet />;
}
