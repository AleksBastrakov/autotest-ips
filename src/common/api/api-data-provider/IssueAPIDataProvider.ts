import { IssueModel } from "../../../issue/model/issue.model"

type CreateIssueRequest = {
    title: string | number,
    body?: string,
    labels?: string[]
}

class IssueAPIDataProvider {
    public static getCreationIssueData(issue: IssueModel): CreateIssueRequest {
        return {
            title: issue.name,
        }
    }
}

export {
    IssueAPIDataProvider,
    CreateIssueRequest,
}