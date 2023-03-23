import { LoginPage } from "../page-object/Login.page"
import { MainPage } from "../page-object/Main.page"
import { UserModel, createUserModel} from '../model/user.model'
import { userData } from '../data/user.data'

describe('Login form', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    const user: UserModel = createUserModel(userData)

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('user should be log in by LOGIN', async () => {
        await loginPage.login(user)
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(user.login)
    })

    it('user should be log in by EMAIL', async () => {
        await loginPage.setLoginField(user.email)
        await loginPage.setPasswordField(user.password)
        await loginPage.pushLoginButton()
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(user.login)
    })

    it('user should not be log in with empty credentials', async () => {
        await loginPage.setLoginField(user.emptyLogin)
        await loginPage.setPasswordField(user.emptyPassword)
        await loginPage.pushLoginButton()
        
        expect(await loginPage.isExistingError()).toEqual(true)
    })

    it('user should not be log in with wrong password', async () => {
        await loginPage.setLoginField(user.login)
        await loginPage.setPasswordField(user.wrongPassword)
        await loginPage.pushLoginButton()

        expect(await loginPage.isExistingError()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})
