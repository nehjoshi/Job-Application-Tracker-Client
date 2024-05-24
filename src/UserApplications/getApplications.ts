import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { generateHeader } from "../utils/generateRequestHeader";
import { getAccessToken } from "../utils/getAccessToken";

export const GET = async () => {
    try {
        console.log(generateHeader());
        const res = await axios.get(ENDPOINTS.get("all-applications")?.toString() || "", {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        })
        console.log(res);
    }
    catch (e) {
        console.log(e);
    }
}