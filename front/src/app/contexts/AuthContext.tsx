import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { LaunchScreen } from '../../view/components/LaunchScreen';
import { localStorageKeys } from '../config/localStorageKeys';
import { usersService } from '../services/userService';

interface IAuthContextValue {
	signedIn: boolean;
	signin(acessToken: string): void;
	signout(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storedAcessToken = localStorage.getItem(localStorageKeys.ACCESSTOKEN);

		return !!storedAcessToken;
	});

	const queryClient = useQueryClient();

	const { isError, isFetching, isSuccess } = useQuery({
		queryKey: ['users', 'me'],
		queryFn: async () => usersService.me(),
		enabled: signedIn,
		staleTime: Infinity,
	});

	const signin = useCallback((acessToken: string) => {
		localStorage.setItem(localStorageKeys.ACCESSTOKEN, acessToken);

		setSignedIn(true);
	}, []);

	const signout = useCallback(() => {
		localStorage.removeItem(localStorageKeys.ACCESSTOKEN);
		queryClient.removeQueries({ queryKey: ['users', 'me'] });
		setSignedIn(false);
	}, [queryClient]);

	useEffect(() => {
		if (isError) {
			toast.error('Sua sessão expirou');
			signout();
		}
	}, [isError, signout]);

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<AuthContext.Provider
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={{
				signedIn: isSuccess && signedIn,
				signin,
				signout,
			}}
		>
			<LaunchScreen isLoading={isFetching} />
			{!isFetching && children}
		</AuthContext.Provider>
	);
}
