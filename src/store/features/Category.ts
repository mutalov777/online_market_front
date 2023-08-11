import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {BaseURL} from "../store";

export interface CategoryDTO {
    id: number
    name: string,
    photo: string,

}

export interface CategoryCreateDTO {
    name: string,
    photo: string,
}

export interface CategoryUpdateDTO {
    id: number
    name: string | null,
    photo: string | null,
}

interface CategoryState {
    names: string[]
    categories: CategoryDTO[],
    isCategoryLoading: boolean,
    isNamesLoading: boolean,
    totalCount:number
}

const userState: CategoryState = {
    names: [],
    categories: [],
    isCategoryLoading: false,
    isNamesLoading: false,
    totalCount:0
}
export const CategorySlice = createSlice({
    name: 'category',
    initialState: userState,
    reducers: {
        setCategories: (state, action: PayloadAction<CategoryDTO[]>) => {
            state.categories = action.payload
        },
        clearNames:(state)=>{
            state.names=[]
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<CategoryState>) => {
        builder.addCase(getCategory.fulfilled, (state, action) => {
            if (action.payload.data.success){
                state.categories = action.payload.data.data
                state.totalCount=action.payload.data.totalCount
            }
        })

        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categories?.push(action.payload.data.data)
        })

        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.categories?.map(item => {
                const {id, name, photo} = action.payload.data.data
                if (item.id === id) {
                    item.name = name
                    item.photo = photo
                }
            })
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.isCategoryLoading = !state.isCategoryLoading
            }
        })

        builder.addCase(getCategoryByName.fulfilled, (state, action) => {
            if (action.payload.data.success){
                state.names = action.payload.data.data
            }
        })
    }
})

export const getCategory = createAsyncThunk(
    "category/getAll",
    async () => {
        const response = await fetch(
            BaseURL+"/category/get-list",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
        let data = await response.json()
        if (response.status === 200) {
            return data;
        }
    }
)
export const updateCategory = createAsyncThunk(
    "category/update",
    async ({data, token}: { data: CategoryUpdateDTO, token: string }) => {
        const response = await axios({
                url: BaseURL+'/category/update',
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                data
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const createCategory = createAsyncThunk(
    "category/create",
    async ({data, token}: { data: CategoryCreateDTO, token: string }) => {
        const response = await axios({
                url: BaseURL+'/category/create',
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                data
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const deleteCategory = createAsyncThunk(
    "category/delete",
    async ({id, token}: { id: number, token: string }) => {
        const response = await axios({
                url: BaseURL+'/category/delete/' + id,
                method: 'delete',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const getCategoryByName = createAsyncThunk(
    "category/get-category-name",
    async ({name, token}: { name: string, token: string }) => {
        const response = await axios({
                url: BaseURL+'/category/get-category-name/' + name,
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const {clearNames} = CategorySlice.actions


