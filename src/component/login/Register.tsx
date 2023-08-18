import React, {useEffect, useState} from "react";
import {createUser, ory, UserCreateDTO} from "../../store/features/User";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../store/store";
import './auth.scss'
import {FlowMethodConfig} from "@ory/kratos-client";
import {Link} from "react-router-dom";
import AuthFormField from "./AuthFormField";

function Register() {
    const [register, setRegister] = useState<FlowMethodConfig>()
    const dispatch = useAppDispatch();
    useEffect(() => {
        // ory.initializeSelfServiceRegistrationViaAPIFlow().then(res => {
        //     if (!res || res.status !== 200)
        //         redirectToSelfService("/self-service/registration/browser");
        //     const registrationFlow = res.data;
        //     const method = "password";
        //     setRegister(formatFormFields(registrationFlow, method))
        // }).catch(err => {
        //     console.log(err)
        // })
    }, [])

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
                    <form method={register?.method} action={register?.action}>
                        <h2>Sign Up</h2>
                        {/*<>{*/}
                        {/*    register?.fields.map((field: FormField, index: number) =>*/}
                        {/*        // <AuthFormField key={index} field={field} index={index}/>*/}
                        {/*    )*/}
                        {/*}</>*/}
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