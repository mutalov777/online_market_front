import {IoIosAddCircle} from "react-icons/io";
import {Table} from "reactstrap";
import {BsFillPenFill} from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {deleteProduct, getProducts, ProductDTO} from "../../../store/features/Product";
import ProductUpdateModal from "../modals/ProductUpdateModal";
import ProductCreateModal from "../modals/ProductCreateModal";
import './products.scss'

function PanelProducts() {
    const {products, isLoading} = useAppSelector(({product: {products, isLoading}}) => ({isLoading, products}))
    const token=useAppSelector(({user:{token}})=>token.accessToken)
    const [update, setUpdate] = useState<boolean>(false)
    const [create, setCreate] = useState<boolean>(false)
    const [product, setProduct] = useState({} as ProductDTO)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getProducts({page: 0, size: 20, category: undefined, name: undefined}))
    }, [isLoading])

    function updateProduct(product: ProductDTO) {
        setUpdate(!update)
        setProduct(product)
    }

    function deleteP(id: number) {
        if (id) {
            dispatch(deleteProduct({id,token}))
        }
    }

    return (
        <div className={'panel-products'}>
            <div className="panel-products-header">
                <button onClick={() => setCreate(prevState => !prevState)}><IoIosAddCircle/></button>
            </div>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>price</th>
                    <th>description</th>
                    <th>count</th>
                    <th>Piece or KG</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    products?.map((item, key) =>
                        <tr key={item.id}>
                            <th scope="row">{key + 1}</th>
                            <td>
                                <img src={item.photo} alt=""/>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>{item.count}</td>
                            <td>{item.isCount ? 'PIECE' : 'KG'}</td>
                            <td>{item.category}</td>
                            <td>
                                <div className="actions">
                                    <button onClick={() => updateProduct(item)}>
                                        <BsFillPenFill/>
                                    </button>
                                    <button onClick={() => deleteP(item.id)}>
                                        <AiFillDelete/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            {products.length === 0 ?
                <div className={'skeleton'}>No Data</div> : <div></div>
            }
            <ProductUpdateModal open={update} toggle={() => setUpdate(!update)} product={product}/>
            <ProductCreateModal open={create} toggle={() => setCreate(!create)}/>
        </div>
    )
}

export default PanelProducts;