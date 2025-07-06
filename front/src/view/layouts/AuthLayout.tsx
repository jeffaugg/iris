import { Outlet } from 'react-router-dom';

import ilustration from '../../assets/ilustration.png';
import { Logo } from '../components/Logo';

export function AuthLayout() {
	return (
		<div className="flex w-full h-full bg-white">
			<div className="w-full h-full flex items-center justify-center flex-col gap-16 lg:w-1/2">
				<Logo className="size-20 text-blue-400" />
				<div className=" w-full max-w-[504px] px-8">
					<Outlet />
				</div>
			</div>

			<div className="w-1/2 h-full justify-center items-center p-8 relative hidden lg:flex bg-gray-200">
				<img src={ilustration} alt="" />
			</div>
		</div>
	);
}
