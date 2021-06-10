import React, { useEffect } from 'react';
import { Spin } from 'antd';

import { MultipleChoiceSelect } from './MultipleChoiceSelect';
import { useTagsProvider } from '../hooks/tagsProvider';

type Props = {
	selectedTags?: string[];
	handleTagsChange: (value: string[]) => void;
};

export const TagsSelect: React.FC<Props> = (props) => {
	const { tags } = useTagsProvider();

	useEffect(() => {
		if (tags) {
			props.handleTagsChange(tags);
		}
	}, [tags]);

	if (!tags) {
		return <Spin />;
	}

	return (
		<MultipleChoiceSelect
			placeholder={'Select tags'}
			options={tags}
			handleChange={props.handleTagsChange}
			defaultValue={[]}
			value={props.selectedTags}
		/>
	);
};
