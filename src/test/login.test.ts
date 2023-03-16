import { LOGIN, PASSWORD, EMAIL } from "../../credentials"

describe ('Login form', async () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })
    
    it ('user should be log in by LOGIN', async () => {
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

    it ('user should be log in by EMAIL', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(EMAIL)
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

    it ('user should not be log in (empty credentials)', async () => {
        await browser.$('//*[@id="login_field"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await (await browser.$('//*[@type="submit"]')).click()
        await browser.$('//*[@role="alert"]').waitForDisplayed({
            timeoutMsg: 'Error was not displayed'
        })
        expect(await (await browser.$('//*[@role="alert"]')).isExisting()).toEqual(true)
    })

    it ('user should not be log in with wrong password', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await browser.$('//*[@id="login_field"]').setValue(LOGIN)
        await browser.$('//*[@id="password"]').setValue('12782193692136')
        await browser.$('//*[@id="login_field"]').waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await (await browser.$('//*[@type="submit"]')).click()
        await browser.$('//*[@role="alert"]').waitForDisplayed({
            timeoutMsg: 'Error was not displayed'
        })
        expect(await (await browser.$('//*[@role="alert"]')).isExisting()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})