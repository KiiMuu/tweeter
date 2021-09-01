import { useContext } from 'react';
import SearchContext from '../context/contexts/search';
import HomeLayout from '../components/home/HomeLayout';
import { PageTitle } from '../styles/headings';
import SearchFeed from '../components/search/SearchFeed';

const Search: React.FC = () => {
	const { searchLoading, searchError, searchResult } =
		useContext(SearchContext);

	return (
		<HomeLayout>
			<PageTitle>Search</PageTitle>
			<SearchFeed
				searchLoading={searchLoading}
				searchError={searchError}
				searchResult={searchResult}
			/>
		</HomeLayout>
	);
};

export default Search;
