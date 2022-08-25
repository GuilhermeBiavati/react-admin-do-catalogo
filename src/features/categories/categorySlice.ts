import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {apiSlice} from "../api/apiSlice";
import {Result, Results} from "../../types/Category";

export interface Category {
    id: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
    description: null | string;
}

const endpointUrl = "/categories";

function deleteCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "DELETE",
    }
};

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getCategories: query<Results, void>({
            query: () => endpointUrl,
            providesTags: ["Categories"]
        }),
        deleteCategory: mutation<Result, { id: string }>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
    })
});

export const initialState: Category[] = [
    {
        id: "1",
        name: "fdafdasdf",
        is_active: true,
        created_at: "2020-04-30T00:00:00+0000",
        updated_at: "2020-04-30T00:00:00+0000",
        description: "fdsafasdfasdfasdf",
        deleted_at: null
    },
    {
        id: "2",
        name: "fdafdasdf",
        is_active: true,
        created_at: "2020-04-30T00:00:00+0000",
        updated_at: "2020-04-30T00:00:00+0000",
        description: "fdsafasdfasdfasdf",
        deleted_at: null
    },
    {
        id: "3",
        name: "fdafdasdf",
        is_active: true,
        created_at: "2020-04-30T00:00:00+0000",
        updated_at: "2020-04-30T00:00:00+0000",
        description: "fdsafasdfasdfasdf",
        deleted_at: null
    },
    {
        id: "4",
        name: "fdafdasdf",
        is_active: true,
        created_at: "2020-04-30T00:00:00+0000",
        updated_at: "2020-04-30T00:00:00+0000",
        description: "fdsafasdfasdfasdf",
        deleted_at: null
    },
    {
        id: "5",
        name: "fdafdasdf",
        is_active: true,
        created_at: "2020-04-30T00:00:00+0000",
        updated_at: "2020-04-30T00:00:00+0000",
        description: "fdsafasdfasdfasdf",
        deleted_at: null
    }
]

const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategory(state, action) {
            state.push(action.payload);
        },
        updateCategory(state, action) {
            const index = state.findIndex((category) => category.id === action.payload.id);
            state[index] = action.payload;
        },
        deleteCategory(state, action) {
            const index = state.findIndex((category) => category.id === action.payload.id);

            state.splice(index, 1);
        },
    }
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find(category => category.id === id);

    return category || {
        id: "",
        name: "",
        description: "",
        is_active: false,
        deleted_at: null,
        created_at: "",
        updated_at: ""
    };
};

export default categoriesSlice.reducer;
export const {createCategory, updateCategory, deleteCategory} = categoriesSlice.actions;
export const {
    useGetCategoriesQuery,
    useDeleteCategoryMutation
} = categoriesApiSlice