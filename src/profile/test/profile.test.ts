import { LoginPage } from "../../common/page-object/Login.page"
import { ProfilePage } from "../page-object/Profile.page"
import { ProfileSettingsPage } from "../page-object/ProfileSettings.page"
import { EmailSettingsPage } from "../page-object/EmailSettings.page"
import { UserModel, createUserModel} from '../../common/model/user.model'
import { userData } from '../../common/data/user.data'
import { getRandomText } from "../../common/data/generator.data"
import { PATH_FILE_JPG, PATH_FILE_PNG } from "../../common/data/constant.data"

describe('Profile settings form', () => {
    let loginPage: LoginPage
    let profilePage: ProfilePage
    let profileSettingsPage: ProfileSettingsPage
    let emailSettingsPage: EmailSettingsPage
    const user: UserModel = createUserModel(userData)
    
    before(async () => {
        loginPage = new LoginPage(browser)
        profilePage = new ProfilePage(browser)
        profileSettingsPage = new ProfileSettingsPage(browser)
        emailSettingsPage = new EmailSettingsPage(browser)
        await loginPage.open()
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await profileSettingsPage.open()
    })

    it('edit username must save and display', async () => {
        await profileSettingsPage.setUserNameField(user.name)
        await profilePage.open()

        expect(await profilePage.getNameText()).toEqual(user.name)
    })

    it('edit name with more than 255 symbols must not save', async () => {
        user.name = getRandomText(256)
        await profileSettingsPage.setUserNameField(user.name)

        expect(await profileSettingsPage.isShowingInformation()).toEqual(true)

        await profilePage.open()

        expect(await profilePage.getNameText()).not.toEqual(user.name)
    })

     //разобоаться починить и вынести прононс в енум
    it.only('edit pronouns must save and display', async () => {
        await profileSettingsPage.setUserPronounsField(user.pronouns)
        await profilePage.open()

        expect(await profilePage.getPronounsText()).toEqual(user.pronouns)
    })

    it('edit bio must save and display', async () => {
        await profileSettingsPage.setUserBioField(user.bio)
        await profilePage.open()

        expect(await profilePage.getBioText()).toEqual(user.bio)
    })

    it('edit bio with more than 160 symbols must not save', async () => {
        user.bio = getRandomText(161)
        await profileSettingsPage.setUserBioField(user.bio)
        await profilePage.open()

        expect(await profilePage.getBioText()).not.toEqual(user.bio)
    })

    it('public email must be disabled', async () => {
        await emailSettingsPage.open()
        await emailSettingsPage.setEmailPublicCheckbox()
        await profileSettingsPage.open()
        
        expect(await profileSettingsPage.isPublicEmailEnabled()).toEqual(false)
    })

    it('photo JPG should be uploaded in profile', async () => {
        await profileSettingsPage.uploadFile(PATH_FILE_JPG)
        await profileSettingsPage.clickSetProfilePictureButton()

        expect(await profileSettingsPage.isShowingInformation()).toEqual(true)
    })

    it('photo PNG should be uploaded in profile', async () => {
        await profileSettingsPage.uploadFile(PATH_FILE_PNG)
        await profileSettingsPage.clickSetProfilePictureButton()

        expect(await profileSettingsPage.isShowingInformation()).toEqual(true)
    })
})