export interface User {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
}

export type Users = User[];


export interface Product {
    id?: number;
    title?: string;
    price?: number;
    description?: string;
    images?: string[];
    quantity?: number;
}

export type Products = Product[];

export interface Category {
    id?: number;
    name?: string;
    image?: string;
}

export type Categories = Category[];
