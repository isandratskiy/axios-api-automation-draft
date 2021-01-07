import axios from "axios"
import * as logger from 'axios-logger';

import {CartProductsType, CatalogResponseType, ProductIdType, UserIdType, UserRequestType} from "./types";

const instance = axios.create({
    baseURL: 'http://localhost:80',
    withCredentials: true
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
