class LoginPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async login(userLogin: string, userPassword: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getLoginField().setValue(userLogin)
        await this.getPasswordField().setValue(userPassword)
        await this.getLoginButton().click()
    }

    public async open() {
        await this.browser.url(this.url)
    }

    private getLoginField() {
        return this.browser.$('//*[@id="login_field"]')
    }

    private getPasswordField() {
        return this.browser.$('//*[@id="password"]')
    }

    private getLoginButton() {
        return this.browser.$('//*[@type="submit"]')
    }

}
export {
    LoginPage,
}