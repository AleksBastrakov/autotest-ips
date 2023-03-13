import { LOGIN, PASSWORD } from "../../credentials"

describe ('Login form', async () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })
    
    it ('user should be log in', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(LOGIN)
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@id="login_field"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await (await browser.$('//*[@type="submit"]')).click()

        await browser.$('//summary//*[contains(@class, "avatar")]').waitForDisplayed({
            timeoutMsg: 'Avatar was not displayed'
        })
        await (await browser.$('//summary//*[contains(@class, "avatar")]')).click()

        expect(await browser.$('//*[@class="css-truncate-target"]').getText()).toEqual(LOGIN)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})