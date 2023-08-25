import React, {useEffect, useState} from "react";
import './auth.scss'
import {ory} from "../../store/features/User";
import {Link} from "react-router-dom";
import {CompleteSelfServiceLoginFlowWithPasswordMethod, FlowMethodConfig} from "@ory/kratos-client";
import AuthFormField from "./AuthFormField";
import {formatFormFields} from "../../util";

function Login() {
    const [login, setLogin] = useState<FlowMethodConfig>()
    const [flow, setFlow] = useState<string>("")
    useEffect(() => {
        ory.initializeSelfServiceLoginViaAPIFlow().then(res => {
            if (res && res.status === 200) {
                setFlow(res.data.id)
                setLogin(formatFormFields(res.data, 'password'))
            }
        }).catch(err => console.log(err))
    }, [])

    function openSignUpPage(even: any) {
        even.preventDefault()
        const wrapper = document.querySelector('.wrapper')
        if (wrapper !== null) {
            wrapper.classList.add('animate-signIn')
            wrapper.classList.remove('animate-signUp')
        }
    }

    async function submitLogin(e: any) {
        e.preventDefault()
        let identifier = e.target[0].value
        let password = e.target[1].value
        let csrf_token = e.target[2].defaultValue
        const data: CompleteSelfServiceLoginFlowWithPasswordMethod = {
            csrf_token,
            password,
            identifier
        }
        try{
        ory.completeSelfServiceLoginFlowWithPasswordMethod(flow, data).then(res => {
        })
        }catch (e){
            console.log(e);
        }
    }

    if (!login) return null;
    return (
        <div className="form-wrapper sign-in">
            <form onSubmit={submitLogin}>
                <h2>Sign In</h2>
                <>{
                    login.fields.map((field, index) =>
                        <AuthFormField key={index} field={field} index={index}/>
                    )
                }
                </>
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