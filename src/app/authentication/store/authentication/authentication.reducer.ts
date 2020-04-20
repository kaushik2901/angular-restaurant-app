import { createReducer, on } from '@ngrx/store';
import * as authenticationAction from './authentication.action';
import { AuthState } from '../../models/authState.model';

export const initialState: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    errorMessage: "",
    token: "",
    role: "",
}

export const reducer = createReducer(
    initialState,
    on(authenticationAction.loadingUserLogin, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(authenticationAction.loginUserSuccess, (state, { name, token }) => ({ 
        ...state, 
        token, 
        name, 
        isLoading: false, 
        isAuthenticated: true 
    })),
    on(authenticationAction.loginUserFail, (state, { errorMessage }) => ({
        ...state,
        errorMessage,
        isLoading: false,
        isAuthenticated: false,
    })),
)