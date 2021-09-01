import { SearchAppType } from '../types/search';
import { ITweeta } from '../types/tweeta';
import { IUserInfo } from '../types/user';

// * search app
interface SearchAppActionRequest {
	type: SearchAppType.SEARCH_APP_REQUEST;
}

interface SearchAppActionSuccess {
	type: SearchAppType.SEARCH_APP_SUCCESS;
	payload: {
		users: IUserInfo[];
		tweets: ITweeta[];
	};
}

interface SearchAppActionFail {
	type: SearchAppType.SEARCH_APP_FAIL;
	payload: string | null;
}

export type Action =
	| SearchAppActionRequest
	| SearchAppActionSuccess
	| SearchAppActionFail;
