import React, { useState, useEffect } from "react"
import { Link, Route, Switch, matchPath, } from "react-router-dom"
import axios from 'axios'
import Recipe from '../components/recipes/Recipe'
import { arrowFunctionExpression } from "@babel/types"

function getRecipeList(server_url) {
    return axios.get(`${server_url}/recipes`)
        .then(res => res.data.recipe_list)
        .catch(err => {
            console.log(err)
        })
}

function Recipes({history}) {
    const [recipes, setRecipes] = useState([]);
    const server_url = (process.env.NODE_ENV === 'development')
        ? 'http://localhost:5000'
        : 'https://cookingsousviv-backend.herokuapp.com'

    const match = matchPath(history.location.pathname, {
        path: "/recipes/:id"
    });
    
    let recipeId;
    
    if (match && match.params.id) {
        recipeId = match.params.id;
    }

    useEffect(() => {
        let mounted = true
        getRecipeList(server_url)
            .then(recipe_list => {
                if(mounted) {
                    setRecipes(recipe_list)
                }
            })
        return () => mounted = false;
    }, [])

    console.log(history.location.pathname === '/recipes' && 'hello')

    return(
        <div>
            <h1>RECIPES</h1>

            <ul>
                 { history.location.pathname === '/recipes' ?
                    recipes.map(({ title, url }) =>
                        <li key={url}>
                            <Link to={`${url}`}>
                                {title}
                            </Link>
                        </li> 
                ) : '' }
                <Switch>
                    <Route exact path="/recipes/:id" render={(props) => ( <Recipe recipe={recipes.filter( recipe => recipe.url === `/recipes/${recipeId}` )} {...props} /> )} />
                </Switch>
            </ul> 

        </div>
    )
}

export default Recipes