import React, { useState } from "react"
import Photoboard from "./Photoboard"
import Navbar from "./Navbar"
import Routes from "../routes/routes"
import "../styles/styles.css"

function App() {
    const [user, setUser] = useState(false)

    const handleLogin = e => {
        e.preventDefault()
        setUser(true)
    }

    const handleLogout = e => {
        e.preventDefault()
        setUser(false)
    }
    
    return (
        <div>
            <Navbar />
            <Routes handleLogin={handleLogin} handleLogout={handleLogout} />
        </div>
    )
}

export default App