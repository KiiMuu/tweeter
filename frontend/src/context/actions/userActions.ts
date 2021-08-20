import {
	EditProfileType,
	IUserInfo,
	SignUpType,
	SignInType,
	LogoutType,
	GetUserProfileType,
	FollowType,
	ICurrentUser,
	IUserProfile,
} from '../types/user';

// * user auth
interface SignUpActionRequest {
	type: SignUpType.SIGNUP_REQUEST;
}

interface SignUpActionSuccess {
	type: SignUpType.SIGNUP_SUCCESS;
	payload: ICurrentUser;
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
	payload: ICurrentUser;
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
interface GetUserProfileActionRequest {
	type: GetUserProfileType.GET_USER_REQUEST;
}

interface GetUserProfileActionSuccess {
	type: GetUserProfileType.GET_USER_SUCCESS;
	payload: IUserProfile;
}

interface GetUserProfileActionFail {
	type: GetUserProfileType.GET_USER_FAIL;
	payload: string;
}

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

interface FollowActionRequest {
	type: FollowType.FOLLOW_REQUEST;
}

interface FollowActionSuccess {
	type: FollowType.FOLLOW_SUCCESS;
	payload: IUserInfo;
}

interface FollowActionFail {
	type: FollowType.FOLLOW_FAIL;
	payload: string;
}

export type Action =
	| GetUserProfileActionRequest
	| GetUserProfileActionSuccess
	| GetUserProfileActionFail
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
	| LogoutAction
	| FollowActionRequest
	| FollowActionSuccess
	| FollowActionFail;
