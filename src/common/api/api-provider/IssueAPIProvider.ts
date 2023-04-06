import { IssueRequest } from "../api-data-provider/IssueAPIDataProvider"
import { GitAPIProvider } from "./GitAPIProvider"
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LOGIN, PROJECT } from "../../../../credentials"

class IssueAPIProvider extends GitAPIProvider {
    public createIssue<T>(data: IssueRequest): Promise<AxiosResponse<T>> {
        const apiRequest: AxiosRequestConfig = IssueAPIProvider.configureRequest(
            `/repos/${LOGIN}/${PROJECT}/issues`,
            'POST',
            this.headers,
            JSON.stringify(data),
        )
        return this.sendRequest(apiRequest)
    }
}

export {
    IssueAPIProvider,
}