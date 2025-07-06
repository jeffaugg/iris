import { Button, ColorPicker, Modal } from 'antd';
import { useState } from 'react';
import { Controller, type Control } from 'react-hook-form';

import type { IColorSubmission } from '../pages/Dashboard/useColorController';

interface ICoresModalProps {
	handleOk: () => void;
	isLoading: boolean;
	control: Control<IColorSubmission>;
}

export function CoresModal({ handleOk, isLoading, control }: ICoresModalProps) {
	const [open, setOpen] = useState(false);

	const showModal = () => {
		setOpen(true);
	};

	const handleModalOk = () => {
		handleOk();
		setOpen(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal} loading={isLoading}>
				Adicionar uma nova cor
			</Button>
			<Modal
				title="Selecione uma cor"
				open={open}
				onOk={() => {
					handleModalOk();
				}}
				onCancel={() => setOpen(false)}
			>
				<div
					className="p-4 w-full flex
                    items-center justify-center"
				>
					<Controller
						name="codigo"
						control={control}
						render={({ field: { onChange, value, ...field } }) => (
							<ColorPicker
								{...field}
								value={value}
								onChange={(color) => {
									onChange(color.toHexString());
								}}
								showText
								format="hex"
							/>
						)}
					/>
				</div>
			</Modal>
		</>
	);
}
