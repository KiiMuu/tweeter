export enum SignUpType {
    SIGNUP_REQUEST = 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNUP_FAIL = 'SIGNUP_FAIL',
}

export enum SignInType {
    SIGNIN_REQUEST = 'SIGNIN_REQUEST',
    SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
    SIGNIN_FAIL = 'SIGNIN_FAIL',
}

export enum LogoutType {
    USER_LOGOUT = 'USER_LOGOUT',
}

export interface ISignUp {
    name: string, 
    username: string, 
    email: string, 
    password: string,
}

export interface ISignIn {
    email: string, 
    password: string,
}

export interface IUserInfo {
    user: object,
}