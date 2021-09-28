import { useContext, useState } from 'react';
import SearchContext from '../context/contexts/search';
import HomeLayout from '../components/home/HomeLayout';
import { PageTitle } from '../styles/headings';
import SearchFeed from '../components/search/SearchFeed';
import SearchInput from '../components/search/SearchInput';
import { useMediaQuery, useTheme } from '@material-ui/core';

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const { searchLoading, searchError, searchResult, searchApp } =
		useContext(SearchContext);
	const theme = useTheme();
	const sm = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<HomeLayout>
			<PageTitle>Search</PageTitle>
			{sm && (
				<SearchInput
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					searchApp={searchApp}
				/>
			)}
			<SearchFeed
				searchLoading={searchLoading}
				searchError={searchError}
				searchResult={searchResult}
			/>
		</HomeLayout>
	);
};

export default Search;
