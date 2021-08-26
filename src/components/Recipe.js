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
  const [updating, setUpdating] = useState(false);
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
    let mounted = true;

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

    if(recipe.fetched && !updating) {
      return;
    }

    getRecipe(server_url)
      .then(recipePage => {
        if (recipePage && mounted) {
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
        return () => mounted = false;
  })
  }, [updating, recipe, server_url, props.recipe, auth.token, id, sendRequest])

  useEffect(() => {
    if(updating) {
      setTimeout(() => {
        setUpdating(false);
      }, 500)
    }
  }, [updating])

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

    guestAuthor.setValue('');
    comment.setValue('');
    setUpdating(true);
  }

  function handleCommentDelete() {
    setUpdating(true);
  }

  return (
    <div className='recipe-page'>
      <div className='recipe-card'>
        <div className='recipe-card-header row'>
          <h3 className='recipe-card-title'>{recipe.title}</h3>
        </div>
        <hr className='recipe-card-divider'></hr>
        <div className='recipe-card-top row'>
          <div className='recipe-card-sub-header col-lg-4'>
            <p className='recipe-card-intro'>{recipe.intro}</p>
          </div>
          <div className='recipe-card-image-container col-lg-8'>
            <img src={recipe.instaPhoto.media_url} alt="food" className="recipe-card-image"></img>
          </div>
        </div>
        <hr className='recipe-card-divider'></hr>
        <div className='recipe-card-middle row'>
          <div className='recipe-card-ingredients col-lg-4'>
            <h4>Ingredients</h4>
            <p>{recipe.ingredients}</p>
          </div>
          <div className='recipe-card-directions col-lg-8'>
            <h4>Preparation</h4>
            <p>{recipe.directions}</p>
          </div>
        </div>
        <hr className='recipe-card-divider'></hr>
        <div className='recipe-card-bottom row'>
          <p id='recipe-card-tags'>{recipe.tags}</p>
        </div>
      </div>

      <div className='recipe-interactions'>
        <div className='likes-container'> 
          <div className='like-button-container'>
            {auth.isLoggedIn && <LikeRecipe 
              isLiked={recipe.isLiked}
              recipeId={recipe.id}
              incLikes={incLikes}
              decLikes={decLikes}
            /> }
          </div>
          <div className='likes-count-container'>
            {recipe.likesCount !== 0 && (
              <span className='likes bold'>
                {recipe.likesCount} {recipe.likesCount > 1 ? 'likes' : 'like'}
              </span>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='comments-container col-lg-8'>
            <h4>Comments</h4>
            <ul>
              {recipe.comments.map((comment, i) => (
                <div className='comment'>
                  <Comment key={i} comment={comment} recipeId={recipe.id} onChange={handleCommentDelete} />
                  <hr></hr>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className='row'>
          <form className='comment-form col-lg-8'>
            {!auth.isLoggedIn && 
            <input
              name='guestAuthor'
              placeholder='Enter your name (required)'
              value={guestAuthor.value}
              onChange={guestAuthor.onChange}
              className='comment-input'
            />
            }
            <textarea
              name='content'
              rows='5'
              placeholder='Leave a comment or a tip for this recipe.'
              value={comment.value}
              onChange={comment.onChange}
              className='comment-input'
            />
            <button id='comment-submit' onClick={handleCommentSubmit}>Submit</button>
          </form>
        </div>
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