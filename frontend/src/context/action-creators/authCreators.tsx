import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/authContext';
import authReducer from '../reducers/authReducer';
import { SignUpType, SignInType, LogoutType } from '../types/user';
import { ISignUp, ISignIn } from '../types/user';

const userInfoFromLS = localStorage.getItem('tweeterUser')
	? JSON.parse(localStorage.getItem('tweeterUser') as string)
	: null;

const AuthState = ({ children }: { children: React.ReactNode }) => {
    const initialState = {
        loading: false,
        error: null,
        token: null,
        user: userInfoFromLS,
        isAuth: false,
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // * actions
    // const getCurrentUser = async () => {
    //     try {
    //         const userToken = JSON.parse(localStorage.getItem('token')!);

    //         const config = {
    //             headers: {
    //                 'Authorization': `Bearer ${userToken?.token}`,
    //             }
    //         }

    //         const { data } = await axios.get('/user/current', config);

    //         dispatch({
    //             type: AuthType.USER_LOADED,
    //             payload: data,
    //         });

    //         localStorage.setItem('userInfo', JSON.stringify(data));
    //     } catch (error) {
    //         dispatch({
    //             type: AuthType.AUTH_ERROR,
    //             payload: error.response?.data.message ? error.response.data.message : error.message,
    //         });
    //     }
    // }

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

    return (
        <AuthContext.Provider value={{
            loading: state.loading,
            error: state.error,
            user: state.user,
            signUp,
            signIn,
            // getCurrentUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;