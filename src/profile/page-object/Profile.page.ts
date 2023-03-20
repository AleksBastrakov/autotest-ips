class ProfilePage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/AleksBastrakov'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    private getBio() {
        return this.browser.$('//div[@data-bio-text]/div')
    }

    private getName() {
        return this.browser.$('//*[@itemprop="name"]')
    }

    private getPronouns() {
        return this.browser.$('//*[@itemprop="pronouns"]')
    }

    public getBioText(): Promise<string> {
        return this.getBio().getText()
    }

    public getNameText(): Promise<string> {
        return this.getName().getText()
    }

    public getPronounsText(): Promise<string> {
        return this.getPronouns().getText()
    }

    public async open() {
        await this.browser.url(this.url)
    }
}

export {
    ProfilePage
}