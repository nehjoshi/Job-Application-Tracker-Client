const url: string = "http://localhost:5000/api/v1";

export const ENDPOINTS: {[key: string]: string} = {
    test: url + "/",
    auth: url + "/user/auth",
    login: url + "/user/auth/login",
    register: url + "/auth/register",
    "all-applications": url + "/application/all",
    "new-application": url + "/application/new",
    "delete-application": url + "/application",
    "edit-application": url + "/application/edit",
    social: url + "/application/social"
}