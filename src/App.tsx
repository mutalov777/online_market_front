import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {axiosInstance as axios, useAppDispatch, useAppSelector} from "./store/store";
import {getRefreshToken, getUser, setToken} from "./store/features/User";

import Nav from "./component/nav/Nav";
import ProductCategory from "./component/product/ProductCategory";
import Products, {Dec} from "./component/product/Products";
import Product from "./component/product/Product";
import Feedback from "./component/feedback/Feedback";
import Profile from "./component/profile/Profile";
import Cart from "./component/cart/Cart";
import Login from "./component/login/Login";
import AdminPanel from "./component/adminPanel/AdminPanel";
import Overview from "./component/adminPanel/overview/Overview";
import Categories from "./component/adminPanel/categories/Categories";
import PanelProducts from "./component/adminPanel/products/Products";
import Support from "./component/adminPanel/support/Support";
import Orders from "./component/adminPanel/order/Orders";
import Error from "./component/error/404"

function App() {
    const userRole = useAppSelector(({user: {user}}) => user.role)
    const {token, user} = useAppSelector(({user: {token, user}}) => ({token, user}))
    const refresh = useAppSelector(({user: {refresh}}) => refresh)
    const dispatch = useAppDispatch();
    let t = localStorage.getItem('token')

    axios.interceptors.request.use(request => {
        if (token.accessTokenExpiry < Date.now()) {
            console.log('token expired')
            dispatch(getRefreshToken(token.refreshToken))
        }
        return request
    })

    useEffect(() => {
        if (t !== null) {
            let localToken = JSON.parse(t);
            if (Date.now() < localToken.accessTokenExpiry) {
                dispatch(setToken(localToken))
            } else {
                localStorage.removeItem('token')
                dispatch((localToken.refreshToken))
            }
        }

    }, [])

    useEffect(() => {
        if (Date.now() >token.accessTokenExpiry) {
            dispatch(getRefreshToken(token.refreshToken))
        } else if (JSON.stringify(user) !== '{}') {
            dispatch(getUser({id: user.id, token: token.accessToken}))
        }
    }, [refresh])


    return (
        <div className="app">
            <Routes>
                <Route path={'/'} element={<Nav/>}>
                    <Route path={''}>
                        <Route index element={<ProductCategory/>}/>
                        <Route path={':category'}>
                            <Route index element={<Products/>}/>
                            <Route path={':id'} element={<Product/>}>
                                <Route path={'feedback'} element={<Feedback/>}></Route>
                                <Route path={':dec'} element={<Dec/>}></Route>
                                <Route path={'*'} element={<Error/>}/>
                            </Route>
                        </Route>
                        <Route path={'*'} element={<Error/>}/>
                    </Route>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'/feedback'} element={<div className={'col-md-6 offset-3'}><Feedback/></div>}/>
                </Route>
                <Route path={'/login'} element={<Login/>}></Route>
                {
                    userRole === 'ADMIN' ?
                        <Route path={'/admin-panel'} element={<AdminPanel/>}>
                            <Route path={''} element={<Overview/>}/>
                            <Route path={'categories'} element={<Categories/>}/>
                            <Route path={'products'} element={<PanelProducts/>}/>
                            <Route path={'orders'} element={<Orders/>}/>
                            <Route path={'support'} element={<Support/>}/>
                        </Route> : ''
                }
                <Route path={'*'} element={<Error/>}/>
            </Routes>
        </div>
    );
}

export default App;
