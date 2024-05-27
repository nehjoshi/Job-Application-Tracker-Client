import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { getAccessToken } from "../utils/getAccessToken";
import { Application } from "../interfaces/Application";

export const POST = async (application: Partial<Application>) => {
    try {
        const res = await axios.post(ENDPOINTS['new-application'], application, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        });
        return {
            status: res.status,
            newApplication: res.data
        }
    }
    catch(e: any) {
        console.log(e.response.message);
        return {
            status: e.response.status
        }
    }
}