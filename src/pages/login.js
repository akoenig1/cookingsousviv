import React from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function Login(props) {
    return(
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={props.handleLogin}>
            <br />
            <TextField
            id='username'
            label='Username'
            margin="normal"
            variant='outlined'
            />
            <br />
            <TextField
            id='password'
            label='Password'
            margin="normal"
            variant='outlined'
            type='password'
            />
            <br />
            <Button variant='outlined' color='primary' type='submit'> Login </Button>
            </form>
        </div>
    )
}

export default Login