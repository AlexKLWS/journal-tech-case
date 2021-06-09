import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css';
import { fetchTransactions } from './mockAPI/client';
import { Transaction } from './types/transactions';

const App: React.FC = () => {
	const [data, setData] = useState<Transaction[]>([]);

	const fetchData = async () => {
		const response = await fetchTransactions({});
		setData(response.data.transactions);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="App">
			<AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#61dafb" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#61dafb" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="date" />
				<YAxis />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Area type="monotone" dataKey="amountInCents" stroke="#61dafb" fillOpacity={1} fill="url(#colorUv)" />
			</AreaChart>
		</div>
	);
};

export default App;
