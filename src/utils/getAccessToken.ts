export const getAccessToken = () => {
    return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
}
export const deleteAccessToken = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
}