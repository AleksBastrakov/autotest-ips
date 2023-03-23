import { ChainablePromiseElement } from 'webdriverio'
import { UserModel } from '../model/user.model'

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

    public async login(user: UserModel): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed',
        })
        await this.getLoginField().setValue(user.login)
        await this.getPasswordField().setValue(user.password)
        await this.getLoginButton().click()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async pushLoginButton(): Promise<void> {
        await this.getLoginButton().waitForDisplayed({
            timeoutMsg: 'Login button was not displayed',
        })
        await this.getLoginButton().click()
    }

    public async setLoginField(login: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed',
        })
        await this.getLoginField().setValue(login)
    }

    public async setPasswordField(password: string): Promise<void> {
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Password field was not displayed',
        })
        await this.getPasswordField().setValue(password)
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