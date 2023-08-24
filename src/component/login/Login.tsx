import React, {useEffect, useState} from "react";
import './auth.scss'
import {getAccessToken, LoginDTO, ory} from "../../store/features/User";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../store/store";
import {Link} from "react-router-dom";
import {FlowMethodConfig} from "@ory/kratos-client";

function Login() {
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState<FlowMethodConfig>()
    const [flow, setFlow] = useState<string>("")
    useEffect(() => {
        ory.createBrowserLoginFlow().then(res => {
            if (res && res.status === 200) {
                console.log(res.data)
            }
        }).catch(err => console.log(err))
    }, [])

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

    function openSignUpPage(even: any) {
        even.preventDefault()
        const wrapper = document.querySelector('.wrapper')
        if (wrapper !== null) {
            wrapper.classList.add('animate-signIn')
            wrapper.classList.remove('animate-signUp')
        }
    }

    if (!login) return null;
    return (
        <div className="form-wrapper sign-in">
            <form encType="application/x-www-form-urlencoded"
                  action={login.action}
                  method={login.method}>
                <h2>Sign In</h2>
                {/*<>{*/}
                {/*    login.fields.map((field, index) =>*/}
                {/*        <AuthFormField key={index} field={field} index={index}/>*/}
                {/*    )*/}
                {/*}*/}
                {/*</>*/}
                <div className="forgot-pass">
                    <a href="#">Forgot Password?</a>
                </div>
                <button type={'submit'} className={'login-btn'}>
                    Sign In
                </button>
                <div className="sign-link">
                    <p>
                        Don't have an account?
                        <Link to={'register'} className={'signUp-link'} onClick={openSignUpPage}>Sign Up</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;