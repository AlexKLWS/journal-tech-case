import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css';
import { useTransactionsProvider } from './hooks/transactionsProvider';
import 'antd/dist/antd.css';
import { MonthSelect } from './components/MonthSelect';
import { Button } from 'antd';
import { DateTime } from 'luxon';
import SelectControls from './components/SelectControls';

const App: React.FC = () => {
	const { transactions, fetchTransactions } = useTransactionsProvider();
	const { transactions: comparedTransactions, fetchTransactions: fetchComparedTransactions } =
		useTransactionsProvider();

	const selectedTagsRef = useRef<string[]>();
	const selectedTeamsRef = useRef<string[]>();
	const selectedComapredTagsRef = useRef<string[]>();
	const selectedComapredTeamsRef = useRef<string[]>();

	const [selectedMonth, setSelectedMonth] = useState<string>();

	const [isComparing, setIsComparing] = useState(false);

	const handleMonthChange = (value: string) => {
		setSelectedMonth(value);
	};

	useEffect(() => {
		fetchTransactions(selectedMonth, selectedTagsRef.current, selectedTeamsRef.current);
		fetchComparedTransactions(selectedMonth, selectedComapredTagsRef.current, selectedComapredTeamsRef.current);
	}, [selectedMonth]);

	const onSelectedValuesChange = (selectedTags?: string[], selectedTeams?: string[]) => {
		fetchTransactions(selectedMonth, selectedTags, selectedTeams);
		selectedTagsRef.current = selectedTags;
		selectedTeamsRef.current = selectedTeams;
	};

	const onComparedSelectedValuesChange = (selectedTags?: string[], selectedTeams?: string[]) => {
		fetchComparedTransactions(selectedMonth, selectedTags, selectedTeams);
		selectedComapredTagsRef.current = selectedTags;
		selectedComapredTeamsRef.current = selectedTeams;
	};

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
			<div>
				<div style={{ paddingBottom: '4vw', display: 'flex', alignItems: 'flex-start' }}>
					<MonthSelect handleMonthChange={handleMonthChange} selectedMonth={selectedMonth} />
				</div>
			</div>
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
			<SelectControls onValuesChange={onSelectedValuesChange} borderColor={'#61dafb'} />
			<div style={{ paddingTop: '2vw' }}>
				{isComparing ? (
					<SelectControls onValuesChange={onComparedSelectedValuesChange} borderColor={'#6bfb61'} />
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
