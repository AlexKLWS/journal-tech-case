import { useEffect, useState } from 'react';

import { fetchTeams } from '../mockAPI/client';

export const useTeamsProvider = () => {
	const [teams, setTeams] = useState<string[]>();

	const fetchData = async () => {
		const response = await fetchTeams();

		setTeams(response.data.teams);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { teams };
};
