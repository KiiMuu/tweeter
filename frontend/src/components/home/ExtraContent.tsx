import { useState, useContext } from 'react';
import SearchContext from '../../context/contexts/search';
import SearchInput from '../search/SearchInput';

// interface Props {}

const ExtraContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const { searchApp } = useContext(SearchContext);

	return (
		<div>
			<SearchInput
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchApp={searchApp}
			/>
			<div style={{ padding: '20px' }}>ExtraContent</div>
		</div>
	);
};

export default ExtraContent;
