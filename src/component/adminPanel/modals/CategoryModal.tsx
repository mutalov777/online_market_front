import React, {useEffect, useState} from "react";
import {Modal} from "reactstrap";
import {CategoryDTO, CategoryUpdateDTO, updateCategory} from "../../../store/features/Category";
import './modals.scss'
import {useAppDispatch, useAppSelector} from "../../../store/store";

function CategoryModal({open, toggle, category}: { open: boolean, category: CategoryDTO, toggle: any }) {
    const [name, setName] = useState('')
    const token = useAppSelector(({user: {token}}) => token)
    const [picture, setPicture] = useState<File>();
    const dispatch = useAppDispatch()


    function onChangePicture(event: React.FormEvent) {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            setPicture(files[0])
        }
    }

    useEffect(() => {
        setName(category.name);
    }, [open])

    function handleSubmit(e: any) {
        e.preventDefault()
        if (category.name !== name) {
            let data: CategoryUpdateDTO = {id: category.id, name,photo:null}
            dispatch(updateCategory({data, token: token.accessToken}))
            toggle()
        }


    }

    return (
        <Modal isOpen={open} toggle={toggle}>
            <form onSubmit={handleSubmit} className={'category-modal'}>
                <label className={'photo'} htmlFor="photo">
                    <small>Change picture</small>
                    <img src={category.photo} alt=""/>
                </label>
                <input type="file" id={'photo'} style={{display: 'none'}} onChange={e => onChangePicture(e)}/>
                <div className={'input'}>
                    <label className={'category-label'} htmlFor="name">Name</label>
                    <input id={'name'} type="text" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className={'py-2'}>
                    <button type={'submit'} className={'btn'}>Update</button>
                    <button className={'btn'} onClick={toggle}>Cansel</button>
                </div>
            </form>
        </Modal>
    )
}

export default CategoryModal;