import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";

export const GET = async (email: string, password: string) => {
    try {
        const res = await axios.post(ENDPOINTS.get("login")?.toString() || "", {
            email: email,
            password: password
        });
        console.log(res.data);
    }
    catch(e: any) {
        console.log(e.response);
    }
}