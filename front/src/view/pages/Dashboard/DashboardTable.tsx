import {
	Input,
	Table,
	type GetProp,
	type TableColumnsType,
	type TablePaginationConfig,
	type TableProps,
} from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import type { Cliente } from '../../../app/entities/Clientes';
import { useClientes } from '../../../app/hooks/useClientes';

export type IDataType = Cliente;

interface ITableParams {
	pagination?: TablePaginationConfig;
	sortField?: SorterResult<any>['field'];
	sortOrder?: SorterResult<any>['order'];
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export function DashboardTable() {
	const [cpfFilter, setCpfFilter] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);

	const { clientes, isLoading } = useClientes({
		cpf: cpfFilter || undefined,
		order: sortOrder,
		limit: pageSize,
		page: currentPage,
	});

	const [tableParams, setTableParams] = useState<ITableParams>({
		pagination: {
			current: currentPage,
			pageSize,
		},
	});

	const columns: TableColumnsType<IDataType> = useMemo(
		() => [
			{
				title: 'Nome',
				dataIndex: 'nome',
				width: 150,
			},
			{
				title: 'Email',
				dataIndex: 'email',
				width: 200,
			},
			{
				title: 'CPF',
				dataIndex: 'cpf',
				width: 120,
			},
			{
				title: 'Cor',
				dataIndex: 'cor',
				width: 100,
				render: (color) => (
					<span
						style={{
							display: 'inline-block',
							width: 20,
							height: 20,
							backgroundColor: color || '#ccc',
							borderRadius: '50%',
						}}
					/>
				),
			},
			{
				title: 'Observações',
				dataIndex: 'observacoes',
				width: 200,
				render: (text) => text ?? '-',
			},
			{
				title: 'Data de Criação',
				dataIndex: 'createdAt',
				width: 150,
				render: (date) => new Date(date).toLocaleDateString('pt-BR'),
				sorter: true,
				sortOrder:
					tableParams.sortField === 'createdAt' ? tableParams.sortOrder : null,
			},
		],
		[tableParams.sortField, tableParams.sortOrder],
	);

	const handleTableChange: TableProps<IDataType>['onChange'] = (
		pagination,
		filters,
		sorter,
	) => {
		const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;

		if (pagination?.current !== currentPage) {
			setCurrentPage(pagination?.current || 1);
		}

		if (pagination?.pageSize !== pageSize) {
			setPageSize(pagination?.pageSize || 10);
			setCurrentPage(1);
		}

		if (currentSorter?.field === 'createdAt') {
			setSortOrder(currentSorter.order === 'ascend' ? 'asc' : 'desc');
		} else {
			setSortOrder(undefined);
		}

		setTableParams({
			pagination,
			filters,
			sortOrder: currentSorter?.order,
			sortField: currentSorter?.field,
		});
	};

	const handleCpfSearch = (value: string) => {
		setCpfFilter(value);
		setCurrentPage(1);
	};

	return (
		<div className="">
			<Input.Search
				className="pb-6"
				placeholder="Buscar por CPF..."
				onSearch={handleCpfSearch}
				onChange={(e) => {
					if (e.target.value === '') {
						setCpfFilter('');
						setCurrentPage(1);
					}
				}}
				allowClear
			/>
			<Table<IDataType>
				loading={isLoading}
				columns={columns}
				dataSource={clientes?.data}
				pagination={{
					current: currentPage,
					pageSize,
					total: clientes?.meta.totalItems,
					showSizeChanger: true,
				}}
				onChange={handleTableChange}
				rowKey="id"
			/>
		</div>
	);
}
