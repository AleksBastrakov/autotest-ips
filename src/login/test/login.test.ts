import { LoginPage } from "../page-object/Login.page"
import { MainPage } from "../page-object/Main.page"
import { LOGIN, PASSWORD, EMAIL } from "../../../credentials"

describe('Login form', () => {
    let loginPage: LoginPage
    let mainPage: MainPage

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('user should be log in by LOGIN', async () => {
        await loginPage.login(LOGIN, PASSWORD)
        await mainPage.openUserMenu()
        expect(await mainPage.getUserLoginText()).toEqual(LOGIN)
    })

    it('user should be log in by EMAIL', async () => {
        await loginPage.login(EMAIL, PASSWORD)
        await mainPage.openUserMenu()
        expect(await mainPage.getUserLoginText()).toEqual(LOGIN)
    })

    it('user should not be log in with empty credentials', async () => {
        await loginPage.login('', '')
        await loginPage.isExistingError()
        expect(await loginPage.getErrorWindow().isExisting()).toEqual(true)
    })

    it('user should not be log in with wrong password', async () => {
        let password:string = 'wrong123pass'
        await loginPage.login('', password)
        await loginPage.isExistingError()
        expect(await loginPage.getErrorWindow().isExisting()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})
