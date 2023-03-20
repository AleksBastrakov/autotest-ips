import {ChainablePromiseElement} from 'webdriverio'

class LoginPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async isExistingError(): Promise<boolean> {
        await this.getErrorWindow().waitForExist({
            timeoutMsg: 'Error was not exist',
        })
        return this.getErrorWindow().isExisting()
    }

    public async login(userLogin: string, userPassword: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed',
        })
        await this.getLoginField().setValue(userLogin)
        await this.getPasswordField().setValue(userPassword)
        await this.getLoginButton().click()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getErrorWindow(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@role="alert"]')
    }
    
    private getLoginButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@type="submit"]')
    }

    private getLoginField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login_field"]')
    }

    private getPasswordField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="password"]')
    }
}

export {
    LoginPage,
}