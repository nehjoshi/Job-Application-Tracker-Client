const url: string = "http://localhost:5000/api/v1";

export const ENDPOINTS: Map<string, string> = new Map([
    ["test", url + "/"],
    ["auth", url + "/user/auth"],
    ["login", url + "/user/auth/login"],
    ["register", url + "/auth/register"],
    ["all-applications", url + "/application/all"]
])