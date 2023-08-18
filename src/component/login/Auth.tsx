import React from "react";
import './auth.scss'
import Login from "./Login";
import Register from "./Register";


function Auth() {
    // const token = useAppSelector(({user: {token}}) => token)
    // const user = useAppSelector(({user: {user}}) => user)
    // const navigate = useNavigate()
    return (
        <div className={'login-page'}>
            <div className={'wrapper'}>
                <Register/>
                <Login/>
            </div>
        </div>
    )
}

export default Auth;