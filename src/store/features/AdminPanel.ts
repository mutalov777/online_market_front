import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BaseURL} from "../store";

export interface AdminPanelData {
    today: Today
    data: ChartData[]
}

export interface ChartData {
    date: number,
    orderCount: number,
    user: number
}

export interface Today {
    orders: number,
    delivered: number,
    unDelivered: number
}

export interface AdminPanelState {
    data: AdminPanelData
}

export const initialState: AdminPanelState = {
    data: {
        data: [],
        today:{
            orders:0,
            delivered:0,
            unDelivered:0
        }
    }
}
export const AdminPanelSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            console.log(action.payload.data.data)
            if (action.payload.data.success) {
                state.data = action.payload.data.data
            }
        })
    }
})

export const getData = createAsyncThunk(
    "file/get-admin-panel-data",
    async (token: string) => {
        const response = await axios({
                url: BaseURL + '/file/get-admin-panel-data',
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