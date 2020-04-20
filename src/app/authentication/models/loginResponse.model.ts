export interface LoginResponse {
    success: boolean,
    data: {
        name: string,
        email: string,
        role: string,
        token: string,
    } | null,
    error: string | null,
}