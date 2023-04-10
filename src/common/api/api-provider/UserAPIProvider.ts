import { UpdateUserRequest } from "../api-data-provider/UserAPIDataProvider"
import { GitAPIProvider } from "./GitAPIProvider"
import { AxiosRequestConfig, AxiosResponse } from 'axios'

class UserAPIProvider extends GitAPIProvider {
    public updateAuthenticatedUser<T>(data: UpdateUserRequest): Promise<AxiosResponse<T>> {
        const request: AxiosRequestConfig = UserAPIProvider.configureRequest(
            '/user',
            'PATCH',
            this.headers,
            JSON.stringify(data),
        )
        return this.sendRequest(request)
    }
}

export {
    UserAPIProvider,
}