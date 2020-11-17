import React from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
    return(
        <header>
            <nav className="navbar">
                <h1>Cooking <br></br> Sous <div id="script">Viv</div></h1>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <NavLink 
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link" 
                            to="/"
                        >
                        HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link" 
                        to="/recipes"
                        >
                        RECIPES
                        </NavLink>
                    </li>
                    <li>
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link" 
                        to="/favorites"
                        >
                        FAVORITES
                        </NavLink>
                    </li>
                    <li>
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link" 
                        to="/about"
                        >
                        ABOUT
                        </NavLink>
                    </li>
                    <li>
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link" 
                        to="/contact"
                        >
                        CONTACT
                        </NavLink>
                    </li>
                    <div id="navbar-underline"></div>
                    <div id="social-bar">
                        <ul>
                            <li><a className="social-link" href="https://www.instagram.com/cookingsousviv/" target="_blank"><i class="fab fa-instagram fa-lg"></i></a></li>
                        </ul>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar