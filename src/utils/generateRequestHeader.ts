import { getAccessToken } from "./getAccessToken"

export const generateHeader = () => {
    return {
        'Authorization': "Bearer " + getAccessToken()?.toString(),
    }
}