import { DateTime } from 'luxon';
import { Tag, Team, Transaction } from '../types/transactions';

const randomDateBetween = (start: DateTime, end: DateTime) => {
	const date = DateTime.fromMillis(start.toMillis() + Math.random() * (end.toMillis() - start.toMillis()));
	return date.toISO();
};

const getRandomInt = (max: number) => {
	return Math.floor(Math.random() * max);
};

const getRandomTags = (alltags: Tag[]) => {
	let tagsCount = getRandomInt(alltags.length);
	let tags = [];
	while (tagsCount >= 0) {
		const tag = alltags[getRandomInt(alltags.length)];
		tags.push(tag);
		tagsCount--;
	}
	tags = Array.from(new Set(tags));
	return tags;
};

export const generateData = (numberOfTransactions: number, allTags: Tag[], allTeams: Team[]) => {
	let counter = numberOfTransactions;
	const data: Transaction[] = [];
	while (counter >= 0) {
		const transaction = {
			date: randomDateBetween(DateTime.now().plus({ months: -3 }).startOf('month'), DateTime.now()),
			amountInCents: getRandomInt(10000),
			tags: getRandomTags(allTags),
			team: allTeams[getRandomInt(allTeams.length)],
		};
		data.push(transaction);
		counter--;
	}
	return data;
};
