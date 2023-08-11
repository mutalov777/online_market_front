import {Table} from "reactstrap";
import React, {useEffect} from "react";
import './orders.scss'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getOrders} from "../../../store/features/Order";
import { AiOutlineReload } from "react-icons/ai";

function Orders() {
    const {orders, isLoading} = useAppSelector(({order: {orders, isLoading}}) => ({orders, isLoading}))
    const token = useAppSelector(({user: {token}}) => token.accessToken)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getOrders({page: 0, size: 200, token}))
    }, [isLoading])

    function reload(){
        dispatch(getOrders({page: 0, size: 200, token}))
    }
    return (
        <div className={'orders'}>
            <div className="orders-header">
                <button title={'Reload Orders'} onClick={reload}><AiOutlineReload/></button>
            </div>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Created Date</th>
                    <th>Customer</th>
                    <th>Money( UZS )</th>
                    <th>Product</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders?.map((item, key) =>
                        <tr key={key} title={'Click for More info...'}>
                            <td scope="row">{key + 1}</td>
                            <td className={'time'}>
                                {new Date(item.createdAt).toLocaleString()}
                            </td>
                            <td className={'owner'}>
                                {item.owner.fullName}
                                <p>+998948632001</p>
                            </td>
                            <td className={'price'}>{item.totalPrice} UZS</td>
                            <td>
                                {item.carts.map((item, key) =>
                                    <div className={'product'} key={key}>
                                        <div>{item.product.name}</div>
                                        <div>{item.amount}{item.product.isCount ? 'ta' : 'Kg'}</div>
                                    </div>
                                )}
                            </td>
                            <td>
                                <div className="actions">
                                    <button className={item.delivered?'delivered':'not-delivered'}>{item.delivered?'Delivered':'Not-delivered'}</button>
                                </div>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            {orders.length === 0 ?
                <div className={'skeleton'}>No Orders</div> : <div></div>
            }
        </div>
    )
}

export default Orders;