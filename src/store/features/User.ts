import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartDTO} from "./Product";
import {axiosInstance as axios, BaseURL} from "../store";
import {toast} from "react-toastify";
import {MessageShortDTO} from "./Message";

import {Configuration, FrontendApi} from "@ory/kratos-client";
import {Session} from "@ory/kratos-client";

export const Config = {
    auth: {
        publicURL:
            process.env.REACT_APP_KRATOS_PUBLIC_URL || "http://localhost:4000/.ory"
    }
};
export const ory = new FrontendApi(
    new Configuration({
        basePath: Config.auth.publicURL,
        baseOptions: {
            withCredentials: true
        }
    })
);

export interface AuthUserDTO {
    id: number,
    fullName: string,
    email: string,
    role: string,
    phone: string
    carts: CartDTO[]
}

export interface AuthUserUpdateDTO {
    id: number,
    fullName: string | null,
    email: string | null,
    oldPassword: string | null,
    newPassword: string | null,
    phone: string | null
}

export interface UserDTO {
    id: number
    fullName: string,
    phone: string
}

export interface UserCreateDTO {
    fullName: string,
    email: string,

    password: string
}

export interface LoginDTO {
    email: string,
    password: string
}

export interface SessionDTO {
    user: AuthUserDTO,
    accessTokenExpiry: number,

    refreshTokenExpiry: number,

    issuedAt: number,

    accessToken: string,

    refreshToken: string,
}

interface UserState {
    users: AuthUserDTO[]
    user: AuthUserDTO,
    token: SessionDTO,
    session: Session | undefined,
    logoutUrl: string | undefined
    onlineUsers: MessageShortDTO[]
    isLoading: boolean
    refresh: boolean,
    totalCount: number
}

export interface CartCreateDTO {
    amount: number

    productId: number
}

export interface CartUpdateDTO {
    id: number,
    amount: number | null,
    checked: boolean | null
}

const userState: UserState = {
    onlineUsers: [],
    users: [],
    user: {} as AuthUserDTO,
    token: {} as SessionDTO,
    session: undefined,
    logoutUrl: undefined,
    isLoading: false,
    refresh: false,
    totalCount: 0
}


