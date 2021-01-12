import React, { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import Axios from 'axios';
import GoogleLogin from "react-google-login"
import Button from '@material-ui/core/Button'

const Auth = () => {
    const auth = useContext(AuthContext);

    const authResponseSuccess = (res) => {
        Axios({
            method: "POST",
            url: "http://localhost:5000/auth/google",
            data: {tokenId: res.tokenId}
        }).then(res => {
            auth.login(res.data.user._id, res.data.token, res.data.user.admin)
        })
    }

    const authResponseFailure = (res) => {
        console.log(res)
    }

    let button
    if(!auth.isLoggedIn) {
        button = <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={authResponseSuccess}
            onFailure={authResponseFailure}
            cookiePolicy={'single_host_origin'}
        />
    } else {
        button = <Button variant='outlined' onClick={auth.logout} >Logout</Button>
    }

    return(
        <div>
            {button}
        </div>
    )
}

export default Auth;