import { SignUpType, SignInType, LogoutType, AuthType } from '../types/user';

interface SignUpActionRequest {
    type: SignUpType.SIGNUP_REQUEST,
}

interface SignUpActionSuccess {
    type: SignUpType.SIGNUP_SUCCESS,
    payload: string,
}

interface SignUpActionFail {
    type: SignUpType.SIGNUP_FAIL,
    payload: string,
}

interface SignInActionRequest {
    type: SignInType.SIGNIN_REQUEST,
}

interface SignInActionSuccess {
    type: SignInType.SIGNIN_SUCCESS,
    payload: string,
}

interface SignInActionFail {
    type: SignInType.SIGNIN_FAIL,
    payload: string,
}

interface LogoutAction {
    type: LogoutType.USER_LOGOUT,
    payload: {},
}

interface UserLoadedAction {
    type: AuthType.USER_LOADED,
    payload: object,
}

interface AuthErrorAction {
    type: AuthType.AUTH_ERROR,
    payload: {},
}

export type Action = SignUpActionRequest 
    | SignUpActionSuccess 
    | SignUpActionFail
    | SignInActionRequest
    | SignInActionSuccess
    | SignInActionFail
    | LogoutAction
    | UserLoadedAction
    | AuthErrorAction