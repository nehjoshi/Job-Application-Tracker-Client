import config from "../config";
const url: string = config.BASE_URL;

export const ENDPOINTS: {[key: string]: string} = {
    test: url + "/",
    auth: url + "/user/auth",
    login: url + "/user/auth/login",
    register: url + "/auth/register",
    "all-applications": url + "/application/all",
    "new-application": url + "/application/new",
    "delete-application": url + "/application",
    "edit-application": url + "/application/edit",
    social: url + "/application/social",
    search: url + "/application",
    statistics: url + "/application/statistics"
}