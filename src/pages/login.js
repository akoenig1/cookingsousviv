import React from "react"
import GoogleLogin from "react-google-login"

function Login(props) {
    console.log(props)
    
    return(
        <div>
            <h1>LOGIN</h1>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={props.handleLogin}
                onFailure={props.handleLogin}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login