import { Tag, Team } from './transactions';

export type TransactionsRequestParams = {
	start_date?: string;
	end_date?: string;
	tags?: Tag[];
	teams?: Team[];
};
