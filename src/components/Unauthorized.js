import React from "react"
import { Link } from "react-router-dom"

const Unauthorized = () => {
    return (
        <div>
            <h1>403 ERROR - ACCESS DENIED</h1>
            <p><Link to="/">Back to Home</Link></p>
        </div>
    )
}

export default Unauthorized;