export const UserSlice = createSlice({
    initialState: userState,
    name: 'user',
    reducers: {
        clearUser: (state) => {
            state.user = {} as AuthUserDTO
            state.token = {} as SessionDTO
        },
        setToken: (state, action: PayloadAction<SessionDTO>) => {
            state.token = action.payload
            state.user = action.payload.user
        },
        setSession: (state, action: PayloadAction<Session>) => {
            state.session=action.payload
        },
        setLogoutUrl: (state, action: PayloadAction<string>) => {
           state.logoutUrl=action.payload
        }

    },
    extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {

        builder.addCase(getUser.fulfilled, (state, action) => {
            if (action.payload?.data.success) {
                state.user = action.payload.data.data

            } else {
                state.user = {} as AuthUserDTO
                state.token = {} as SessionDTO
                localStorage.clear()
            }
        })

        builder.addCase(getUser.rejected, (state, action) => {
            console.log(action.payload)
        })

        builder.addCase(createUser.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.user = action.payload.data.data
                toast.info("Successfully registered")
            }
        })

        builder.addCase(updateUser.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.user = action.payload.data.data
                toast.info("Successfully updated")
            }
        })

        builder.addCase(getAllUser.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.users = action.payload.data.data
                state.totalCount = action.payload.data.totalCount
            }
        })

        builder.addCase(saveToCart.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.user = action.payload.data.data
                toast.info("Product saved to card")
                state.isLoading = !state.isLoading
            } else {
                toast.error('Bad Request')
            }
        })

        builder.addCase(getAccessToken.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.token = action.payload.data.data
                state.user = action.payload.data.data.user
                localStorage.setItem('token', JSON.stringify(action.payload.data.data))
                toast.info('Successfully login')
            } else {
                toast.error('Bad Request')
            }
        })

        builder.addCase(getRefreshToken.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.token = action.payload.data.data
                localStorage.setItem('token', JSON.stringify(action.payload.data.data))
            }
        })

        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.isLoading = !state.isLoading
                state.isLoading = !state.isLoading
            }
        })

        builder.addCase(saveDelivered.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                toast.success('Request Successfully')
            } else {
                toast.error('Request Failed')
            }
        })

        builder.addCase(changeCartProduct.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.user = action.payload.data.data
            } else {
                toast.error('Request Failed')
            }
        })

        builder.addCase(selectAllCart.fulfilled, (state, action) => {
            if (action.payload.data.success)
                state.isLoading = !state.isLoading
            else
                toast.error('Request Failed')
        })

        builder.addCase(getOnlineUsers.fulfilled, (state, action) => {
            if (action.payload.data.success) {
                state.onlineUsers = action.payload.data.data
                state.isLoading = !state.isLoading
            }
        })


    }
})
export const {setToken, clearUser,setSession,setLogoutUrl} = UserSlice.actions
export const getUser = createAsyncThunk(
    "auth/get",
    async ({id, token}: { id: number, token: string }) => {
        const response = await axios(
            {
                url: BaseURL + "/auth/get/" + id,
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
        if (response.status === 403) {
            console.log('Response rejected')
            return response.data
        }
    }
)

export const createUser = createAsyncThunk(
    "auth/create",
    async (data: UserCreateDTO) => {
        const response = await axios({
                url: BaseURL + '/auth/create',
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                data
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const updateUser = createAsyncThunk(
    "auth/update",
    async ({data, token}: { token: string, data: AuthUserUpdateDTO }) => {
        const response = await axios({
                url: BaseURL + '/auth/update',
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

export const getAllUser = createAsyncThunk(
    "auth/get-list",
    async ({page, size, token}: { page: number, size: number, token: string }) => {
        const response = await axios({
                url: BaseURL + '/auth/get-list?page=' + page + '&size=' + size,
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
export const saveToCart = createAsyncThunk(
    "auth/save-to-cart",
    async ({data, token}: { data: CartCreateDTO, token: string }) => {
        const response = await axios({
                url: BaseURL + '/auth/save-to-cart',
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
export const removeFromCart = createAsyncThunk(
    "auth/remove-to-cart",
    async ({id, token}: { id: number, token: string }) => {
        const response = await axios({
                url: BaseURL + '/auth/remove-from-cart/' + id,
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

export const getAccessToken = createAsyncThunk(
    "auth/access-token",
    async (data: LoginDTO) => {
        const response = await axios({
                url: BaseURL + '/auth/access-token',
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                data
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)

export const getRefreshToken = createAsyncThunk(
    "auth/refresh-token",
    async (token: string) => {
        const response = await axios({
                url: BaseURL + '/auth/refresh-token',
                method: 'get',
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)

export const saveDelivered = createAsyncThunk(
    "auth/saveDelivered",
    async ({token, id}: { token: string, id: number }) => {
        const response = await axios({
                url: BaseURL + '/auth/save-delivered/' + id,
                method: 'get',
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const changeCartProduct = createAsyncThunk(
    "auth/change-cart-product",
    async ({token, data}: { token: string, data: CartUpdateDTO }) => {
        const response = await axios({
                url: BaseURL + '/auth/change-cart-product',
                method: 'PUT',
                headers: {
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
export const selectAllCart = createAsyncThunk(
    "auth/select-all-cart",
    async ({token, select}: { token: string, select: boolean }) => {
        const response = await axios({
                url: BaseURL + '/auth/select-all-cart/' + select,
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)
export const getOnlineUsers = createAsyncThunk(
    "auth/online-users",
    async (token: string) => {
        const response = await axios({
                url: BaseURL + '/auth/online-users',
                method: 'get',
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        )
        if (response.status === 200) {
            return response.data;
        }
    }
)