import { ColorPicker, type ColorPickerProps, type GetProp } from 'antd';
import { useState } from 'react';

type Color = Extract<
	GetProp<ColorPickerProps, 'value'>,
	string | { cleared: any }
>;
export function ColorPick() {
	const [color, setColor] = useState<Color>('#1677ff');

	return (
		<ColorPicker
			value={color}
			onChange={setColor}
			size="large"
			mode="gradient"
			trigger="hover"
		/>
	);
}
