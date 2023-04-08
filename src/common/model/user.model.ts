import { UserData } from "../data/user.data"

type UserModel = {
    login: string,
    email: string
    password: string,
    name: string
    pronouns: string
    bio: string
    project: string
}

function createUserModel(data: UserData): UserModel
{
    return {
        login: data.login,
        email: data.email,
        password: data.password,
        name: data.name,
        pronouns: data.pronouns,
        bio: data.bio,
        project: data.project
    }
}

export {
    UserModel,
    createUserModel,
}