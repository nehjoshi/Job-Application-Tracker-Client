export interface AuthenticationResponse {
    data: {
        email: string,
        userId: string,
        firstName: string,
        lastName: string,
        accessToken: string
    },
    status?: number
}