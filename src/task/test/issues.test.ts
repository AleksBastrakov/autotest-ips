import { LoginPage } from "../page-object/Login.page"
import { IssueMainPage } from "../page-object/IssueMain.page"
import { IssueCreatePage } from "../page-object/IssueCreate.page"
import { IssueEditPage } from "../page-object/IssueEdit.page"
import { userData } from '../data/user.data'
import { issueData } from '../data/issue.data'
import { pathFile } from '../data/file.data'
import { UserModel, createUserModel} from '../model/user.model'
import { IssueModel, createIssueModel} from '../model/issue.model'


describe('Task form', () => {
    let loginPage: LoginPage
    let issueMainPage: IssueMainPage
    let issueCreatePage: IssueCreatePage
    let issueEditPage: IssueEditPage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel(issueData)

    before(async () => {
        loginPage = new LoginPage(browser)
        issueMainPage = new IssueMainPage(browser)
        issueCreatePage = new IssueCreatePage(browser)
        issueEditPage = new IssueEditPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login(user)
    })

    it('CREATE NEW ISSUE', async () => {
        await issueCreatePage.createIssue(issue)
        await issueMainPage.findIssue(issue.issueName)

        expect(await issueMainPage.getIssueNameFromSearchList()).toEqual(issue.issueName)

        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.deleteIssue()
    })

    it('DELETE ISSUE', async () => {
        await issueCreatePage.createIssue(issue)
        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.deleteIssue()
        await issueMainPage.findIssue(issue.issueName)

        expect(await issueMainPage.isIssueFoundBySearch()).toEqual(false)
    })

    it('EDIT ISSUE NAME', async () => {
        await issueCreatePage.createIssue(issue)
        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.pushEditButton()
        await issueEditPage.setIssueTitle(issue.issueNameEdit)
        await issueEditPage.pushUpdateTitleButton()
        await issueMainPage.findIssue(issue.issueNameEdit)

        expect(await issueMainPage.getIssueNameFromSearchList()).toEqual(issue.issueNameEdit)

        await issueMainPage.openIssueEdit(issue.issueNameEdit)
        await issueEditPage.deleteIssue()
    })

    it('CLOSE ISSUE', async () => {
        await issueCreatePage.createIssue(issue)
        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.pushCloseIssueButton()

        expect(await issueEditPage.isIssueClosed()).toEqual(true)

        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.deleteIssue()
    })

    it('COMMENT ISSUE', async () => {
        await issueCreatePage.createIssue(issue)
        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.setNewComment(issue.issueComment)
        await issueEditPage.pushNewCommentButton()

        expect(await issueEditPage.getTextFromCommentField()).toEqual(issue.issueComment)

        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.deleteIssue()
    })

    it('ADD FILE IN ISSUE', async () => {
        await issueCreatePage.createIssue(issue)
        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.uploadFile(pathFile)
        await browser.pause(10000)
        await issueEditPage.pushNewCommentButton()

        expect(await issueEditPage.isFileDownload()).toEqual(true)

        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.deleteIssue()
    })

    it('BLOCK COMMENTS', async () => {
        await issueCreatePage.createIssue(issue)
        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.pushLockCommentsButton()
        await issueEditPage.pushVerifyLockCommentsButton()

        expect(await issueEditPage.isCommentsBlocked()).toEqual(true)

        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.deleteIssue()
    })

    it('TAG FOUND', async () => {
        await issueCreatePage.createIssue(issue)
        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.pushOpenLabelsMenu()
        await issueEditPage.pushBugLabelSelect()
        await issueEditPage.pushEditLabels()
        await issueMainPage.openIssueEdit(issue.issueName)

        expect(await issueEditPage.isIssueBugLabel()).toEqual(true)

        await issueMainPage.openIssueEdit(issue.issueName)
        await issueEditPage.deleteIssue()
    })

    afterEach(async () => {
        await browser.reloadSession()
    })





})
