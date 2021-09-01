import { useHistory } from 'react-router-dom';
import { TextField } from '../../styles/inputs';

interface SearchInputProps {
	searchTerm: string;
	setSearchTerm: Function;
	searchApp: Function;
}

const SearchInput: React.FC<SearchInputProps> = ({
	searchTerm,
	setSearchTerm,
	searchApp,
}) => {
	const history = useHistory();

	const handleKeyUp = (e: React.KeyboardEvent) => {
		if (e.code === 'Enter' && searchTerm) {
			searchApp(searchTerm);

			history.push(
				`/search?searchTerm=${searchTerm.replaceAll(' ', '-')}`
			);
		}
	};

	return (
		<div style={{ padding: '8px var(--paddingLeftRight)' }}>
			<TextField
				value={searchTerm}
				placeholder='Search Tweeter'
				onChange={e => setSearchTerm(e.target.value)}
				onKeyUp={handleKeyUp}
			/>
		</div>
	);
};

export default SearchInput;
