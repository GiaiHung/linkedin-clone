import React, { useState, useEffect, useRef } from 'react'
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import FlipMove from 'react-flip-move'

import './Feed.css'
import InputOption from './InputOption'
import Post from './Post'

import { Avatar } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import EventIcon from '@mui/icons-material/Event'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

function Feed() {
  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef()
  const postsCollectionRef = collection(db, 'posts')
  const q = query(postsCollectionRef, orderBy('timestamp', 'desc'))

  const user = useSelector(selectUser)

  const sendPost = (e) => {
    e.preventDefault()

    if (!input.trim() || input.length === 0) {
      alert('Please type in message')
      setInput('')
      return
    }

    addDoc(postsCollectionRef, {
      name: user.displayName,
      description: user.email,
      url: user.photoURL,
      message: input,
      timestamp: serverTimestamp(),
    })

    setInput('')
    inputRef.current.focus()
  }

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="feed">
      {/* Feed Input */}
      <div className="feed_input_container">
        {/* Input */}
        <div className="feed_input">
          <Avatar src={user?.photoURL} alt="avatar">
            {user?.email[0].toUpperCase()}
          </Avatar>
          <div className="input_text">
            <CreateIcon />
            <form onSubmit={sendPost}>
              <input
                type="text"
                spellCheck={false}
                placeholder="Start a post"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={inputRef}
              />
            </form>
          </div>
        </div>

        {/* Options */}
        <div className="feed_input_options">
          <InputOption Icon={InsertPhotoIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={VideoLibraryIcon} title="Video" color="#e7a33e" />
          <InputOption Icon={EventIcon} title="Event" color="#c0cbcd" />
          <InputOption Icon={NewspaperIcon} title="Article" color="#7fc15e" />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map(({ name, message, url, description, id, likes, isLiked, comments }) => (
          <Post key={id} id={id} name={name} message={message} url={url} description={description} likes={likes} isLiked={isLiked} comments={comments} />
        ))}
      </FlipMove>
    </div>
  )
}

export default Feed
