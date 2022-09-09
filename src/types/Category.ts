import { Category } from "../features/categories/categorySlice";

export interface Results {
    currentPage: number;
    perPage: number;
    total: number;
    items: Category[];
}

export interface Result {
    data: Category;
}


export interface CategoryParams {
    page?: number;
    perPage?: number;
    search?: string;
    sort?: string;
    dir?: string;
}