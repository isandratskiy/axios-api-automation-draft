import {ApiClient} from "../lib/api_client";
import {User} from "../types/user_type";
import {Follower} from "../types/follower_type";

export class UserController {
    private http: ApiClient

    static controller(client: ApiClient): UserController {
        return new UserController(client)
    }

    private constructor(client: ApiClient) {
        this.http = client
    }

    async getUserInformation(): Promise<User> {
        return await this.http.get('user').send()
    }

    async getFollowers(): Promise<Follower[]> {
        return await this.http.get('user/followers').send()
    }
}
