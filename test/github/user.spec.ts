import {ApiClient} from "../../src/github/lib/api_client";
import {User} from "../../src/github/types/user_type";
import {Follower} from "../../src/github/types/follower_type";
import {UserController} from "../../src/github/controller/user_controller";
import {BASE_URL} from "../../src/github/constants";

describe("User controller", () => {
    let controller: UserController

    beforeEach(() => {
        let client = ApiClient.api(`${BASE_URL}/user`)
        controller = UserController.controller(client)
    })

    test('should return list followers of the authenticated user', async () => {
        const followers: Follower[] = await controller.getFollowers()
        expect(followers.length).toBeGreaterThan(1)
    });

    test('should return user information', async () => {
        const user: User = await controller.getUserInformation()
        expect(user.name).toBe('Ivan Sandratskyi')
        expect(user.blog).toBe('https://www.linkedin.com/in/sandratskii')
    });
});
