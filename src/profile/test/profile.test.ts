import { ProfilePage } from "../page-object/Profile.page"
import { ProfileSettingsPage } from "../page-object/ProfileSettings.page"
import { LoginPage } from "../../profile/page-object/Login.page"
import { getRandomString } from "../data/generate.data"
import { UserModel, createUserModel} from '../model/user.model'
import { userData } from '../data/user.data'

describe('Profile settings form', () => {
    let loginPage: LoginPage
    let profilePage: ProfilePage
    let profileSettingsPage: ProfileSettingsPage
    const user: UserModel = createUserModel(userData)
    
    before(async () => {
        loginPage = new LoginPage(browser)
        profilePage = new ProfilePage(browser)
        profileSettingsPage = new ProfileSettingsPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login(user)
        await profileSettingsPage.open()
    })

    it('edit username must save and display', async () => {
        let name: string = getRandomString(25)
        await profileSettingsPage.setUserNameField(name)
        await profilePage.open()

        expect(await profilePage.getNameText()).toEqual(name)
    })

    it('edit name with more than 255 symbols must not save', async () => {
        let name: string = getRandomString(256)
        await profileSettingsPage.setUserNameField(name)
        await profilePage.open()

        expect(await profilePage.getNameText()).not.toEqual(name)
    })

    it('edit pronouns must save and display', async () => {
        let pronouns: string = await profileSettingsPage.getPronounsValue()
        profileSettingsPage.swapPronounsValue(pronouns)
        await profileSettingsPage.setUserPronounsField(pronouns)
        await profilePage.open()

        expect(await profilePage.getPronounsText()).toEqual(pronouns)
    })

    it('edit bio must save and display', async () => {
        let bio: string = getRandomString(100)
        await profileSettingsPage.setUserBioField(bio)
        await profilePage.open()

        expect(await profilePage.getBioText()).toEqual(bio)
    })

    it('edit bio with more than 160 symbols must not save', async () => {
        let bio: string = getRandomString(161)
        await profileSettingsPage.setUserBioField(bio)
        await profilePage.open()

        expect(await profilePage.getBioText()).not.toEqual(bio)
    })

    it('public email must be desabled', async () => {
        expect(await profileSettingsPage.isPublicEmailEnabled()).toEqual(false)
    })

    it('photo JPG should be uploaded in profile', async () => {
        await profileSettingsPage.uploadFile(pathFileJPG)
        await profileSettingsPage.clickEditAvatarButton()

        expect(await profileSettingsPage.isExistingAlert()).toEqual(true)
    })

    it('photo PNG should be uploaded in profile', async () => {
        await profileSettingsPage.uploadFile(pathFileJPG)
        await profileSettingsPage.clickEditAvatarButton()

        expect(await profileSettingsPage.isExistingAlert()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})