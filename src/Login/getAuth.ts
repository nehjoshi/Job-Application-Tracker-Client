import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { AuthenticationResponse } from "../interfaces/AuthenticationResponse";
import { getAccessToken } from "../utils/getAccessToken";

export const GET = async () => {
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

export const POST = async (email: string, password: string, remember: boolean) => {
    try {
        const res: AuthenticationResponse = await axios.post(ENDPOINTS["login"], {
            email: email,
            password: password
        });
        if (remember) localStorage.setItem("accessToken", res.data.accessToken);
        else sessionStorage.setItem("accessToken", res.data.accessToken);
        return {
            user: res.data,
            status: res.status
        }

    }
    catch (e: any) {
        console.log(e);
        return {
            status: e.response.status,
            message: e.response.data
        }
    }
}