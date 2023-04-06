import { UserModel } from "../../model/user.model"
import { GitAPIProvider } from "../api-provider/GitAPIProvider"

type UpdateUserRequest = {
    name: string,
    bio: string,
}

type UserRequest = {
    name: string,
    bio: string,
}

class UserAPIDataProvider extends GitAPIProvider{
    public static getUpdateUserData(user: UserModel): UpdateUserRequest {
        return {
            name: user.name,
            bio: user.bio,
        }
    }
}

export {
    UserAPIDataProvider,
    UserRequest,
    UpdateUserRequest,
}