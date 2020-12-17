import React from "react"
import Button from '@material-ui/core/Button'

function Logout(props) {
    return (
        <div>
            <h1>LOGOUT</h1>
            <form onSubmit={props.handleLogout}>
                <br />
                <Button variant='outlined' color='primary' type='submit'> Logout </Button>
            </form>
        </div>
    )
}

export default Logout;