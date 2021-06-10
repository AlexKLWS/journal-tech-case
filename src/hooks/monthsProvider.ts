import { useEffect, useState } from 'react';

import { fetchMonths } from '../mockAPI/client';

export const useMonthsProvider = () => {
	const [months, setMonths] = useState<string[]>();

	const fetchData = async () => {
		const response = await fetchMonths();

		setMonths(response.data.months);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { months };
};
