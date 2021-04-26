import { Action } from '../actions/authActions';
import { SignUpType, SignInType, LogoutType, AuthType } from '../types/user';

interface AuthState {
    loading: boolean;
    error: string | null;
    token?: string | null;
    userInfo?: object;
    isAuth: boolean;
}

const initialAuthState: AuthState = {
    loading: false,
    error: null,
    token: null,
    userInfo: {},
    isAuth: false,
}

const authReducer = (
    state = initialAuthState, 
    action: Action
): AuthState => {
    switch(action.type) {
        case SignUpType.SIGNUP_REQUEST:
        case SignInType.SIGNIN_REQUEST:
            return {
                loading: true,
                error: null,
                token: null,
                isAuth: false,
            }
        case SignUpType.SIGNUP_SUCCESS:
        case SignInType.SIGNIN_SUCCESS:
            return {
                loading: false,
                error: null,
                token: action.payload,
                isAuth: true,
            }
        case AuthType.USER_LOADED:
            return {
                loading: false,
                error: null,
                userInfo: action.payload,
                isAuth: true,
            }
        case SignUpType.SIGNUP_FAIL:
        case SignInType.SIGNIN_FAIL:
            return {
                loading: false,
                error: action.payload,
                token: null,
                isAuth: false,
            }
        case LogoutType.USER_LOGOUT:
            return {
                loading: false,
                error: null,
                token: null,
                userInfo: {},
                isAuth: false,
            }
        // case AuthType.AUTH_ERROR:
        //     return {
        //         loading: false,
        //         userInfo: {},
        //         error: action.payload,
        //     }
        default:
            return state;
    }
}

export default authReducer;