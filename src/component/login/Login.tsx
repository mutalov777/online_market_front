import React, {useEffect} from "react";
import './login.scss'
import {createUser, getAccessToken, LoginDTO, UserCreateDTO} from "../../store/features/User";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


function Login() {
    const token = useAppSelector(({user: {token}}) => token)
    const user = useAppSelector(({user: {user}}) => user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        if (token.accessToken && JSON.stringify(user)!=='{}') {
            navigate('/')
        }
    }, [token])

    async function handleRegister(e: any) {
        e.preventDefault()
        let fullName = e.target[0].value
        let email = e.target[1].value
        let password = e.target[2].value

        const data: UserCreateDTO = {
            fullName, email, password
        }
        if (fullName && email && password) {
            dispatch(createUser(data))
        } else {
            toast.error('Please fill all input field!')
        }
    }

    async function handleLogin(e: any) {
        e.preventDefault()
        let email = e.target[0].value
        let password = e.target[1].value
        const data: LoginDTO = {
            email, password
        }
        if (email && password) {
            dispatch(getAccessToken(data))
        } else {
            toast.error('Please fill all input field!')
        }
    }

    function openSignInPage(even: any) {
        even.preventDefault()
        const wrapper = document.querySelector('.wrapper')
        if (wrapper !== null) {
            wrapper.classList.add('animate-signUp')
            wrapper.classList.remove('animate-signIn')
        }
    }

    function openSignUpPage(even: any) {
        even.preventDefault()
        const wrapper = document.querySelector('.wrapper')
        if (wrapper !== null) {
            wrapper.classList.add('animate-signIn')
            wrapper.classList.remove('animate-signUp')
        }
    }


    return (
        <div className={'login-page'}>
            <div className={'wrapper'}>
                <div className="form-wrapper sign-up">
                    <form onSubmit={handleRegister}>
                        <h2>Sign Up</h2>

                        <div className="input-group">
                            <input type="text" id={'fullName'}/>
                            <label htmlFor={'fullName'}>Full Name</label>
                        </div>
                        <div className="input-group">
                            <input type="email" id={'sign-email'}/>
                            <label htmlFor={'sign-email'}>Email</label>
                        </div>

                        <div className="input-group">
                            <input type="password" autoComplete={'cc-number'} id={'sign-password'}/>
                            <label htmlFor={'sign-password'}>Password</label>
                        </div>
                        <button type={'submit'} className={'login-btn'}>Sign Up</button>
                        <div className="sign-link">
                            <p>
                                Already have an account?
                                <a href={'#'} className={'signIn-link'} onClick={openSignInPage}>Sign In</a>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="form-wrapper sign-in">
                    <form onSubmit={handleLogin}>
                        <h2>Sign In</h2>
                        <div className="input-group">
                            <input type="text" id={'email'}/>
                            <label htmlFor={'email'}>Email</label>
                        </div>
                        <div className="input-group">
                            <input type="password" id={'password'}/>
                            <label htmlFor={'password'}>Password</label>
                        </div>
                        <div className="forgot-pass">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type={'submit'} className={'login-btn'}>
                            Sign In
                        </button>
                        <div className="sign-link">
                            <p>
                                Don't have an account?
                                <a href={'#'} className={'signUp-link'} onClick={openSignUpPage}>Sign Up</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;