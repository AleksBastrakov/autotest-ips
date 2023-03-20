class ProfileSettingsPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async clickEditAvatarButton() {
        await this.getEditAvatarButton().waitForExist({
            timeoutMsg: 'Edit buttos was not exist'
        })
        await this.getEditAvatarButton().click()
    }

    public getAlertWindow() {
        return this.browser.$('//*[@role="alert"]') 
    }

    public getPronounsInputField() {
        return this.browser.$('//*[@id="user_profile_pronouns"]')
    }

    public async getPronounsValue(): Promise<string> {
        return this.getPronounsInputField().getValue()
    }

    public async isExistingAlert() {
        await this.getAlertWindow().waitForExist({
            timeoutMsg: 'Alert window was not exist'
        })
        return this.getAlertWindow()
    }

    public async isPublicEmailEnabled(): Promise<boolean> {
        return this.getPublicEmailField().isEnabled()
    }

    public async open() {
        await this.browser.url(this.url)
    }

    public async setUserBioField(bio: string) {
        await this.getUserBioField().waitForDisplayed({
            timeoutMsg: 'Bio field was not displayed'
        })
        await this.getUserBioField().setValue(bio)
        await this.getUpdateProfileButton().click()
    }

    public async setUserNameField(name: string) {
        await this.getUserNameField().waitForDisplayed({
            timeoutMsg: 'Username field was not displayed'
        })
        await this.getUserNameField().setValue(name)
        await this.getUpdateProfileButton().click()
    }

    public async setUserPronounsField(pronouns: string) {
        await this.getUserPronounsField().waitForDisplayed({
            timeoutMsg: 'Pronouns field was not displayed'
        })
        await this.getUserPronounsField().selectByAttribute('value', pronouns)
        await this.getUpdateProfileButton().click()
    }

    public async showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
        await browser.execute(() => {
            const htmlElement = document.querySelector('[type="file"]') as HTMLElement
            htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
        })
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not exist',
        })
        await this.showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    private getEditAvatarButton() {
        return this.browser.$('//button[@value="save"]')
    }

    private getInputFile() {
        return this.browser.$('[type="file"]')
    }

    private getPublicEmailField() {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getUpdateProfileButton() {
        return this.browser.$('//*[@data-target="waiting-form.submit"]')
    }

    private getUserBioField() {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getUserNameField() {
        return this.browser.$('//*[@id="user_profile_name"]')
    }
    
    private getUserPronounsField() {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }
}

export {
    ProfileSettingsPage
}