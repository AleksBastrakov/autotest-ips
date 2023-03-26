import { IssueData } from "../data/issue.data"

type IssueModel = {
    issueName: string,//просто name
    issueNameEdit: string,
    issueComment: string,//просто comment
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