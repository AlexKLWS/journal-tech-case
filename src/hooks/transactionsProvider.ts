import { useEffect, useState } from 'react';
import { parseTransactions } from '../helpers/parseTransaction';

import { fetchTransactions as fetchTransactionsAPI } from '../mockAPI/client';
import { TransactionsRequestParams } from '../types/requests';
import { TransactionParsed } from '../types/transactions';

export const useTransactionsProvider = () => {
	const [transactions, setData] = useState<TransactionParsed[]>([]);

	const fetchTransactions = async (params: TransactionsRequestParams) => {
		const response = await fetchTransactionsAPI(params);

		setData(parseTransactions(response.data.transactions));
	};

	return { transactions, fetchTransactions };
};
