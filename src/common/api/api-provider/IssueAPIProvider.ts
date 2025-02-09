import { CreateIssueRequest } from "../api-data-provider/IssueAPIDataProvider"
import { GitAPIProvider } from "./GitAPIProvider"
import { AxiosRequestConfig, AxiosResponse } from 'axios'

class IssueAPIProvider extends GitAPIProvider {
    public createIssue<T>(owner: string, repo: string, data: CreateIssueRequest): Promise<AxiosResponse<T>> {
        const request: AxiosRequestConfig = IssueAPIProvider.configureRequest(
            `/repos/${owner}/${repo}/issues`,
            'POST',
            this.headers,
            JSON.stringify(data),
        )
        return this.sendRequest(request)
    }

    public getIssues<T>(owner: string, repo: string): Promise<AxiosResponse<T>> {
        const request: AxiosRequestConfig = IssueAPIProvider.configureRequest(
            `/repos/${owner}/${repo}/issues`,
            'GET',
            this.headers,
        )
        return this.sendRequest(request)
    }
}

export {
    IssueAPIProvider,
}