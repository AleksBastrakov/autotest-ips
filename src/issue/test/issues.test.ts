import { IssueCreatePage } from "../page-object/IssueCreate.page"
import { IssueEditPage } from "../page-object/IssueEdit.page"
import { IssueMainPage } from "../page-object/IssueMain.page"
import { IssueModel, createIssueModel} from '../model/issue.model'
import { LoginPage } from "../../common/page-object/Login.page"
import { UserModel, createUserModel} from '../../common/model/user.model'
import { PATH_FILE_PNG } from "../../common/data/constant.data"
import { generateIssueData } from '../data/issue.data'
import { getUniqueValue } from "../../common/data/generator.data"
import { userData } from '../../common/data/user.data'
import { IssueAPIService } from "../../common/api/api-service/IssueAPIService"
import { LOGIN, PROJECT } from "../../../credentials"

describe('Task form', () => {
    let loginPage: LoginPage
    let issueMainPage: IssueMainPage
    let issueCreatePage: IssueCreatePage
    let issueEditPage: IssueEditPage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel(generateIssueData())

    before(async () => {
        loginPage = new LoginPage(browser)
        issueMainPage = new IssueMainPage(browser)
        issueCreatePage = new IssueCreatePage(browser)
        issueEditPage = new IssueEditPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        const response = await IssueAPIService.createIssue(LOGIN, PROJECT, issue)
        //await issueMainPage.openIssueSettings(issue.name)
        await browser.url(response.data.html_url)
    })

    it('issue must be created', async () => {     
        await issueMainPage.findIssue(issue.name)
        await issueMainPage.isIssueFoundBySearch()

        expect(await issueMainPage.getIssueNameFromSearchList()).toEqual(issue.name)
    })

    it('issue must be deleted', async () => {
        await issueEditPage.deleteIssue()
        await issueMainPage.findIssue(issue.name)

        expect(await issueMainPage.isIssueFoundIsEmpty()).toEqual(true)

        await IssueAPIService.createIssue(LOGIN, PROJECT, issue)
    })

    it('issue name must be edited', async () => {
        issue.name = getUniqueValue('IssueName', 5)
        await issueEditPage.clickEditButton()
        await issueEditPage.setIssueTitle(issue.name)
        await issueEditPage.clickUpdateTitleButton()
        await issueEditPage.isEditIconDisplayed()
        await issueMainPage.findIssue(issue.name)

        expect(await issueMainPage.getIssueNameFromSearchList()).toEqual(issue.name)
    })

    it('issue must be closed', async () => {
        await issueEditPage.clickCloseIssueButton()

        expect(await issueEditPage.isIssueClosed()).toEqual(true)
    })

    it('comment must be created', async () => {
        await issueEditPage.setNewComment(issue.comment)
        await issueEditPage.clickNewCommentButton()

        expect(await issueEditPage.getTextFromCommentField()).toEqual(issue.comment)
    })

    it('comments must be blocked', async () => {
        await issueEditPage.clickLockCommentsButton()
        await issueEditPage.clickVerifyLockCommentsButton()

        expect(await issueEditPage.isCommentsBlocked()).toEqual(true)
    })

    it('label must tag an issue', async () => {
        await issueEditPage.clickOpenLabelsMenu()
        await issueEditPage.clickBugLabelSelect()
        await issueEditPage.clickEditLabels()
        await issueMainPage.openIssueSettings(issue.name)

        expect(await issueEditPage.isIssueBugLabel()).toEqual(true)
    })

    it('file must be downloaded', async () => {
        await issueEditPage.uploadFile(PATH_FILE_PNG)
        await issueEditPage.isDownloadStatusFinished()
        await browser.pause(2000)
        await issueEditPage.clickNewCommentButton()

        expect(await issueEditPage.isFileDownload()).toEqual(true)
    })

    afterEach(async () => {
        await issueMainPage.openIssueSettings(issue.name)
        await issueEditPage.deleteIssue()
    })  
})