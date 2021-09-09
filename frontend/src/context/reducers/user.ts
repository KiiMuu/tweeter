import { Action } from '../actions/user';
import { IMedia, ITweeta } from '../types/tweeta';
import {
	SignUpType,
	SignInType,
	LogoutType,
	EditProfileType,
	GetUserProfileType,
	FollowType,
	IUserProfile,
	ICurrentUser,
	GetUserProfileDataType,
	PinTweetaType,
	IUserInfo,
	WhoToFollowType,
} from '../types/user';

interface UserState {
	loading: boolean;
	error: string | null;
	currentUser: ICurrentUser;
	userProfile: IUserProfile;
	userProfileData: {
		tweets: ITweeta[];
		replies: ITweeta[];
		likes: ITweeta[];
		media: IMedia[];
	};
	whoToFollowUsers: IUserInfo[];
	total: number;
	userProfileLoading: boolean;
	userProfileError: string | null;
	addProfilePicLoading: boolean;
	addProfilePicError: string | null;
	addProfilePicSuccess: boolean;
	profilePic: {};
	addCoverPicLoading: boolean;
	addCoverPicError: string | null;
	addCoverPicSuccess: boolean;
	coverPhoto: {};
	editProfileLoading: boolean;
	editProfileSuccess: boolean;
	editProfileError: string | null;
	followLoading: boolean;
	followSuccess: boolean;
	followError: string | null;
	userProfileDataLoading: boolean;
	userProfileDataError: string | null;
	pinTweetaLoading: boolean;
	pinTweetaError: string | null;
	pinTweetaSuccess: boolean;
	whoToFollowLoading: boolean;
	whoToFollowError: string | null;
}

const userInfoFromLS: ICurrentUser = localStorage.getItem('tweeterUser')
	? JSON.parse(localStorage.getItem('tweeterUser') as string)
	: null;

export const initialUserState: UserState = {
	loading: false,
	error: null,
	currentUser: userInfoFromLS,
	userProfile: {},
	userProfileData: {
		tweets: [],
		replies: [],
		likes: [],
		media: [],
	},
	whoToFollowUsers: [],
	total: 0,
	userProfileLoading: false,
	userProfileError: null,
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
	followLoading: false,
	followSuccess: false,
	followError: null,
	userProfileDataLoading: false,
	userProfileDataError: null,
	pinTweetaLoading: false,
	pinTweetaError: null,
	pinTweetaSuccess: false,
	whoToFollowLoading: false,
	whoToFollowError: null,
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
			};
		case SignUpType.SIGNUP_SUCCESS:
		case SignInType.SIGNIN_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				currentUser: {
					token: action.payload.token,
					user: action.payload.user,
				},
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
				currentUser: {
					token: null,
					user: {},
				},
			};
		// * user profile
		case GetUserProfileType.GET_USER_REQUEST:
			return {
				...state,
				userProfileLoading: true,
			};
		case GetUserProfileType.GET_USER_SUCCESS:
			return {
				...state,
				userProfile: action.payload,
				userProfileLoading: false,
			};
		case GetUserProfileType.GET_USER_FAIL:
			return {
				...state,
				userProfile: {},
				userProfileError: action.payload,
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
				currentUser: {
					user: {
						...state.currentUser.user,
						profilePic: action.payload.profilePic,
						coverPhoto: action.payload.coverPhoto,
						name: action.payload.name,
						bio: action.payload.bio,
						location: action.payload.location,
						website: action.payload.website,
						birthdate: action.payload.birthdate,
					},
				},
			};
		case EditProfileType.EDIT_PROFILE_FAIL:
			return {
				...state,
				editProfileError: action.payload,
				editProfileLoading: false,
			};
		// * follow handling
		case FollowType.FOLLOW_REQUEST:
			return {
				...state,
				followLoading: true,
			};
		case FollowType.FOLLOW_SUCCESS:
			let isUserProfile =
				state.userProfile?.user?._id === action.payload.followedUserId;

			return {
				...state,
				followLoading: false,
				currentUser: {
					user: {
						...state.currentUser.user,
						following: action.payload.following,
					},
				},
				userProfile: {
					user: isUserProfile
						? {
								...state.userProfile.user,
								followers: action.payload.followers,
						  }
						: { ...state.userProfile.user },
				},
			};
		case FollowType.FOLLOW_FAIL:
			return {
				...state,
				followError: action.payload,
				followLoading: false,
			};

		// * get user profile data -> tweets, replies, etc.
		case GetUserProfileDataType.GET_USER_PROFILE_DATA_REQUEST:
			return {
				...state,
				userProfileDataLoading: true,
			};
		case GetUserProfileDataType.GET_USER_PROFILE_DATA_SUCCESS:
			return {
				...state,
				userProfileDataLoading: false,
				userProfileData: {
					tweets: action.payload.tweets,
					replies: action.payload.replies,
					likes: action.payload.likes,
					media: action.payload.media,
				},
			};
		case GetUserProfileDataType.GET_USER_PROFILE_DATA_FAIL:
			return {
				...state,
				userProfileDataError: action.payload,
				userProfileDataLoading: false,
			};

		// * pin user tweeta
		case PinTweetaType.PIN_TWEETA_REQUEST:
			return {
				...state,
				pinTweetaLoading: true,
			};
		case PinTweetaType.PIN_TWEETA_SUCCESS:
			return {
				...state,
				pinTweetaLoading: false,
				userProfileData: {
					...state.userProfileData,
					tweets: state.userProfileData.tweets.map(
						(tweeta: ITweeta) => {
							return tweeta._id === action.payload._id
								? {
										...action.payload,
										isPinned: action.payload.isPinned,
								  }
								: tweeta;
						}
					),
				},
			};
		case PinTweetaType.PIN_TWEETA_FAIL:
			return {
				...state,
				userProfileDataError: action.payload,
				userProfileDataLoading: false,
			};

		// * who to follow users
		case WhoToFollowType.WHO_TO_FOLLOW_REQUEST:
			return {
				...state,
				whoToFollowLoading: true,
			};
		case WhoToFollowType.WHO_TO_FOLLOW_SUCCESS:
			return {
				...state,
				whoToFollowLoading: false,
				whoToFollowUsers: action.payload.users,
				total: action.payload.total,
			};
		case WhoToFollowType.WHO_TO_FOLLOW_FAIL:
			return {
				...state,
				whoToFollowError: action.payload,
				whoToFollowLoading: false,
			};
		default:
			return state;
	}
};
