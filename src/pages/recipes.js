import React, { useState, useEffect } from "react"
import axios from 'axios'
import { arrowFunctionExpression } from "@babel/types"

function getRecipeList(server_url) {
    return axios.get(`${server_url}/recipes`)
        .then(res => res.data.recipe_list)
        .catch(err => {
            console.log(err)
        })
}

function getRecipe(server_url, recipe_url) {
    return axios.get(`${server_url}/recipes/${recipe_url}`)
        .then(res => res.data.recipe)
        .catch(err => {
            console.log(err)
        })
}

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const server_url = (process.env.NODE_ENV === 'development')
        ? 'http://localhost:5000'
        : 'https://cookingsousviv-backend.herokuapp.com'

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

    console.log(recipes)

    return(
        <div>
            <h1>RECIPES</h1>
            <ul>
                {recipes.map(recipe => 
                    <a key={recipe._id} href={recipe.url}>
                        <li key={recipe._id}>{recipe.title}</li>
                    </a>
                )}
            </ul>
        </div>
    )
}

export default Recipes