import React, { useEffect } from 'react';
import { Select, Spin } from 'antd';

import { MultipleChoiceSelect } from './MultipleChoiceSelect';
import { useTagsProvider } from '../hooks/tagsProvider';
import { useTeamsProvider } from '../hooks/teamsProvider';

type Props = {
	selectedTeams?: string[];
	handleTeamsChange: (value: string[]) => void;
};

export const TeamsSelect: React.FC<Props> = (props) => {
	const { teams } = useTeamsProvider();

	useEffect(() => {
		if (teams) {
			props.handleTeamsChange(teams);
		}
	}, [teams]);

	if (!teams) {
		return <Spin />;
	}

	return (
		<MultipleChoiceSelect
			placeholder={'Select teams'}
			options={teams}
			handleChange={props.handleTeamsChange}
			defaultValue={[]}
			value={props.selectedTeams}
		/>
	);
};
