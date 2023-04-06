import { IssueData } from "../data/issue.data"

type IssueModel = {
    name: string,
    comment: string,
}

function createIssueModel(data: IssueData): IssueModel
{
    return {
        name: data.name,
        comment: data.comment,
    }
}

export {
    IssueModel,
    createIssueModel,
}