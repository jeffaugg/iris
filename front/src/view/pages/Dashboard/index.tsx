import { Button } from 'antd';
import Title from 'antd/es/typography/Title';

import { useAuth } from '../../../app/hooks/useAuth';
import { CoresModal } from '../../modal/CoresModal';

import { DashboardTable } from './DashboardTable';
import { useColorController } from './useColorController';

export function Dashboard() {
	const { signout } = useAuth();
	const { handleSubmit, isPending, control } = useColorController();
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<Title level={1} className="!text-blue-700">
							Dashboard
						</Title>
						<Button
							type="primary"
							onClick={() => {
								signout();
							}}
						>
							Logout
						</Button>
					</div>
					<p className="text-gray-600">
						Visão geral dos dados coletados e processados pelo sistema.
					</p>
				</div>

				<div className="bg-white rounded-lg shadow">
					<div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-900">
							Dados Detalhados
						</h2>
						<CoresModal
							handleOk={() => {
								handleSubmit();
							}}
							control={control}
							isLoading={isPending}
						/>
					</div>
					<div className="p-6">
						<DashboardTable />
					</div>
				</div>
			</div>
		</div>
	);
}
