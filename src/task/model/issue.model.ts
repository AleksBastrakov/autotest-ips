import { IssueData } from "../data/issue.data"

type IssueModel = {
    issueName: string,
    issueNameEdit: string,
    issueComment: string,
}

function createIssueModel(data: IssueData): IssueModel
{
    return {
        issueName: data.issueName,
        issueNameEdit: data.issueNameEdit,
        issueComment: data.issueComment,
    }
}

export {
    IssueModel,
    createIssueModel,
}