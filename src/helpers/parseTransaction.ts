import { DateTime } from 'luxon';
import { Transaction, TransactionParsed } from '../types/transactions';

export const parseTransactions = (transactions: Transaction[]) => {
	const result: TransactionParsed[] = [];
	let totalExpense = 0;
	const sortedTransactions = transactions.sort((a, b) => {
		const aDate = DateTime.fromISO(a.date);
		const bDate = DateTime.fromISO(b.date);
		return aDate.toMillis() - bDate.toMillis();
	});
	for (const transaction of sortedTransactions) {
		totalExpense += transaction.amountInCents / 100;
		result.push({
			date: transaction.date,
			team: transaction.team,
			tags: transaction.tags,
			amountInCents: transaction.amountInCents,
			datePretty: DateTime.fromISO(transaction.date).toFormat('DDD'),
			totalExpense: Number(totalExpense.toFixed(2)),
		});
	}
	return result;
};
