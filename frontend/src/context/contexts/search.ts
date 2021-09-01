import { createContext } from 'react';
import { ITweeta } from '../types/tweeta';
import { IUserInfo } from '../types/user';

type searchContextType = {
	searchLoading: boolean;
	searchError: string | null;
	searchResult: {
		users: IUserInfo[];
		tweets: ITweeta[];
	};
	searchApp: (searchTerm: string) =>
		| {
				users: IUserInfo[];
				tweets: ITweeta[];
		  }
		| object;
};

const searchContextDefaultValues: searchContextType = {
	searchLoading: false,
	searchError: null,
	searchResult: {
		users: [],
		tweets: [],
	},
	searchApp: () => {
		return {
			users: [],
			tweets: [],
		};
	},
};

const SearchContext = createContext<searchContextType>(
	searchContextDefaultValues
);

export default SearchContext;
