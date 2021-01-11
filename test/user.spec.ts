import {ApiClient} from "../src/lib/api_client";
import {User} from "../src/types/user_type";
import {Follower} from "../src/types/follower_type";
import {UserController} from "../src/controller/user_controller";

describe("User controller", () => {
    let controller: UserController

    beforeEach(() => {
        let client = ApiClient.api()
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
