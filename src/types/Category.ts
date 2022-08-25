import {Category} from "../features/categories/categorySlice";

export interface Results {
    meta: Meta;
    links: Links;
    data: Category[];
}

export interface Result {
    meta: Meta;
    links: Links;
    data: Category;
}

export interface Links {
    prev: string;
    last: string;
    next: string;
    first: string;
}

export interface Meta {
    to: number;
    from: number;
    path: string;
    total: number;
    per_page: number;
    last_page: number;
    current_page: number;
}

export interface CategoryParams {
    page?: number;
    perPage?: number;
    search?: string;
    isActive?: boolean;
}