import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { parseTransactions } from '../helpers/parseTransaction';

import { fetchTransactions as fetchTransactionsAPI } from '../mockAPI/client';
import { TransactionsRequestParams } from '../types/requests';
import { TransactionParsed } from '../types/transactions';

export const useTransactionsProvider = () => {
	const [transactions, setData] = useState<TransactionParsed[]>([]);

	const fetchTransactions = async (selectedMonth?: string, selectedTags?: string[], selectedTeams?: string[]) => {
		const params: TransactionsRequestParams = {};
		if (selectedMonth) {
			const monthDate = DateTime.fromFormat(selectedMonth.toLowerCase(), 'MMMM');
			const startDate = monthDate.startOf('month');
			const now = DateTime.now();
			const endDate = now.month === monthDate.month ? now : monthDate.endOf('month');
			params.start_date = startDate.toISO();
			params.end_date = endDate.toISO();
		}
		if (selectedTags) {
			params.tags = selectedTags;
		}
		if (selectedTeams) {
			params.teams = selectedTeams;
		}
		const response = await fetchTransactionsAPI(params);

		setData(parseTransactions(response.data.transactions));
	};

	return { transactions, fetchTransactions };
};
