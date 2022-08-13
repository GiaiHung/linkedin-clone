import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

import { db } from '../../firebase'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

import './Comment.css'
import { Avatar } from '@mui/material'
import CommentItem from './CommentItem'

function Comment({ id, comments }) {
  const [inputValue, setInputValue] = useState('')
  const user = useSelector(selectUser)

  const postRef = doc(db, 'posts', id)

  const addComment = async (e) => {
    e.preventDefault()

    try {
      await updateDoc(postRef, {
        comments: arrayUnion({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          body: inputValue
        })
      })

      setInputValue('')
      console.log(postRef);
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="comment">
      <div className="comment_header">
        <Avatar src={user.photoURL} alt="avatar">{user.displayName[0].toUpperCase()}</Avatar>
        <form onSubmit={addComment}>
          <input
            placeholder="Add a comment..."
            spellCheck={false}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
      
      {comments?.map(({body, email, name, photoURL}, index) => <CommentItem key={index} body={body} email={email} name={name} photoURL={photoURL} />)}
    </div>
  )
}

export default Comment
