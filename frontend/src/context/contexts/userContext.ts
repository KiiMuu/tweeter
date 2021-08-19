import { createContext } from 'react';
import { ISignIn, ISignUp, IUserInfo } from '../types/user';

const userInfoFromLS = localStorage.getItem('tweeterUser')
	? JSON.parse(localStorage.getItem('tweeterUser') as string)
	: null;

type userContextType = {
	loading: boolean;
	error: string | null;
	currentUser: any;
	userProfile: object;
	userProfileLoading: boolean;
	userProfileError: string | null;
	addProfilePicLoading: boolean;
	addProfilePicError: string | null;
	addProfilePicSuccess: boolean;
	profilePic: any;
	addCoverPicLoading: boolean;
	addCoverPicError: string | null;
	addCoverPicSuccess: boolean;
	coverPhoto: any;
	editProfileLoading: boolean;
	editProfileSuccess: boolean;
	editProfileError: string | null;
	followLoading: boolean;
	followSuccess: boolean;
	followError: string | null;
	signUp: (user: ISignUp) => any;
	signIn: (user: ISignIn) => any;
	getUserProfile: (username: string) => any;
	logout: () => void;
	addUserPic: (profilePic: object) => any;
	addUserCover: (coverPhoto: object) => any;
	editUserProfile: (userInfo: IUserInfo) => any;
	follow: (userId: string) => any;
};

const userContextDefaultValues: userContextType = {
	loading: false,
	error: null,
	currentUser: userInfoFromLS,
	userProfile: {},
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
	signUp: () => {},
	signIn: () => {},
	addUserPic: () => {},
	addUserCover: () => {},
	getUserProfile: () => {},
	editUserProfile: () => {},
	follow: () => {},
	logout: () => {},
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export default UserContext;
