import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from '../contexts/user';
import { userReducer, initialUserState } from '../reducers/user';
import {
	EditProfileType,
	ISignIn,
	ISignUp,
	IUserInfo,
	LogoutType,
	SignInType,
	SignUpType,
	GetUserProfileType,
	FollowType,
	GetUserProfileDataType,
	PinTweetaType,
	WhoToFollowType,
} from '../types/user';
import useUserInfo from '../../hooks/useUserInfo';
import { IMedia, ITweeta } from '../types/tweeta';

const UserState = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(userReducer, initialUserState);
	const { currentUser } = useUserInfo();

	// * actions
	const signUp = async (user: ISignUp) => {
		try {
			dispatch({
				type: SignUpType.SIGNUP_REQUEST,
			});

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post('/user/signup', user, config);

			dispatch({
				type: SignUpType.SIGNUP_SUCCESS,
				payload: data,
			});

			localStorage.setItem('tweeterUser', JSON.stringify(data));
		} catch (error: any) {
			dispatch({
				type: SignUpType.SIGNUP_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const signIn = async (user: ISignIn) => {
		try {
			dispatch({
				type: SignInType.SIGNIN_REQUEST,
			});

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post('/user/signin', user, config);

			dispatch({
				type: SignInType.SIGNIN_SUCCESS,
				payload: data,
			});

			localStorage.setItem('tweeterUser', JSON.stringify(data));
		} catch (error: any) {
			dispatch({
				type: SignInType.SIGNIN_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const logout = async () => {
		localStorage.removeItem('tweeterUser');

		dispatch({
			type: LogoutType.USER_LOGOUT,
			payload: {},
		});
	};

	const getUserProfile = async (
		username: string
	): Promise<IUserInfo | void> => {
		try {
			dispatch({
				type: GetUserProfileType.GET_USER_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.get(`/user/${username}`, config);

			dispatch({
				type: GetUserProfileType.GET_USER_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: GetUserProfileType.GET_USER_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const addUserPic = async (profilePic: object) => {
		try {
			dispatch({
				type: EditProfileType.ADD_USER_PIC_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				'/user/profilePic',
				profilePic,
				config
			);

			dispatch({
				type: EditProfileType.ADD_USER_PIC_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: EditProfileType.ADD_USER_PIC_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const addUserCover = async (coverPhoto: object) => {
		try {
			dispatch({
				type: EditProfileType.ADD_USER_COVER_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				'/user/coverPhoto',
				coverPhoto,
				config
			);

			dispatch({
				type: EditProfileType.ADD_USER_COVER_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: EditProfileType.ADD_USER_COVER_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const editUserProfile = async (userInfo: IUserInfo) => {
		try {
			dispatch({
				type: EditProfileType.EDIT_PROFILE_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.put(
				'/user/editProfile',
				userInfo,
				config
			);

			dispatch({
				type: EditProfileType.EDIT_PROFILE_SUCCESS,
				payload: data,
			});

			currentUser.user.profilePic = data?.profilePic;
			currentUser.user.coverPhoto = data?.coverPhoto;
			currentUser.user.name = data?.name;
			currentUser.user.bio = data?.bio;
			currentUser.user.location = data?.location;
			currentUser.user.website = data?.website;
			currentUser.user.birthdate = data?.birthdate;
			window.localStorage.setItem(
				'tweeterUser',
				JSON.stringify(currentUser)
			);
		} catch (error: any) {
			dispatch({
				type: EditProfileType.EDIT_PROFILE_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const follow = async (userId: string) => {
		try {
			dispatch({
				type: FollowType.FOLLOW_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.put(
				`/user/${userId}/follow`,
				{},
				config
			);

			dispatch({
				type: FollowType.FOLLOW_SUCCESS,
				payload: data,
			});

			currentUser.user.following = data?.following;
			currentUser.user.followers = data?.followers;
			window.localStorage.setItem(
				'tweeterUser',
				JSON.stringify(currentUser)
			);
		} catch (error: any) {
			dispatch({
				type: FollowType.FOLLOW_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const getUserProfileData = async (
		username: string
	): Promise<{
		tweets: ITweeta[];
		replies: ITweeta[];
		likes: ITweeta[];
		media: IMedia[];
	} | void> => {
		try {
			dispatch({
				type: GetUserProfileDataType.GET_USER_PROFILE_DATA_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.get(`/user/${username}/tabs`, config);

			dispatch({
				type: GetUserProfileDataType.GET_USER_PROFILE_DATA_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: GetUserProfileDataType.GET_USER_PROFILE_DATA_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const handleTweetaPin = async (
		id: string,
		isPinned: boolean
	): Promise<ITweeta | void> => {
		try {
			dispatch({
				type: PinTweetaType.PIN_TWEETA_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.put(
				`/tweeta/${id}/pin`,
				{ isPinned },
				config
			);

			dispatch({
				type: PinTweetaType.PIN_TWEETA_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: PinTweetaType.PIN_TWEETA_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	const handleWhoToFollow = async (
		username: string,
		page: number
	): Promise<IUserInfo[] | void> => {
		try {
			dispatch({
				type: WhoToFollowType.WHO_TO_FOLLOW_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${currentUser?.token}`,
				},
			};

			const { data } = await axios.post(
				`/user/${username}/whoToFollow`,
				{ page },
				config
			);

			dispatch({
				type: WhoToFollowType.WHO_TO_FOLLOW_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: WhoToFollowType.WHO_TO_FOLLOW_FAIL,
				payload: error.response?.data.message
					? error.response.data.message
					: error.message,
			});
		}
	};

	return (
		<UserContext.Provider
			value={{
				loading: state.loading,
				error: state.error,
				currentUser: state.currentUser,
				userProfile: state.userProfile,
				userProfileData: state.userProfileData,
				userProfileLoading: state.userProfileLoading,
				userProfileError: state.userProfileError,
				addProfilePicLoading: state.addProfilePicLoading,
				addProfilePicError: state.addProfilePicError,
				addProfilePicSuccess: state.addProfilePicSuccess,
				profilePic: state.profilePic,
				addCoverPicLoading: state.addCoverPicLoading,
				addCoverPicError: state.addCoverPicError,
				addCoverPicSuccess: state.addCoverPicSuccess,
				coverPhoto: state.coverPhoto,
				editProfileLoading: state.editProfileLoading,
				editProfileSuccess: state.editProfileSuccess,
				editProfileError: state.editProfileError,
				followLoading: state.followLoading,
				followSuccess: state.followSuccess,
				followError: state.followError,
				userProfileDataLoading: state.userProfileDataLoading,
				userProfileDataError: state.userProfileDataError,
				pinTweetaLoading: state.pinTweetaLoading,
				pinTweetaError: state.pinTweetaError,
				pinTweetaSuccess: state.pinTweetaSuccess,
				whoToFollowLoading: state.whoToFollowLoading,
				whoToFollowError: state.whoToFollowError,
				whoToFollowUsers: state.whoToFollowUsers,
				signUp,
				signIn,
				getUserProfile,
				logout,
				addUserPic,
				addUserCover,
				editUserProfile,
				follow,
				getUserProfileData,
				handleTweetaPin,
				handleWhoToFollow,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserState;
