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

export enum EditProfileType {
    ADD_USER_PIC_REQUEST = 'ADD_USER_PIC_REQUEST',
    ADD_USER_PIC_SUCCESS = 'ADD_USER_PIC_SUCCESS',
    ADD_USER_PIC_FAIL = 'ADD_USER_PIC_FAIL',
    EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST',
    EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS',
    EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL',
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
    // user: object,
    profilePic?: string,
    coverPhoto?: string,
    name?: string,
    bio?: string,
    location?: string,
    website?: string,
    birthdate?: Date,
}