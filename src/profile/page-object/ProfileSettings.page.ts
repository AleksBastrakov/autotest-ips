import {ChainablePromiseElement} from 'webdriverio'

class ProfileSettingsPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async clickSetProfilePictureButton(): Promise<void> {
        await this.getEditAvatarButton().waitForClickable({
            timeoutMsg: 'Edit button was not clickable'
        })
        await this.getEditAvatarButton().click()
    }

    public async clickUpdateProfileButton(): Promise<void> {
        await this.getUpdateProfileButton().waitForClickable({
            timeoutMsg: 'Update profile button was not clickable'
        })
        await this.getUpdateProfileButton().click()
    }

    public async getPronounsValue(): Promise<string> {
        await this.getPronounsInputField().waitForExist({
            timeoutMsg: 'Pronouns field was not exist'
        })
        return this.getPronounsInputField().getValue()
    }

    public async isPublicEmailEnabled(): Promise<boolean> {
        return this.getPublicEmailField().isEnabled()
    }

    public async isShowingInformation(): Promise<boolean> {
        await this.getInfoWindow().waitForDisplayed({
            timeoutMsg: 'Alert window was not display',
        })
        return this.getInfoWindow().isDisplayed()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async setUserBioField(bio: string): Promise<void> {
        await this.getUserBioField().waitForDisplayed({
            timeoutMsg: 'Bio field was not display'
        })
        await this.getUserBioField().setValue(bio)
        await this.clickUpdateProfileButton()
    }

    public async setUserNameField(name: string): Promise<void> {
        await this.getUserNameField().waitForDisplayed({
            timeoutMsg: 'Username field was not display'
        })
        await this.getUserNameField().setValue(name)
        await this.clickUpdateProfileButton()
    }

    public async setUserPronounsField(pronouns: string): Promise<void> {
        await this.getUserPronounsField().waitForDisplayed({
            timeoutMsg: 'Pronouns field was not display'
        })
        await this.getUserPronounsField().selectByAttribute('value', pronouns)
        await this.clickUpdateProfileButton()
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not exist',
        })
        await this.showHiddenFileInput()
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    private getEditAvatarButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[@value="save"]')
    }

    private getInfoWindow(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@role="alert"]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private getPronounsInputField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns"]')
    }

    private getPublicEmailField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getUpdateProfileButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-target="waiting-form.submit"]')
    }

    private getUserBioField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getUserNameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }
    
    private getUserPronounsField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private async showHiddenFileInput(): Promise<void> {
        await this.browser.execute(() => {
            const htmlElement = document.querySelector('[type="file"]') as HTMLElement
            htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
        })
    }
}

export {
    ProfileSettingsPage,
}