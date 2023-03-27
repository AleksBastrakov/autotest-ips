import { LOGIN, PASSWORD, EMAIL } from "../../../credentials"
import { getUniqueValue } from "../data/generator.data"

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
    pronouns: 'he/him',
    bio: getUniqueValue('Bio', 100),
}

export {
    userData,
    UserData
}
