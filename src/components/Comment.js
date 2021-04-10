import React from 'react';

function Comment(props) {
  const comment = props.comment
  
  return (
    <li 
      key={comment.id}
    >
      <span>
        {comment.userAuthor ? comment.userAuthor.name : comment.guestAuthor}
      </span>
      {comment.comment}
    </li>
  )
}

export default Comment;