import React, { useState, useEffect, useContext } from 'react'
import useInput from '../../hooks/useInput';
import Button from '@material-ui/core/Button'
import { AuthContext } from '../../context/auth-context'
import { useHttpClient } from '../../hooks/useHttpClient';
import axios from 'axios';
//import Grid from '@material-ui/core/Grid'

function Recipe(props) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient(); 
  const server_url = (process.env.NODE_ENV === 'development')
    ? 'http://localhost:5000'
    : 'https://cookingsousviv-backend.herokuapp.com';
    
  const [recipe, setRecipe] = useState({
    title: '',
    intro: '',
    ingredients: '',
    directions: '',
    tags: '',
    id: '',
    instaPhoto: {},
    comments: [],
    likes: '',
    fetched: false,
  });

  const comment = useInput('');
  const id = props.recipe[0].id;

  function getRecipe(server_url) {
    return axios.get(`${server_url}/recipes/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      }
    );
  };

  function handleCommentSubmit(event) {
    event.preventDefault();
    const formData = JSON.stringify({
      comment: comment.value,
      user: auth.userId,
    });

    sendRequest(
      `${server_url}/recipes/${id}/comments`, 
      'POST',
      {
        'Content-Type': 'application/json'
      },
      formData
    )
    .then(res => console.log(res))
    .catch(err => {
      console.log(err)
    })

    comment.value = '';
  }

  useEffect(() => {   
    getRecipe(server_url).then(recipePage => {

    if (recipePage) {
      setRecipe({...recipe,
        title: props.recipe[0].title,
        intro: props.recipe[0].intro,
        ingredients: props.recipe[0].ingredients,
        directions: props.recipe[0].directions,
        tags: props.recipe[0].tags,
        id: props.recipe[0].id,
        instaPhoto: props.recipe[0].instaPhoto,
        comments: recipePage.data.comments,
        likes: recipePage.data.likes,
        fetched: true
      })
    }
  })
  }, [recipe, props]) 

  //   if (props.recipe[0] && !recipe.fetched) {
  //     setRecipe({...recipe,
  //       title: props.recipe[0].title,
  //       intro: props.recipe[0].intro,
  //       ingredients: props.recipe[0].ingredients,
  //       directions: props.recipe[0].directions,
  //       tags: props.recipe[0].tags,
  //       id: props.recipe[0].id,
  //       instaPhoto: props.recipe[0].instaPhoto,
  //       fetched: true
  //     })
  //   }
  // }, [recipe, props]) 

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
      <div className='comments-container'>
        {recipe.comments.map((comment) => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </div>
      {auth.isLoggedIn && <div>
        <form>
          <textarea
            name='content'
            rows='5'
            placeholder='Enter comment...'
            value={comment.value}
            onChange={comment.onChange}
          />
          <button onClick={handleCommentSubmit}></button>
        </form>
      </div>}

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