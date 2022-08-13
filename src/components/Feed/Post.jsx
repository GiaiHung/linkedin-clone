import React, { useState, forwardRef, useEffect } from 'react'
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import InputOption from './InputOption'
import './Post.css'

import { Avatar } from '@mui/material'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import Comment from '../Comment/Comment'

// Wrap comp around forwardRef to get ref to do animation
const Post = forwardRef(
  ({ id, name, description, message, url, likes, isLiked, comments }, ref) => {
    const liked = isLiked
    const [isUserLiked, setIsUserLiked] = useState(false)
    let likeCount = likes || 0

    const [showComment, setShowComment] = useState(false)

    const user = useSelector(selectUser)

    useEffect(() => {
      if (liked === undefined) return
      for (let i = 0; i < liked.length; i++) {
        if (liked[i] === user.email) {
          setIsUserLiked(true)
          return
        } else {
          setIsUserLiked(false)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLike = async () => {
      if (!isUserLiked) {
        likeCount++
      } else {
        likeCount--
      }

      setIsUserLiked(!isUserLiked)

      if (!isUserLiked) {
        liked.push(user.email)
      } else {
        // eslint-disable-next-line array-callback-return
        const index = liked.findIndex((item) => {
          if (item.includes(user.email)) {
            return true
          }
        })
        liked.splice(index, 1)
      }

      try {
        const postDocRef = doc(db, 'posts', id)
        await updateDoc(postDocRef, {
          likes: likeCount,
          isLiked: liked,
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
          {likes > 0 && (
            <h6>
              <span>
                <img src="/images/like-btn.png" alt="like-btn" />
              </span>{' '}
              {likeCount}
            </h6>
          )}
          <InputOption
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color={isUserLiked ? 'blueviolet' : 'gray'}
            onClick={onLike}
          />
          <InputOption
            Icon={ChatOutlinedIcon}
            title="Comment"
            color="gray"
            isActive={showComment}
            onClick={() => setShowComment(!showComment)}
          />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>

        {showComment && (
          <div className="post_comment">
            <Comment id={id} comments={comments} />
          </div>
        )}
      </div>
    )
  }
)

export default Post
