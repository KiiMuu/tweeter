import { SignUpType, SignInType, LogoutType } from '../types/user';

interface SignUpActionRequest {
    type: SignUpType.SIGNUP_REQUEST,
}

interface SignUpActionSuccess {
    type: SignUpType.SIGNUP_SUCCESS,
    payload: object,
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
    payload: object,
}

interface SignInActionFail {
    type: SignInType.SIGNIN_FAIL,
    payload: string,
}

interface LogoutAction {
    type: LogoutType.USER_LOGOUT,
    payload: {},
}

export type Action = SignUpActionRequest 
    | SignUpActionSuccess 
    | SignUpActionFail
    | SignInActionRequest
    | SignInActionSuccess
    | SignInActionFail
    | LogoutAction