export type UserIdType = {
    id: string;
}

export type ProductIdType = {
    id: string;
}

export type UserRequestType = {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    username: string;
}

export type CatalogResponseType = {
    id: string;
    name: string;
    description: string;
    imageUrl: string[];
    price: number;
    count: number;
    tag: string[];
}

export type CartProductsType = {
    id: string;
    itemId: string;
    quantity: number;
    unitPrice: number;
}
