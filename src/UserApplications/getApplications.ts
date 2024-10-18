import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { generateHeader } from "../utils/generateRequestHeader";
import { getAccessToken } from "../utils/getAccessToken";
import {ApplicationResponse} from '../interfaces/ApplicationResponse';


export const GET = async (pageNumber: number, pageSize: number) => {
    try {
        console.log(generateHeader());
        const res: ApplicationResponse = await axios.get(ENDPOINTS["all-applications"] + `/${pageNumber}?pageSize=${pageSize}`, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        })
        return {
            applications: res.data.applications,
            count: res.data.count,
            status: res.status
        }
    }
    catch (e: any) {
        console.log(e.response.data);
        return {
            status: e.response.status,
            applications: [],
            count: 0
        }
    }
}

export const GET_SEARCH = async (companyName: string) => {
    try {
        const url = ENDPOINTS['search'] + "?company-name=" + companyName;
        const res = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        });
        return {
            status: res.status,
            applications: res.data
        }
    }
    catch (e: any) {
        console.log(e.response.data);
        return {
            status: e.response.status,
            applications: [],
            count: 0
        }
    }
}