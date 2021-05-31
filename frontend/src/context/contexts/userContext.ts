import { createContext } from 'react';
import { ISignIn, ISignUp, IUserInfo } from '../types/user';

const userInfoFromLS = localStorage.getItem('tweeterUser')
	? JSON.parse(localStorage.getItem('tweeterUser') as string)
	: null;

type userContextType = {
    loading: boolean,
    error: string | null,
    user: any,
    addProfilePicLoading: boolean,
    addProfilePicError: string | null,
    addProfilePicSuccess: boolean,
    profilePic: any,
    editProfileLoading: boolean,
    editProfileSuccess: boolean,
    editProfileError: string | null,
    signUp: (user: ISignUp) => any;
    signIn: (user: ISignIn) => any;
    // getCurrentUser: () => any;
    logout: () => void;
    addUserPic: (profilePic: object) => any,
    editUserProfile: (userInfo: IUserInfo) => any;
}

const userContextDefaultValues: userContextType = {
    loading: false,
    error: null,
    user: userInfoFromLS,
    signUp: () => {},
    signIn: () => {},
    // getCurrentUser: () => {},
    logout: () => {},
    addProfilePicLoading: false,
    addProfilePicError: null,
    addProfilePicSuccess: false,
    profilePic: {},
    editProfileLoading: false,
    editProfileSuccess: false,
    editProfileError: null,
    addUserPic: () => {},
    editUserProfile: () => {},
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export default UserContext;