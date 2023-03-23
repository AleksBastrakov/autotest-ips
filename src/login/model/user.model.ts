import { UserData } from "../data/user.data"

type UserModel = {
    login: string,
    email: string
    password: string,
    emptyLogin: string,
    emptyPassword: string,
    wrongPassword: string,
}

function createUserModel(data: UserData): UserModel
{
    return {
        login: data.login,
        email: data.email,
        password: data.password,
        emptyLogin: data.emptyLogin,
        emptyPassword: data.emptyPassword,
        wrongPassword: data.wrongPassword,
    }
}

export {
    UserModel,
    createUserModel,
}