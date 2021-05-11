import { createContext } from 'react';
import { ISignIn, ISignUp } from '../types/user';

type authContextType = {
    loading: boolean,
    error: string | null,
    user: any,
    signUp: (user: ISignUp) => any;
    signIn: (user: ISignIn) => any;
    // getCurrentUser: () => any;
    logout: () => void;
}

const userInfoFromLS = localStorage.getItem('tweeterUser')
	? JSON.parse(localStorage.getItem('tweeterUser') as string)
	: null;

const authContextDefaultValues: authContextType = {
    loading: false,
    error: null,
    user: userInfoFromLS,
    signUp: () => {},
    signIn: () => {},
    // getCurrentUser: () => {},
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export default AuthContext;