import {configureStore} from "@reduxjs/toolkit";
import {UserSlice} from "./features/User";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";
import {CategorySlice} from "./features/Category";
import {ProductSlice} from "./features/Product";
import {PictureSlice} from "./features/Picture";
import {OrderSlice} from "./features/Order";
import {MessageSlice} from "./features/Message";
import {AdminPanelSlice} from "./features/AdminPanel";
import axios from "axios";

export const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        category: CategorySlice.reducer,
        product: ProductSlice.reducer,
        photo: PictureSlice.reducer,
        order: OrderSlice.reducer,
        message: MessageSlice.reducer,
        admin: AdminPanelSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
setupListeners(store.dispatch)
export const BaseURL = 'http://localhost:8080/api'
export const axiosInstance = axios.create()

