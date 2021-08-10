import { Action } from '../actions/userActions';
import {
	SignUpType,
	SignInType,
	LogoutType,
	EditProfileType,
} from '../types/user';

interface UserState {
	loading: boolean;
	error: string | null;
	user: object;
	addProfilePicLoading: boolean;
	addProfilePicError: string | null;
	addProfilePicSuccess: boolean;
	profilePic: object;
	addCoverPicLoading: boolean;
	addCoverPicError: string | null;
	addCoverPicSuccess: boolean;
	coverPhoto: object;
	editProfileLoading: boolean;
	editProfileSuccess: boolean;
	editProfileError: string | null;
}

const userInfoFromLS = localStorage.getItem('tweeterUser')
	? JSON.parse(localStorage.getItem('tweeterUser') as string)
	: null;

export const initialUserState: UserState = {
	loading: false,
	error: null,
	user: userInfoFromLS,
	addProfilePicLoading: false,
	addProfilePicError: null,
	addProfilePicSuccess: false,
	profilePic: {},
	addCoverPicLoading: false,
	addCoverPicError: null,
	addCoverPicSuccess: false,
	coverPhoto: {},
	editProfileLoading: false,
	editProfileSuccess: false,
	editProfileError: null,
};

export const userReducer = (
	state = initialUserState,
	action: Action
): UserState => {
	switch (action.type) {
		// * user auth
		case SignUpType.SIGNUP_REQUEST:
		case SignInType.SIGNIN_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				// token: null,
			};
		case SignUpType.SIGNUP_SUCCESS:
		case SignInType.SIGNIN_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				user: action.payload,
			};
		case SignUpType.SIGNUP_FAIL:
		case SignInType.SIGNIN_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case LogoutType.USER_LOGOUT:
			return {
				...state,
				loading: false,
				error: null,
				user: {},
			};
		// * user pic
		case EditProfileType.ADD_USER_PIC_REQUEST:
			return {
				...state,
				addProfilePicLoading: true,
			};
		case EditProfileType.ADD_USER_PIC_SUCCESS:
			return {
				...state,
				profilePic: action.payload,
				addProfilePicLoading: false,
				addProfilePicSuccess: true,
			};
		case EditProfileType.ADD_USER_PIC_FAIL:
			return {
				...state,
				addProfilePicLoading: false,
				addProfilePicError: action.payload,
			};
		// * user cover
		case EditProfileType.ADD_USER_COVER_REQUEST:
			return {
				...state,
				addCoverPicLoading: true,
			};
		case EditProfileType.ADD_USER_COVER_SUCCESS:
			return {
				...state,
				coverPhoto: action.payload,
				addCoverPicLoading: false,
				addCoverPicSuccess: true,
			};
		case EditProfileType.ADD_USER_COVER_FAIL:
			return {
				...state,
				addCoverPicLoading: false,
				addCoverPicError: action.payload,
			};
		// * edit profile info
		case EditProfileType.EDIT_PROFILE_REQUEST:
			return {
				...state,
				editProfileLoading: true,
			};
		case EditProfileType.EDIT_PROFILE_SUCCESS:
			return {
				...state,
				editProfileLoading: false,
				editProfileSuccess: true,
				user: {
					...state.user,
					profilePic: action.payload.profilePic,
					coverPhoto: action.payload.coverPhoto,
					name: action.payload.name,
					bio: action.payload.bio,
					location: action.payload.location,
					website: action.payload.website,
					birthdate: action.payload.birthdate,
				},
			};
		case EditProfileType.EDIT_PROFILE_FAIL:
			return {
				...state,
				editProfileError: action.payload,
				editProfileLoading: false,
			};
		default:
			return state;
	}
};
