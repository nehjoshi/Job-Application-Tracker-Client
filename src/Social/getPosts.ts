import axios from "axios"
import { ENDPOINTS } from "../utils/endpoints"
import { getAccessToken } from "../utils/getAccessToken";

export const GET = async (page: number) => {
    try {
        const url = ENDPOINTS["social"] + `?page=${page}`;
        const res = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        });
        return {status: res.status, posts: res.data}
    }
    catch (e: any) {
        console.log(e.response.message);
        return { status: e.response.status }
    }
}