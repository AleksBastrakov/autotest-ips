import { LOGIN, PASSWORD, EMAIL } from "../../../credentials"
import { PRONOUNS } from "./constant.data"
import { getUniqueValue, getRandomPronouns } from "../data/generator.data"

type UserData = {
    login: string,
    email: string
    password: string,
    name: string,
    pronouns: string,
    bio: string,
    project: string
}

const userData: UserData = {
    login: LOGIN,
    email: EMAIL,
    password: PASSWORD,
    name: getUniqueValue('Name', 5),
    pronouns: getRandomPronouns(PRONOUNS),
    bio: getUniqueValue('Bio', 100),
    project: 'autotest-ips'
}

const userEmptyData: UserData = {
    login: LOGIN,
    email: EMAIL,
    password: PASSWORD,
    name: '',
    pronouns: getRandomPronouns(PRONOUNS),
    bio: '',
    project: '',
}

export {
    userData,
    userEmptyData,
    UserData,
}
