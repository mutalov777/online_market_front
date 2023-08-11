import {FaHome} from 'react-icons/fa';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {GiShoppingCart} from 'react-icons/gi';
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getProducts} from "../../store/features/Product";
import {CartCreateDTO, saveToCart} from "../../store/features/User";

function Products() {
    const {myProducts, count} = useAppSelector(({product: {products, count}}) => ({myProducts: products, count}))
    const token = useAppSelector(({user: {token}}) => token)
    const {category} = useParams()
    const [pagination, setPagination] = useState({
        page: 0, size: 15
    });
    const [activePage, setPage] = useState(1)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProducts({...pagination, category: '' + category, name: undefined}))
    }, [pagination])

    function nextPage() {
        let {page, size} = pagination
        if (count / size > (page + 1)) {
            setPagination({...pagination, page: pagination.page + 1})
        }
    }

    function prevPage() {
        let {page} = pagination
        if (page > 0) {
            setPagination({...pagination, page: page - 1})
        }
    }

    function setSize(even: any) {
        even.preventDefault()
        setPagination({...pagination, size: even.target.value})
    }

    function save(id: number) {
        if (token) {
            let data: CartCreateDTO = {productId: id, amount: 1}
            dispatch(saveToCart({data, token: token.accessToken}))
        }
    }

    let {page, size} = pagination
    return (
        <div className={'row col-md-10 offset-1 products'}>
            <div className="products-header">
                <FaHome/>
                <GrFormNext/>
                <div>Market</div>
                <GrFormNext/>
                <div>{category}</div>
            </div>
            <h2>{category}</h2>

            <div className="pagination-div pagination-inner">
                <div>
                    {activePage} to {size} of {count}
                </div>
                <div className="show">
                    <div>Show :
                        <select name="show" onChange={setSize}>
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div>Filter :
                        <select name="show">
                            <option value="15">Default</option>
                            <option value="25">Titles(A..Z)</option>
                            <option value="50">Titles(Z..A)</option>
                            <option value="100">Price(low - high)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="product-list">
                {(myProducts !== null && myProducts.length !== 0) ?
                    myProducts.map(({id, name, photo, price}) =>
                        <Link to={'' + id} className="product-card" key={id}>
                            <div className={'product-name'}>
                                <h6>
                                    {name}
                                </h6>
                            </div>
                           <div className={'product-cart-image'}> <img src={photo} alt=""/></div>
                            <div className="price">
                                <div>Price:
                                    <b>
                                        {
                                            price ?
                                                price > 9999 ?
                                                    price.toString().substring(0, 2) + ' ' + price.toString().substring(2) :
                                                    price.toString().substring(0, 1) + ' ' + price.toString().substring(1) : ''
                                        } UZS
                                    </b>
                                </div>
                                <GiShoppingCart className={'icon'} onClick={() => save(id)}/>
                            </div>
                        </Link>
                    ) :
                    <div className={'skeleton text-dark'}>
                        Products is not available yet
                    </div>
                }

            </div>

            <div className="pagination-div pagination-footer">
                <div className="pagination">
                    <button className={'pagination-item prev'} onClick={prevPage}>
                        <GrFormPrevious/>
                    </button>
                    <div className={(page + 1) === activePage ? 'pagination-item active' : 'pagination-item'}
                         onClick={() => setPage(page + 1)}
                         style={{display: (count / size >= (page + 1)) ? 'flex' : 'none'}}>
                        {page + 1}
                    </div>
                    <button className={(page + 2) === activePage ? 'pagination-item active' : 'pagination-item'}
                            onClick={() => setPage(page + 2)}
                            style={{display: (count / size >= (page + 2)) ? 'flex' : 'none'}}>
                        {page + 2}
                    </button>
                    <button className={(page + 3) === activePage ? 'pagination-item active' : 'pagination-item'}
                            onClick={() => setPage(page + 3)}
                            style={{display: (count / size >= (page + 3)) ? 'flex' : 'none'}}>
                        {page + 3}
                    </button>
                    <button className={'pagination-item next'} onClick={nextPage}>
                        <GrFormNext/>
                    </button>
                </div>
                <div>{activePage} to {size} of {count}</div>
            </div>
        </div>
    );
}

export function Dec() {
    const {dec} = useParams()
    return (
        <div className={'col-md-12 feedback'}>
            {dec}
        </div>
    )
}

export default Products;