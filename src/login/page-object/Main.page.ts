class MainPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public getUserLoginText(): Promise<string> {
        return this.getUserLogin().getText()
    }

    public async openUserMenu(): Promise<void> {
        await this.getUserAvatar().waitForClickable({
            timeoutMsg: 'User avatar was not clickable'
        })
        await this.getUserAvatar().click()
    }
    
    private getUserAvatar() {
        return this.browser.$('//summary//*[contains(@class, "avatar")]')
    }

    private getUserLogin() {
        return this.browser.$('//*[@class="css-truncate-target"]')
    }
}

export {
    MainPage,
}