import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from '../contexts/userContext';
import userReducer from '../reducers/userReducer';
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

const userInfoFromLS = localStorage.getItem('tweeterUser')
	? JSON.parse(localStorage.getItem('tweeterUser') as string)
	: null;

const UserState = ({ children }: { children: React.ReactNode }) => {
    const initialState = {
        loading: false,
        error: null,
        user: userInfoFromLS,
        addProfilePicLoading: false,
        addProfilePicError: null,
        addProfilePicSuccess: false,
        profilePic: {},
        editProfileLoading: false,
        editProfileSuccess: false,
        editProfileError: null,
        userInfo: userInfoFromLS,
    }

    const [state, dispatch] = useReducer(userReducer, initialState);
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
                }
            }

            const { data } = await axios.post('/user/signup', user, config);

            dispatch({
                type: SignUpType.SIGNUP_SUCCESS,
                payload: data,
            });

            localStorage.setItem('tweeterUser', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: SignUpType.SIGNUP_FAIL,
                payload: error.response?.data.message ? error.response.data.message : error.message,
            });
        }
    }

    const signIn = async (user: ISignIn) => {
        try {
            dispatch({
                type: SignInType.SIGNIN_REQUEST,
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            const { data } = await axios.post('/user/signin', user, config);

            dispatch({
                type: SignInType.SIGNIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem('tweeterUser', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: SignInType.SIGNIN_FAIL,
                payload: error.response?.data.message ? error.response.data.message : error.message,
            });
        }
    }

    const logout = async () => {
        localStorage.removeItem('tweeterUser');

        dispatch({
            type: LogoutType.USER_LOGOUT,
            payload: {},
        });
    }

    const addUserPic = async (profilePic: object) => {
        try {
            dispatch({
                type: EditProfileType.ADD_USER_PIC_REQUEST,
            });

            const config = {
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                }
            }

            const { data } = await axios.post('/user/profilePic', profilePic, config);

            dispatch({
                type: EditProfileType.ADD_USER_PIC_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: EditProfileType.ADD_USER_PIC_FAIL,
                payload: error.response?.data.message ? error.response.data.message : error.message,
            });
        }
    }

    const editUserProfile = async (userInfo: IUserInfo) => {
        try {
            dispatch({
                type: EditProfileType.EDIT_PROFILE_REQUEST,
            });

            const config = {
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                }
            }

            const { data } = await axios.put('/user/editProfile', userInfo, config);

            dispatch({
                type: EditProfileType.EDIT_PROFILE_SUCCESS,
                payload: data,
            });

            userInfoFromLS.user.profilePic = data?.profilePic;
            userInfoFromLS.user.coverPhoto = data?.coverPhoto;
            userInfoFromLS.user.name = data?.name;
            userInfoFromLS.user.bio = data?.bio;
            userInfoFromLS.user.location = data?.location;
            userInfoFromLS.user.website = data?.website;
            userInfoFromLS.user.birthdate = data?.birthdate;
            window.localStorage.setItem('tweeterUser', JSON.stringify(userInfoFromLS));
        } catch (error) {
            dispatch({
                type: EditProfileType.EDIT_PROFILE_FAIL,
                payload: error.response?.data.message ? error.response.data.message : error.message,
            });
        }
    }

    return (
        <UserContext.Provider value={{
            loading: state.loading,
            error: state.error,
            user: state.user,
            addProfilePicLoading: state.addProfilePicLoading,
            addProfilePicError: state.addProfilePicError,
            addProfilePicSuccess: state.addProfilePicSuccess,
            profilePic: state.profilePic,
            editProfileLoading: state.editProfileLoading,
            editProfileSuccess: state.editProfileSuccess,
            editProfileError: state.editProfileError,
            signUp,
            signIn,
            // getCurrentUser,
            logout,
            addUserPic,
            editUserProfile
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;