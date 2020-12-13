import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../pages/home"
import About from "../pages/about"
import Contact from "../pages/contact"
import Favorites from "../pages/favorites"
import CreateRecipe from "../pages/recipes/create"
import DeleteRecipe from "../pages/recipes/delete"
import Recipes from "../pages/recipes/recipes"


function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/recipes/create" component={CreateRecipe} />
            <Route path="/recipes/:id/delete" component={DeleteRecipe} /> 
            <Route path="/recipes" component={Recipes} />
        </Switch>
    )
}

export default Routes