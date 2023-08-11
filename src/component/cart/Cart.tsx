import {IoCartOutline} from "react-icons/io5";
import {GiCancel} from "react-icons/gi";
import {RiDeleteBinLine} from "react-icons/ri";
import {TbShoppingCartX} from "react-icons/tb";
import {MdNavigateNext} from "react-icons/md";
import {FaCheck} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useEffect, useState} from "react";
import {CartDTO} from "../../store/features/Product";
import {CartUpdateDTO, changeCartProduct, getUser, removeFromCart, selectAllCart} from "../../store/features/User";
import {createOrder, OrderCreateDTO} from "../../store/features/Order";
import {useTranslation} from "react-i18next";

function Cart() {
    let user = useAppSelector(({user: {user}}) => user)
    let token = useAppSelector(({user: {token}}) => token.accessToken)
    let isLoading = useAppSelector(({user: {isLoading}}) => isLoading)
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (JSON.stringify(user) !== '{}') {
            let a = 0
            user.carts.map(cart => {
                if (cart.checked)
                    a = a + cart.product.price * cart.amount
            })
            setPrice(a)
            setCount(user.carts.length)
        } else {
            navigate('/login')
        }
    }, [user])

    useEffect(() => {
        if (JSON.stringify(user) !== '{}' && JSON.stringify(token) !== '{}')
            dispatch(getUser({id: user.id, token}))
    }, [isLoading])

    function changeAmount(e: string, cart: CartDTO) {
        let data: CartUpdateDTO = {} as CartUpdateDTO
        if (JSON.stringify(user) !== '{}') {
            if (cart.product.isCount) {
                if (e === '+') {
                    data = {id: cart.id, amount: cart.amount + 1, checked: null}
                } else if (e === '-' && cart.amount > 0) {
                    data = {id: cart.id, amount: cart.amount - 1, checked: null}
                }
            } else {
                if (e === '+') {
                    data = {id: cart.id, amount: (cart.amount * 10 + 2) / 10, checked: null}
                } else if (e === '-' && cart.amount > 0) {
                    data = {id: cart.id, amount: (cart.amount * 10 - 2) / 10, checked: null}
                }
            }
            dispatch(changeCartProduct({data, token}))
        }
    }

    function close() {
        navigate(-1);
    }

    function changeChooseOption(cart: CartDTO) {
        let data: CartUpdateDTO;
        if (cart.checked)
            data = {id: cart.id, checked: false, amount: null}
        else
            data = {id: cart.id, checked: true, amount: null}
        dispatch(changeCartProduct({token, data}))
    }

    function handleRemove(id: number) {
        dispatch(removeFromCart({id, token}))
    }

    function handleCheckOut() {
        let ids: number[] = []
        if (JSON.stringify(user) !== '{}') {
            user.carts.map(cart => {
                if (cart.checked) {
                    ids.push(cart.id)
                }
            })
            if (ids.length !== 0) {
                const data: OrderCreateDTO = {totalPrice: price, ids}
                dispatch(createOrder({data, token}))
            }
        }

        navigate(-1)
    }
    function removeCheckedCart(){
        user.carts.map(item=>{
            if (item.checked){
                dispatch(removeFromCart({id:item.id,token}))
            }
        })
    }

    return (
        <div className={'cart'}>
            <div className="cart-overlay" onClick={close}></div>
            <div className="cart-container">
                <div className="cart-header">
                    <IoCartOutline className={'icon'}/>
                    <small>{t("cart")}</small>
                    <GiCancel className={'cancel'} onClick={close}/>
                </div>
                <div className={'price'}>
                    <small>{price}</small>
                    <small> UZS</small>
                    <p>{t('amount')}</p>
                </div>
                <div className={'buttons'}>
                    <div className="button">
                        <input type="checkbox" id={'all'}
                               onChange={(e) => dispatch(selectAllCart({token, select: e.target.checked}))}/>
                        <label htmlFor={'all'}></label>
                        {t("choose all")}
                    </div>
                    <div className="button" onClick={removeCheckedCart}>
                        <RiDeleteBinLine/> {t("delete")}
                    </div>
                </div>
                <div className={'cart-body'}>
                    <h4>{t("total")}: {count}</h4>
                    {JSON.stringify(user) !== '{}' ?
                        user.carts.map((item, key) =>
                            <div className="cart-product" key={key}>
                                <input type="checkbox" id={'product' + item.id}
                                       value={item.product.name}
                                       onClick={() => changeChooseOption(item)}
                                       checked={item.checked}/>
                                <label htmlFor={"product" + item.id}><FaCheck
                                    className={'check'}/></label>
                                <div className={'option'}>
                                    <button onClick={() => changeAmount('+', item)}>+</button>
                                    <div>{item.amount}</div>
                                    <button onClick={() => changeAmount('-', item)}>-</button>
                                </div>
                                <img
                                    src={item.product.photo}
                                    alt=""/>
                                <div>
                                    <div>{item.product.name}</div>
                                    <div>{item.product.price} UZS</div>
                                </div>
                                <TbShoppingCartX className={'cartX'} onClick={() => handleRemove(item.id)}/>
                            </div>) :
                        <div className={'skeleton'}>
                            Carts is empty
                        </div>
                    }

                    <button className={'send'} onClick={handleCheckOut}>
                        {t("checkout")}: {price} UZS
                        <MdNavigateNext className={'next'}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;