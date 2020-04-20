export interface BaseUserState {
    name: string,
    email: string,
    isLoading: boolean,
    isAuthenticated: boolean,
    errorMessage: string,
    token: string,
}

export interface UserState extends BaseUserState {
    cart: [],
    order: [],
}

export interface StaffState extends BaseUserState {
    role: string,
}