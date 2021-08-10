import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from '../contexts/userContext';
import { userReducer, initialUserState } from '../reducers/userReducer';
import {
	EditProfileType,
	ISignIn,
	ISignUp,
	IUserInfo,
	LogoutType,
	SignInType,
	SignUpType,
} from '../types/user';
import useUserInfo from '../../hooks/useUserInfo';

const UserState = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(userReducer, initialUserState);
	const { user } = useUserInfo();

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
		} catch (error) {
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
		} catch (error) {
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

	const addUserPic = async (profilePic: object) => {
		try {
			dispatch({
				type: EditProfileType.ADD_USER_PIC_REQUEST,
			});

			const config = {
				headers: {
					Authorization: `Bearer ${user?.token}`,
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
		} catch (error) {
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
					Authorization: `Bearer ${user?.token}`,
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
		} catch (error) {
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
					Authorization: `Bearer ${user?.token}`,
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

			user.user.profilePic = data?.profilePic;
			user.user.coverPhoto = data?.coverPhoto;
			user.user.name = data?.name;
			user.user.bio = data?.bio;
			user.user.location = data?.location;
			user.user.website = data?.website;
			user.user.birthdate = data?.birthdate;
			window.localStorage.setItem('tweeterUser', JSON.stringify(user));
		} catch (error) {
			dispatch({
				type: EditProfileType.EDIT_PROFILE_FAIL,
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
				user: state.user,
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
				signUp,
				signIn,
				// getCurrentUser,
				logout,
				addUserPic,
				addUserCover,
				editUserProfile,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserState;
