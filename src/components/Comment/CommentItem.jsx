import React from 'react'
import './CommentItem.css'
import { Avatar } from '@mui/material'

function CommentItem({body, name, email, photoURL}) {
  return (
    <div className="comment_body">
      <Avatar src={photoURL} alt="comment-avatar" className='comment_body_avatar'>
        {name[0].toUpperCase()}
      </Avatar>
      <div className="comment_body_post">
        <h4>{name}</h4>
        <p className="comment_header">{email}</p>
        <p className="comment_content">
          {body}
        </p>
      </div>
    </div>
  )
}

export default CommentItem
