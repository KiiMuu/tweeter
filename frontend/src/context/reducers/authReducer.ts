import { Action } from '../actions/authActions';
import { SignUpType, SignInType, LogoutType } from '../types/user';

interface AuthState {
    loading: boolean;
    error: string | null;
    user: object;
}

const initialAuthState: AuthState = {
    loading: false,
    error: null,
    user: {},
}

const authReducer = (
    state = initialAuthState, 
    action: Action
): AuthState => {
    switch(action.type) {
        case SignUpType.SIGNUP_REQUEST:
        case SignInType.SIGNIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                // token: null,
            }
        case SignUpType.SIGNUP_SUCCESS:
        case SignInType.SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload,
            }
        case SignUpType.SIGNUP_FAIL:
        case SignInType.SIGNIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case LogoutType.USER_LOGOUT:
            return {
                loading: false,
                error: null,
                user: {},
            }
        default:
            return state;
    }
}

export default authReducer;