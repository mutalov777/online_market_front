import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserDTO} from "./User";
import axios from "axios";
import {BaseURL} from "../store";

export interface MessageDTO {
    to: UserDTO,
    from: UserDTO,
    text: string,
    updatedAt: string,
    view: boolean
}

export interface MessageShortDTO {
    messageCount: number,
    userId: number,
    fullName: string
}

export interface MessageCreateDTO {
    to: number,
    text: string
}

export interface MessageUpdateDTO {
    id: number
    text: string
}

interface MessageState {
    userMessages: MessageDTO[],
    messages: MessageShortDTO[],
    isLoading: boolean
}

const initialState: MessageState = {
    userMessages: [],
    messages: [],
    isLoading: false
}
export const MessageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createMessage.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.isLoading = !state.isLoading
            }
        })

        builder.addCase(updateMessage.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.isLoading = !state.isLoading
            }
        })

        builder.addCase(deleteMessage.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.isLoading = !state.isLoading
            }
        })

        builder.addCase(getAllMessages.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.messages = action.payload.data.data
                state.isLoading=!state.isLoading
            }
        })


        builder.addCase(getUserMessage.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.userMessages = action.payload.data.data
            }
        })

        builder.addCase(getBySearch.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.userMessages = action.payload.data.data
            }
        })
    }
})

export const createMessage = createAsyncThunk(
    "message/create",
    async ({data, token}: { data: MessageCreateDTO, token: string }) => {
        const response = await axios({
                url: BaseURL + '/message/create',
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
export const updateMessage = createAsyncThunk(
    "message/update",
    async ({data, token}: { data: MessageUpdateDTO, token: string }) => {
        const response = await axios({
                url: BaseURL + '/message/update',
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
export const deleteMessage = createAsyncThunk(
    "message/delete",
    async ({id, token}: { id: number, token: string }) => {
        const response = await axios({
                url: BaseURL + '/message/delete/' + id,
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
export const getAllMessages = createAsyncThunk(
    "message/get-list",
    async (token: string) => {
        let response = await axios({
                url: BaseURL + '/message/get-list',
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
export const getUserMessage = createAsyncThunk(
    "message/get",
    async ({id, token}: { id: number, token: string }) => {
        const response = await axios({
                url: BaseURL + '/message/get/' + id,
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
export const getBySearch = createAsyncThunk(
    "message/get-by-text",
    async ({text, token}: { text: string, token: string }) => {
        const response = await axios({
                url: BaseURL + '/message/get-by-text/' + text,
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
