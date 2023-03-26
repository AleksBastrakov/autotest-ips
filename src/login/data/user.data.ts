import { LOGIN, PASSWORD, EMAIL } from "../../../credentials"

type UserData = {
    login: string,
    email: string
    password: string,
    emptyLogin: string,
    emptyPassword: string,
    wrongPassword: string,
}

const userData: UserData = {
    login: LOGIN,
    email: EMAIL,
    password: PASSWORD,
    emptyLogin: '', //вынести невалидные данные прямо в тест объектом (выносить в describe)
    emptyPassword: '',
    wrongPassword: 'wrong123pass'
}

export {
    userData,
    UserData
}