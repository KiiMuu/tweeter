import {
	EditProfileType,
	IUserInfo,
	SignUpType,
	SignInType,
	LogoutType,
} from '../types/user';

// * user auth
interface SignUpActionRequest {
	type: SignUpType.SIGNUP_REQUEST;
}

interface SignUpActionSuccess {
	type: SignUpType.SIGNUP_SUCCESS;
	payload: object;
}

interface SignUpActionFail {
	type: SignUpType.SIGNUP_FAIL;
	payload: string;
}

interface SignInActionRequest {
	type: SignInType.SIGNIN_REQUEST;
}

interface SignInActionSuccess {
	type: SignInType.SIGNIN_SUCCESS;
	payload: object;
}

interface SignInActionFail {
	type: SignInType.SIGNIN_FAIL;
	payload: string;
}

interface LogoutAction {
	type: LogoutType.USER_LOGOUT;
	payload: {};
}

// * user profile
interface AddUserPicActionRequest {
	type: EditProfileType.ADD_USER_PIC_REQUEST;
}

interface AddUserPicActionSuccess {
	type: EditProfileType.ADD_USER_PIC_SUCCESS;
	payload: object;
}

interface AddUserPicActionFail {
	type: EditProfileType.ADD_USER_PIC_FAIL;
	payload: string;
}

interface AddUserCoverActionRequest {
	type: EditProfileType.ADD_USER_COVER_REQUEST;
}

interface AddUserCoverActionSuccess {
	type: EditProfileType.ADD_USER_COVER_SUCCESS;
	payload: object;
}

interface AddUserCoverActionFail {
	type: EditProfileType.ADD_USER_COVER_FAIL;
	payload: string;
}

interface EditProfileActionRequest {
	type: EditProfileType.EDIT_PROFILE_REQUEST;
}

interface EditProfileActionSuccess {
	type: EditProfileType.EDIT_PROFILE_SUCCESS;
	payload: IUserInfo;
}

interface EditProfileActionFail {
	type: EditProfileType.EDIT_PROFILE_FAIL;
	payload: string;
}

export type Action =
	| EditProfileActionRequest
	| EditProfileActionSuccess
	| EditProfileActionFail
	| AddUserPicActionRequest
	| AddUserPicActionFail
	| AddUserPicActionSuccess
	| AddUserCoverActionRequest
	| AddUserCoverActionFail
	| AddUserCoverActionSuccess
	| SignUpActionRequest
	| SignUpActionSuccess
	| SignUpActionFail
	| SignInActionRequest
	| SignInActionSuccess
	| SignInActionFail
	| LogoutAction;
