import React, {useEffect, useState} from "react";
import {Table} from 'reactstrap'
import './categories.css'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {CategoryDTO, deleteCategory, getCategory} from "../../../store/features/Category";
import {AiFillDelete} from "react-icons/ai";
import {BsFillPenFill} from "react-icons/bs";
import CategoryModal from "../modals/CategoryModal";
import {IoIosAddCircle} from 'react-icons/io'
import CategoryCreateModal from "../modals/CategoryCreateModal";

function Categories() {
    const {categories, isCategoryLoading} = useAppSelector(({
                                                                category: {
                                                                    categories,
                                                                    isCategoryLoading
                                                                }
                                                            }) => ({categories, isCategoryLoading}))
    const token = useAppSelector(({user: {token}}) => token)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [openCreateModal, setCreateModal] = useState(false)
    const [category, setCategory] = useState({} as CategoryDTO)

    useEffect(() => {
            dispatch(getCategory())
    }, [isCategoryLoading])

    function update(e: CategoryDTO) {
        setOpen(prevState => !prevState)
        setCategory(e)
    }

    function categoryDelete(id: number) {
        dispatch(deleteCategory({id, token: token.accessToken}))
    }

    return (
        <div className={'panel-categories'}>
            <div className="category-header">
                <button onClick={() => setCreateModal(prevState => !prevState)}><IoIosAddCircle/></button>
            </div>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    categories?.map((item, key) =>
                        <tr key={item.id}>
                            <th scope="row">{key + 1}</th>
                            <td>
                                <img src={item.photo} alt=""/>
                            </td>
                            <td>{item.name}</td>
                            <td>
                                <div className="actions">
                                    <button onClick={() => update(item)}>
                                        <BsFillPenFill/>
                                    </button>
                                    <button onClick={() => categoryDelete(item.id)}>
                                        <AiFillDelete/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            {categories.length === 0 ?
                <div className={'skeleton'}>No Data</div> : <div></div>
            }
            <CategoryModal open={open} toggle={() => setOpen(!open)} category={category}/>
            <CategoryCreateModal open={openCreateModal} toggle={() => setCreateModal(!openCreateModal)}/>
        </div>
    )
}

export default Categories;