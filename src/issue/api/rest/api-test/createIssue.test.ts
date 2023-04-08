import { IssueAPIProvider } from "../../../../common/api/api-provider/IssueAPIProvider"
import { generateIssueData } from "../../../data/issue.data"
import { IssueModel, createIssueModel } from "../../../model/issue.model"
import { UserModel } from "../../../../common/model/user.model"
import { createUserModel } from "../../../../common/model/user.model"
import { userData } from "../../../../common/data/user.data"
import { AxiosResponse } from "axios"
import { CreateIssueResponse } from "../../../../common/api/api-service/IssueAPIService"
import fetch from 'node-fetch'

describe('POST/repos/{owner}/{repo}/issues', () => {
    let issue: IssueModel
    let user: UserModel

    beforeEach(async () => {
        user = createUserModel(userData)
        issue = createIssueModel(generateIssueData())
    })

    it('issue should be created', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(
            user.login,
            user.project,
            {
                title: issue.name
            },
        )
        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(issue.name)
    })
})