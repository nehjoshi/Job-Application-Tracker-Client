import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { AuthenticationResponse } from "../interfaces/AuthenticationResponse";

export const GET = async (email: string, password: string, remember: boolean) => {
    try {
        const res: AuthenticationResponse = await axios.post(ENDPOINTS.get("login")?.toString() || "", {
            email: email,
            password: password
        });
        if (remember) localStorage.setItem("accessToken", res.data.accessToken);
        else sessionStorage.setItem("accessToken", res.data.accessToken);
        return {
            ...res.data,
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