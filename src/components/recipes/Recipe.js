import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { AuthContext } from '../../context/auth-context'
//import Grid from '@material-ui/core/Grid'

function Recipe(props) {
    const auth = useContext(AuthContext);
    
    const [recipe, setRecipe] = useState({
        title: '',
        intro: '',
        ingredients: '',
        directions: '',
        tags: '',
        id: '',
        instaPhoto: {},
        fetched: false,
    });

    useEffect(() => {
        if (props.recipe[0] && !recipe.fetched) {
            setRecipe({...recipe,
                title: props.recipe[0].title,
                intro: props.recipe[0].intro,
                ingredients: props.recipe[0].ingredients,
                directions: props.recipe[0].directions,
                tags: props.recipe[0].tags,
                id: props.recipe[0].id,
                instaPhoto: props.recipe[0].instaPhoto,
                fetched: true
            })
        }
        console.log(recipe.instaPhoto)
    }, [recipe, props]) 

    return (
        <div className='recipe-card'>
            <div className='recipe-card-top row'>
                <div className='recipe-card-header col-lg-6'>
                    <h3 className='recipe-card-title'>{recipe.title}</h3>
                    <p className='recipe-card-intro'>{recipe.intro}</p>
                </div>
                <div className='recipe-card-image-container col-lg-6'>
                    <img src={recipe.instaPhoto.media_url} alt="food" className="recipe-card-image"></img>
                </div>
            </div>
            <div className='recipe-card-middle row'>
                <p className='recipe-card-ingredients col-lg-4'>{recipe.ingredients}</p>
                <p className='recipe-card-directions col-lg-8'>{recipe.directions}</p>
            </div>
            <div className='recipe-card-bottom row'>
                <p className='recipe-card-tags'>{recipe.tags}</p>
            </div>

            {auth.isAdmin && <div>
                <Button variant='outlined' onClick={() => props.history.push({
                    pathname: `${props.history.location.pathname}/update`, 
                    recipe: recipe
                }) }> 
                    Update 
                </Button>

                <Button variant='outlined' onClick={() => props.history.push({
                    pathname: `${props.history.location.pathname}/delete`, 
                    recipe: recipe
                }) }> 
                    Delete 
                </Button>
            </div>}

                
        </div>
    )
}

export default Recipe