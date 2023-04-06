import { IssueModel } from "../../../issue/model/issue.model"
import { GitAPIProvider } from "../api-provider/GitAPIProvider"

type IssueRequest = {
    title: string,
}

class IssueAPIDataProvider extends GitAPIProvider{
    public static getIssueData(issue: IssueModel): IssueRequest {
        return {
            title: issue.name,
        }
    }
}

export {
    IssueAPIDataProvider,
    IssueRequest,
}