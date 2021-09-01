import { Action } from '../actions/search';
import { ITweeta } from '../types/tweeta';
import { IUserInfo } from '../types/user';
import { SearchAppType } from '../types/search';

interface SearchState {
	searchLoading: boolean;
	searchError: string | null;
	searchResult: {
		users: IUserInfo[];
		tweets: ITweeta[];
	};
}

export const initialSearchState: SearchState = {
	searchLoading: false,
	searchError: null,
	searchResult: {
		users: [],
		tweets: [],
	},
};

export const searchReducer = (
	state = initialSearchState,
	action: Action
): SearchState => {
	switch (action.type) {
		// * search app
		case SearchAppType.SEARCH_APP_REQUEST:
			return {
				...state,
				searchLoading: true,
				searchError: null,
			};
		case SearchAppType.SEARCH_APP_SUCCESS:
			return {
				...state,
				searchLoading: false,
				searchError: null,
				searchResult: {
					users: action.payload.users,
					tweets: action.payload.tweets,
				},
			};
		case SearchAppType.SEARCH_APP_FAIL:
			return {
				...state,
				searchLoading: false,
				searchError: action.payload,
			};
		default:
			return state;
	}
};
