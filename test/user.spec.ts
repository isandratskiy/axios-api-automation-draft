import {userApi} from "../src/api";
import * as fake from 'faker';
import {UserRequestType} from "../src/types";
import {expect} from "chai";

describe("User controller", () => {
    let user: UserRequestType

    beforeEach(() => {
        user = {
            firstName: fake.name.firstName(),
            lastName: fake.name.lastName(),
            password: fake.internet.password(),
            email: fake.internet.email(),
            username: fake.internet.userName()
        }
    });

    it("can register user", async () => {
        const response = await userApi.create(user)
        expect(response.data.id).not.empty
    });
});
