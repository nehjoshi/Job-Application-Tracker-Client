import axios from "axios";
import { ENDPOINTS } from "./endpoints";
import { getAccessToken } from "./getAccessToken";

export const GET_AUTH = async () => {
    try {
        const res = await axios.get(ENDPOINTS["auth"], {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        });
        return {status: res.status, user: res.data}
    }
    catch(e: any) {
        console.log(e);
        return {
            status: e.response.status,
            message: e.response.data
        }
    }
}