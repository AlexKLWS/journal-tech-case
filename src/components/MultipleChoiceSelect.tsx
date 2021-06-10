import React, { PropsWithChildren } from 'react';
import { Select } from 'antd';

const { Option } = Select;

type Props = {
	placeholder: string;
	selectedMonth?: string;
	defaultValue?: string[];
	value?: string[];
	options: string[];
	handleChange: (value: string[]) => void;
};

export const MultipleChoiceSelect: React.FC<PropsWithChildren<Props>> = (props) => {
	const renderOptions = () => {
		return props.options.map((t) => (
			<Option key={t} value={t}>
				{t.charAt(0).toLocaleUpperCase() + t.slice(1)}
			</Option>
		));
	};

	return (
		<Select
			mode="multiple"
			allowClear
			style={{ minWidth: '20rem' }}
			placeholder="Please select"
			defaultValue={props.defaultValue}
			onChange={props.handleChange}
			value={props.value}
		>
			{renderOptions()}
		</Select>
	);
};
