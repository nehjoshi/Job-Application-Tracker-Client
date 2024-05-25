import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { generateHeader } from "../utils/generateRequestHeader";
import { getAccessToken } from "../utils/getAccessToken";
import {ApplicationResponse} from '../interfaces/ApplicationResponse';

export const GET = async () => {
    try {
        console.log(generateHeader());
        const res: ApplicationResponse = await axios.get(ENDPOINTS["all-applications"], {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        })
        return {
            applications: res.data,
            status: res.status
        }
    }
    catch (e: any) {
        console.log(e.response.data);
        return {
            status: e.response.status,
            applications: []
        }
    }
}