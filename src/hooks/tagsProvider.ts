import { useEffect, useState } from 'react';

import { fetchTags } from '../mockAPI/client';

export const useTagsProvider = () => {
	const [tags, setTags] = useState<string[]>();

	const fetchData = async () => {
		const response = await fetchTags();

		setTags(response.data.tags);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { tags };
};
