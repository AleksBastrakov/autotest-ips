import { ChainablePromiseElement } from 'webdriverio'
import { LOGIN, PROJECT } from '../../../credentials'

class IssueMainPage {
    protected browser: WebdriverIO.Browser
    protected url = `https://github.com/${LOGIN}/${PROJECT}/issues`

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async findIssue(name: string): Promise<void> {
        await this.open()
        await this.setIssuesSearchField(name)
        await this.browser.keys('Enter')
    }

    public async getIssueNameFromSearchList(): Promise<string> {
        await this.getIssueFromSearchList().waitForDisplayed({
            timeoutMsg: 'Issue name was not display',
        })
        return this.getIssueFromSearchList().getText()
    }

    public async isIssueFoundBySearch(): Promise<boolean> {
        await this.getIssueFromSearchList().waitForDisplayed({
            timeoutMsg: 'Issue found was not display',
        })
        return await this.getIssueFromSearchList().isDisplayed()
    }
 
    public async isIssueFoundIsEmpty(): Promise<boolean> {
        await this.getEmptyFoundBanner().waitForDisplayed({
            timeoutMsg: 'Empty banner was not display',
        })
        return this.getEmptyFoundBanner().isDisplayed()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async openIssueSettings(issueName: string): Promise<void> {
        await this.findIssue(issueName)
        await this.getIssueFromSearchList().waitForDisplayed({
            timeoutMsg: 'Issue was not found',
        })
        await this.getIssueFromSearchList().click()
    }

    public async pushNewIssueButton(): Promise<void> {
        await this.getNewIssueButton().waitForClickable({
            timeoutMsg: 'New issue button was not clickable',
        })
        await this.getNewIssueButton().click()
    }

    public async setIssuesSearchField(name: string): Promise<void> {
        await this.getIssuesSearchField().waitForDisplayed({
            timeoutMsg: 'Issue title field was not display'
        })
        await this.getIssuesSearchField().setValue(name)
    }

    private getEmptyFoundBanner(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="blankslate blankslate-large blankslate-spacious"]')
    }

    private getIssueFromSearchList(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-hovercard-type="issue"]')
    }

    private getIssuesSearchField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-issues-search"]')
    }

    private getNewIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//a[@role="button"]')
    }
}

export {
    IssueMainPage,
}