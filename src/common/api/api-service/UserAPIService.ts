import { AxiosResponse } from "axios"
import { UserModel } from "../../model/user.model"
import { UserAPIDataProvider, UpdateUserRequest } from "../api-data-provider/UserAPIDataProvider"
import { UserAPIProvider } from "../api-provider/UserAPIProvider"

type UpdateUserResponse = {
    name: string,
    bio: string,
}

class UserAPIService {
    public static async updateAuthenticatedUser(user: UserModel): Promise<AxiosResponse<UpdateUserResponse>> {
        try {
            const data: UpdateUserResponse = UserAPIDataProvider.getUpdateUserData(user)
            const userAPIProvider: UserAPIProvider = new UserAPIProvider()
            const response: AxiosResponse<UpdateUserResponse> = await userAPIProvider.updateAuthenticatedUser(data)
            return response
        } catch (error) {
            throw Error(`Update user by model failed ${error}`)
        }
    }
}

export {
    UserAPIService
}