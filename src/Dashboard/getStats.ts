import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { getAccessToken } from "../utils/getAccessToken";

interface Response {
    status: number,
    data: {
        totalCount: number,
        appliedCount: number,
        offerCount: number,
        rejectedCount: number,
        stageCount: number,
        topLocations: Array<{ [key: string]: number }>,
        fiveDayAppCount: Array<{ [key: string]: number}>
    }
}

export const GET = async () => {
    const url: string = ENDPOINTS.statistics;
    try {
        const res: Response = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        });
        return {
            status: res.status,
            data: res.data
        }
    }
    catch(e: any) {
        console.log(e);
        return {
            status: e.response.status,
            message: e.response.data
        }
    }

}