export interface ApplicationResponse {
    data: [{
        applicationId: number,
        dateApplied: Date,
        companyName: string,
        compensation: string,
        additionalInfo: string,
        location: string,
        positionTitle: string,
        status: string
    }],
    status: number
}