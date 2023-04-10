import { IssueAPIProvider } from "../../../../common/api/api-provider/IssueAPIProvider"
import { generateIssueData } from "../../../data/issue.data"
import { IssueModel, createIssueModel } from "../../../model/issue.model"
import { UserModel } from "../../../../common/model/user.model"
import { createUserModel } from "../../../../common/model/user.model"
import { userData, userNegativeData } from "../../../../common/data/user.data"
import { AxiosResponse } from "axios"
import { CreateIssueResponse, GetIssuesResponse} from "../../../../common/api/api-service/IssueAPIService"

describe('POST/repos/{owner}/{repo}/issues', () => {
    let issue: IssueModel
    let user: UserModel
    let negativeUser: UserModel

    beforeEach(async () => {
        user = createUserModel(userData)
        negativeUser = createUserModel(userNegativeData)
        issue = createIssueModel(generateIssueData())
    })

    it('issue should be created', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const createIssueResponse: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(
            user.login,
            user.project,
            {
                title: issue.name
            },
        )

        expect(createIssueResponse.status).toEqual(201)
        expect(createIssueResponse.data.title).toEqual(issue.name)

        const getIssuesResponse: AxiosResponse<GetIssuesResponse[]> = await issueAPIProvider.getIssues(
            user.login,
            user.project,
        )

        expect(getIssuesResponse.status).toEqual(200)
        expect(getIssuesResponse.data.find(element => element.title === issue.name)).not.toEqual(undefined)
    })

    it('issue should not be created (wrong url)', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(
            user.login,
            user.login,
            {
                title: issue.name
            },
        )
        expect(response.status).toEqual(404)
    })

    it('issue should not be created (block issues))', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(
            user.login,
            negativeUser.project,
            {
                title: issue.name
            },
        )
        expect(response.status).toEqual(410)
    })

    it('issue should not be created (empty title))', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(
            user.login,
            user.project,
            {
                title: ''
            },
        )
        expect(response.status).toEqual(422)
    })
})