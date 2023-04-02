import { LoginPage } from "../../common/page-object/Login.page"
import { IssueMainPage } from "../page-object/IssueMain.page"
import { IssueCreatePage } from "../page-object/IssueCreate.page"
import { IssueEditPage } from "../page-object/IssueEdit.page"
import { userData } from '../../common/data/user.data'
import { generateIssueData } from '../data/issue.data'
import { UserModel, createUserModel} from '../../common/model/user.model'
import { IssueModel, createIssueModel} from '../model/issue.model'
import { PATH_FILE_PNG } from "../../common/data/constant.data"
import { getUniqueValue } from "../../common/data/generator.data"

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
        await issueCreatePage.createIssue(issue)
        await issueMainPage.openIssueSettings(issue.name)
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

        await issueCreatePage.createIssue(issue)
    })

    it('issue name must be edited', async () => {
        issue.name = getUniqueValue('IssueName', 5)
        await issueEditPage.pushEditButton()
        await issueEditPage.setIssueTitle(issue.name)
        await issueEditPage.pushUpdateTitleButton()
        await issueEditPage.isEditIconDisplayed()
        await issueMainPage.findIssue(issue.name)

        expect(await issueMainPage.getIssueNameFromSearchList()).toEqual(issue.name)
    })

    it('issue must be closed', async () => {
        await issueEditPage.pushCloseIssueButton()

        expect(await issueEditPage.isIssueClosed()).toEqual(true)
    })

    it('comment must be created', async () => {
        await issueEditPage.setNewComment(issue.comment)
        await issueEditPage.pushNewCommentButton()

        expect(await issueEditPage.getTextFromCommentField()).toEqual(issue.comment)
    })

    it('file must be downloaded', async () => {
        await issueEditPage.uploadFile(PATH_FILE_PNG)
        await issueEditPage.isDownloadStatusFinished()
        await browser.pause(2000)
        await issueEditPage.pushNewCommentButton()

        expect(await issueEditPage.isFileDownload()).toEqual(true)
    })

    it('comments must be blocked', async () => {
        await issueEditPage.pushLockCommentsButton()
        await issueEditPage.pushVerifyLockCommentsButton()

        expect(await issueEditPage.isCommentsBlocked()).toEqual(true)
    })

    it('label must tag an issue', async () => {
        await issueEditPage.pushOpenLabelsMenu()
        await issueEditPage.pushBugLabelSelect()
        await issueEditPage.pushEditLabels()
        await issueMainPage.openIssueSettings(issue.name)

        expect(await issueEditPage.isIssueBugLabel()).toEqual(true)
    })

    afterEach(async () => {
        await issueMainPage.openIssueSettings(issue.name)
        await issueEditPage.deleteIssue()
    })
})