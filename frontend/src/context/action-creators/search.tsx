import { useReducer } from 'react';
import axios from 'axios';
import SearchContext from '../contexts/search';
import { searchReducer, initialSearchState } from '../reducers/search';
import { SearchAppType } from '../types/search';
import useUserInfo from '../../hooks/useUserInfo';
import { ITweeta } from '../types/tweeta';
import { IUserInfo } from '../types/user';

const SearchState = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(searchReducer, initialSearchState);
	const { currentUser } = useUserInfo();

	// * actions
	const searchApp = async (
		searchTerm: string
	): Promise<{ users: IUserInfo[]; tweets: ITweeta[] } | void> => {
		try {
			dispatch({
				type: SearchAppType.SEARCH_APP_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				`/search?searchTerm=${searchTerm}`,
				{},
				config
			);

			dispatch({
				type: SearchAppType.SEARCH_APP_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: SearchAppType.SEARCH_APP_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	return (
		<SearchContext.Provider
			value={{
				searchLoading: state.searchLoading,
				searchError: state.searchError,
				searchResult: state.searchResult,
				searchApp,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchState;
