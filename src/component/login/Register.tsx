import React, {useEffect, useState} from "react";
import {ory} from "../../store/features/User";
import {useAppDispatch} from "../../store/store";
import './auth.scss'
import {FlowMethodConfig, FormField} from "@ory/kratos-client";
import {Link} from "react-router-dom";
import {formatFormFields} from "../../util";
import AuthFormField from "./AuthFormField";

function Register() {
    const [register, setRegister] = useState<FlowMethodConfig>()
    const [flow, setFlow] = useState<string>('')
    const dispatch = useAppDispatch();
    useEffect(() => {
        ory.initializeSelfServiceRegistrationViaAPIFlow().then(res => {
            if (res && res.status === 200)
                setFlow(res.data.id)
            setRegister(formatFormFields(res.data, 'password'))
        }).catch(err => {
            console.log(err)
        })
    }, [])

    async function handleRegister(e: any) {
        e.preventDefault()
        let email = e.target[0].value
        let password = e.target[1].value
        let firstName = e.target[2].value
        let lastName = e.target[3].value
        let csrf_token = e.target[4].value

        const data = {
            "csrf_token": csrf_token,
            "password": password,
            "traits": {
                "name": {
                    "first": firstName,
                    "last": lastName
                },
                "email": email
            }
        }
    }

    function openSignInPage(even: any) {
        even.preventDefault()
        const wrapper = document.querySelector('.wrapper')
        if (wrapper !== null) {
            wrapper.classList.remove('animate-signIn')
            wrapper.classList.add('animate-signUp')
        }
    }

    if (!register) return null;
    return (
        <div className="form-wrapper sign-up">
            <form encType="application/x-www-form-urlencoded"
                  action={register.action}
                  method={register.method}>
                <h2>Sign Up</h2>
                <>{
                    register?.fields.map((field: FormField, index: number) =>
                            <AuthFormField key={index} field={field} index={index}/>
                    )
                }</>
                <button type={'submit'} className={'login-btn'}>Sign Up</button>
                <div className="sign-link">
                    <p>
                        Already have an account?
                        <Link to={'login'} className={'signIn-link'} onClick={openSignInPage}>Sign In</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register;