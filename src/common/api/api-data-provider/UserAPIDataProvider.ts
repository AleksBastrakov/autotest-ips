import { UserModel } from "../../model/user.model"

type UpdateUserRequest = {
    name: string,
    bio: string,
}

class UserAPIDataProvider {
    public static getUpdateUserData(user: UserModel): UpdateUserRequest {
        return {
            name: user.name,
            bio: user.bio,
        }
    }
}

export {
    UserAPIDataProvider,
    UpdateUserRequest,
}