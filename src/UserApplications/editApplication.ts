import axios from 'axios';
import { Application } from '../interfaces/Application';
import { ENDPOINTS } from '../utils/endpoints';
import { getAccessToken } from '../utils/getAccessToken';

export const PUT = async (application: Application) => {
    try {
        const url = ENDPOINTS['edit-application'] + `/${application.applicationId}`;
        const res = await axios.put(url, application, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        });
        return {
            status: res.status,
            updatedApplication: res.data
        }
    } catch (e: any) {
        console.log(e.response.message);
        return {
            status: e.response.status
        }
    }
}