import React, { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css';
import { useTransactionsProvider } from './hooks/transactionsProvider';
import 'antd/dist/antd.css';
import { MonthSelect } from './components/MonthSelect';
import { TagsSelect } from './components/TagsSelect';
import { TeamsSelect } from './components/TeamsSelect';
import { Button } from 'antd';
import { DateTime } from 'luxon';

const App: React.FC = () => {
	const { transactions, fetchTransactions } = useTransactionsProvider();
	const { transactions: comparedTransactions, fetchTransactions: fetchComparedTransactions } =
		useTransactionsProvider();

	const [selectedMonth, setSelectedMonth] = useState<string>();
	const [selectedTags, setSelectedTags] = useState<string[]>();
	const [selectedTeams, setSelectedTeams] = useState<string[]>();

	const [selectedComapredMonth, setSelectedComapredMonth] = useState<string>();
	const [selectedComapredTags, setSelectedComapredTags] = useState<string[]>();
	const [selectedComapredTeams, setSelectedComapredTeams] = useState<string[]>();

	const [isComparing, setIsComparing] = useState(false);

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
		fetchTransactions(selectedMonth, selectedTags, selectedTeams);
	}, [selectedMonth, selectedTags, selectedTeams]);

	const handleComparedMonthChange = (value: string) => {
		setSelectedComapredMonth(value);
	};

	const handleComparedTagsChange = (value: string[]) => {
		setSelectedComapredTags(value);
	};

	const handleComparedTeamsChange = (value: string[]) => {
		setSelectedComapredTeams(value);
	};

	useEffect(() => {
		fetchComparedTransactions(selectedComapredMonth, selectedComapredTags, selectedComapredTeams);
	}, [selectedComapredMonth, selectedComapredTags, selectedComapredTeams]);

	const data = useMemo(() => {
		if (!isComparing) {
			return transactions;
		}
		const comparedTransactionsParsed = comparedTransactions.map((t) => ({
			...t,
			totalExpenseCompared: t.totalExpense,
			totalExpense: undefined,
		}));
		return [...transactions, ...comparedTransactionsParsed].sort((a, b) => {
			const aDate = DateTime.fromISO(a.date);
			const bDate = DateTime.fromISO(b.date);
			return aDate.toMillis() - bDate.toMillis();
		});
	}, [transactions, comparedTransactions]);

	return (
		<div className="App">
			<AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#61dafb" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#61dafb" stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#6bfb61" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#6bfb61" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="datePretty" />
				<YAxis />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Area
					connectNulls
					type="monotone"
					dataKey="totalExpense"
					stroke="#61dafb"
					fillOpacity={1}
					fill="url(#colorUv)"
				/>
				{isComparing && (
					<Area
						connectNulls
						type="monotone"
						dataKey="totalExpenseCompared"
						stroke="#6bfb61"
						fillOpacity={1}
						fill="url(#colorPv)"
					/>
				)}
			</AreaChart>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					border: '2px solid #61dafb',
				}}
			>
				<div style={{ padding: '2vw' }}>
					<MonthSelect handleMonthChange={handleMonthChange} selectedMonth={selectedMonth} />
				</div>
				<div style={{ padding: '2vw' }}>
					<TagsSelect handleTagsChange={handleTagsChange} selectedTags={selectedTags} />
				</div>
				<div style={{ padding: '2vw' }}>
					<TeamsSelect handleTeamsChange={handleTeamsChange} selectedTeams={selectedTeams} />
				</div>
			</div>
			<div style={{ paddingTop: '2vw' }}>
				{isComparing ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							border: '2px solid #6bfb61',
						}}
					>
						<div style={{ padding: '2vw' }}>
							<MonthSelect
								handleMonthChange={handleComparedMonthChange}
								selectedMonth={selectedComapredMonth}
							/>
						</div>
						<div style={{ padding: '2vw' }}>
							<TagsSelect
								handleTagsChange={handleComparedTagsChange}
								selectedTags={selectedComapredTags}
							/>
						</div>
						<div style={{ padding: '2vw' }}>
							<TeamsSelect
								handleTeamsChange={handleComparedTeamsChange}
								selectedTeams={selectedComapredTeams}
							/>
						</div>
					</div>
				) : (
					<Button
						onClick={() => {
							setIsComparing(true);
						}}
					>
						Compare
					</Button>
				)}
			</div>
		</div>
	);
};

export default App;
