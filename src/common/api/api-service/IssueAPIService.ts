import { AxiosResponse } from "axios"
import { IssueModel } from "../../../issue/model/issue.model"
import { IssueAPIDataProvider, IssueRequest } from "../api-data-provider/IssueAPIDataProvider"
import { IssueAPIProvider } from "../api-provider/IssueAPIProvider"

class IssueAPIService {
    public static async createIssue(issue: IssueModel): Promise<AxiosResponse<IssueRequest>> {
        try {
            const data: IssueRequest = IssueAPIDataProvider.getIssueData(issue)
            const userAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<IssueRequest> = await userAPIProvider.createIssue(data)
            return response
        }
        catch (error) {
            throw Error(`Create issue by model failed ${error}`)
        }
    }
}

export {
    IssueAPIService,
}