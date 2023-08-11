import {Modal} from "reactstrap";
import {IoReloadCircleOutline} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {clearPhoto, Photo, saveFile} from "../../../store/features/Picture";
import {clearNames, getCategoryByName} from "../../../store/features/Category";
import {createProduct, ProductCreateDTO} from "../../../store/features/Product";

function ProductCreateModal({open, toggle}: { open: boolean, toggle: any }) {
    const photo = useAppSelector(({photo: {photo}}) => photo)
    const names = useAppSelector(({category: {names}}) => names)
    const token = useAppSelector(({user: {token}}) => token.accessToken)
    const dispatch = useAppDispatch()
    const [picture, setPicture] = useState<string>();
    const [category, setCategory] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
        if (photo !== '') {
            setPicture(photo)
        }
    }, [photo])

    function handleSubmit(even: any) {
        even.preventDefault()
        const name = even.target[1].value
        const price = even.target[3].value
        const description = even.target[4].value
        const count = even.target[5].value
        const isCount = even.target[6].value
        if (name && price && description && count && isCount && picture && category) {
            const data: ProductCreateDTO = {name, price, description, count, isCount, photo: picture, category}
            dispatch(createProduct({data, token}))
            toggle()
            dispatch(clearPhoto())
        }else{
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
        setError('')
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
        <Modal isOpen={open} toggle={toggle}>
            <form onSubmit={handleSubmit} className={'product-modal'}>
                <h6>Create Product</h6>
                <small className={'text-danger'}>{error}</small>
                <label className={'photo'} htmlFor="photo">
                    <img
                        src={photo !== '' ? photo : 'https://t3.ftcdn.net/jpg/03/35/13/14/360_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg'}
                        alt=""/>
                    <IoReloadCircleOutline className={loading ? 'loading' : ''}/>
                </label>
                <input type="file" id={'photo'} style={{display: 'none'}} onChange={e => handlePicture(e)}/>
                <div className={'input'}>
                    <label className={'category-label'} htmlFor="name">Name</label>
                    <input id={'name'} type="text" onChange={() => setError('')}/>
                </div>
                <div className={'input'}>
                    <label className={'category-label'} htmlFor="name">Category</label>
                    <input id={'name'} type="text" value={category}
                           onChange={(e) => onChangeCategory(e.target.value)}/>
                    <div className={'names'} style={{display:names.length===0?'none':'block'}}> {
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
                    <input id={'price'} type="number" onChange={() => setError('')}/>
                </div>
                <div className={'input'}>
                    <label className={'category-label'} htmlFor="des">Description</label>
                    <textarea id={'des'} onChange={() => setError('')}/>
                </div>
                <div className={'input price'}>
                    <label className={'category-label'} htmlFor="count">Count</label>
                    <input id={'count'} type="number" onChange={() => setError('')}/>
                </div>
                <div className={'input select'}>
                    <label className={'category-label'} htmlFor="isCount">Product is counted ?</label>
                    <select name="isCount" id="isCount">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className={'py-2 buttons'}>
                    <button type={'submit'} className={'btn'}>Create</button>
                    <button type={'button'} className={'btn'} onClick={toggle}>Cansel</button>
                </div>
            </form>
        </Modal>
    )
}

export default ProductCreateModal;