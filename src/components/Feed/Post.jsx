import React, { forwardRef } from 'react'
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import InputOption from './InputOption'
import './Post.css'

import { Avatar } from '@mui/material'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'

// Wrap comp around forwardRef to get ref to do animation
const Post = forwardRef(({ id, name, description, message, url, likes, isLiked }, ref) => {
  const liked = isLiked
  let likeCount = likes

  const onLike = async () => {
    if(!liked) {
      likeCount++
    } else {
      likeCount--
    }

    try {
      const postDocRef = doc(db, 'posts', id)
      await updateDoc(postDocRef, {
        likes: likeCount,
        isLiked: !liked,
      })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="post" ref={ref}>
      <div className="post_header">
        <Avatar src={url} alt={name} />
        <div className="post_header_info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post_body">
        <p>{message}</p>
      </div>

      <div className="post_buttons">
        <h6>
          <span>
            <img src="/images/like-btn.png" alt="like-btn" />
          </span>{' '}
          {likeCount}
        </h6>
        <InputOption
          Icon={ThumbUpAltOutlinedIcon}
          title="Like"
          color={liked ? 'blueviolet' : 'gray'}
          onClick={onLike}
        />
        <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>
    </div>
  )
})

export default Post
