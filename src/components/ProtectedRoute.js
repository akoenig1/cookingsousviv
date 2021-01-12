import React, { Component, useContext } from "react"; // eslint-disable-line no-unused-vars
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../context/auth-context"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);

    return(
        <Route {...rest} render={
            props => {
                if (auth.isAdmin) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/unauthorized',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default ProtectedRoute;