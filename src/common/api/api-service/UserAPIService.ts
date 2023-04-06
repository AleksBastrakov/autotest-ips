import { AxiosResponse } from "axios"
import { UserModel } from "../../model/user.model"
import { UserAPIDataProvider, UserRequest,  UpdateUserRequest } from "../api-data-provider/UserAPIDataProvider"
import { UserAPIProvider } from "../api-provider/UserAPIProvider"

class UserAPIService {
    public static async updateAuthenticatedUser(user: UserModel): Promise<AxiosResponse<UserRequest>> {
        try {
            const data: UpdateUserRequest = UserAPIDataProvider.getUpdateUserData(user)
            const userAPIProvider: UserAPIProvider = new UserAPIProvider()
            const response: AxiosResponse<UserRequest> = await userAPIProvider.updateAuthenticatedUser(data)
            return response
        }
        catch (error) {
            throw Error(`Update user by model failed ${error}`)
        }
    }
}

export {
    UserAPIService
}