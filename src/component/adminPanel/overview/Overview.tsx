import './overview.scss'
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts'
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getData} from "../../../store/features/AdminPanel";
import {getProducts} from "../../../store/features/Product";
import {getAllUser} from "../../../store/features/User";
import {getOrders} from "../../../store/features/Order";
import {getCategory} from "../../../store/features/Category";
import {AiOutlineReload} from "react-icons/ai";

function Overview() {
    const dispatch=useAppDispatch()
    const productCount=useAppSelector(({product:{count}})=>count)
    const userCount=useAppSelector(({user:{totalCount}})=>totalCount)
    const categoryCount=useAppSelector(({category:{totalCount}})=>totalCount)
    const orderCount=useAppSelector(({order:{totalCount}})=>totalCount)
    const data=useAppSelector(({admin:{data}})=>data)
    const token=useAppSelector(({user:{token}})=>token.accessToken)
    useEffect(()=>{
        dispatch(getData(token))
        dispatch(getProducts({page:0,size:1,category:undefined,name:undefined}))
        dispatch(getAllUser({page:0,size:1,token}))
        dispatch(getOrders({page:0,size:1,token}))
        dispatch(getCategory())
    },[])

    function reload(){
        dispatch(getData(token))
        dispatch(getProducts({page:0,size:1,category:undefined,name:undefined}))
        dispatch(getAllUser({page:0,size:1,token}))
        dispatch(getOrders({page:0,size:1,token}))
        dispatch(getCategory())
    }
    return (
        <div className={'overview'}>
            <div className="orders-header">
                <button title={'Reload Orders'} onClick={reload}><AiOutlineReload/></button>
            </div>
            <div className={'info'}>

                <div className={'info-item'}>
                    <h6>Products</h6>
                    <h3>{productCount}</h3>
                </div>

                <div className={'info-item'}>
                    <h6>Product Categories</h6>
                    <h3>{categoryCount}</h3>
                </div>

                <div className={'info-item'}>
                    <h6>Orders</h6>
                    <h3>{orderCount}</h3>
                </div>

                <div className={'info-item'}>
                    <h6>Employers</h6>
                    <h3>{userCount}</h3>
                </div>

            </div>
            <div className="diagram">
                <div className="diagram-card">
                    <div className={'diagram-header'}>
                        <div>
                            <h5>Last 7 days trends</h5>
                            <p>as of from a 28 february to 3 february 2023</p>
                        </div>
                        <div className={'legend'}>
                            <div><span className={'employer-line'}></span> Employers</div>
                            <div><span className={'order-line'}></span>    Orders</div>
                        </div>
                    </div>
                    <AreaChart width={740} height={380} data={data.data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#696262" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#696262" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type={'monotone'} dataKey={'order'} stroke={'#8884d8'} fillOpacity={1}
                              fill="url(#colorUv)"/>
                        <Area type={'monotone'} dataKey={'employers'} stroke={'#696262'} fillOpacity={1}
                              fill="url(#colorPv)"/>
                        <CartesianGrid stroke={'#ccc'} strokeDasharray="2 2"/>
                        <XAxis dataKey={'date'} rotate={1}/>
                        <YAxis orientation={'right'}/>
                        <Tooltip/>
                    </AreaChart>
                </div>
                <div className="additional-info">
                    <div className="additional-info-item">
                        <h6>Today's orders</h6>
                        <h3>{data.today.orders}</h3>
                    </div>

                    <div className="additional-info-item">
                        <h6>Delivered orders</h6>
                        <h3>{data.today.delivered}</h3>
                    </div>

                    <div className="additional-info-item">
                        <h6>Undelivered orders</h6>
                        <h3>{data.today.unDelivered}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview;