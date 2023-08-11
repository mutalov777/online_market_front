import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import {BaseURL} from "../store";

export interface ProductDTO {
    id: number
    name: string,
    price: number,
    description: string,
    count: number,
    photo: string,
    isCount: boolean,
    category: string

}

export interface CartDTO {
    id: number
    amount: number

    product: ProductDTO,
    checked:boolean,
    updatedAt:string
}

export interface ProductCreateDTO {
    name: string,
    price: string,
    description: string,
    count: number
    category: string
    photo: string,
    isCount: boolean
}

export interface ProductUpdateDTO {
    id: number
    name: string | undefined,
    price: number | undefined,
    description: string | undefined,
    count: number | undefined
    category: string | undefined,
    photo: string | undefined,
    isCount: boolean | undefined
}

interface ProductState {
    products: ProductDTO[],
    count: number,
    product: ProductDTO,
    isLoading: boolean
}

const productState: ProductState = {
    products: [],
    count: 0,
    product: {} as ProductDTO,
    isLoading: false,
}
export const ProductSlice = createSlice({
    name: 'product',
    initialState: productState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductDTO[]>) => {
            state.products = action.payload
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload.data.data
            console.log(action.payload.data.data)
            state.count = action.payload.data.totalCount
        })

        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload.data.data
        })

        builder.addCase(createProduct.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                toast.success('Product created Successfully')
                state.isLoading = !state.isLoading
            } else {
                toast.error(action.payload.data.error.message)
            }
        })

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                toast.success('Product updated Successfully')
                state.isLoading = !state.isLoading
            } else {
                toast.error(action.payload.data.error.message)
            }
        })

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                toast.success('Product deleted Successfully')
                state.isLoading = !state.isLoading
            } else {
                toast.error(action.payload.data.error.message)
            }
        })
    }
})

export const getProducts = createAsyncThunk(
    "product/getAll",
    async ({
               size,
               page,
               category,
               name
           }: { size: number, page: number, category: string | undefined, name: string | undefined }) => {
        let response
        if (name) {
            response = await fetch(
                BaseURL+"/product/get-list?page=" + page + '&size=' + size + '&name=' + name,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    }
                }
            )
        } else if (category) {
            response = await fetch(
                BaseURL+"/product/get-list?page=" + page + '&size=' + size + '&category=' + category,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    }
                }
            )
        } else {
            response = await fetch(
                BaseURL+"/product/get-list?page=" + page + '&size=' + size,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        let data = await response.json()
        if (response.status === 200) {
            return data;
        }
    }
)
export const getProduct = createAsyncThunk(
    "product/get",
    async ({id}: { id: string }) => {
        const response = await fetch(
            BaseURL+"/product/get/" + id,
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
export const createProduct = createAsyncThunk(
    "product/create",
    async ({data, token}: { data: ProductCreateDTO, token: string }) => {
        const response = await axios({
                url: BaseURL+'/product/create',
                method: 'POST',
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
export const updateProduct = createAsyncThunk(
    "product/update",
    async ({data, token}: { data: ProductUpdateDTO, token: string }) => {
        const response = await axios({
                url: BaseURL+'/product/update',
                method: 'PUT',
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
export const deleteProduct = createAsyncThunk(
    "product/delete",
    async ({id, token}: { id: number, token: string }) => {
        const response = await axios({
                url: BaseURL+'/product/delete/' + id,
                method: 'DELETE',
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
export const {} = ProductSlice.actions


