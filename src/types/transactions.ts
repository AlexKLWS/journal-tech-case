export type Tag = string;
export type Team = string;

export type Transaction = {
	date: string;
	amountInCents: number;
	tags: Tag[];
	team: Team;
};

export type TransactionParsed = {
	date: string;
	datePretty: string;
	amountInCents: number;
	totalExpense: number;
	tags: Tag[];
	team: Team;
};
