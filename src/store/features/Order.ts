import {CartDTO} from "./Product";
import {UserDTO} from "./User";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BaseURL} from "../store";
import {toast} from "react-toastify";


export interface Order {
    carts: CartDTO[],
    owner: UserDTO,
    createdAt: string,
    delivered:boolean
    totalPrice: number
}

export interface OrderCreateDTO {
    ids: number[];
    totalPrice: number;
}

interface OrderState {
    orders: Order[],
    order: Order,
    isLoading: boolean,
    totalCount:number
}

const initialState: OrderState = {
    orders: [],
    order: {} as Order,
    isLoading: false,
    totalCount:0
}

export const OrderSlice = createSlice({
        initialState,
        name: 'order',
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(createOrder.fulfilled, (state, action) => {
                if (action.payload.data.success) {
                    toast.success('Order successfully placed')
                    state.isLoading = !state.isLoading
                } else {
                    toast.error(action.payload.data.error.message)
                }
            })

            builder.addCase(getOrders.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload.data.success) {
                    state.orders = action.payload.data.data
                    state.totalCount=action.payload.data.totalCount
                }
            })

            builder.addCase(saveDelivered.fulfilled, (state, action) => {
                if (action.payload.data.success)
                    toast.success("Order Delivered")
            })

            builder.addCase(getOrder.fulfilled, (state, action) => {
                if (action.payload.data.success)
                    state.order = action.payload.data.data
            })
        }
    }
)

export const createOrder = createAsyncThunk(
    "order/create",
    async ({data, token}: { data: OrderCreateDTO, token: string }) => {
        const response = await axios({
                url: BaseURL + '/order/create',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                data
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const getOrders = createAsyncThunk(
    "order/get-list",
    async ({token, page, size}: { token: string, page: number, size: number }) => {
        const response = await axios({
                url: BaseURL + '/order/get-list?page=' + page + '&size=' + size,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const getOrder = createAsyncThunk(
    "order/get",
    async ({token, id}: { token: string, id: number }) => {
        const response = await axios({
                url: BaseURL + '/order/get/' + id,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const saveDelivered = createAsyncThunk(
    "order/delivered",
    async ({token, id}: { token: string, id: number }) => {
        const response = await axios({
                url: BaseURL + '/order/delivered' + id,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)