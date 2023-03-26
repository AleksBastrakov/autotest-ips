import { ChainablePromiseElement } from 'webdriverio'
import { LOGIN, PROJECT } from '../../../credentials'

class IssueMainPage {
    protected browser: WebdriverIO.Browser
    protected url = `https://github.com/${LOGIN}/${PROJECT}/issues`

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async findIssue(issueName: string): Promise<void> {
        await this.open()
        await this.setIssuesSearchField(issueName)
        await this.browser.keys('Enter')//вынести в Enum, если будут использоваться другие клавиши
        await this.browser.pause(5000)//подумать как избавиться от паузы
    }

    public async getIssueNameFromSearchList(): Promise<string> {
        return this.getIssueFromSearchList().getText()
    }

    public isIssueFoundBySearch(): Promise<boolean> {
        return this.getIssueFromSearchList().isExisting()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async openIssueEdit(issueName: string): Promise<void> {//переименовать метод
        await this.findIssue(issueName)
        await this.getIssueFromSearchList().click()
    }

    public async openIssueSettings(): Promise<void> {
        await this.getIssueFromSearchList().waitForDisplayed({
            timeoutMsg: 'Issue was not found',
        })
        await this.getIssueFromSearchList().click()
    }

    public async pushNewIssueButton(): Promise<void> {
        await this.getNewIssueButton().waitForDisplayed({
            timeoutMsg: 'New issue button was not displayed',
        })
        await this.getNewIssueButton().click()
    }

    public async setIssuesSearchField(name: string): Promise<void> {
        await this.getIssuesSearchField().waitForDisplayed({
            timeoutMsg: 'Issue title field was not displayed'
        })
        await this.getIssuesSearchField().setValue(name)
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