export enum SignUpType {
	SIGNUP_REQUEST = 'SIGNUP_REQUEST',
	SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
	SIGNUP_FAIL = 'SIGNUP_FAIL',
}

export enum SignInType {
	SIGNIN_REQUEST = 'SIGNIN_REQUEST',
	SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
	SIGNIN_FAIL = 'SIGNIN_FAIL',
}

export enum GetUserProfileType {
	GET_USER_REQUEST = 'GET_USER_REQUEST',
	GET_USER_SUCCESS = 'GET_USER_SUCCESS',
	GET_USER_FAIL = 'GET_USER_FAIL',
}

export enum EditProfileType {
	ADD_USER_PIC_REQUEST = 'ADD_USER_PIC_REQUEST',
	ADD_USER_PIC_SUCCESS = 'ADD_USER_PIC_SUCCESS',
	ADD_USER_PIC_FAIL = 'ADD_USER_PIC_FAIL',
	ADD_USER_COVER_REQUEST = 'ADD_USER_COVER_REQUEST',
	ADD_USER_COVER_SUCCESS = 'ADD_USER_COVER_SUCCESS',
	ADD_USER_COVER_FAIL = 'ADD_USER_COVER_FAIL',
	EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST',
	EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS',
	EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL',
}

export enum FollowType {
	FOLLOW_REQUEST = 'FOLLOW_REQUEST',
	FOLLOW_SUCCESS = 'FOLLOW_SUCCESS',
	FOLLOW_FAIL = 'FOLLOW_FAIL',
}

export enum GetUserProfileDataType {
	GET_USER_PROFILE_DATA_REQUEST = 'GET_USER_PROFILE_DATA_REQUEST',
	GET_USER_PROFILE_DATA_SUCCESS = 'GET_USER_PROFILE_DATA_SUCCESS',
	GET_USER_PROFILE_DATA_FAIL = 'GET_USER_PROFILE_DATA_FAIL',
}

export enum PinTweetaType {
	PIN_TWEETA_REQUEST = 'PIN_TWEETA_REQUEST',
	PIN_TWEETA_SUCCESS = 'PIN_TWEETA_SUCCESS',
	PIN_TWEETA_FAIL = 'PIN_TWEETA_FAIL',
}

export enum WhoToFollowType {
	WHO_TO_FOLLOW_REQUEST = 'WHO_TO_FOLLOW_REQUEST',
	WHO_TO_FOLLOW_SUCCESS = 'WHO_TO_FOLLOW_SUCCESS',
	WHO_TO_FOLLOW_FAIL = 'WHO_TO_FOLLOW_FAIL',
}

export enum LogoutType {
	USER_LOGOUT = 'USER_LOGOUT',
}

export interface ISignUp {
	name: string;
	username: string;
	email: string;
	password: string;
}

export interface ISignIn {
	email: string;
	password: string;
}

export interface IUserInfo {
	_id?: string;
	profilePic?: string;
	coverPhoto?: string;
	name?: string;
	username?: string;
	bio?: string;
	location?: string;
	website?: string;
	birthdate?: Date;
	likes?: string[];
	following?: IUserInfo[];
	followers?: IUserInfo[];
	followedUserId?: string;
}

export interface ICurrentUser {
	token?: string | null;
	user?: IUserInfo;
}

export interface IUserProfile {
	user?: IUserInfo;
}
