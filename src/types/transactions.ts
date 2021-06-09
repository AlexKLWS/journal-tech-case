export type Tag = string;
export type Team = string;

export type Transaction = {
	date: string;
	amountInCents: number;
	tags: Tag[];
	team: Team;
};
