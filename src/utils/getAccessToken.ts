export const getAccessToken = () => {
    return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
}