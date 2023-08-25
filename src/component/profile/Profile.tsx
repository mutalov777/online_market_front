import './profile.scss'
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input/input";
import {AuthUserUpdateDTO, updateUser} from "../../store/features/User";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import {useNavigate} from "react-router-dom";


function Profile() {
    const {session, token} = useAppSelector(({user: {session, token}}) => ({session, token}))
    const [fullName, setFullName] = useState<string>('')
    const [phone, setPhone] = useState<string>()
    const [email, setEmail] = useState<string>('')
    const [oldPassword, setOld] = useState<string>('')
    const [newPassword, setNew] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [confirmPassword, setConfirm] = useState<string>('')
    const dispatch = useAppDispatch()
    const [oldShow, setOldShow] = useState<boolean>(false)
    const [newShow, setNewShow] = useState<boolean>(false)
    const [confirmShow, setConfirmShow] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!session)
            navigate('/login')
    })

    function handleChangePassword(e: any) {
        e.preventDefault()

    }

    function handleProfile(e: any) {

    }

    return (
        <div className={'col-md-10 offset-1 profile'}>
            <div className="profile-header">
                <h5>My Profile</h5>
            </div>
            <div className="profile-body">
                <div className="profile-menu">
                    <h6>Change Password</h6>
                    <form onSubmit={handleChangePassword}>
                        <small>Old Password</small>
                        <div>
                            <input autoComplete={'cc-number'} type={oldShow ? 'text' : 'password'}
                                   value={oldPassword}
                                   onChange={(e) => setOld(e.target.value)}
                                   placeholder={"Enter old Password"}/>
                            <button onClick={() => setOldShow(prevState => !prevState)}>{!oldShow ?
                                <AiFillEye className={'show-icon'}/> :
                                <AiFillEyeInvisible className={'show-icon'}/>}</button>
                        </div>
                        <small>New Password</small>
                        <div>
                            <input autoComplete={'cc-number'} type={newShow ? 'text' : 'password'} value={newPassword}
                                   onChange={(e) => setNew(e.target.value)}
                                   placeholder={"Enter new Password"}/>
                            <button onClick={() => setNewShow(prevState => !prevState)}>{!newShow ?
                                <AiFillEye className={'show-icon'}/> :
                                <AiFillEyeInvisible className={'show-icon'}/>}</button>
                        </div>

                        <small>Confirm new Password</small>

                        <div>
                            <input autoComplete={'cc-number'} type={confirmShow ? 'text' : 'password'}
                                   value={confirmPassword}
                                   onChange={(e) => setConfirm(e.target.value)}
                                   placeholder={"Enter confirm Password"}/>
                            <button onClick={() => setConfirmShow(prevState => !prevState)}>{!confirmShow ?
                                <AiFillEye className={'show-icon'}/> :
                                <AiFillEyeInvisible className={'show-icon'}/>}</button>
                        </div>
                        <small className={'text-danger'}>{error}</small>
                        <button type={'submit'}>Send</button>
                    </form>
                </div>
                <div className="profile-data">
                    <h6>My profile</h6>
                    <form onSubmit={handleProfile}>
                        <small>Full Name</small>
                        <input type="text" id={'fullName'} onChange={(e) => setFullName(e.target.value)}
                               placeholder={'Full Name'} value={fullName}/>
                        <small>Phone Number</small>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone}/>
                        <small>Email</small>
                        <input type="email" placeholder={'email'} onChange={(e) => setEmail(e.target.value)}
                               value={email}/>
                        <button type={'submit'}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;
