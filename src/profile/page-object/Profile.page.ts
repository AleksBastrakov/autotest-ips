import {ChainablePromiseElement} from 'webdriverio'
import { LOGIN } from '../../../credentials'

class ProfilePage {
    protected browser: WebdriverIO.Browser
    protected url = `https://github.com/${LOGIN}`

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public getBioText(): Promise<string> {
        return this.getBioField().getText()
    }

    public getNameText(): Promise<string> {
        return this.getNameField().getText()
    }

    public getPronounsText(): Promise<string> {
        return this.getPronounsField().getText()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getBioField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[@data-bio-text]/div')
    }

    private getNameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="name"]')
    }

    private getPronounsField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="pronouns"]')
    }
}

export {
    ProfilePage,
}