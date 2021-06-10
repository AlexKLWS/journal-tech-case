import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css';
import { useTransactionsProvider } from './hooks/transactionsProvider';
import 'antd/dist/antd.css';
import { MonthSelect } from './components/MonthSelect';
import { DateTime } from 'luxon';
import { TransactionsRequestParams } from './types/requests';
import { TagsSelect } from './components/TagsSelect';
import { TeamsSelect } from './components/TeamsSelect';

const App: React.FC = () => {
	const { transactions: data, fetchTransactions: fetchData } = useTransactionsProvider();

	const [selectedMonth, setSelectedMonth] = useState<string>();
	const [selectedTags, setSelectedTags] = useState<string[]>();
	const [selectedTeams, setSelectedTeams] = useState<string[]>();

	const handleMonthChange = (value: string) => {
		setSelectedMonth(value);
	};

	const handleTagsChange = (value: string[]) => {
		setSelectedTags(value);
	};

	const handleTeamsChange = (value: string[]) => {
		setSelectedTeams(value);
	};

	useEffect(() => {
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
		fetchData(params);
	}, [selectedMonth, selectedTags, selectedTeams]);

	return (
		<div className="App">
			<div>
				<MonthSelect handleMonthChange={handleMonthChange} selectedMonth={selectedMonth} />
			</div>
			<AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#61dafb" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#61dafb" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="datePretty" />
				<YAxis />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Area type="monotone" dataKey="totalExpense" stroke="#61dafb" fillOpacity={1} fill="url(#colorUv)" />
			</AreaChart>
			<TagsSelect handleTagsChange={handleTagsChange} selectedTags={selectedTags} />
			<TeamsSelect handleTeamsChange={handleTeamsChange} selectedTeams={selectedTeams} />
		</div>
	);
};

export default App;
