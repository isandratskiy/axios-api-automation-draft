import {ApiClient} from "../lib/api_client";
import {User} from "../types/user_type";
import {Follower} from "../types/follower_type";

export class UserController {
    private http: ApiClient

    constructor(client: ApiClient) {
        this.http = client
    }

    async getUserInformation(): Promise<User> {
        return await this.http.get().send()
    }

    async getFollowers(): Promise<Follower[]> {
        return await this.http.get('followers').send()
    }
}
