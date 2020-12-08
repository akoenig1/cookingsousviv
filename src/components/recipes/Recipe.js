import React, { useState, useEffect } from "react"

function Recipe(props) {
    const [recipe, setRecipe] = useState({
        title: '',
        intro: '',
        ingredients: '',
        directions: '',
        tags: '',
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
                instaPhoto: props.recipe[0].instaPhoto,
                fetched: true
            })
        } 
    }, [recipe, props]) 

    return (
        <div className='recipe-container'>
            <h3>{recipe.title}</h3>
            <p>{recipe.intro}</p>
            <p>{recipe.ingredients}</p>
            <p>{recipe.directions}</p>
            <p>{recipe.tags}</p>
        </div>
    )
}

export default Recipe