import { ChainablePromiseElement } from 'webdriverio'
import { LOGIN, PROJECT } from '../../../credentials'
import { IssueModel } from '../model/issue.model'

class IssueMainPage {
    protected browser: WebdriverIO.Browser
    protected url = `https://github.com/${LOGIN}/${PROJECT}/issues`

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getNewIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//a[@role="button"]')
    }

    public getIssuesSearchField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-issues-search"]')
    }

    private getIssueFromSearchList(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-hovercard-type="issue"]')
    }

    public async isIssueFoundBySearch(): Promise<boolean> {
        return (await this.getIssueFromSearchList()).isExisting()
    }

    public async getIssueNameFromSearchList(): Promise<string> {
        return this.getIssueFromSearchList().getText()
    }

    public async setIssuesSearchField(name: string): Promise<void> {
        await this.getIssuesSearchField().waitForDisplayed({
            timeoutMsg: 'Issue title field was not displayed'
        })
        await this.getIssuesSearchField().setValue(name)
    }

    public async pushNewIssueButton(): Promise<void> {
        await this.getNewIssueButton().waitForDisplayed({
            timeoutMsg: 'New issue button was not displayed',
        })
        await this.getNewIssueButton().click()
    }

    public async openIssueSettings(): Promise<void>{
        await this.getIssueFromSearchList().waitForDisplayed({
            timeoutMsg: 'Issue was not found',
        })
        await this.getIssueFromSearchList().click()
    }

    public async findIssue(issueName: string): Promise<void> {
        await this.open()
        await this.setIssuesSearchField(issueName)
        await this.browser.keys('Enter')
        await this.browser.pause(5000)
    }

    public async openIssueEdit(issueName: string): Promise<void>{
        await this.findIssue(issueName)
        await this.getIssueFromSearchList().click()
    }
}

export {
    IssueMainPage,
}