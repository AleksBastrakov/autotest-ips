import { ChainablePromiseElement } from 'webdriverio'
import { LOGIN, PROJECT } from "../../../credentials"
import { IssueModel } from '../model/issue.model'

class IssueCreatePage {
    protected browser: WebdriverIO.Browser
    protected url = `https://github.com/${LOGIN}/${PROJECT}/issues/new`

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async createIssue(issue: IssueModel): Promise<void> {
        await this.open()
        await this.setIssueTitle(issue.name)
        await this.pushSubmitButton()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async pushSubmitButton(): Promise<void> {
        await this.getSubmitButton().waitForDisplayed({
            timeoutMsg: 'Submit button was not displayed'
        })
        await this.getSubmitButton().click()
    }

    public async setIssueTitle(title: string): Promise<void> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Issue title field was not displayed'
        })
        await this.getIssueTitle().setValue(title)
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getSubmitButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="btn-primary btn ml-2"]')
    }
}

export {
    IssueCreatePage,
}