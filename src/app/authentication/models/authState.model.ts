export interface AuthState {
    isLoading: boolean,
    isAuthenticated: boolean,
    errorMessage: string,
    token: string,
    role: string,
}