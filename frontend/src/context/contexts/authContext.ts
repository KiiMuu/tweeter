import { createContext } from 'react';
import { ISignIn, ISignUp } from '../types/user';

type authContextType = {
    loading: boolean,
    error: string | null,
    token: string | null,
    isAuth: boolean,
    userInfo: any,
    signUp: (user: ISignUp) => any;
    signIn: (user: ISignIn) => any;
    getCurrentUser: () => any;
    logout: () => void;
}

const authContextDefaultValues: authContextType = {
    loading: false,
    error: null,
    token: null,
    userInfo: {},
    isAuth: false,
    signUp: () => {},
    signIn: () => {},
    getCurrentUser: () => {},
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export default AuthContext;