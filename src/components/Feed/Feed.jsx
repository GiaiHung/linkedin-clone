import React, { useState, useEffect, useRef } from 'react'
import FlipMove from 'react-flip-move'
import './Feed.css'
import { Avatar } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import EventIcon from '@mui/icons-material/Event'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import InputOption from './InputOption'
import Post from './Post'
import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

function Feed() {
  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef()
  const postsCollectionRef = collection(db, 'posts')
  const q = query(postsCollectionRef, orderBy('timestamp', 'desc'))

  // Get data from redux
  const user = useSelector(selectUser)
  const { displayName, photoURL, email } = user

  const sendPost = (e) => {
    e.preventDefault()

    addDoc(postsCollectionRef, {
      name: displayName,
      description: email,
      message: input,
      url: photoURL,
      timestamp: serverTimestamp(),
    })

    setInput('')
    inputRef.current.focus()
  }

  useEffect(() => {
    onSnapshot(q, (snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(posts)

  return (
    <div className="feed">
      {/* Feed Input */}
      <div className="feed_input_container">
        {/* Input */}
        <div className="feed_input">
          <Avatar src={photoURL} className="input_avatar">
            {/* If user doesn't have photo */}
            {email[0].toUpperCase()}
          </Avatar>
          <div className="input_text">
            <CreateIcon />
            <form onSubmit={sendPost}>
              <input
                type="text"
                spellCheck={false}
                placeholder="Start a post"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
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

      {/* Feed Content */}
      <FlipMove>
        {posts?.map(({ name, description, message, url, id }) => (
          <Post key={id} name={name} description={description} message={message} url={url} />
        ))}
      </FlipMove>
    </div>
  )
}

export default Feed
