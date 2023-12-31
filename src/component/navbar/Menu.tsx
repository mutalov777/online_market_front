import React, {useEffect, useState} from 'react';
import {BsTelephoneFill} from 'react-icons/bs'
import {IoCartOutline} from 'react-icons/io5'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaUserAlt} from 'react-icons/fa'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle,} from 'reactstrap';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {clearUser, getUser} from "../../store/features/User";
import {getProducts} from "../../store/features/Product";
import {useTranslation} from "react-i18next";
import nav from "../nav/Nav";


function Menu() {
    const {user, token} = useAppSelector(({user: {user, token}}) => ({token, user}))
    const userRole = useAppSelector(({user: {user}}) => user.role)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [language, setLanguage] = useState('uz');
    const {t,i18n} = useTranslation()

    useEffect(() => {
            if (JSON.stringify(user) !== '{}' && JSON.stringify(token) !== '{}')
                dispatch(getUser({token: token.accessToken, id: user.id}))
        }
        , [token])

    function toggle() {
        setDropdownOpen(!dropdownOpen)
    }

    function HandleSearch(e: any) {
        e.preventDefault()
        let value = e.target[0].value;
        dispatch(getProducts({page: 0, size: 15, category: undefined, name: value}))
        navigate('/' + value)
    }

    function changeLanguage(lan: string) {
        setLanguage(lan)
        i18n.changeLanguage(lan).then(r => r)
    }

    return (
        <nav className={'menu'}>
            <div className="container-inner">
                <div className="row line col-md-10 offset-1">
                    <div className={'box box-right'}>
                        <div className="phone">
                            <a href="tel:+998947770707">+998947770707</a>
                            <div className={'phone-icon'}>
                                <BsTelephoneFill/>
                            </div>
                        </div>
                        <div className="language">
                            <div className={language === 'uz' ? '' : 'active'} onClick={() => changeLanguage('uz')}><img
                                src="https://media.istockphoto.com/id/967650550/vector/uzbekistan-flag.jpg?s=612x612&w=0&k=20&c=jzPJYCd2GnqkUqOxQVUbEFnGBleYQooPH72Kn0MnR5k="
                                alt=""/></div>
                            <div className={language === 'ru' ? '' : 'active'} onClick={() => changeLanguage('ru')}><img
                                src="https://cdn.britannica.com/42/3842-004-F47B77BC/Flag-Russia.jpg" alt=""/></div>
                        </div>
                        <div className="account">
                            {(JSON.stringify(user) === '{}') ? <Link to={'/login'} className={'login'}>Login</Link> :
                                <Dropdown className={'account-dropdown'} isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle className={'account-dropdown-toggle'} caret>
                                        <div>
                                            <FaUserAlt/>
                                        </div>
                                        {user?.fullName}
                                    </DropdownToggle>
                                    <DropdownMenu className={'account-dropdown-menu'}>
                                        <DropdownItem className={'account-dropdown-item'}>
                                            <Link to={'/profile'}>{t("profile")}</Link>
                                        </DropdownItem>
                                        {
                                            userRole === 'ADMIN' ?
                                                <DropdownItem className={'account-dropdown-item'}>
                                                    <Link to={'admin-panel'}>{t("admin-panel")}</Link>
                                                </DropdownItem> :
                                                ''
                                        }
                                        <DropdownItem className={'account-dropdown-item'}>
                                            <Link to={'login'} onClick={() => dispatch(clearUser())}>{t("logout")}</Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            }
                        </div>
                    </div>
                </div>

                <div className="row col-md-10 offset-1">
                    <div className="box-bottom">
                        <div className="brand">
                            Online Market
                        </div>
                        <div className="search">
                            <form onSubmit={HandleSearch}>
                                <input type="search" placeholder={''+t("search")}/>
                                <button aria-label={'search'} type="submit"><AiOutlineSearch/></button>
                            </form>
                        </div>
                        <Link to={'/cart'} className={'box-bottom-icon'}>
                            <div className={'count'}>{JSON.stringify(user) !== '{}' ? user.carts.length : 0}</div>
                            <IoCartOutline className={'icon'}/>{t("cart")}
                        </Link>
                    </div>
                </div>
            </div>
            <BottomMenu/>
        </nav>
    );
}

export function BottomMenu() {
    const {t} = useTranslation()
    return <div className={'menu-bottom'}>
        <div><Link to="/">{t("menu")}</Link></div>
        <div><Link to="#">{t("how to buy")}</Link></div>
        <div><Link to="#">{t("faq")}</Link></div>
        <div><Link to="#">{t("term to use")}</Link></div>
        <div><Link to="#">{t("contact")}</Link></div>
    </div>
}

export default Menu;