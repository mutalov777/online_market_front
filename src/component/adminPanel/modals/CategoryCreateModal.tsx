import {Modal} from "reactstrap";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {IoReloadCircleOutline} from "react-icons/io5";
import {clearPhoto, Photo, saveFile} from "../../../store/features/Picture";
import {CategoryCreateDTO, createCategory} from "../../../store/features/Category";

function CategoryCreateModal({open, toggle}: { open: boolean, toggle: any }) {
    const photo = useAppSelector(({photo: {photo}}) => photo)
    const token = useAppSelector(({user: {token}}) => token.accessToken)
    const dispatch = useAppDispatch()
    const [picture, setPicture] = useState<string>();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()

    function handleSubmit(even: any) {
        even.preventDefault()
        const name = even.target[1].value
        if (picture && name) {
            const data: CategoryCreateDTO = {name, photo: picture}
            dispatch(createCategory({data, token}))
            toggle()
            dispatch(clearPhoto())
        } else {
            console.log('chi')
            setError('Name or Photo must not empty')
        }
    }

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
        if (photo !== '') {
            setPicture(photo)
        }
    }, [photo])

    function onChangePicture(event: React.FormEvent) {
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
            <form id={'category'} onSubmit={handleSubmit} className={'category-modal'}>
                <small className={'text-danger'}>{error}</small>
                <label className={'photo'} htmlFor="photo">
                    <img
                        src={photo !== '' ? photo : 'https://t3.ftcdn.net/jpg/03/35/13/14/360_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg'}
                        alt=""/>
                    <IoReloadCircleOutline className={loading ? 'loading' : ''}/>
                </label>
                <input type="file" id={'photo'} style={{display: 'none'}} onChange={e => onChangePicture(e)}/>
                <div className={'input'}>
                    <label className={'category-label'} htmlFor="name">Name</label>
                    <input id={'name'} type="text" onChange={() => setError('')}/>
                </div>
                <div className={'py-2'}>
                    <button form={'category'} type={'submit'} className={'btn'}>Create</button>
                    <button type={'button'} className={'btn'} onClick={toggle}>Cansel</button>
                </div>
            </form>
        </Modal>
    )
}

export default CategoryCreateModal;