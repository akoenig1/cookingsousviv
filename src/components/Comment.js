import React, { useContext } from 'react';
import { useHttpClient } from '../hooks/useHttpClient';
import { AuthContext } from '../context/auth-context';
import moment from 'moment';


function Comment( {comment, recipeId, onChange} ) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient(); 
  const server_url = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:5000'
  : 'https://cookingsousviv-backend.herokuapp.com';
  const relativeDate = moment(comment.createdAt).fromNow();

  function handleDelete(event) {
    event.preventDefault();

    sendRequest(
      `${server_url}/recipes/${recipeId}/comments/${comment._id}`,
      'DELETE',
      {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
      },
    ).then( async (res) => {
        return res;
    }).catch((err) => {
        console.log(err)
    });

    onChange();
  }
  
  return (
    <li 
      key={comment._id}
    >
      <span>
        <p className='author-name'> {comment.userAuthor ? comment.userAuthor.name : comment.guestAuthor} <span class='comment-date'> | {relativeDate} </span> </p>
      </span>
      {comment.comment}
      {comment.isCommentMine && 
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      }
    </li>
  )
}

export default Comment;