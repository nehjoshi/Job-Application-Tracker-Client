import { Application } from "./Application"

export interface ApplicationResponse {
    data: {
        count: number | 0,
        applications: Application[] | []
    },
    status: number | 0
}