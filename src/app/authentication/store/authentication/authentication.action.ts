import { props, createAction } from '@ngrx/store';
import { LoginModel } from 'src/app/models/loginModel';
import { UserRegistrationModel } from '../../models/userRegistration.model';

export const USER_INITIATE_LOGIN = '[Authentication User Login] initiate user login';
export const USER_INITIATE_REGISTRATION = '[Authentication User register] initiate user registration';
export const USER_LOADING_LOGIN = '[Authentication User Login] loading login';
export const USER_LOGIN_SUCCESS = '[Authentication User Login] user login success';
export const USER_LOGIN_FAIL = '[Authentication User Login] user login failed';
export const USER_REGISTRATION_SUCCESS = '[Authentication User Registration] user registration success';

export const initiateUserLogin = createAction(
    USER_INITIATE_LOGIN,
    props<{ loginType: string, payload: LoginModel}>()
);

export const initiateUserRegistration = createAction(
    USER_INITIATE_REGISTRATION,
    props<{ payload: UserRegistrationModel }>()
);

export const loadingUserLogin = createAction(
    USER_LOADING_LOGIN
);

export const loginUserSuccess = createAction(
    USER_LOGIN_SUCCESS,
    props<{ token: string, name: string }>()
);

export const loginUserFail = createAction(
    USER_LOGIN_FAIL,
    props<{ errorMessage: string }>()
);

export const registerUserSuccess = createAction(
    USER_REGISTRATION_SUCCESS
);
