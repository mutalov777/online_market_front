import {Link, Outlet, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import React, {useEffect, useState} from "react";
import {getProduct} from "../../store/features/Product";
import {CartCreateDTO, saveToCart} from "../../store/features/User";
import {FaHome} from "react-icons/fa";
import {GrFormNext} from "react-icons/gr";
import {AiOutlineHeart, AiOutlineStar} from "react-icons/ai";

export default function Product() {
    const {category, id} = useParams()
    const product = useAppSelector(({product: {product}}) => product)
    const token = useAppSelector(({user: {token}}) => token)
    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(0);

    const [social, setSocial] = useState('');
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (id) {
            dispatch(getProduct({id}))
        }
    }, [])

    useEffect(() => {
            setPrice(product.price * amount)
        }
        , [product, amount])

    function save(id: number) {
        if (token) {
            let data: CartCreateDTO = {productId: id, amount}
            dispatch(saveToCart({data, token: token.accessToken}))
        }
    }

    function changeOption(e: string, isCount: boolean) {
        if (!isCount) {
            if (e === 'increase' && amount >= 0) {
                setAmount((amount * 10 + 2) / 10);
            } else if ('reduce' && amount > 0) {
                setAmount((amount * 10 - 2) / 10);
            }
        } else {
            if (e === 'increase' && amount >= 0) {
                setAmount(prevState => prevState + 1)
            } else if ('reduce' && amount > 0) {
                setAmount(prevState => prevState - 1)
            }
        }
    }

    return (
        <div>
            {
                product ?
                    <div className={'col-md-10 offset-1 product'}>
                        <div className="product-header">
                            <FaHome/>
                            <GrFormNext/>
                            <div>Market</div>
                            <GrFormNext/>
                            <div>{category}</div>
                            <GrFormNext/>
                            <div>{product.name}</div>
                        </div>
                        <div className="product-item">
                            <div className="product-image">
                                <img
                                    src={product.photo}
                                    alt=""/>
                            </div>
                            <div className="product-des">
                                <h2>{product.name}({product.isCount ? ' 1 Piece ' : ' 1 KG '})</h2>
                                <div className={'review'}>
                                    <AiOutlineStar className={'star'}/>
                                    <AiOutlineStar className={'star'}/>
                                    <AiOutlineStar className={'star'}/>
                                    <AiOutlineStar className={'star'}/>
                                    <AiOutlineStar className={'star'}/>
                                    <button>Write a review</button>
                                </div>
                                <div className={'price'}>
                                    {
                                        price ?
                                            price > 9999 ?
                                                price.toString().substring(0, 2) + ' ' + price.toString().substring(2) :
                                                price.toString().substring(0, 1) + ' ' + price.toString().substring(1) : ''
                                    }
                                    UZS
                                </div>
                                <div className={'model'}>Model: <b> flamingo</b></div>
                                <div className={'model'}>In stock:<b> {product.count}</b></div>
                                <div className="options">
                                    <h3>Available Options:</h3>
                                    <p>Weight:</p>
                                    <div className={'option'}>
                                        <button onClick={() => changeOption('reduce', product.isCount)}>-</button>
                                        <span>{amount}{product.isCount ? '' : 'KG'}</span>
                                        <button onClick={() => changeOption('increase', product.isCount)}>+</button>
                                    </div>
                                </div>
                                <div className="others">
                                    <button>
                                        <AiOutlineHeart className={'icon'}/> to BookMarks
                                    </button>
                                    <button onClick={() => save(product.id)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="social">
                            <div className="social-header">
                                <Link to={product.description}
                                      className={social === 'Description' ? 'link active' : 'link'}
                                      onClick={() => setSocial('Description')}>Description
                                </Link>
                                <Link to={'feedback'} className={social === 'FeedBacks' ? 'active link' : 'link'}
                                      onClick={() => setSocial('FeedBacks')}>FeedBacks
                                </Link>
                            </div>
                        </div>
                    </div> : <div className={'skeleton'}>
                        Product is not available yet
                    </div>
            }
            <Outlet/>
        </div>
    )
}