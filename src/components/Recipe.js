import React, { useState, useEffect, useContext } from 'react'
import useInput from '../hooks/useInput';
import Button from '@material-ui/core/Button'
import { AuthContext } from '../context/auth-context'
import { useHttpClient } from '../hooks/useHttpClient';
import Comment from './Comment';
import LikeRecipe from './LikeRecipe'
//import Grid from '@material-ui/core/Grid'

function Recipe(props) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient(); 
  const server_url = (process.env.NODE_ENV === 'development')
    ? 'http://localhost:5000'
    : 'https://cookingsousviv-backend.herokuapp.com';
  const comment = useInput('');
  const guestAuthor = useInput('');
  const id = props.recipe[0].id;
  const [recipe, setRecipe] = useState({
    title: '',
    intro: '',
    ingredients: '',
    directions: '',
    tags: '',
    id: '',
    instaPhoto: {},
    comments: [],
    likes: [],
    likesCount: '',
    fetched: false,
  });
  const [likesState, setLikes] = useState(recipe.likesCount);

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
        likesCount: recipePage.data.likesCount,
        isLiked: recipePage.data.isLiked,
        fetched: true
      })
    }
  })
  }, [])

  function getRecipe(server_url) {
    const header = {
      'Content-Type': 'application/json'
    };
    if(auth.token) {
      header.Authorization = 'Bearer ' + auth.token;
    }

    return sendRequest(
        `${server_url}/recipes/${id}`, 
        'GET',
        header,
      )
      .then(res => res)
      .catch(err => {
        console.log(err);
      }
    );
  };

  const incLikes = () => setLikes(likesState + 1);
  const decLikes = () => setLikes(likesState - 1);

  function handleCommentSubmit(event) {
    event.preventDefault();
    const registeredUser = auth.isLoggedIn;
    const userInfo = auth.isLoggedIn ? auth.userId : guestAuthor.value;
    const formData = JSON.stringify({
      comment: comment.value,
      registeredUser: registeredUser,
      userInfo: userInfo,
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

    guestAuthor.value = '';
    comment.value = '';
  }

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
      <div className='recipe-actions'>
        {auth.isLoggedIn && <LikeRecipe 
          isLiked={recipe.isLiked}
          recipeId={recipe.id}
          incLikes={incLikes}
          decLikes={decLikes}
        /> }
      </div>
      <div className='comments-container'>
        {recipe.comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
      <div>
        <form>
          {!auth.isLoggedIn && 
          <input
            name='guestAuthor'
            placeholder='Enter your name...'
            value={guestAuthor.value}
            onChange={guestAuthor.onChange}
          />
          }
          <textarea
            name='content'
            rows='5'
            placeholder='Enter comment...'
            value={comment.value}
            onChange={comment.onChange}
          />
          <button onClick={handleCommentSubmit}></button>
        </form>
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