import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../pages/home"
import Login from "../pages/login"
import About from "../pages/about"
import Contact from "../pages/contact"
import Favorites from "../pages/favorites"
import CreateRecipe from "../pages/recipes/create"
import UpdateRecipe from "../pages/recipes/update"
import DeleteRecipe from "../pages/recipes/delete"
import Recipes from "../pages/recipes/index"


function Routes(props) {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" handleLogin={props.handleLogin} render={props => <Login {...props} handleLogin={props.handleLogin} />} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/recipes/create" component={CreateRecipe} />
            <Route path="/recipes/:id/update" component={UpdateRecipe} />
            <Route path="/recipes/:id/delete" component={DeleteRecipe} /> 
            <Route path="/recipes" component={Recipes} />
        </Switch>
    )
}

export default Routes