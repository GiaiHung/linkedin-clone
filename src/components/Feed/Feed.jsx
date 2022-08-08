import React, { useState, useEffect, useRef } from 'react'
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

function Feed() {
  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef()
  const postsCollectionRef = collection(db, 'posts')
  const q = query(postsCollectionRef, orderBy('timestamp', 'desc'))

  const sendPost = async (e) => {
    e.preventDefault()

    await addDoc(postsCollectionRef, {
      name: 'Elon Musk',
      description: 'Founder of SpaceX, Tesla',
      message: input,
      url: 'https://image.cnbcfm.com/api/v1/image/107063491-16529089492022-05-18t210710z_1773411046_rc2w9u9z7ee9_rtrmadp_0_tesla-musk.jpeg?v=1655979407',
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
          <Avatar className="input_avatar" />
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
      {posts?.map(({ name, description, message, url, id }) => (
        <Post key={id} name={name} description={description} message={message} url={url} />
      ))}
    </div>
  )
}

export default Feed
