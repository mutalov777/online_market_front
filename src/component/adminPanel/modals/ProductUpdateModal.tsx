import {Modal} from "reactstrap";
import {ProductDTO, ProductUpdateDTO, updateProduct} from "../../../store/features/Product";
import {IoReloadCircleOutline} from "react-icons/io5";
import {clearNames, getCategoryByName} from "../../../store/features/Category";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {clearPhoto, Photo, saveFile} from "../../../store/features/Picture";

function ProductUpdateModal({open, product, toggle}: { open: boolean, product: ProductDTO, toggle: any }) {
    const photo = useAppSelector(({photo: {photo}}) => photo)
    const names = useAppSelector(({category: {names}}) => names)
    const token = useAppSelector(({user: {token}}) => token.accessToken)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')

    const [picture, setPicture] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [des, setDes] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [isCount, setIsCount] = useState<boolean | null>(null);

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
        if (photo !== '') {
            setPicture(photo)
        } else {
            setPicture(product.photo)
            setDes(product.description)
            setCount(product.count)
            setName(product.name)
            setCategory(product.category)
            setIsCount(product.isCount)
            setPrice(product.price)
        }
        setError('')
    }, [photo, open])

    function handleSubmit(even: React.FormEvent) {
        even.preventDefault()
        if (name && price && des && count && picture && category && isCount !== null) {
            let data: ProductUpdateDTO = {id: product.id} as ProductUpdateDTO
            if (name !== product.name)
                data = {...data, name}
            if (price !== product.price)
                data = {...data, price}
            if (des !== product.description)
                data = {...data, description: des}
            if (count !== product.count)
                data = {...data, count}
            if (picture !== product.photo)
                data = {...data, photo: picture}
            if (category !== product.category)
                data = {...data, category}
            if (isCount !== product.isCount)
                data = {...data, isCount}
            console.log(data)
            dispatch(updateProduct({data, token}))
            toggle()
            dispatch(clearPhoto())
            dispatch(clearNames())
        } else {
            setError('Input value must not empty')
        }
    }

    function onChangeCategory(even: string) {
        setCategory(even)
        if (even === '') {
            dispatch(getCategoryByName({name: 'w=', token}))
        } else {
            dispatch(getCategoryByName({name: even, token}))
        }
    }

    function handlePicture(event: React.FormEvent) {
        const files = (event.target as HTMLInputElement).files
        if (files && files.length > 0) {
            const formData = new FormData()
            formData.append('file', files[0])
            const data: Photo = {file: formData}
            dispatch(saveFile({data, token}))
            setLoading(true)
        }
    }

    return (
        <Modal isOpen={open} toggle={() => {
            toggle();
            dispatch(clearNames())
        }}>
            <form onSubmit={handleSubmit} className={'product-modal'}>
                <h6>Create Product</h6>
                <small className={'text-danger'}>{error}</small>
                <label className={'photo'} htmlFor="photo">
                    <img
                        src={picture !== '' ? picture : 'https://t3.ftcdn.net/jpg/03/35/13/14/360_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg'}
                        alt=""/>
                    <IoReloadCircleOutline className={loading ? 'loading' : ''}/>
                </label>
                <input type="file" id={'photo'} style={{display: 'none'}} onChange={e => handlePicture(e)}/>
                <div className={'input'}>
                    <label className={'category-label'} htmlFor="name">Name</label>
                    <input id={'name'} value={name} type="text" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={'input'}>
                    <label className={'category-label'} htmlFor="name">Category</label>
                    <input id={'name'} type="text" value={category}
                           onChange={(e) => onChangeCategory(e.target.value)}/>

                    <div className={'names'} style={{display: names.length === 0 ? 'none' : 'block'}}> {
                        names?.map((item, key) =>
                            <div onClick={() => {
                                setCategory(item)
                                dispatch(clearNames())
                            }} className={'names-item'} key={key}>{item}</div>
                        )
                    }</div>
                </div>
                <div className={'input price'}>
                    <label className={'category-label'} htmlFor="price">Price(UZS)</label>
                    <input id={'price'} value={price} type="number" onChange={(e) => setPrice(+e.target.value)}/>
                </div>
                <div className={'input'}>
                    <label className={'category-label'} htmlFor="des">Description</label>
                    <textarea id={'des'} value={des} onChange={(e) => setDes(e.target.value)}/>
                </div>
                <div className={'input price'}>
                    <label className={'category-label'} htmlFor="count">Count</label>
                    <input id={'count'} value={count} type="number" onChange={(e) => setCount(+e.target.value)}/>
                </div>
                <div className={'input select'}>
                    <label className={'category-label'} htmlFor="isCount">Product is counted ?</label>
                    <select name="isCount" value={isCount ? 'Yes' : 'No'} id="isCount"
                            onChange={(e) => setIsCount(e.target.value === 'Yes')}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className={'py-2 buttons'}>
                    <button type={'submit'} className={'btn'}>Create</button>
                    <button type={'button'} className={'btn'} onClick={() => {
                        toggle();
                        dispatch(clearNames())
                    }}>Cansel
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default ProductUpdateModal