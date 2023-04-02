import { LoginPage } from "../../common/page-object/Login.page"
import { MainPage } from "../page-object/Main.page"
import { UserModel, createUserModel} from '../../common/model/user.model'
import { userData } from '../../common/data/user.data'
import { EMPTY_STRING, WRONG_PASSWORD } from '../../common/data/constant.data'

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
        await loginPage.setLoginField(EMPTY_STRING)
        await loginPage.setPasswordField(EMPTY_STRING)
        await loginPage.pushLoginButton()
        
        expect(await loginPage.isExistingError()).toEqual(true)
    })

    it('user should not be log in with wrong password', async () => {
        await loginPage.setLoginField(user.login)
        await loginPage.setPasswordField(WRONG_PASSWORD)
        await loginPage.pushLoginButton()

        expect(await loginPage.isExistingError()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})
