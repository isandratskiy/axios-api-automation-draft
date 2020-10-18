import axios from "axios"
import * as logger from 'axios-logger';
import {CartProductsType, CatalogResponseType, ProductIdType, UserIdType, UserRequestType} from "./types";
//import tough = require('tough-cookie');
//import axiosCookieJarSupport from 'axios-cookiejar-support';

//axiosCookieJarSupport(axios);
//export const cookieJar = new tough.CookieJar();

const instance = axios.create({
    baseURL: 'http://localhost:80',
    withCredentials: true,
    //jar: cookieJar
})

instance.interceptors.request.use(logger.requestLogger);
instance.interceptors.response.use(logger.responseLogger);

export const userApi = {
    create(user: UserRequestType) {
        return instance.post<UserIdType>('register', user);
    }
}

export const catalogApi = {
    getProducts(size: number) {
        return instance.get<CatalogResponseType[]>(`catalogue?size=${size}`);
    }
}

export const cartApi = {
    addProduct(productId: ProductIdType) {
        return instance.post(`cart`, productId);
    },
    getCart() {
        return instance.get<CartProductsType[]>('cart');
    }
}
