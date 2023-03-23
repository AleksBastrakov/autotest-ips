import { LOGIN, PASSWORD } from "../../../credentials"

type UserData = {
    login: string,
    password: string,
}

const userData: UserData = {
    login: LOGIN,
    password: PASSWORD,
}

export {
    userData,
    UserData,
}