import {ChainablePromiseElement} from 'webdriverio'

class EmailSettingsPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/emails'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async setEmailPublicCheckbox(): Promise<void> {
        await this.getEmailPublicCheckbox().waitForDisplayed({
            timeoutMsg: 'Email public checkbox was not displayed'
        })
        if (await this.getEmailPublicCheckbox().isSelected() !== true) {
            await this.getEmailPublicCheckbox().click()
        }
    }

    private getEmailPublicCheckbox(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="toggle_visibility"]')
    }
}

export {
    EmailSettingsPage,
}