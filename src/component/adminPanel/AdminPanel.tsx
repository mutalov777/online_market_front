import './admin.scss'
import React, {useEffect, useState} from "react";
import {MdDashboard, MdOutlineCategory} from 'react-icons/md';
import {ImLeaf} from 'react-icons/im';
import {GoPackage} from 'react-icons/go';
import {BsPieChartFill} from 'react-icons/bs';
import {BiSupport} from 'react-icons/bi';
import {IoIosNotifications} from 'react-icons/io';
import {FaUserAlt} from "react-icons/fa";
import {AiFillHome, AiOutlineSearch} from "react-icons/ai";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store/store";

function AdminPanel() {
    const [active, setActive] = useState('')
    const navigate=useNavigate()
    const user=useAppSelector(({user:{user}})=>user)
    useEffect(()=>{
        if (JSON.stringify(user)==='{}'){
            navigate("/login")
        }
    },[user])
    return (
        <div className={'panel'}>
            <div className="panel-menu">
                <div className="panel-header">
                    <MdDashboard className={'panel-icon'}/>
                    Dashboard kit
                </div>
                <Link onClick={() => setActive('gd')} className={active === 'dg' ? 'panel-menu-item active' : 'panel-menu-item'} to={'/'}>
                    <AiFillHome/>
                    <div>Home</div>
                </Link>

                <Link onClick={() => setActive('')} to={''} className={active === '' ? 'panel-menu-item active' : 'panel-menu-item'}>
                    <BsPieChartFill/>
                    <div>Overview</div>
                </Link>
                <Link onClick={() => setActive('Categories')} className={active === 'Categories' ? 'panel-menu-item active' : 'panel-menu-item'} to={'categories'}>
                    <MdOutlineCategory/>
                    <div>Categories</div>
                </Link>
                <Link onClick={() => setActive('Products')} className={active === 'Products' ? 'panel-menu-item active' : 'panel-menu-item'} to={'products'}>
                    <ImLeaf/>
                    <div>Products</div>
                </Link>
                <Link onClick={() => setActive('Orders')} className={active === 'Orders' ? 'panel-menu-item active' : 'panel-menu-item'} to={'orders'}>
                    <GoPackage/>
                    <div>Orders</div>
                </Link>
                <Link onClick={() => setActive('Support')} className={active === 'Support' ? 'panel-menu-item active' : 'panel-menu-item'} to={'support'}>
                    <BiSupport/>
                    <div>Support</div>
                </Link>
            </div>

            <div className="panel-right">
                <div className="panel-nav">
                    <div className={'panel-name'}>{active===''?'Overview':active}</div>
                    <div className="panel-search">
                        <input type="search" id='admin-search'/>
                        <label htmlFor="admin-search">
                            <AiOutlineSearch/>
                        </label>
                    </div>
                    <div className="notification">
                        <IoIosNotifications/>
                    </div>
                    <div className="admin">
                        Jasur Mutalov
                        <div>
                            <FaUserAlt/>
                        </div>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminPanel;