import {ProductIdType, UserRequestType} from "../src/types";
import * as fake from 'faker';
import {cartApi, catalogApi, userApi} from "../src/api";
import {expect} from "chai";

describe("Cart controller", () => {
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

    it("can add product to cart", async () => {
        await userApi.create(user)

        const responseId = await catalogApi.getProducts(3);
        const firstProduct: ProductIdType = {
            id: responseId.data[0].id
        }
        const secondProduct: ProductIdType = {
            id: responseId.data[2].id
        }

        await cartApi.addProduct(firstProduct)
        await cartApi.addProduct(secondProduct)

        const cart = await cartApi.getCart()
        expect(cart.status.valueOf()).to.equal(200)
        expect(cart.data.length).to.equal(2)
    });
});
