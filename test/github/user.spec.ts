import {ApiClient} from "../../src/github/lib/api_client";
import {User} from "../../src/github/types/user_type";
import {Follower} from "../../src/github/types/follower_type";

describe("User controller", () => {
    let client: ApiClient

    beforeEach(() => {
        client = ApiClient.api(`https://api.github.com/user`)
    })

    test('should return list followers of the authenticated user', async () => {
        const followers: Follower[] = await client.get('followers').send()
        expect(followers.length).toBeGreaterThan(1)
    });

    test('should return user information', async () => {
        const user: User = await client.get().send()
        expect(user.name).toBe('Ivan Sandratskyi')
        expect(user.blog).toBe('https://www.linkedin.com/in/sandratskii')
    });
});
