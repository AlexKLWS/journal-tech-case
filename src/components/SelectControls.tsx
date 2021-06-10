import React, { useEffect, useState } from 'react';
import { TagsSelect } from './TagsSelect';
import { TeamsSelect } from './TeamsSelect';

type Props = {
	borderColor: string;
	onValuesChange: (selectedTags?: string[], selectedTeams?: string[]) => void;
};

const SelectControls: React.FC<Props> = (props) => {
	const [selectedTags, setSelectedTags] = useState<string[]>();
	const [selectedTeams, setSelectedTeams] = useState<string[]>();

	const handleTagsChange = (value: string[]) => {
		setSelectedTags(value);
	};

	const handleTeamsChange = (value: string[]) => {
		setSelectedTeams(value);
	};

	useEffect(() => {
		props.onValuesChange(selectedTags, selectedTeams);
	}, [selectedTags, selectedTeams]);

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				border: `2px solid ${props.borderColor}`,
			}}
		>
			<div style={{ padding: '2vw' }}>
				<TagsSelect handleTagsChange={handleTagsChange} selectedTags={selectedTags} />
			</div>
			<div style={{ padding: '2vw' }}>
				<TeamsSelect handleTeamsChange={handleTeamsChange} selectedTeams={selectedTeams} />
			</div>
		</div>
	);
};

export default SelectControls;
