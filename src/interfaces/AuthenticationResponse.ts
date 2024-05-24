export interface AuthenticationResponse {
    data: {
        email: string,
        password: string,
        accessToken: string
    },
    status?: number
}