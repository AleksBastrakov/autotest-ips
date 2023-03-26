import { UserData } from "../data/user.data"

type UserModel = {
    login: string,
    password: string,
}

function createUserModel(data: UserData): UserModel
{
    return {
        login: data.login,//вынести в common
        password: data.password,
    }
}

export {
    UserModel,
    createUserModel,
}