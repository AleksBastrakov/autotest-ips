import { ChainablePromiseElement } from 'webdriverio'

class IssueEditPage {
    protected browser: WebdriverIO.Browser

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async deleteIssue(): Promise<void> {
        await this.pushDeleteIssueButton()
        await this.pushVerifyDeleteIssueButton()
    }

    public async getTextFromCommentField(): Promise<string> {
        await this.getCommentField().waitForDisplayed({
            timeoutMsg: 'Comment field was not displayed'
        })
        return this.getCommentField().getText()
    }

    public async isCommentsBlocked(): Promise<boolean> {
        await this.getLockIcon().waitForDisplayed({
            timeoutMsg: 'Block comment icon status was not displayed'
        })
        return this.getLockIcon().isExisting()
    }

    public async isDownloadStatusFinished(): Promise<boolean> {
        await this.getDownloadStatusFinished().waitForDisplayed({
            timeoutMsg: 'Download status was not displayed'
        })
        return await this.getDownloadStatusFinished().isDisplayed()
    }

    public async isEditIconDisplayed(): Promise<boolean> {
        await this.getEditIcon().waitForDisplayed({
            timeoutMsg: 'Block comment icon status was not displayed'
        })
        return this.getEditIcon().isExisting()
    }

    public async isIssueBugLabel(): Promise<boolean> {
        await this.getIssueBugLabel().waitForExist({
            timeoutMsg: 'Bug label was not clickabled'
        })
        return this.getIssueBugLabel().isExisting()
    }

    public async isFileDownload(): Promise<boolean> {
        await this.getFile().waitForDisplayed({
            timeoutMsg: 'Issue status was not clickabled'
        })
        return this.getFile().isExisting()
    }

    public async isIssueClosed(): Promise<boolean> {
        await this.getCloseStatus().waitForDisplayed({
            timeoutMsg: 'Issue status was not clickabled'
        })
        return await this.getCloseStatus().isDisplayed()
    }

    public async pushBugLabelSelect(): Promise<void> {
        await this.getOpenLabelsMenu().waitForClickable({
            timeoutMsg: 'Bug select was not clickabled'
        })
        await this.getBugLabelSelect().click()
    }  

    public async pushCloseIssueButton(): Promise<void> {
        await this.getCloseIssueButton().waitForClickable({
            timeoutMsg: 'Close issue button was not clickabled'
        })
        await this.getCloseIssueButton().click()
    }

    public async pushDeleteIssueButton(): Promise<void> {
        await this.getDeleteIssueButton().waitForClickable({
            timeoutMsg: 'Delete button was not clickabled'
        })
        await this.getDeleteIssueButton().click()
    }

    public async pushEditButton(): Promise<void> {
        await this.getEditButton().waitForClickable({
            timeoutMsg: 'Edit button was not clickabled'
        })
        await this.getEditButton().click()
    }

    public async pushEditLabels(): Promise<void> {
        await this.getEditLabels().waitForClickable({
            timeoutMsg: 'Labels Edit Menu was not clickabled'
        })
        await this.getEditLabels().click()
    }

    public async pushLockCommentsButton(): Promise<void> {
        await this.getLockCommentsButton().waitForClickable({
            timeoutMsg: 'New comment button was not clickabled'
        })
        await this.getLockCommentsButton().click()
    }

    public async pushNewCommentButton(): Promise<void> {
        await this.getNewCommentButton().waitForClickable({
            timeoutMsg: 'New comment button was not clickabled'
        })
        await this.getNewCommentButton().click()
    }

    public async pushOpenLabelsMenu(): Promise<void> {
        await this.getOpenLabelsMenu().waitForDisplayed({
            timeoutMsg: 'Labels Menu was not clickabled'
        })
        await this.getOpenLabelsMenu().click()
    }

    public async pushVerifyDeleteIssueButton(): Promise<void> {
        await this.getDeleteIssueButton().waitForClickable({
            timeoutMsg: 'Verify delete button was not clickabled'
        })
        await this.getVerifyDeleteIssueButton().click()
    }

    public async pushVerifyLockCommentsButton(): Promise<void> {
        await this.getVerifyLockCommentsButton().waitForClickable({
            timeoutMsg: 'New comment button was not clickabled'
        })
        await this.getVerifyLockCommentsButton().click()
    }

    public async pushUpdateTitleButton(): Promise<void> {
        await this.getUpdateTitleButton().waitForClickable({
            timeoutMsg: 'Update button was not clickabled'
        })
        await this.getUpdateTitleButton().click()
    }

    public async setIssueTitle(title: string): Promise<void> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Issue title field was not displayed'
        })
        await this.getIssueTitle().setValue(title)     
    }

    public async setNewComment(comment: string): Promise<void> {
        await this.getNewCommentField().waitForDisplayed({
            timeoutMsg: 'Comment field was not displayed'
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