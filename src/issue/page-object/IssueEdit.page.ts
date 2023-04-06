import { ChainablePromiseElement } from 'webdriverio'

class IssueEditPage {
    protected browser: WebdriverIO.Browser

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async clickBugLabelSelect(): Promise<void> {
        await this.getOpenLabelsMenu().waitForClickable({
            timeoutMsg: 'Bug select was not clickable'
        })
        await this.getBugLabelSelect().click()
    }

    public async clickCloseIssueButton(): Promise<void> {
        await this.getCloseIssueButton().waitForClickable({
            timeoutMsg: 'Close issue button was not clickable'
        })
        await this.getCloseIssueButton().click()
    }

    public async clickDeleteIssueButton(): Promise<void> {
        await this.getDeleteIssueButton().waitForClickable({
            timeoutMsg: 'Delete button was not clickable'
        })
        await this.getDeleteIssueButton().click()
    }

    public async clickEditButton(): Promise<void> {
        await this.getEditButton().waitForClickable({
            timeoutMsg: 'Edit button was not clickabled'
        })
        await this.getEditButton().click()
    }

    public async clickEditLabels(): Promise<void> {
        await this.getEditLabels().waitForClickable({
            timeoutMsg: 'Labels Edit Menu was not clickable'
        })
        await this.getEditLabels().click()
    }

    public async clickLockCommentsButton(): Promise<void> {
        await this.getLockCommentsButton().waitForClickable({
            timeoutMsg: 'Lock comments button was not clickable'
        })
        await this.getLockCommentsButton().click()
    }

    public async clickNewCommentButton(): Promise<void> {
        await this.getNewCommentButton().waitForClickable({
            timeoutMsg: 'New comment button was not clickable'
        })
        await this.getNewCommentButton().click()
    }

    public async clickOpenLabelsMenu(): Promise<void> {
        await this.getOpenLabelsMenu().waitForClickable({
            timeoutMsg: 'Labels Menu was not clickable'
        })
        await this.getOpenLabelsMenu().click()
    }

    public async clickVerifyDeleteIssueButton(): Promise<void> {
        await this.getDeleteIssueButton().waitForClickable({
            timeoutMsg: 'Verify delete button was not clickable'
        })
        await this.getVerifyDeleteIssueButton().click()
    }

    public async clickVerifyLockCommentsButton(): Promise<void> {
        await this.getVerifyLockCommentsButton().waitForClickable({
            timeoutMsg: 'Verify lock comment button was not clickable'
        })
        await this.getVerifyLockCommentsButton().click()
    }

    public async clickUpdateTitleButton(): Promise<void> {
        await this.getUpdateTitleButton().waitForClickable({
            timeoutMsg: 'Update title button was not clickable'
        })
        await this.getUpdateTitleButton().click()
    }

    public async deleteIssue(): Promise<void> {
        await this.clickDeleteIssueButton()
        await this.clickVerifyDeleteIssueButton()
    }

    public async getTextFromCommentField(): Promise<string> {
        await this.getCommentField().waitForDisplayed({
            timeoutMsg: 'Comment field was not display'
        })
        return this.getCommentField().getText()
    }

    public async isCommentsBlocked(): Promise<boolean> {
        await this.getLockIcon().waitForDisplayed({
            timeoutMsg: 'Block comment icon status was not display'
        })
        return this.getLockIcon().isDisplayed()
    }

    public async isDownloadStatusFinished(): Promise<boolean> {
        await this.getDownloadStatusFinished().waitForDisplayed({
            timeoutMsg: 'Download status was not display'
        })
        return this.getDownloadStatusFinished().isDisplayed()
    }

    public async isEditIconDisplayed(): Promise<boolean> {
        await this.getEditIcon().waitForDisplayed({
            timeoutMsg: 'Block comment icon status was not display'
        })
        return this.getEditIcon().isDisplayed()
    }

    public async isIssueBugLabel(): Promise<boolean> {
        await this.getIssueBugLabel().waitForExist({
            timeoutMsg: 'Bug label was not exist'
        })
        return this.getIssueBugLabel().isExisting()
    }

    public async isFileDownload(): Promise<boolean> {
        await this.getFile().waitForDisplayed({
            timeoutMsg: 'File is not display'
        })
        return this.getFile().isDisplayed()
    }

    public async isIssueClosed(): Promise<boolean> {
        await this.getCloseStatus().waitForDisplayed({
            timeoutMsg: 'Issue status was not display'
        })
        return this.getCloseStatus().isDisplayed()
    }

    public async setIssueTitle(title: string): Promise<void> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Issue title field was not display'
        })
        await this.getIssueTitle().setValue(title)     
    }

    public async setNewComment(comment: string): Promise<void> {
        await this.getNewCommentField().waitForDisplayed({
            timeoutMsg: 'Comment field was not display'
        })
        await this.getNewCommentField().setValue(comment)
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not exist',
        })
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    private getBugLabelSelect(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-prio-filter-value="bug"]')
    }

    private getCloseIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="comment_and_close"]')
    }

    private getCloseStatus(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@title="Status: Closed"]')
    }

    private getCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//p[@dir="auto"] ')
    }

    private getDeleteIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@class='details-reset details-overlay details-overlay-dark js-delete-issue']/summary")
    }

    private getDownloadStatusFinished(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//*[@class="js-upload-markdown-image is-default"])[2]')
    }

    private getEditIcon(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="octicon octicon-pencil color-fg-inherit"]')
    }

    private getEditLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="select-menu-item d-block color-fg-muted last-visible border-top edit-labels-button"]')
    }

    private getEditButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@aria-label="Edit Issue title"]')
    }

    private getFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//img[@alt="avatar"]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//*[@type="file"])[2]')
    }

    private getIssueBugLabel(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//a[@data-name="bug"]')
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getLockIcon(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="octicon octicon-lock color-fg-inherit"]')
    }

    private getLockCommentsButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="details-reset details-overlay details-overlay-dark js-lock-issue"]/summary')
    }

    private getNewCommentButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="btn-primary btn"]')
    }

    private getNewCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_comment_field"]')
    }

    private getOpenLabelsMenu(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="labels-select-menu"]/summary')
    }

    private getUpdateTitleButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-disable-with="Updating"]')
    }

    private getVerifyDeleteIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//button[@name='verify_delete']")
    }

    private getVerifyLockCommentsButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="btn btn-block"]')
    } 
}

export {
    IssueEditPage,
}