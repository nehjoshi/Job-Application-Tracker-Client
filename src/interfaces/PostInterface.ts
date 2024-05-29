import { Application } from "./Application";

export interface PostInterface {
    firstName: string,
    lastName: string,
    application: Partial<Application>
}