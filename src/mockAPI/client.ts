import { DateTime } from 'luxon';
import { generateData } from '../helpers/generateMockData';
import { TransactionsRequestParams } from '../types/requests';
import { Transaction } from '../types/transactions';

const TRANSACTIONS_COUNT = 300;
const TAGS = ['Meals', 'Client', 'Software', 'Accomodation', 'Travel', 'Personal', 'Misc'];
const TEAMS = ['Marketing', 'Sales', 'Engineering'];
let TRANSACTIONS: Transaction[] = [];

const randomDelay = () =>
	new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, Math.random() * 2000);
	});

export const initializeMockClient = () => {
	TRANSACTIONS = generateData(TRANSACTIONS_COUNT, TAGS, TEAMS);
};

export const fetchTransactions = async (params: TransactionsRequestParams) => {
	await randomDelay();
	let result = TRANSACTIONS;

	if (params.start_date) {
		const startDate = DateTime.fromISO(params.start_date);
		result = result.filter((t) => {
			const date = DateTime.fromISO(t.date);
			return date >= startDate;
		});
	}
	if (params.end_date) {
		const endDate = DateTime.fromISO(params.end_date);
		result = result.filter((t) => {
			const date = DateTime.fromISO(t.date);
			return date <= endDate;
		});
	}

	if (params.tags) {
		result = result.filter((t) => {
			return t.tags.some((tag) => params.tags!.includes(tag));
		});
	}

	if (params.teams) {
		result = result.filter((t) => {
			return params.teams!.some((team) => team === t.team);
		});
	}

	return {
		status: 200,
		data: {
			transactions: result,
		},
	};
};

export const fetchTags = async () => {
	await randomDelay();
	return {
		status: 200,
		data: {
			tags: TAGS,
		},
	};
};

export const fetchTeams = async () => {
	await randomDelay();
	return {
		status: 200,
		data: {
			teams: TEAMS,
		},
	};
};
