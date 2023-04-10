import { AxiosResponse } from "axios"
import { IssueModel } from "../../../issue/model/issue.model"
import { IssueAPIDataProvider, CreateIssueRequest } from "../api-data-provider/IssueAPIDataProvider"
import { IssueAPIProvider } from "../api-provider/IssueAPIProvider"

type CreateIssueResponse = {
    title: string,
    html_url: string,
}

type GetIssuesResponse = {
    title: string,
    html_url: string,
    number: number,
}

class IssueAPIService {
    public static async createIssue(owner: string, repo: string, issue: IssueModel): Promise<AxiosResponse<CreateIssueResponse>> {
        try {
            const data: CreateIssueRequest = IssueAPIDataProvider.getCreationIssueData(issue)
            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repo, data)
            return response
        } catch (error) {
            throw Error(`Create issue by model failed ${error}`)
        }
    }
}

export {
    IssueAPIService,
    CreateIssueResponse,
    GetIssuesResponse,
}