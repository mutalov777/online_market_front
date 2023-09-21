import React, {useEffect, useState} from "react";
import './auth.scss'
import {ory} from "../../store/features/User";
import {Link} from "react-router-dom";
import {LoginFlow, UiNode} from "@ory/kratos-client";
import AuthFormField from "./AuthFormField";

function Login() {
    const [login, setLogin] = useState<LoginFlow>()
    useEffect(() => {
        ory.createBrowserLoginFlow().then(res => {
            if (res && res.status === 200) {
                setLogin(res.data)
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

    if (!login) return null;
    // @ts-ignore
    const oidc = login.ui.nodes.filter(node=>node.group==='oidc'||node.attributes.name==='csrf_token');
    const passwords = login.ui.nodes.filter(node=>node.group==='password'||node.group==='default');
    return (
        <div className="form-wrapper sign-in">
                <h2>Sign In</h2>
            <form encType="application/x-www-form-urlencoded"
                  action={login.ui.action}
                  method={login.ui.method}>
                <>{
                    oidc.map((field: UiNode, index: number) =>
                        <AuthFormField key={index} node={field} index={index}/>
                    )
                }</>
            </form>
            <form encType="application/x-www-form-urlencoded"
                  action={login.ui.action}
                  method={login.ui.method}>
                <>{
                    passwords.map((field: UiNode, index: number) =>
                        <AuthFormField key={index} node={field} index={index}/>
                    )
                }</>
            </form>
                <div className="sign-link">
                    <p>
                        Don't have an account?
                        <Link to={'register'} className={'signUp-link'} onClick={openSignUpPage}>Sign Up</Link>
                    </p>
                </div>
        </div>
    )
}

export default Login;