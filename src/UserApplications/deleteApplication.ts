import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { getAccessToken } from "../utils/getAccessToken";

export const DELETE = async (applicationId: number | undefined) => {
    try {
        const res = await axios.delete(ENDPOINTS['delete-application'] + `/${applicationId}`, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        });
        return {
            status: res.status
        }
    }
    catch (e: any) {
        console.log(e);
        return {
            status: e.response.status
        }
    }
}