import { LoginPage } from "../../common/page-object/Login.page"
import { MainPage } from "../page-object/Main.page"
import { UserModel, createUserModel} from '../../common/model/user.model'
import { userData } from '../../common/data/user.data'

describe('Login form', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    let emptyLogin: string = ''
    let emptyPassword: string = ''
    let wrongPassword: string = 'wrongPaassword'
    const user: UserModel = createUserModel(userData)

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('user should be log in by LOGIN', async () => {
        await loginPage.login(user.login, user.password)
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(user.login)
    })

    it('user should be log in by EMAIL', async () => {
        await loginPage.login(user.email, user.password)
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(user.login)
    })

    it('user should not be log in with empty credentials', async () => {
        await loginPage.setLoginField(emptyLogin)
        await loginPage.setPasswordField(emptyPassword)
        await loginPage.pushLoginButton()
        
        expect(await loginPage.isExistingError()).toEqual(true)
    })

    it('user should not be log in with wrong password', async () => {
        await loginPage.setLoginField(user.login)
        await loginPage.setPasswordField(wrongPassword)
        await loginPage.pushLoginButton()

        expect(await loginPage.isExistingError()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})
