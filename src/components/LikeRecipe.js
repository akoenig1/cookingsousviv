import React, { useContext, useEffect, useState } from 'react';
import { useHttpClient } from '../hooks/useHttpClient';
import { AuthContext } from '../context/auth-context'
import { HeartIcon, FilledHeartIcon } from './Icons';

function LikeRecipe({ isLiked, recipeId, incLikes, decLikes }) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient(); 
  const [liked, setLiked] = useState(isLiked);
  const server_url = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:5000'
  : 'https://cookingsousviv-backend.herokuapp.com';

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  function handleToggleLike() {
    if(liked) {
      setLiked(false);
      decLikes();
      sendRequest(
        `${server_url}/recipes/${recipeId}/toggleLike`, 
        'GET', 
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      )  
    } else {
      setLiked(true);
      incLikes();
      sendRequest(
        `${server_url}/recipes/${recipeId}/toggleLike`, 
        'GET', 
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      )  
    }
  };

  if(liked) {
    return <FilledHeartIcon onClick={handleToggleLike} />
  }

  if(!liked) {
    return <HeartIcon onClick={handleToggleLike} />
  }
}

export default LikeRecipe;