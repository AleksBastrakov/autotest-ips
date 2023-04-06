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
}

const userData: UserData = {
    login: LOGIN,
    email: EMAIL,
    password: PASSWORD,
    name: getUniqueValue('Name', 5),
    pronouns: getRandomPronouns(PRONOUNS),
    bio: getUniqueValue('Bio', 100),
}

const userEmptyData: UserData = {
    login: LOGIN,
    email: EMAIL,
    password: PASSWORD,
    name: '',
    pronouns: getRandomPronouns(PRONOUNS),
    bio: '',
}

export {
    userData,
    userEmptyData,
    UserData,
}
