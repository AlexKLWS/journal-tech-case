import React, { useEffect } from 'react';
import { Select, Spin } from 'antd';

import { useMonthsProvider } from '../hooks/monthsProvider';

const { Option } = Select;

type Props = {
	selectedMonth?: string;
	handleMonthChange: (value: string) => void;
};

export const MonthSelect: React.FC<Props> = (props) => {
	const { months } = useMonthsProvider();

	useEffect(() => {
		if (months) {
			props.handleMonthChange(months[0]);
		}
	}, [months]);

	if (!months) {
		return <Spin />;
	}

	const renderOptions = () => {
		if (!months) {
			return null;
		}
		return months.map((m) => (
			<Option key={m} value={m}>
				{m.charAt(0).toLocaleUpperCase() + m.slice(1)}
			</Option>
		));
	};

	return (
		<Select
			style={{ width: 120 }}
			defaultValue={months[0]}
			onChange={props.handleMonthChange}
			value={props.selectedMonth}
		>
			{renderOptions()}
		</Select>
	);
};
