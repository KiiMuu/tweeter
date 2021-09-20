import { createContext } from 'react';
import { IMedia, ITweeta } from '../types/tweeta';
import { ISignIn, ISignUp, IUserInfo } from '../types/user';

const userInfoFromLS = localStorage.getItem('tweeterUser')
	? JSON.parse(localStorage.getItem('tweeterUser') as string)
	: null;

type userContextType = {
	loading: boolean;
	error: string | null;
	currentUser: any;
	userProfile: object;
	userProfileData: {
		tweets: ITweeta[];
		replies: ITweeta[];
		likes: ITweeta[];
		media: IMedia[];
	};
	whoToFollowUsers: IUserInfo[];
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
	userProfileDataLoading: boolean;
	userProfileDataError: string | null;
	pinTweetaLoading: boolean;
	pinTweetaSuccess: boolean;
	pinTweetaError: string | null;
	whoToFollowLoading: boolean;
	whoToFollowError: string | null;
	total: number;
	usersListLoading: boolean;
	usersListError: string | null;
	usersList: IUserInfo[];
	totalUsers: number;
	signUp: (user: ISignUp) => any;
	signIn: (user: ISignIn) => any;
	getUserProfile: (username: string) => IUserInfo | object;
	logout: () => void;
	addUserPic: (profilePic: object) => any;
	addUserCover: (coverPhoto: object) => any;
	editUserProfile: (userInfo: IUserInfo) => any;
	follow: (userId: string) => any;
	getUserProfileData: (userId: string) =>
		| {
				tweets: ITweeta[];
				replies: ITweeta[];
				likes: ITweeta[];
				media: IMedia[];
		  }
		| object;
	handleTweetaPin: (
		id: string,
		isPinned: boolean
	) =>
		| {
				tweeta: ITweeta;
		  }
		| object;
	handleWhoToFollow: (
		username: string,
		page: number
	) =>
		| {
				users: IUserInfo[];
				total: number;
		  }
		| object;
	getUsers: (
		searchTerm: string,
		limit: number
	) =>
		| {
				users: IUserInfo[];
				totalUsers: number;
		  }
		| object;
};

const userContextDefaultValues: userContextType = {
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
	pinTweetaSuccess: false,
	pinTweetaError: null,
	whoToFollowLoading: false,
	whoToFollowError: null,
	total: 0,
	usersListLoading: false,
	usersListError: null,
	usersList: [],
	totalUsers: 0,
	signUp: () => {},
	signIn: () => {},
	addUserPic: () => {},
	addUserCover: () => {},
	getUserProfile: () => {
		return {};
	},
	editUserProfile: () => {},
	follow: () => {},
	logout: () => {},
	getUserProfileData: () => {
		return {
			tweets: [],
			replies: [],
			likes: [],
			media: [],
		};
	},
	handleTweetaPin: () => {
		return { tweeta: {} };
	},
	handleWhoToFollow: () => {
		return { users: [], total: 0 };
	},
	getUsers: () => {
		return {
			users: [],
			totalUsers: 0,
		};
	},
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export default UserContext;
